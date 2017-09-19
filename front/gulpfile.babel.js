/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-09-10 17:30:23
 * @version $Id$
 */

import "babel-polyfill";
import gulp from 'gulp'
import babel from 'gulp-babel'
import browserify from 'browserify'
import babelify from 'babelify'
import source from 'vinyl-source-stream' // 用与stream转换为vinyl-stream
import vbuffer from 'vinyl-buffer' // 将vinyl-stream 转换为 buffer
import buffer from 'gulp-buffer' // 用途同上 stream buffer转换就用上面两个
import streamify from 'gulp-streamify' // 用途不明
import uglify from 'gulp-uglify'
import sourcemaps from 'gulp-sourcemaps'
import livereload from 'gulp-livereload'
import htmlmin from 'gulp-htmlmin'
import rename from 'gulp-rename'
import fs from 'fs'
import envify from 'gulp-envify' // 相当于c里的debug宏，可以设置只在debug中出现的代码，例如打印
import stripDebug from 'gulp-strip-debug'
import glob from 'glob'
import es from 'event-stream'
import watchify from 'watchify'
import gutil from 'gulp-util'
import lodash from 'lodash'
import browserSync from 'browser-sync'
import notify from 'gulp-notify'
import autoprefixer from 'gulp-autoprefixer'
import stylus from 'gulp-stylus'
import cleancss from 'gulp-clean-css'
import concat from 'gulp-concat'
import * as rollup from 'rollup'
import del from 'del'
import vinylPaths from 'vinyl-paths'
import revertPath from 'gulp-revert-path' // 用于还原流中的路径 
import replace from 'gulp-replace' // 模板替换 
import sequence from 'gulp-sequence' // 串行，并行，任务的顺序，执行。
import events from 'events'
import rollupbabel from 'rollup-plugin-babel'
import multiEntry from 'rollup-plugin-multi-entry' // rollup 多入口
import path from 'path'
import rollupCommonjs from 'rollup-plugin-commonjs'
import rollupNodeResolve from 'rollup-plugin-node-resolve'
import rollupAnalyzer from 'rollup-analyzer'
import rollupTypescript from 'rollup-plugin-typescript'
import rollupUglify from 'rollup-plugin-uglify'
import rollupJson from 'rollup-plugin-json';
import rollupBuiltins from 'rollup-plugin-node-builtins';
import rollupGlobals from 'rollup-plugin-node-globals';
import { minify } from 'uglify-es';
import md5 from 'md5'
import pump from 'pump'
import stream from 'stream'
import * as util from './sourcecode/js/common/util.js'
import combiner from 'stream-combiner2'

// solve MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 end listeners added. Use emitter.setMaxListeners() to increase l imit
events.EventEmitter.defaultMaxListeners = 0;

let browsersync = browserSync.create();
let reloadPage = browsersync.reload;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

let isProd = process.env.NODE_ENV.trim() === 'production';
let isTest = process.env.NODE_ENV.trim() === 'test';

let basePath = './sourcecode';
let projectDoc = isTest ? basePath + '/test' : basePath + '/!(js|lib|package.json|node_modules|extern)';
let reg = new RegExp(util.escapeStringRegexp(basePath + "/"), 'g');

function getPlugs() {
  let commonPlags = [multiEntry()];
  let devPlags = [];
  let producePlags = [rollupUglify({}, minify)];
  return commonPlags.concat(isProd ? producePlags : devPlags);
}

gulp.task('clear-build', () => {
  let vp = vinylPaths();
  return gulp.src(projectDoc + '/build/*')
    .pipe(vp)
    .on('end', () => {
      vp.paths.forEach((path) => {
        console.log(path);
      })
      del(vp.paths, { force: true })
    })
})

gulp.task('browser-sync', () => {
  browsersync.init({
    server: {
      baseDir: "./"
    },
    open: false,
    host: '127.0.0.1'
  })
})

gulp.task('compressHtml', (done) => {
  return new Promise((resolve, reject) => {
    glob(projectDoc, (err, files) => {
      let taskLst = files.map((file, index) => {
        return gulp.src(file + '/src/*.html')
          .pipe(htmlmin({ minifyCSS: true, collapseWhitespace: true, minifyJS: true, removeComments: false }))
          .on("error", (err) => {
            console.log(err.toString());
            reject();
            // this.emit("end");
          })
          .pipe(gulp.dest(file + '/build/'))
      });
      es.merge(taskLst).on('end', () => {
        reloadPage();
        resolve(done);
      });
    })
  })
})

gulp.task('cmopressLib', () => {
  return gulp.src(basePath + '/lib/src/*.js', (err, files) => {
      console.log(files)
    })
    .pipe(sourcemaps.init({ loadMaps: true })) // 设置map
    .pipe(sourcemaps.identityMap())
    .pipe(concat('lib.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(basePath + '/lib/build/'))
    .pipe(browsersync.stream())
})

gulp.task('processWithRollup', (done) => {
  return new Promise((resolve, reject) => { 
      glob(projectDoc, (err, projectFiles)  => {   
      let tasks = projectFiles.map(async function(project, index) {
        let projectFile = project;
        let name = projectFile.replace(reg, '');
        const bundle = await rollup.rollup({
          entry: projectFile + '/src/*.js',
          plugins: getPlugs(),
          external: ['jquery', 'underscore']
        });

        let result = bundle.write({
          format: 'iife',
          sourceMap: true,
          dest: projectFile + '/build/' + name + '.js',
          moduleName: name,
          globals: {
            jquery: 'jQuery',
            underscore: '_',
          }              
        });

        return result
      });
      Promise.all(tasks).then(() => {
        resolve(done);
      }).catch(reject);
    })
  })
})

gulp.task('replace-hash', ['processWithRollup'], (done) => {
  if (isProd) {
    let md5message = md5(new Date());
    glob(projectDoc, (err, files) => {
      let tasks = files.map((file, index) => {
        let name = file.replace(reg, ''),
          vp = vinylPaths(),
          regex = new RegExp(`<script src='./${name}.js([\\n\\r\\s\\S\\w\\W\\d\\D.]*|\\s)'></script>`, 'g');
        return gulp.src(file + '/src/' + name + '.html')
          .pipe(vp)
          .pipe(replace(regex, `<script src='./${name}.js?${md5message}'></script>`))
          .pipe(gulp.dest(file + '/src/'))
      });
      es.merge(tasks).on('end', done);
    })
  } else {
    reloadPage();
    done();
  }
})

gulp.task('watch-compress', ['browser-sync', 'replace-hash', 'cmopressLib', 'compressHtml'], (done) => {
  gulp.watch(basePath + '/lib/src/*.js', ['cmopressLib']);
  gulp.watch(basePath + '/js/common/*.js', ['replace-hash']);
  gulp.watch(basePath + '/js/module/*.js', ['replace-hash']);
  gulp.watch(projectDoc + '/src/*.js', ['replace-hash']);
  gulp.watch(projectDoc + '/src/*.html', ['compressHtml']);
})