'use strict';

const pump = require('pump');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rimraf = require('gulp-rimraf');
const tslint = require('gulp-tslint');
const sass = require('gulp-sass');
const mocha = require('gulp-mocha');
const env = require('gulp-env');
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const sourcemaps = require('gulp-sourcemaps');

/**
 * Remove build directory.
 */
gulp.task('clean', function () {
  return gulp.src('./build', {
      read: false
    })
    .pipe(rimraf());
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
  return gulp.src('src/**/*.ts')
    .pipe(tslint({
      formatter: 'prose'
    }))
    .pipe(tslint.report());
});

/**
 * Comple SASS with pipe-line.
 */
gulp.task('sass', ['tslint'], () => {
  return gulp.src('src/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(sourcemaps.write('../src/'))
    .pipe(gulp.dest('./build/src'));
});


/**
 * Compile TypeScript with pipe-line.
 */
gulp.task('compile', ['sass'], () => {
  return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write('../build'))
    .pipe(gulp.dest('build'));
});

/**
 * Copy config files
 */
gulp.task('copy.config', ['compile'], () => {
  return gulp.src("src/configurations/*.json")
    .pipe(gulp.dest('./build/src/configurations'));
});

/**
 * Copy label files
 */
gulp.task('copy.label', ['copy.config'], () => {
  return gulp.src([
      "src/label/*.json",
      "src/label/*.xlsx"
    ])
    .pipe(gulp.dest('./build/src/label'));
});

/**
 * Copy all client files
 */
gulp.task('copy.client', ['copy.label'], () => {
  return gulp.src([
    "!src/client/**/*.ts",
    "!src/client/**/*.less",
    "!src/client/**/*.scss",
    "!src/client/**/*.ori",
    "src/client/**/*.*"
  ]).pipe(gulp.dest('./build/src/client'));
});

function copyAsset() {
  return Promise.all([
    gulp.src("src/configurations/*.json")
    .pipe(gulp.dest('./build/src/configurations')),
    gulp.src([
      "src/label/*.json",
      "src/label/*.xlsx"
    ])
    .pipe(gulp.dest('./build/src/label')),
    gulp.src([
      "!src/client/**/*.ts",
      "!src/client/**/*.less",
      "!src/client/**/*.scss",
      "!src/client/**/*.ori",
      "src/client/**/*.*",
    ]).pipe(gulp.dest('./build/src/client'))
  ]);

}

function compressJS() {
  return Promise.all([
    gulp.src([
      "!src/client/**/*.min.js",
      "src/client/**/*.js",
    ])
    .pipe(uglify({
      mangle: true
    }))
    .pipe(gulp.dest('build/src/client', {
      overwrite: true
    }))
  ]);
}

/**
 * Copy the project.
 */
gulp.task('copy', [], () => {
  return copyAsset();
});

/**
 * Compress Javascript.
 */
gulp.task('compress', ['copy.client'], (cb) => {
  pump([
      gulp.src([
        "!src/client/**/*.min.js",
        "src/client/**/*.js",
      ]),
      uglify({
        mangle: true
      }),
      gulp.dest('build/src/client', {
        overwrite: true
      })
    ],
    cb
  );
});

/**
 * Build the project.
 */
gulp.task('build', ['compress'], (cb) => {
  cb();
});

/**
 * Run tests.
 */
gulp.task('test', ['build'], () => {
  const envs = env.set({
    NODE_ENV: 'test'
  });

  return gulp.src(['build/test/**/*.js'])
    .pipe(envs)
    .pipe(mocha())
    .once('error', (error) => {
      console.log(error);
      process.exit(1);
    })
    .once('end', () => {
      process.exit();
    });
});

gulp.task('default', ['build']);
