// todo 代码静态检查
//      增量

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
import multiEntry from 'rollup-plugin-multi-entry'// rollup 多入口
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

// solve MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 end listeners added. Use emitter.setMaxListeners() to increase l imit
events.EventEmitter.defaultMaxListeners = 0;

let Readable = stream.Readable;
let assign = lodash.assign;
let buildArr = ['./source/exportfile.js', './source/importfile.js'];
// let buildArr = ['./source/repeatedReferencesA.js', './source/repeatedReferencesB.js', './source/repeatedReferencesC.js'];
let environment = {
  _: 'purge',
  NODE_ENV: 'development'
};

process.env.NODE_ENV = 'development';


let browsersync = browserSync.create();
let reloadPage = browsersync.reload;

let basePath = './sourcecode';
let libArr = [basePath + '/lib/jquery/jquery-2.2.3.js'
             ,basePath + '/lib/jquery-ui-1.12.1.custom/jquery-ui.js' 
             ,basePath + '/lib/underscore/underscore.js'
             ,basePath + '/lib/globalTest.js'
             ,basePath + '/lib/sizeof.js'
            ];
let externalArr = libArr;
let reg = new RegExp(util.escapeStringRegexp(basePath + "/"), 'g');
let projectDoc = basePath + '/!(js|lib|package.json|node_modules|extern)';

/*------------普通的使用browerfy的例子------------*/
  gulp.task("browerifyBuild", () => {
    return watchify(browserify(assign({}, watchify.args, {
        entries: buildArr,
        debug: true
      })))
      .transform('babelify', { presets: ["es2015"], plugins: ["transform-runtime"] })
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
      // .pipe(stripDebug())
      .pipe(sourcemaps.init({ loadMaps: true })) // 设置map
      .pipe(sourcemaps.identityMap())
      .pipe(uglify())
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest('./target/'));
  })

  gulp.task("browerifyBuildWatch", ["browerifyBuild"], () => {
    livereload.listen();
    gulp.watch('./source/*.js', ['browerifyBuild']);
  })
/*------------普通的使用browerfy的例子------------*/

/*------------使用babel直接将es转换为amd------------*/
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
/*------------使用babel直接将es转换为amd------------*/

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


