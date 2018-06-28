var fs = require('fs'),
    del = require('del'),
    gulp = require('gulp'),
    concat = require('gulp-concat-util'),
    uglify = require("gulp-uglify"),
    pkg = require('./package.json');

var initJs = fs.readFileSync('./src/init.js'),
    headerTxt = fs.readFileSync('./header.txt'),
    scopeBeginTxt = fs.readFileSync('./scope_begin.txt'),
    scopeEndTxt = fs.readFileSync('./scope_end.txt'),
    bannerTxt = fs.readFileSync('./banner.txt');

var libs = [
    "!src/init.js",
    "src/**/*.js"
];

gulp.task('clean', function() {
    return del('dist/**/*');
});

gulp.task('js', function() {
    return gulp.src(libs)
        .pipe(concat.header(bannerTxt, {
            pkg: pkg
        }))
        .pipe(concat('jquery-toad.js'))
        .pipe(concat.header(scopeBeginTxt, {
            pkg: pkg
        }))
        .pipe(concat.header(initJs, {
            pkg: pkg
        }))
        .pipe(concat.header(headerTxt, {
            pkg: pkg
        }))
        .pipe(concat.footer(scopeEndTxt, {
            pkg: pkg
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('js-min', function() {
    return gulp.src(libs)
        .pipe(concat('jquery-toad.min.js'))
        .pipe(concat.header(scopeBeginTxt, {
            pkg: pkg
        }))
        .pipe(concat.header(initJs, {
            pkg: pkg
        }))
        .pipe(concat.footer(scopeEndTxt, {
            pkg: pkg
        }))
        .pipe(uglify())
        .pipe(concat.header(headerTxt, {
            pkg: pkg
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('dist', ['js', 'js-min'])
