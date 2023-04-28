// gulpfile.js
const gulp = require('gulp');
// css
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const clean = require('gulp-clean-css');
// js
const uglify = require('gulp-uglify');
// ts
const ts = require("gulp-typescript");
// concat
const concat = require('gulp-concat');
// clean
const fs = require('fs');

// 压缩 css
gulp.task('css', () => {
    return gulp.src('./src/**/*.css')
        .pipe(postcss(
            [
                postcssImport,
                autoprefixer,
                tailwindcss
            ]
        ))
        .pipe(clean())
        .pipe(concat('miryth.min.css'))
        .pipe(gulp.dest('.'));
});

// 编译 ts
gulp.task("typescript", () => {
    return gulp.src("./src/**/*.ts")
        .pipe(ts({
            noImplicitAny: true
        }))
        .js
        .pipe(gulp.dest('./build'));
});

// 压缩 js
gulp.task('javascript', () => {
    return gulp.src('./build/**/*.js')
        .pipe(uglify())
        .pipe(concat('miryth.min.js'))
        .pipe(gulp.dest('.'));
});

gulp.task('clean', done => {
    if (fs.existsSync('./build')) fs.rmSync('./build', { recursive: true });
    if (fs.existsSync('./miryth.min.css')) fs.unlinkSync('./miryth.min.css');
    if (fs.existsSync('./miryth.min.js')) fs.unlinkSync('./miryth.min.js');
    done();
});

gulp.task('after', done => {
    if (fs.existsSync('./build')) fs.rmSync('./build', { recursive: true });
    done();
});

// 先编译 css 然后压缩 js / ts 和 css 最后打包成单个文件
gulp.task('build', gulp.series('clean', 'css', 'typescript', 'javascript', 'after'));