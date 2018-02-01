var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');
var removeCode = require('gulp-remove-code');
var browserSync = require('browser-sync').create();

var js = [
    './bower_components/angular/angular.min.js',
    './bower_components/angular-route/angular-route.js',
    './bower_components/angular-route/angular-route.js',
    './bower_components/jquery/dist/jquery.js',
    './bower_components/bootstrap/dist/js/bootstrap.js',
    './bower_components/angular-toastr/dist/angular-toastr.tpls.js',
    './bower_components/angular-animate/angular-animate.js',
    './app/*.js',
    './app/**/*.js',
    './app/**/**/*.js'
];

gulp.task('copy-html', function () {
    gulp.start('copy-html-views');
    gulp.start('copy-html-directives');
});

gulp.task('copy-html-views', function () {
    return gulp.src('./app/views/**/*.html')
        .pipe(gulp.dest('./dist/app/views/'));
});

gulp.task('copy-html-directives', function () {
    return gulp.src('./app/directives/**/*.html')
        .pipe(gulp.dest('./dist/app/directives/'));
});

gulp.task('inject', function () {
    var target = gulp.src('./index.html');
    var sources = gulp.src(['./app/**/*.js', './styles/*.css'], {
        read: false
    });

    return target.pipe(inject(sources))
        .pipe(wiredep())
        .pipe(gulp.dest('./'));
});


gulp.task('inject-build', ['minify-css', 'minify-js', 'copy-html'], function () {
    gulp.src('./index.html')
        .pipe(inject(
            gulp.src(['./dist/*.js', './dist/app.css', './dist/*.css'], {
                read: false
            }), {
                transform: function (filePath, file, i, length) {
                    var newPath = filePath.replace('/Content/js/', '');
                    newPath = newPath.replace('dist/', '');
                    var splitArray = newPath.split('.');
                    if (splitArray[newPath.split('.').length - 1] == 'js') {
                        return `<script src=".${newPath}"></script>`;
                    } else {
                        return `<link rel="stylesheet" href=".${newPath}">`;
                    }

                }
            }))
        .pipe(removeCode({
            production: true
        }))
        .pipe(gulp.dest('./dist/'));

});

gulp.task('minify-css', () => {
    return gulp.src([
            'styles/app.css',
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            'bower_components/angular-toastr/dist/angular-toastr.css'
        ])
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('minify-js', function () {
    uglify();
    return gulp.src(js)
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('connect', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("./styles/*.css").on('change', browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./app/views/**/*.html").on('change', browserSync.reload);
    gulp.watch("./app/**/**/*.html").on('change', browserSync.reload);
    gulp.watch("./app/views/**/*.js").on('change', browserSync.reload);
    gulp.watch("./app/*.js").on('change', browserSync.reload);
    gulp.watch("./app/**/*.js").on('change', browserSync.reload);
});

gulp.task('connect-dist', function () {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });

    gulp.watch("./dist/*.css").on('change', browserSync.reload);
    gulp.watch("./dist/*.html").on('change', browserSync.reload);
    gulp.watch("./dist/**/*.html").on('change', browserSync.reload);
    gulp.watch("./dist/**/**/*.html").on('change', browserSync.reload);
    gulp.watch("./dist/*.js").on('change', browserSync.reload);
    gulp.watch("./dist/**/*.js").on('change', browserSync.reload);

});

gulp.task('build', ['inject-build']);
gulp.task('server', ['inject', 'connect']);
gulp.task('server:dist', ['inject', 'inject-build', 'connect-dist']);