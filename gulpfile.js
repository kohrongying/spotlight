// Requiring Gulp and dependencies
const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    minifyCSS = require('gulp-clean-css'),
    minifyHTML = require('gulp-htmlmin'),
    del = require('del')

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

/* Clean Files */
gulp.task('clean', function(){
	return del(['docs/css' , 'docs']);
})

/*
Combine running server with watch files under serve task 
Clean files before starting styles/scripts/html
*/ 
gulp.task('serve', ['clean'], function(){
    gulp.start('sass');
    gulp.start('html');
	browserSync.init({
		server: 'docs'
	});
	gulp.watch('src/*.scss', ['sass']);
    gulp.watch('docs/*.html', browserSync.reload);
});

gulp.task('default', ['serve']);