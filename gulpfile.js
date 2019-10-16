const gulp = require('gulp');
const gulpLess = require('gulp-less');
const removeFiles = require('gulp-remove-files');
const gulpBabel = require('gulp-babel');
const connect = require('gulp-connect');


gulp.task('connect', done => {
	connect.server({
    root: ['src'],
    port: 8000,
    livereload: true
	})
	done();
})
gulp.task('babel', done => {
	gulp.src('./src/js/*')
		.pipe(gulpBabel({
			presets: ['@babel/preset-env']
		}))
		.pipe(gulp.dest('./src/dist'))
		done();
})

gulp.task('clear', done => {
	gulp.src('./src/dist//**/*')
		.pipe(removeFiles());
		done();
})

gulp.task('styles', done => {
	gulp.src('./src/css//**/*.less')
	.pipe(gulpLess())
	.pipe(gulp.dest('./src/dist/css'));
	done();
})

gulp.task('watch', () => {
	gulp.watch('./src/css/main/main.less', gulp.series('styles'));
	gulp.watch('./src/css/style/style.less', gulp.series('styles'));
	gulp.watch('./src/js/script.js', gulp.series('scripts'));
})
gulp.task('default', gulp.series('connect', 'clear', 'styles', 'babel'));