const gulp = require('gulp');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const cssSlam = require('css-slam').gulp;
const htmlMinifier = require('gulp-html-minifier');
const imagemin = require('gulp-imagemin');
const mergeStream = require('merge-stream');
const babel = require('gulp-babel');
const del = require('del');

const { PolymerProject, HtmlSplitter, forkStream } = require('polymer-build');
const sourcesHtmlSplitter = new HtmlSplitter();

const project = new PolymerProject(require('./polymer.json'));
const buildDirectory = 'build';



function waitFor(stream) {
  return new Promise((resolve, reject) => {
    stream.on('end', resolve);
    stream.on('error', reject);
  });
}


function build() {
    return new Promise((resolve, reject) => { 
        del([buildDirectory])
        .then(()=>{
            console.log(`Deleting ${buildDirectory} directory...`);

            let sourcesStream = project.sources()
            .pipe(sourcesHtmlSplitter.split())
            //.pipe(gulpif(/\.js$/,babel({presets: ['es2015']})))
            //.pipe(gulpif(/\.js$/, uglify()))
            .pipe(gulpif(/\.html$/, htmlMinifier()))
            .pipe(gulpif(/\.(png|gif|jpg|svg)$/, imagemin()))
            .pipe(sourcesHtmlSplitter.rejoin());

            let dependenciesStream = project.dependencies()
            .pipe(sourcesHtmlSplitter.split())
            //.pipe(gulpif(/\.js$/,babel({presets: ['es2015']})))
            //.pipe(gulpif(/\.js$/, uglify()))
            .pipe(gulpif(/\.html$/, htmlMinifier()))
            .pipe(gulpif(/\.(png|gif|jpg|svg)$/, imagemin()))
            .pipe(sourcesHtmlSplitter.rejoin());

            const buildStream = mergeStream(sourcesStream, dependenciesStream)
            .once('data', () => {
                console.log('Analyzing build dependencies...');
            });

            const bundledBuildStream = forkStream(buildStream)
            .pipe(project.bundler)
            .pipe(gulp.dest('build/'));

            return waitFor(bundledBuildStream);
            
        })
        .then(() => {
            console.log('Build complete!');
            resolve();
        });
    });
    
}

gulp.task('build', build);