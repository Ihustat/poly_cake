const {src, dest, watch, parallel} = require('gulp');

const sass          = require('gulp-sass')(require('sass'));
const cleanCSS      = require('gulp-clean-css');
const uglify        = require('gulp-uglify-es').default;
const browserSync   = require('browser-sync').create();
const autoprefixer  = require('gulp-autoprefixer');
const htmlmin       = require('gulp-htmlmin');
const rename        = require("gulp-rename"); 
const cleaner       = require("gulp-clean"); 
const avif          = require("gulp-avif"); 
const webp          = require("gulp-webp"); 
const imagemin      = require("gulp-imagemin"); 
const newer         = require("gulp-newer"); 

function images() {
    return src(['src/images/**/*.*', '!src/images/**/*.svg'])
           .pipe(newer('dist/images'))
           .pipe(avif({quality: 50}))

           .pipe(newer('dist/images'))
           .pipe(src('src/images/**/*.*'))
           .pipe(webp())

           .pipe(newer('dist/images'))
           .pipe(src('src/images/**/*.*'))
           .pipe(imagemin())
           .pipe(dest('dist/images'));
};


function styles() {
    return src('src/sass/**/*.+(scss|sass)')
           .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
           .pipe(rename({suffix: '.min', prefix: ''}))
           .pipe(autoprefixer({overriderBrowserlist: ['last 10 version']}))
           .pipe(cleanCSS({compatibility: 'ie8'}))
           .pipe(dest('dist/css'))
           .pipe(browserSync.stream());
};


function scripts() {
    return src('src/js/**/*.js')
            .pipe(uglify())
            .pipe(rename({suffix: '.min', prefix: ''}))
            .pipe(dest('dist/js'))
            .pipe(browserSync.stream());
};



function html() {
    return src("src/*.html")
           .pipe(htmlmin({ collapseWhitespace: true }))
           .pipe(dest("dist/"));
};


function fonts() {
    return src("src/fonts/**/*")
           .pipe(dest("dist/fonts"))
           .pipe(browserSync.stream());
};

function watching() {
    watch(['src/*.html'], html).on('change', browserSync.reload);
    watch(['src/fonts/**/*'], fonts);
    watch(['src/sass/**/*.+(scss|sass|css)'], styles);
    watch(['src/js/**/*.js'], scripts);
    watch(['src/images/**'], images);
};

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        }
    });
};

function clean() {
    return src('dist')
    .pipe(cleaner());
};

exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.fonts = fonts;
exports.images = images;
exports.watching = watching;
exports.browsersync = browsersync;
exports.clean = clean;

exports.default = parallel(html, fonts, styles, scripts, images, browsersync, watching);