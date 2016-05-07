import gulp from "gulp"
import request from "request"
import path from "path"
import fs from "fs"
import del from "del"
import jshint from "gulp-jshint"
import rename from "gulp-rename"
import imagemin from "gulp-imagemin"
import pngquant from "imagemin-pngquant"
import usemin from "gulp-usemin"
import concat from "gulp-concat"
import uglify from "gulp-uglify"
import cssnano from "gulp-cssnano"
import htmlmin from "gulp-htmlmin"
import rev from "gulp-rev"
import rsync from "gulp-rsync"
import browserSync from "browser-sync"
import browserify from "browserify"
import source from "vinyl-source-stream"
import buffer from "vinyl-buffer"


// // Copy or Rename rsync-config.json.example to rsync-config.json
// // and add your servers settings for rsync
// var config = require('./rsync-config.json');

// Start Server from src directory 
gulp.task('dev-server', () => {
    browserSync({
        server: {
            baseDir: "./src/"
        }
    });
});

// Start Server from dist directory 
gulp.task('dist-server', () => {
    browserSync({
        server: {
            baseDir: "./dist/"
        }
    });
});


//Download Phaser and Phaser.debug plugin
gulp.task('init',['get-phaser', 'get-debug']);

gulp.task('get-phaser', () => {
  request('https://raw.github.com/photonstorm/phaser/master/build/phaser.min.js').pipe(fs.createWriteStream('src/js/lib/phaser.min.js'));
  request('https://raw.github.com/photonstorm/phaser/master/build/phaser.map').pipe(fs.createWriteStream('src/js/lib/phaser.map'));
});

gulp.task('get-debug', () => {
  request('https://github.com/englercj/phaser-debug/releases/download/v1.1.0/phaser-debug.js').pipe(fs.createWriteStream('src/js/lib/phaser-debug.js'));
});

// Clear out dist directory
gulp.task('clean', (cb) => {
  del('dist/**', cb);
});

//Copy Assets
gulp.task('copy',['clean'], () => {
  gulp.src(['assets/atlas/*','assets/fonts/*', 'assets/maps/*', 'assets/audio/*', 'js/lib/phaser.*'], {cwd: './src', base: './src'})
    .pipe(gulp.dest('./dist/'));
  gulp.src('screenshots/*').pipe(gulp.dest('./dist/screenshots/'));
});

// Concatenate & Minify JS/CSS/HTML
gulp.task('build',['copy', 'imagemin'], () => {
  return gulp.src('./src/index.html')
    .pipe(usemin({
      css: [cssnano()],
      html: [htmlmin({collapseWhitespace: true})],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('transpile', () => {
  return browserify('src/js/index.js')
  .transform("babelify")
  .bundle()
  .on("error", function(error) {
    console.error( "\n/Error: ", error.message, "\n");
    this.emit("end");
    })
  .pipe(source("bundle.js"))
  .pipe(buffer())
  .pipe(gulp.dest("dist"));

});

//Compress Images
gulp.task('imagemin', () => {
  return gulp.src('src/assets/images/*.png')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/assets/images/'));
});

//Lint Task
gulp.task('lint', () => {
  return gulp.src(['gulpfile.js', 'src/js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// WatchFiles For Changes
gulp.task('watch', () => {
  gulp.watch(['src/js/**/*.js','src/index.html'], ['lint','transpile',browserSync.reload]);
});

// Deploy Source to server
gulp.task('deploy', () => {
  return gulp.src('dist')
    .pipe(rsync({
      root: 'dist',
      username:  config.rsync.username,
      hostname:  config.rsync.hostname,
      destination:  config.rsync.destination,
      recursive: true,
      clean: true,
      progress: true,
      incremental: true
    }));
});

gulp.task('default', ['dist-server', 'watch']);

