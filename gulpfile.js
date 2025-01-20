import gulp from 'gulp';
import sass from 'gulp-sass';
import terser from 'gulp-terser';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import dartSass from 'sass';

const sassCompiler = sass(dartSass);

const paths = {
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

const server = browserSync.create();

export function styles() {
    return gulp
        .src(paths.styles.src)
        .pipe(sassCompiler().on('error', sassCompiler.logError))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(server.stream()); // Atualiza o navegador
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

// Tarefa para iniciar o BrowserSync
export function serve() {
    browserSync.init({
        server: {
            baseDir: './dist', // Define a pasta base do servidor
        },
        port: 3000, // Define a porta do servidor
    });

    // Observar alterações nos arquivos
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.html.src, html);
}

// Exportar tarefas
// refact to type module
// exports.styles = styles;
// exports.scripts = scripts;
// exports.html = html;
// exports.default = gulp.series(gulp.parallel(styles, scripts, html), serve);
// exports.serve = gulp.series(gulp.parallel(styles, scripts, html), serve); // Executa o servidor com as tarefas
const build = gulp.series(gulp.parallel(styles, scripts, html), serve);
export default build;
