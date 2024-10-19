import gulp from 'gulp';
import sass from 'gulp-sass';
import sassCompiler from 'sass'; // Import sass compiler
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

// Use the correct syntax for gulp-sass with Gulp 5
const scss = sass(sassCompiler);

// Paths to SCSS and CSS
const paths = {
  scss: './src/scss/**/*.scss', // Source of your SCSS files
  css: './src/css', // Output folder for compiled CSS
  html: './src/**/*.html', // Watch HTML for live reload
  js: './src/**/*.js' // Watch JS files for live reload
};

// Compile SCSS, autoprefix, and minify
function styles() {
  return gulp
    .src(paths.scss)
    .pipe(scss().on('error', scss.logError)) // Compile SCSS
    .pipe(postcss([autoprefixer(), cssnano()])) // Add prefixes and minify
    .pipe(gulp.dest(paths.css)); // Output to the CSS folder
}

// Watch for changes
function watch() {
  gulp.watch(paths.scss, styles); // Watch SCSS files for changes
  gulp.watch(paths.html).on('change', gulp.series(styles)); // Watch HTML files and recompile CSS if necessary
  gulp.watch(paths.js).on('change', gulp.series(styles)); // Watch JS files and recompile CSS if necessary
}

// Default task to run Gulp
export default gulp.series(styles, watch);