/*------------多文件处理------------*/
  gulp.task('multifile-browerifyBuildA', (done) => {
    glob('./source/+(repeatedReferencesA.js|repeatedReferencesB.js|repeatedReferencesC.js)', (err, files) => {
      if (err) {
        console.log("tst")
        done(err);
      };
      console.log(files);
      console.log("start")
      let tasks = files.map((entry, index) => {
        return browserify({ entries: [entry] })
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
    let entries = ['./source/repeatedReferencesA.js', './source/repeatedReferencesB.js', './source/repeatedReferencesC.js'];
    let tasks = entries.map((entry, index) => {
      return browserify({ entries: [entry] })
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
          return browserify({ entries: [entry] })
            .transform('babelify', { presets: ["es2015"] })
            .bundle()
            .pipe(source(`entryC${index}.js`))
            .pipe(gulp.dest('./target/'))
        })
      })
    })
/*------------多文件处理------------*/

/*------------使用watchify加快编译速度------------*/
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
      .pipe(sourcemaps.init({ loadMaps: true })) // 设置map
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

  gulp.task('make-fast', bundleFn);
/*------------使用watchify加快编译速度------------*/

/*------------公共模块排除打包------------*/
  gulp.task('external-lib', () => {
    return browserify({
        entries: ['./source/simulation/serverA/serverA.js', './source/simulation/common/util.js'],
        debug: true
      })
      .external(["../lib/_jquery"])
      .transform('babelify', { presets: ["es2015"], plugins: ["transform-runtime"] })
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
      .pipe(sourcemaps.init({ loadMaps: true })) // 设置map
      .pipe(sourcemaps.identityMap())
      .pipe(uglify())
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest('./target/'))
      .pipe(browsersync.stream())

  })


  gulp.task('browserify-lib', (done) => {
      glob('./source/simulation/lib/*.js', (err, files) => {
        if (err) {
          console.log("tst")
          done(err);
        };
        let task = browserify({
            entries: files,
            debug: true
          })
          .transform('babelify', { presets: ["es2015"], plugins: ["transform-runtime"] })
          .bundle()
          .on('error', function(err) {
            console.log(err.toString());
            this.emit('end');
          })
          .pipe(source('lib.js'))
          .pipe(gulp.dest('./target/'))
          .pipe(rename({ suffix: '.min' }))
          .pipe(buffer())
          .pipe(envify(environment))
          .pipe(stripDebug())
          .pipe(sourcemaps.init({ loadMaps: true })) // 设置map
          .pipe(sourcemaps.identityMap())
          .pipe(uglify())
          .pipe(sourcemaps.write('./maps'))
          .pipe(gulp.dest('./target/'))
          .pipe(browsersync.stream())
        return es.merge(task).on('end', done);
      })
  })
/*------------公共模块排除打包------------*/

/*------------使用browsersync自动更新------------*/
  gulp.task('browser-sync', () => {
    browsersync.init({
      server: {
        baseDir: "./"
      }
      ,open: false
      ,host:'127.0.0.1'
      // ,proxy:'127.0.0.1:3000'
    })
  })

  gulp.task('watch-gulpfile-modify', ['browser-sync', 'browserify-lib', 'external-lib'], () => {
      gulp.watch('./source/simulation/lib/*.js', ['browserify-lib']);
      // gulp.watch('./gulpfile.babel.js', ['stylu-compile']);
      // gulp.watch('./gulpfile.babel.js', ['browserify-lib', 'external-lib', 'stylu-compile']);
      gulp.watch('./source/simulation/common/*.js', ['external-lib']);
      gulp.watch('./source/simulation/serverA/*.js', ['external-lib']);
      gulp.watch('./source/simulation/viewA.html').on('change', reloadPage);
      gulp.watch('./source/simulation/css/*.styl', ['stylu-compile']);
  })
/*------------使用browsersync自动更新------------*/

/*------------stylu compile------------*/
  gulp.task('stylu-compile', () => {
      return gulp.src('./source/simulation/css/*.styl')
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(stylus())
        // .pipe(stylus({compress:false}))
        .pipe(autoprefixer())
        .pipe(concat('dest.min.css'))
        .pipe(cleancss())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./target/'))
        .pipe(browsersync.stream())
    })
/*------------stylu compile------------*/

/*------------rollup------------*/
  gulp.task('rollup-bundle', (done) => {
    return rollup.rollup({
      entry: './source/simulation/serverA/serverA.js'
      ,plugins:[
        rollupbabel({
          presets: [
            [
              "es2015", {
                "modules": false
              }
            ]
          ],
          babelrc: false,
          exclude: 'node_modules/**'
        })      
      ]      
    }).then((bundle) => {
        let result = bundle.generate({
          format:'iife'
          ,moduleName:'iife'
        });
        let s = util.str2stream(result.code)
        s.pipe(source('tst.js'))
        .pipe(buffer())       
        // .pipe(uglify())
        .on('error', (err) => {
          console.log(err.toString());
        })
        .pipe(gulp.dest('./source/'));
    });
  })

  gulp.task('jquery-rollup', () => {
    return rollup.rollup({
      entry: './source/simulation/serverA/serverA.js'
      // ,external:[
      //   path.resolve('./source/simulation/lib/_jquery.js') 
      // ]
      ,plugins:[
        rollupCommonjs({
          namedExports:{
            './source/simulation/lib/jquery-2.2.3.js':['jquery']
          }
        })
      ]
    }).then((bundle) => {
      bundle.write({
        format: 'cjs'
        // ,moduleName: 'amd'
        ,dest: './target/cjs.js'
      }).then(function(){

      })
    });
  })
/*------------rollup------------*/

/*------------测试task执行顺序------------*/
  gulp.task('taskA', () => {
    console.log('taskA start');
    var time = parseInt(2000) + new Date().getTime();
    while (new Date().getTime() < time) {

    }
    console.log('taskA end');
  })

  gulp.task('taskB', () => {
    console.log('this is taskB');
  })

  gulp.task('taskAll', ['taskA', 'taskB'], () => {

  })
/*------------测试task执行顺序------------*/

/*------------删除创建文件------------*/
  gulp.task('creat-doc', () => {
    return gulp.src('../../sourcecode/*.html', (err, files) => {
      if (files.length !== 0) {
        files.forEach((file, index) => {
          let name = file.replace(/(D:\/git\/github\/myTestRepository\/front\/sourcecode\/|.html)/g, '')
          gulp.src(file)
            .pipe(gulp.dest(`../../sourcecode/${name}/src/`))
            .pipe(gulp.dest(`../../sourcecode/${name}/build/`))
          del(file, { force: true });
        })
      }
    })
  })


  gulp.task('create-project-js', () => {
    glob(projectDoc, (err, files) => {
      files.forEach((file, index) => {
        // gulp.src(file + "/*.js", (err, f) => {
        // })
        let name = file.replace(/..\/..\/sourcecode\//g, '');
        del(file + '/src/' + name + '.js', { force: true });
        gulp.src(file + '/src/*.html')
          .pipe(rename(name + '.js'))
          .pipe(replace(/<!DOCTYPE html>[\n\r\s]<html lang="en">/g, "import * as util from '../../js/common/util'"))
          // .pipe(replace(/<head>[.\n\r]*<\/head>|<body>*<\/body>/g, ''))
          // .pipe(replace(/[\n\r\s]/g, ''))
          // .pipe(replace(/<head>.*<\/head>/g, ''))
          .pipe(replace(/<head>[\n\r\s\S\w\W\d\D.]*<\/head>|<body>[\n\r\s\S\w\W\d\D.]*<\/body>|<\/html>/g, ''))
          .pipe(gulp.dest(file + '/src/'))
      })
    })

    // gulp.src('../../sourcecode/!(js|lib|package.json|node_modules)/src/*.js', (err, files) => {
    //     files.forEach((file, index) => {
    //         gulp.src(file)
    //         .pipe(replace('<!DOCTYPE html>', "import * as util from '../../js/common/util'"))
    //         .pipe(gulp.dest(file))
    //     })
    // })
    return 0;
  })
/*------------删除创建文件------------*/


/*------------重写文件------------*/
  gulp.task('create-tmp', () => {
    let md5message = md5(new Date());
    return new Promise((resolve) => {
      glob(projectDoc, (err, files) => {
        files.forEach((file, index) => {
          let name = file.replace(reg, '')
            ,vp = vinylPaths()
            ,regex = new RegExp(`<script src='./${name}.js([\\n\\r\\s\\S\\w\\W\\d\\D.]*|\\s)'></script>`, 'g');
          gulp.src(file + '/src/' + name + '.html')
            .pipe(vp)
            .pipe(rename(name + '.tmp.html'))
            .pipe(replace(regex, `<script src='./${name}.js?${md5message}'></script>`))
            .pipe(gulp.dest(file + '/src/'))
            .on('end', () => {
              del(vp.paths, { force: true }).then(resolve);
            })
        })
      })
    })
  })

  gulp.task('write-file', ['create-tmp'], () => {
    return new Promise((resolve) => {
      glob(projectDoc, (err, files) => {
        files.forEach((file, index) => {
          let name = file.replace(reg, '');
          let vp = vinylPaths();
          gulp.src(file + '/src/' + name + '.tmp.html')
            .pipe(vp)
            .pipe(rename(name + '.html'))
            .pipe(gulp.dest(file + '/src/'))
            .on('end', () => {
              del(vp.paths, { force: true }).then(resolve);
            })
        })
      })      
    })
  })

  gulp.task('delete-html', () => {
      let vp = vinylPaths();
      return gulp.src(basePath + '/*/src/*.html')
        .pipe(vp)
        .on('end', () => {
          del(vp.paths, { force: true })
      })      
  })

  gulp.task('recover', ['delete-html'], () => {
    glob(projectDoc, (err, files) => {
      files.forEach((file, index) => {
        let name = file.replace(/..\/..\/sourcecode\//g, '');
        gulp.src(file + '/build/' + name + '.html')
          .pipe(gulp.dest(file + '/src/'))
      })
    })
  })
/*------------重写文件------------*/

/*------------publish------------*/
  gulp.task('get-extern-lst', (done) => {
    return new Promise((resolve) => {
      glob(basePath + '/js/!(other)/*.js').on('end', (files) => {
        externalArr =externalArr.concat(files);
        resolve();
      })
    })
  })

  gulp.task('clear-build', () => {
    let vp = vinylPaths();
      return gulp.src(projectDoc + '/build/*')
      .pipe(vp)
      .on('end', () => {
        vp.paths.forEach((path) => {
          console.log(path);
        })
        del(vp.paths, {force:true})
      })
  })

  gulp.task('compressHtml', (done) => {
    return new Promise((resolve, reject) => {
      glob(projectDoc, (err, files) => {
        let taskLst = files.map((file, index) => {
          return gulp.src(file + '/src/*.html')
              .pipe(htmlmin({minifyCSS:true, collapseWhitespace:true, minifyJS:true, removeComments:false})) 
              .on('error', (error) => {
                console.log(this);
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
    return gulp.src(libArr, (err, files) => {
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

  gulp.task('processBusinessJS', ['get-extern-lst'], (done) => {
    glob(projectDoc, (err, projectFiles)  => {
      projectFiles.forEach((projectFile, index) => {
        let name = projectFile.replace(reg, '');
        glob(projectFile + '/src/*.js', (err, files) => {
          browserify({
                entries: files,
                debug: true
              })
            .external(externalArr)
            .transform('babelify', { presets: ["es2015"], plugins: ["transform-runtime"] })
            .bundle()
            .on('error', function(err) {
              console.log(err.toString());
              this.emit('end');
            })
            .pipe(source(name + '.js'))
            .pipe(buffer())
            .pipe(envify(environment))
            .pipe(sourcemaps.init({ loadMaps: true })) // 设置map
            .pipe(sourcemaps.identityMap())
            // .pipe(uglify())
            .pipe(sourcemaps.write('./maps'))         // map居然是以dest的输出目录作为根目录
            .pipe(gulp.dest(projectFile + '/build'))                    
        })
      })
    })      
  })

  gulp.task('processWithRollup', (done) => {
    return new Promise((resolve, reject) => {
      // glob(basePath + '/test', (err, projectFiles)  => {  
      glob(projectDoc, (err, projectFiles)  => {   
        let tasks = projectFiles.map((projectFile, index) => {
          let name = projectFile.replace(reg, '');
          return rollup.rollup({
              entry: projectFile + '/src/*.js'
              ,plugins:[
                multiEntry()

                // 用于将nodejs的模块转换到浏览器端使用
                // ,rollupGlobals()
                // ,rollupBuiltins()

                ,rollupNodeResolve({
                  jsnext: true
                  ,main: true
                  ,browser: true
                })             
                ,rollupCommonjs({
                  include:['sourcecode/lib/**'
                  // , 'node_modules/**'
                  ],
                  sourceMap:true,
                  nameExports:{
                    jquery:['jQuery']
                    ,underscore:['_']
                    // ,'sourcecode/lib/commonjsTest.js':['named']
                    // ,'sourcecode/lib/sizeof/index.js':['sizeof']
                  }
                }) 
                // ,rollupbabel({
                //   presets: [
                //     [
                //       "es2015", {
                //         "modules": false
                //       }
                      
                //     ]
                //     ,"stage-3"
                //  ],
                //   plugins: ["transform-regenerator"],
                //   babelrc: false,
                //   exclude: 'node_modules/**'
                // })  
                ,function(){
                  if (process.env.NODE_ENV === 'production') {
                    rollupUglify({}, minify);     
                  } else {
                    return 1;
                  }
                }()    
              ]
              // ,external:['jquery', 'underscore']
              ,external:['jquery', 'underscore']
            }).then((bundle) => {  

              return bundle.generate({
                format:'iife'
                ,sourceMap:true
                ,sourceMapFile:projectFile + '/build/' + name + '.js'
                ,moduleName:name
                ,globals: {
                  jquery: 'jQuery'
                  ,underscore:'_'
                  // ,namedTest:'named'
                }
              });

              /*------------map没有找到解决方案------------*/
                // return bundle.generate({
                //   format:'iife'
                //   ,moduleName:name
                //   ,sourceMap:true
                //   ,globals: {
                //     jquery: 'jQuery'
                //     ,underscore:'_'
                //   }
                // });            
              /*------------map没有找到解决方案------------*/

            }).then((gen) => {

              /*------------map没有找到解决方案------------*/
                // str2stream(gen.code)
                // .pipe(source(name + '.js'))
                // .pipe(buffer())
                // .pipe(envify(environment))
                // .pipe(sourcemaps.init({ loadMaps: true })) // 设置map
                // .pipe(sourcemaps.identityMap())
                // .pipe(uglify())
                // .on('error', (err) => {
                //   console.log(err);
                // })
                // .pipe(sourcemaps.write('./'))         // map居然是以dest的输出目录作为根目录
                // .pipe(gulp.dest(projectFile + '/build'))                
              /*------------map没有找到解决方案------------*/

              fs.writeFileSync(projectFile + '/build/' + name + '.js.map', gen.map.toString())
              fs.writeFileSync(projectFile + '/build/' + name + '.js', gen.code + '\n//# sourceMappingURL=./' + name + '.js.map');              
            })
            .catch((err) => {
              console.log(err);
            });
        });
        Promise.all(tasks).then(() => {
          resolve(done);
        }).catch(reject);
      })       
    })
  })

  gulp.task('replace-hash', ['processWithRollup'], (done) => {
    if (process.env.NODE_ENV === 'production') {
      let md5message = md5(new Date());
      glob(projectDoc, (err, files) => {
        let tasks = files.map((file, index) => {
            let name = file.replace(reg, '')
            ,vp = vinylPaths()
            ,regex = new RegExp(`<script src='./${name}.js([\\n\\r\\s\\S\\w\\W\\d\\D.]*|\\s)'></script>`, 'g');
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
    gulp.watch(libArr, ['cmopressLib']);
    gulp.watch(basePath + '/js/common/*.js', ['replace-hash']);
    gulp.watch(basePath + '/js/module/*.js', ['replace-hash']);
    gulp.watch(projectDoc + '/src/*.js', ['replace-hash']);
    gulp.watch(projectDoc + '/src/*.html', ['compressHtml']);
  })
/*------------publish------------*/

/*------------test4eventStream------------*/
  gulp.task('test4eventStream', (done) => {
    return gulp.src('./source/test.txt')
              .pipe(es.split)
              .pipe(es.forEach((data, cb) => {
                console.log(data)
              }))
              .on('error', (error) => {
                console.log(error);
              })
  })
/*------------test4eventStream------------*/

/*------------stream and buffer------------*/
  gulp.task('nodejsstream2vstream', (done) => {
    return fs.createReadStream('./source/underscore.js')
          .pipe(source('underscore_test.js'))
          .pipe(buffer())
          .pipe(uglify())
          .on('error', (err) => {
            console.log(err.toString());
          })
          .pipe(gulp.dest('./source/'))
 
    // pump(
    //   fs.createReadStream('./source/underscore.js.js')
    //   ,source()
    //   ,buffer()
    //   ,uglify()
    //   ,function(err) {
    //     console.log("=================================")
    //     console.log(err);
    //   })
  })
/*------------stream and buffer------------*/

/*------------rollup typescript------------*/
  gulp.task('rollup-typescript', (done) => {
    return new Promise((resolve, reject) => {
      rollup.rollup({
        entry:'./sourcecode/extern/tytest/src/tytest.ts'
        ,plugins:[
          rollupTypescript()
        ]
      }).then((bundle) => {
        bundle.write({
          format:'iife'
          ,moduleName:'test'
          ,dest:'./sourcecode/extern/tytest/build/tytest.js'
        })
      }).catch((error) => {
        console.log(error);
      });
      resolve(done);
    })
  })
/*------------rollup typescript------------*/


