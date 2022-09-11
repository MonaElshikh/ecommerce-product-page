/*
npm install sass gulp-sass --save-dev 	                                >>>>>[https://www.npmjs.com/package/gulp-sass]
npm install  gulp-autoprefixer  --save-dev	                         >>>>>[https://www.npmjs.com/package/gulp-autoprefixer]
npm install gulp-typescript typescript --save-dev	             >>>>>[npmjs.com/package/gulp-typescript]
npm install  gulp-connect --save-dev		                            >>>>>[npmjs.com/package/gulp-connect]
npm i gulp-sourcemaps --save-dev		                                >>>>>[https://www.npmjs.com/package/gulp-sourcemaps]
npm i gulp-notify --save-dev                                                >>>>>[https://www.npmjs.com/package/gulp-notify]
npm i gulp-zip --save-dev                                                     >>>>>[https://www.npmjs.com/package/gulp-zip]  
*/


const gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    prefixer = require('gulp-autoprefixer'),
    ts = require('gulp-typescript'),
    connect = require('gulp-connect'),
    sourcemaps = require('gulp-sourcemaps'),
    notify = require("gulp-notify");
//************************************* Start Tasks ******************************************************/
// css task
gulp.task("css", () => {
    return gulp.src('project/css/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(prefixer('last 2 versions'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({
            message: "Css Task is Done>",
            onLast: true
        }))
})
// js task
gulp.task("js", () => {
    return gulp.src('project/js/ts/main.ts')
        .pipe(sourcemaps.init())
        .pipe(ts({
            target: "es2016",
            strict: true,
            noImplicitAny: true,
            removeComments: true,
            outFile: 'main.js',
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({
            message: "Js Task is Done",
            onLast: true
        }))
});
// connect task
gulp.task("connect", () => {
    connect.server({
        root: './dist',
        livereload: true,
        port: 8000
    });
});
// watch task
gulp.task("watch", () => {
    connect.reload();
    gulp.watch('project/css/**/*.scss', gulp.series(['css']));
    gulp.watch('project/js/ts/*.ts', gulp.series(['js']));
});

// Default task is WATCH
gulp.task('default', gulp.series('watch'));