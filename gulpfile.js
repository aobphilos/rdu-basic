'use strict';

const gulp = require('gulp');
const rimraf = require('gulp-rimraf');
const tslint = require('gulp-tslint');
const mocha = require('gulp-mocha');
const shell = require('gulp-shell');
const env = require('gulp-env');
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

/**
 * Remove build directory.
 */
gulp.task('clean', function () {
  return gulp.src('./build', { read: false })
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
 * Compile TypeScript.
 */

function compileTS(args, cb) {
  return exec(tscCmd + args, (err, stdout, stderr) => {
    console.log(stdout);

    if (stderr) {
      console.log(stderr);
    }
    cb(err);
  });
}

gulp.task('compile', ['tslint'], () => {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('build'));
});

gulp.task('sh-tsc', shell.task([
  'npm run tsc',
]));

/**
 * Watch for changes in TypeScript
 */
gulp.task('sh-watch', shell.task([
  'npm run tsc-watch',
]));
/**
 * Copy config files
 */
gulp.task('configs', (cb) => {
  return gulp.src("src/configurations/*.json")
    .pipe(gulp.dest('./build/src/configurations'));
});

/**
 * Copy all client files
 */
gulp.task('client', (cb) => {
  return gulp.src([
    "!src/client/**/*.ts",
    "src/client/**/*.*"
  ]).pipe(gulp.dest('./build/src/client'));
});

/**
 * Build the project.
 */
gulp.task('build', ['compile', 'configs', 'client'], () => {
  console.log('Building the project ...');
});

/**
 * Run tests.
 */
gulp.task('test', ['build'], (cb) => {
  const envs = env.set({
    NODE_ENV: 'test'
  });

  gulp.src(['build/test/**/*.js'])
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