var gulp = require('gulp');
var browsersync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer')
var pug = require('gulp-pug');



gulp.task('pug', function() {
  return gulp.src('pug/**/*.pug')
      .pipe(pug())
      .pipe(gulp.dest(''));
});

gulp.task('css', function(){
  var postcssopts = [
    autoprefixer( { overrideBrowserslist: ['last 2 versions', '>2%']} )
  ];
  return gulp.src('sass/**/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
      //outputStyle: 'compressed',
      eerLogToConsole: true
    }))
    .pipe( postcss(postcssopts))
    .pipe( sourcemaps.write())
    .pipe( gulp.dest('css'))
});



gulp.task('watch', function() {
  gulp.watch('sass/**/*', ['css']);
  gulp.watch('**/*.pug', ['pug']);
});

gulp.task('server', function() {
  browsersync.init({
    port: 8080,
    server: './'
  });
  gulp.watch('css/**/*.css').on('change', browsersync.reload);
  gulp.watch('**/*.html').on('change', browsersync.reload);
  gulp.watch('js/**/*.js').on('change', browsersync.reload);
});

gulp.task('default', ['server', 'pug', 'css', 'watch']);
