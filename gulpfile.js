const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concatCss = require('gulp-concat-css'),
    minifyCss = require('gulp-minify-css'),
    expect = require('gulp-expect-file'),
    replace = require('gulp-replace');

// Styles config

let mainScssFile = 'dev-assets/scss/app.scss';

// let vendorCssFiles = [
//     'node_modules/normalize.css/normalize.css'
// ];

// Files used to compile

let separatedCssFiles = [
    // 'assets/css/styles-vendor.css',
    'assets/css/styles-custom.css'
];

// Cache busters

// Changes only <img> tags in the HTML files

gulp.task('cache-html', () => {
    var timestamp = new Date().getTime();

    return gulp.src('./*.html')
        .pipe(replace(/t=\d+/g, function() { return "t=" + timestamp; }))
        .pipe(gulp.dest("./"));
});

// Changes only <link> (for CSS) and <script> (for JS) tags in the HTML files

gulp.task('cache-assets', () => {
    var timestamp = new Date().getTime();

    return gulp.src('./*.html')
        .pipe(replace(/ta=\d+/g, function() { return "ta=" + timestamp; }))
        .pipe(gulp.dest("./"));
});

// Styles

gulp.task('styles-custom', () => {
    return gulp.src(mainScssFile)
        .pipe(expect(mainScssFile))
        .pipe(sass())
        .pipe(concatCss('styles-custom.css'))
        .pipe(autoprefixer({ overrideBrowserslist: ['> 0.5%', 'last 2 versions', 'ie 8'], cascade: false }))
        .pipe(gulp.dest('assets/css/'));
});

// gulp.task('styles-vendor', gulp.series('styles-custom', () => {
//     return gulp.src(vendorCssFiles)
//         .pipe(expect(vendorCssFiles))
//         .pipe(concatCss('styles-vendor.css'))
//         .pipe(autoprefixer({ overrideBrowserslist: ['> 0.5%', 'last 2 versions', 'ie 8'], cascade: false }))
//         .pipe(gulp.dest('assets/css/'));
// }));

gulp.task('styles', gulp.series('styles-custom', () => {
    return gulp.src(separatedCssFiles)
        .pipe(expect(separatedCssFiles))
        .pipe(concatCss('styles.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('assets/css/'));
}));

gulp.task('watch-styles', () => {
    gulp.watch('dev-assets/scss/**/*.scss', gulp.series('styles'));
});

gulp.task('watch-everything', () => {
    gulp.watch('dev-assets/scss/**/*.scss', gulp.series('styles'));
});

// Watchers and compilers

gulp.task('watch', gulp.series('watch-everything'));
gulp.task('cache-clear', gulp.series('cache-assets', 'cache-html'));
gulp.task('default', gulp.series('styles'));