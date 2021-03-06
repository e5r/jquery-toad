var fs = require('fs'),
    del = require('del'),
    gulp = require('gulp'),
    concat = require('gulp-concat-util'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    pug = require('gulp-pug'),
    serve = require('gulp-serve'),
    qunit = require('gulp-qunit'),
    exec = require('child_process').exec,

    pkg = require('./package.json'),

    umdJs = fs.readFileSync('./src/umd.js'),
    scopeInitJs = fs.readFileSync('./src/scope-init.js'),
    scopeFinishJs = fs.readFileSync('./src/scope-finish.js'),
    headerTxt = fs.readFileSync('./header.txt'),
    umdHeaderTxt = fs.readFileSync('./umd_header.js.txt'),
    umdFactoryTxt = fs.readFileSync('./umd_factory.js.txt'),
    umdFooterTxt = fs.readFileSync('./umd_footer.js.txt'),
    bannerTxt = fs.readFileSync('./banner.txt'),

    libs = [
        "!src/umd.js",
        "!src/scope-init.js",
        "!src/scope-finish.js",

        "src/**/*.js"
    ];

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
        .pipe(concat.header(scopeInitJs, { pkg: pkg }))
        .pipe(concat.footer(scopeFinishJs))
        .pipe(concat.header(umdFactoryTxt))
        .pipe(concat.footer(umdFooterTxt))
        .pipe(concat.header(umdJs, { pkg: pkg }))
        .pipe(concat.header(umdHeaderTxt))
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
    return gulp.src('website/assets/**/*.{jpg,png,gif,css}')
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
                title: 'jQuery TOAD'
            }
        }))
        .pipe(gulp.dest('docs'))
})

gulp.task('test:unit', ['build:js'], function (cb) {
    exec('npx qunit "test/unit/**/*-spec.js"', function (err, stdout, stderr) {
        console.log(stdout);
        if (err)
            console.log(stderr);
        cb(err);
    });
})

gulp.task('test:e2e', ['build:js'], function () {
    return gulp.src('./test/e2e/test-runner.html')
        .pipe(qunit());
});

gulp.task('serve', ['build:website'], serve('docs/'));
gulp.task('dist', ['build:js-version', 'build:js-min-version', 'build:website']);
gulp.task('test', ['test:unit', 'test:e2e']);
gulp.task('default', ['dist']);
