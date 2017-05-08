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

// let buildArr = ['./source/exportfile.js', './source/importfile.js'];
let buildArr = ['./source/repeatedReferencesA.js', './source/repeatedReferencesB.js', './source/repeatedReferencesC.js'];

gulp.task("browerifyBuild", () => {
    return browserify({ entries: buildArr, debug: true })
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
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.identityMap())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./target/'))
        .pipe(livereload());
})

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




