// Requiring Gulp and dependencies
const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    minifyCSS = require('gulp-clean-css'),
    minifyHTML = require('gulp-htmlmin'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    copy = require('gulp-copy')

// Styles
gulp.task('sass', function() {
  return gulp.src('src/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .pipe(gulp.dest('docs'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// HTML
gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(minifyHTML({collapseWhitespace: true}))
        .pipe(gulp.dest('docs'))
  });

// Scripts
gulp.task('scripts', function () {
    return gulp.src('src/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('docs'))
    
});
  
/* Clean Files */
gulp.task('clean', function(){
	return del.sync(['docs']);
})

// Copy assets over
gulp.task('copy', function(){
    return gulp.src('src/assets/*.jpg')
        .pipe(copy('docs/assets', {prefix: 2}))
})

/* Clean files before starting styles/scripts/html */
gulp.task('browser-sync', ['clean', 'sass', 'html', 'scripts', 'copy'], function() {
    browserSync.init({
		server: './docs'
	});
})

/*
Run Browser-sync and 
Watch Files
Reload browersync when html files change 
*/ 
gulp.task('serve', ['browser-sync'], function(){
    gulp.watch('src/*.scss', ['sass']);
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/*.js', ['scripts']);
    gulp.watch(['docs/*.js', 'docs/*.html']).on('change', browserSync.reload)
});

gulp.task('default', ['serve']);