const gulp = require('gulp');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const cssSlam = require('css-slam').gulp;
const htmlMinifier = require('gulp-html-minifier');
const mergeStream = require('merge-stream');
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

            const buildStream = mergeStream(project.sources(), project.dependencies())
            .once('data', () => {
                console.log('Analyzing build dependencies...');
            });

            const bundledBuildStream = forkStream(buildStream)
            .pipe(project.bundler)
            .pipe(gulp.dest('build/'));

            return waitFor(bundledBuildStream);
            
        })
        .then(() => {
            // You did it!
            console.log('Build complete!');
            resolve();
        });
    });
    
}

gulp.task('build', build);