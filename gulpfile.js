var ENV_URL_BASE = 'TOAD_WEBSITE_URL_BASE';

var fs = require('fs'),
    del = require('del'),
    gulp = require('gulp'),
    concat = require('gulp-concat-util'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    pug = require('gulp-pug'),
    serve = require('gulp-serve'),
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

console.log('******', process.env[ENV_URL_BASE], '******');

var WEBSITE_URL_BASE = process.env[ENV_URL_BASE];

if (!WEBSITE_URL_BASE) {
    /* https://e5r.github.io/jquery-toad */
    WEBSITE_URL_BASE = '/jquery-toad';
}

gulp.task('clean', function () {
    return del([
        'dist/**/*',
        'docs/**/*'
    ]);
});

gulp.task('build:js', function () {
    return gulp.src(libs)
        .pipe(concat.header(bannerTxt, { pkg: pkg }))
        .pipe(concat('jquery-toad.js'))
        .pipe(concat.header(scopeInitJs))
        .pipe(concat.footer(scopeFinishJs))
        .pipe(concat.header(scopeHeaderTxt))
        .pipe(concat.footer(scopeFooterTxt))
        .pipe(concat.header(globalInitJs))
        .pipe(concat.header(headerTxt, { pkg: pkg }))
        .pipe(gulp.dest('dist'));
});

gulp.task('build:js-version', ['build:js'], function () {
    return gulp.src('dist/jquery-toad.js')
        .pipe(rename('jquery-toad-' + pkg.version + '.js'))
        .pipe(gulp.dest('dist'))
})

gulp.task('build:js-min', ['build:js'], function () {
    return gulp.src('dist/jquery-toad.js')
        .pipe(concat('jquery-toad.min.js'))
        .pipe(uglify())
        .pipe(concat.header(headerTxt, { pkg: pkg }))
        .pipe(gulp.dest('dist'))
});

gulp.task('build:js-min-version', ['build:js-min'], function () {
    return gulp.src('dist/jquery-toad.min.js')
        .pipe(rename('jquery-toad-' + pkg.version + '.min.js'))
        .pipe(gulp.dest('dist'))
})

gulp.task('build:website-assets', function () {
    return gulp.src('website/assets/**/*')
        .pipe(gulp.dest('docs'))
})

gulp.task('build:website-app', function () {
    return gulp.src('website/app/**/*.js')
        .pipe(gulp.dest('docs/app'))
})

gulp.task('build:website-samples', function () {
    return gulp.src('website/samples/**/*')
        .pipe(gulp.dest('docs/samples'))
})

gulp.task('build:website-dist', ['build:js-version', 'build:js-min-version'], function () {
    return gulp.src('dist/**/*')
        .pipe(gulp.dest('docs/lib'))
})

gulp.task('build:website', [
    'build:website-assets',
    'build:website-app',
    'build:website-samples',
    'build:website-dist'
], function () {
    return gulp.src([
        'website/**/*.pug',
        '!website/**/_*.pug'])
        .pipe(pug({
            pretty: true,
            data: {
                pkg: pkg,
                title: 'jQuery TOAD',
                urlBase: WEBSITE_URL_BASE
            }
        }))
        .pipe(gulp.dest('docs'))
})

gulp.task('serve', ['build:website'], serve('docs/'));
gulp.task('dist', ['build:js-version', 'build:js-min-version', 'build:website']);
gulp.task('default', ['dist']);
