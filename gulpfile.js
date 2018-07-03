var fs = require('fs'),
    del = require('del'),
    gulp = require('gulp'),
    concat = require('gulp-concat-util'),
    uglify = require("gulp-uglify"),
    pkg = require('./package.json');

var globalInitJs = fs.readFileSync('./src/global-init.js'),
    scopeInitJs = fs.readFileSync('./src/scope-init.js'),
    scopeFinishJs = fs.readFileSync('./src/scope-finish.js'),
    headerTxt = fs.readFileSync('./header.txt'),
    scopeHeaderTxt = fs.readFileSync('./scope_header.txt'),
    scopeFooterTxt = fs.readFileSync('./scope_footer.txt'),
    bannerTxt = fs.readFileSync('./banner.txt');

var libs = [
    "!src/global-init.js",
    "!src/scope-init.js",
    "!src/scope-finish.js",

    "src/**/*.js"
];

gulp.task('clean', function () {
    return del('dist/**/*');
});

gulp.task('js', function () {
    return gulp.src(libs)
        .pipe(concat.header(bannerTxt, { pkg: pkg }))
        .pipe(concat('jquery-toad.js'))
        .pipe(concat.header(scopeInitJs))
        .pipe(concat.footer(scopeFinishJs))
        .pipe(concat.header(scopeHeaderTxt))
        .pipe(concat.footer(scopeFooterTxt))
        .pipe(concat.header(globalInitJs))
        .pipe(concat.header(headerTxt, { pkg: pkg }))
        .pipe(gulp.dest('dist'))
});

gulp.task('js-min', ['js'], function () {
    // return gulp.src(libs)
    //     .pipe(concat('jquery-toad.min.js'))
    //     .pipe(concat.header(scopeBeginTxt, {
    //         pkg: pkg
    //     }))
    //     .pipe(concat.header(initJs, {
    //         pkg: pkg
    //     }))
    //     .pipe(concat.footer(scopeEndTxt, {
    //         pkg: pkg
    //     }))
    //     .pipe(uglify())
    //     .pipe(concat.header(headerTxt, {
    //         pkg: pkg
    //     }))
    //     .pipe(gulp.dest('dist'))
});

gulp.task('dist', ['js', 'js-min'])
