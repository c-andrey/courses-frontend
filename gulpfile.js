const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

// Caminhos
const paths = {
    html: './src/index.html',
    sass: './src/sass/**/*.sass',
    js: './src/js/**/*.js',
    dist: './dist',
};

// Compilar SASS para CSS
function styles() {
    return gulp
        .src(paths.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(`${paths.dist}/css`))
        .pipe(browserSync.stream());
}

// Minificar e concatenar JavaScript
function scripts() {
    return gulp
        .src(paths.js)
        .pipe(concat('main.js'))
        .pipe(terser())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(`${paths.dist}/js`))
        .pipe(browserSync.stream());
}

// Copiar HTML para dist
function html() {
    return gulp
        .src(paths.html)
        .pipe(gulp.dest(paths.dist))
        .pipe(browserSync.stream());
}

// Servidor de Desenvolvimento
function serve() {
    browserSync.init({
        server: {
            baseDir: paths.dist,
        },
    });

    gulp.watch(paths.sass, styles);
    gulp.watch(paths.js, scripts);
    gulp.watch(paths.html, html).on('change', browserSync.reload);
}

// Tarefas
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.serve = gulp.series(gulp.parallel(styles, scripts, html), serve);
exports.default = gulp.series(gulp.parallel(styles, scripts, html), serve);
