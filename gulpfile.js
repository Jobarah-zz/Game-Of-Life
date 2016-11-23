const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
 
gulp.task('default', () => {
    return gulp.src('./dev/js/game_components/CommandReader.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('CommandReader.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});