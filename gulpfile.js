import gulp from 'gulp';
import sass from 'gulp-sass';
import terser from 'gulp-terser';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import dartSass from 'sass';
import image from 'gulp-image';

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

export function styles() {
    return gulp
        .src(paths.styles.src)
        .pipe(sassCompiler().on('error', sassCompiler.logError))
        .pipe(gulp.dest(paths.styles.dest));
}

// Tarefa para compilar JS com Babel e minificar
export function scripts() {
    return gulp
        .src(paths.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(terser()) // Minifica o código
        .pipe(sourcemaps.write('.')) // Grava o sourcemap no dist
        .pipe(gulp.dest(paths.scripts.dest));
}

// Copiar HTML para o diretório de saída
export function html() {
    return gulp.src(paths.html.src).pipe(gulp.dest(paths.html.dest));
}

// Tarefa para otimizar imagens
export function images() {
    return gulp
        .src(paths.images.src) // Localiza as imagens
        .pipe(image()) // Otimiza as imagens
        .pipe(gulp.dest(paths.images.dest)); // Salva no diretório de saída
}

// Tarefa para iniciar o BrowserSync
export function serve() {
    const server = browserSync.create();
    browserSync.init({
        server: {
            baseDir: './dist', // Define a pasta base do servidor
        },
        port: 3000, // Define a porta do servidor
    });

    gulp.watch(paths.styles.src, styles).on('change', server.reload);
    gulp.watch(paths.scripts.src, scripts).on('change', server.reload);
    gulp.watch(paths.images.src, images).on('change', server.reload);
    gulp.watch(paths.html.src, html).on('change', server.reload);
}

const build = gulp.series(gulp.parallel(styles, scripts, html, images), serve);
export default build;
