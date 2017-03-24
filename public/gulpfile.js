const gulp = require('gulp');
const mergeStream = require('merge-stream');
const PolymerProject = require('polymer-build').PolymerProject;

const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const cssSlam = require('css-slam').gulp;
const htmlMinifier = require('gulp-html-minifier');
const HtmlSplitter = require('polymer-build').HtmlSplitter;

const project = new PolymerProject(require('./polymer.json'));

// mergeStream(project.sources(), project.dependencies())
//   .pipe(gulp.dest('build/'));