import gulp from 'gulp'
import babel from 'gulp-babel'
import browserify from 'browserify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import uglify from 'gulp-uglify'
import sourcemaps from 'gulp-sourcemaps'
import livereload from 'gulp-livereload'

// gulp.task("es6", () => {
//     return gulp.src("source/*.js")
//                .pipe(babel({presets: ['es2015']}))
//                .pipe(gulp.dest("target"));	
// })

gulp.task("browerifyBuild", () => {
    return browserify({entries:['./source/exportfile.js', './source/importfile.js'], debug:true})
    	   .transform('babelify', {presets:["es2015"]})
    	   .bundle()
    	   .pipe(source('test.js'))
    	   .pipe(buffer())
    	   .pipe(sourcemaps.init())
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
               	presets: ['es2015']}))
               .pipe(gulp.dest("target"))
               .pipe(livereload());	
})

gulp.task("watch", ['browerifyBuild', 'babelBuild'], () => {
	livereload.listen();
	gulp.watch('./source/*.js', ['browerifyBuild']);
	gulp.watch('./source/*.js', ['babelBuild']);
})

gulp.task('default', ['browerifyBuild','babelBuild', 'watch'])
