import gulp from 'gulp'
import babel from 'gulp-babel'
import browserify from 'browserify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'   // 用与stream转换为vinyl-stream
import vbuffer from 'vinyl-buffer'          // 将vinyl-stream 转换为 buffer
import buffer from 'gulp-buffer'           // 用途同上 stream buffer转换就用上面两个
import streamify from 'gulp-streamify'     // 用途不明
import uglify from 'gulp-uglify'
import sourcemaps from 'gulp-sourcemaps'
import livereload from 'gulp-livereload'
import htmlmin from 'gulp-htmlmin'
import rename from 'gulp-rename'
import fs from 'fs'
import envify from 'gulp-envify'          // 相当于c里的debug宏，可以设置只在debug中出现的代码，例如打印
import stripDebug from 'gulp-strip-debug'
import glob from 'glob'
import es from 'event-stream'
import watchify from 'watchify'
import gutil from 'gulp-util'
import lodash from 'lodash'

let assign = lodash.assign;
let buildArr = ['./source/exportfile.js', './source/importfile.js'];
// let buildArr = ['./source/repeatedReferencesA.js', './source/repeatedReferencesB.js', './source/repeatedReferencesC.js'];
// development production
let environment = {
  _: 'purge',
  NODE_ENV: 'development'
};

gulp.task("browerifyBuild", () => {
    return watchify(browserify(assign({}, watchify.args, { 
        	entries: buildArr,
        	debug: true
        })))
        .transform('babelify', { presets: ["es2015"] })
        .bundle()
        .on('error', function(err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(source('test.js'))
        .pipe(gulp.dest('./target/'))
        .pipe(rename({ suffix: '.min' }))        
        .pipe(buffer())
        .pipe(envify(environment))
        .pipe(stripDebug())
        .pipe(sourcemaps.init({loadMaps: true}))  // 设置map
        .pipe(sourcemaps.identityMap())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./target/'))
        .pipe(livereload());
})

/*
	直接使用babel将es6转换为amd
 */
gulp.task("babelBuild", () => {
    return gulp.src("source/*.js")
        .pipe(babel({
            plugins: [
                ['transform-es2015-modules-amd']
            ],
            presets: ['es2015']
        }))
        .pipe(gulp.dest("target"))
        .pipe(livereload());
})

gulp.task("watch", ['browerifyBuild', 'babelBuild'], () => {
    livereload.listen();
    gulp.watch('./source/*.js', ['browerifyBuild']);
    gulp.watch('./source/*.js', ['babelBuild']);
})

gulp.task("browerifyBuildWatch", ["browerifyBuild"], () => {
    livereload.listen();
    gulp.watch('./source/*.js', ['browerifyBuild']);
})

gulp.task('default', ['browerifyBuild', 'babelBuild', 'watch'])

/*------------测试异步执行------------*/
    /*
        通过callback来保证执行顺序，two中的执行函数为one中的回调。
     */
    gulp.task('one', callback => {
        setTimeout(() => {
            console.log("this is one");
            callback();
        }, 2000)
    })

    gulp.task('two', ['one'], () => {
        console.log("this is two");
    })
/*------------测试异步执行------------*/

gulp.task('minihtml', () => {
    return gulp.src("index.html")
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('target'))
        .pipe(livereload());
})

gulp.task('testBuffer', () => {
        return fs.createReadStream('./source/a.js')  
        .pipe(source('test.js'))
        .pipe(vbuffer())                              // vinyl 2 buffer
        .pipe(rename('test.min.js'))
        .pipe(gulp.dest('./target/'))
})


gulp.task('multifile-browerifyBuildA' , (done) => {
    glob('./source/+(repeatedReferencesA.js|repeatedReferencesB.js|repeatedReferencesC.js)', (err, files) => {
        if(err) {
            console.log("tst")
            done(err);
        };
        console.log(files);
        console.log("start")
        let tasks = files.map((entry,index) => {
            return browserify({entries:[entry]})
                .transform('babelify', { presets: ["es2015"] })
                .bundle()
                .pipe(source(`entryA${index}.js`))
                .pipe(gulp.dest('./target/'))
        })
        console.log(done)
        es.merge(tasks).on('end', done);
        console.log("end")
    })
})

gulp.task('multifile-browerifyBuildB', () => {
    let entries = ['./source/repeatedReferencesA.js','./source/repeatedReferencesB.js','./source/repeatedReferencesC.js'];
    let tasks = entries.map((entry, index) => {
            return browserify({entries:[entry]})
                .transform('babelify', { presets: ["es2015"] })
                .bundle()
                .pipe(source(`entryB${index}.js`))
                .pipe(gulp.dest('./target/'))
    })
    return es.merge.apply(null, tasks);
})

gulp.task('multifile-browerifyBuildC', (done) => {
    gulp.src("./source/+(repeatedReferencesA.js|repeatedReferencesB.js|repeatedReferencesC.js)", (err, files) => {
        if (err) {
            done(err)
        }
        files.forEach((entry, index) => {
            return browserify({entries:[entry]})
                .transform('babelify', { presets: ["es2015"] })
                .bundle()
                .pipe(source(`entryC${index}.js`))
                .pipe(gulp.dest('./target/'))
        })
    })
})

/*
    使用watchify能够加快编译速度
 */

let browserify_watchify = watchify(browserify(assign({}, watchify.args, { 
            entries: './source/simulation/serverA/serverA.js',
            debug: true
        })));

let bundleFn = function() {
    return browserify_watchify
            .external(["_jquery"])
            .transform('babelify', { presets: ["es2015"] })
            .bundle()
            .on('error', function(err) {
                console.log(err.toString());
                this.emit('end');
            })
            .pipe(source('serverA.js'))
            .pipe(gulp.dest('./target/'))
            .pipe(rename({ suffix: '.min' }))        
            .pipe(buffer())
            .pipe(envify(environment))
            // .pipe(stripDebug())
            .pipe(sourcemaps.init({loadMaps: true}))  // 设置map
            .pipe(sourcemaps.identityMap())
            .pipe(uglify())
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest('./target/'))
            .pipe(livereload());    
}

browserify_watchify.on('update', () => {
    livereload.listen();
    bundleFn();
}); // 当任何依赖发生改变的时候，运行打包工具

browserify_watchify.on('log', gutil.log); 

gulp.task('', () => {
    
})

gulp.task('simulation-server', () => {
    return browserify({ 
                entries: './source/simulation/serverA/serverA.js',
                debug: true
            })
            .external(["../lib/_jquery"])
            .transform('babelify', { presets: ["es2015"] })
            .bundle()
            .on('error', function(err) {
                console.log(err.toString());
                this.emit('end');
            })
            .pipe(source('serverA.js'))
            .pipe(gulp.dest('./target/'))
            .pipe(rename({ suffix: '.min' }))        
            .pipe(buffer())
            .pipe(envify(environment))
            // .pipe(stripDebug())
            .pipe(sourcemaps.init({loadMaps: true}))  // 设置map
            .pipe(sourcemaps.identityMap())
            .pipe(uglify())
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest('./target/'))
            .pipe(livereload()); 
})









