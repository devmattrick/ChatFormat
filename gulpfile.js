var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var concatCss = require('gulp-concat-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var minifyCss = require('gulp-minify-css');

gulp.task('clean', function() {
	gutil.log('Cleaning dist folder...');
    return del(['dist/css', 'dist/img']);
});
 
gulp.task('concat', ['clean'], function() {
	gutil.log('Merging CSS files and minifying...')
	return gulp.src('css/*.css')
    	.pipe(concatCss("style.min.css"))
    	.pipe(minifyCss({compatibility: 'ie8'}))
    	.pipe(gulp.dest('dist/css/'));
});

gulp.task('img-compress', ['clean'], function() {
	gutil.log('Compressing images...');
    return gulp.src('img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img/'));
});

gulp.task('default', ['concat', 'img-compress']);