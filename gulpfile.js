import gulp from 'gulp';
import sass from 'gulp-sass';
import terser from 'gulp-terser';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import dartSass from 'sass';
import image from 'gulp-image';
import env from 'gulp-env';
import replace from 'gulp-replace';

const sassCompiler = sass(dartSass);

const paths = {
    images: {
        src: 'src/assets/images/**/*.{jpg,jpeg,png,gif,svg}',
        dest: 'dist/assets/images',
    },
    styles: {
        src: ['src/assets/styles/**/*.scss', '!dist/**/*'],
        dest: 'dist/styles/',
    },
    scripts: {
        src: ['src/**/*.js', '!dist/**/*'],
        dest: 'dist/js/',
    },
    html: {
        src: ['src/**/*.html', '!dist/**/*'],
        dest: 'dist/',
    },
};

export function setEnv(done) {
    env({
        vars: {
            API_URL: 'http://localhost:8080/',
        },
    });
    done();
}

export function styles() {
    return gulp
        .src(paths.styles.src)
        .pipe(sassCompiler().on('error', sassCompiler.logError))
        .pipe(gulp.dest(paths.styles.dest));
}

export function scripts() {
    return gulp
        .src(paths.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(replace('process.env.API_URL', `'${process.env.API_URL}'`))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scripts.dest));
}

export function html() {
    return gulp.src(paths.html.src).pipe(gulp.dest(paths.html.dest));
}

export function images() {
    return gulp
        .src(paths.images.src)
        .pipe(image())
        .pipe(gulp.dest(paths.images.dest));
}

export function serve(done) {
    const server = browserSync.create();
    server.init({
        server: {
            baseDir: './dist',
        },
        port: 3000,
    });

    gulp.watch(paths.styles.src, styles).on('change', server.reload);
    gulp.watch(paths.scripts.src, scripts).on('change', server.reload);
    gulp.watch(paths.images.src, images).on('change', server.reload);
    gulp.watch(paths.html.src, html).on('change', server.reload);

    done();
}

const build = gulp.series(
    setEnv,
    gulp.parallel(styles, scripts, html, images),
    serve
);

export default build;
