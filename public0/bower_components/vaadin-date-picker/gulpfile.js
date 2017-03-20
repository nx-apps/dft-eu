var gulp = require('gulp');
var replace = require('gulp-replace');

gulp.task('htmlReplace',function(){
     gulp.src('src/*')
    .pipe(replace('../bower_components/','../'))
    .pipe(gulp.dest(''));
    
});

gulp.task('watch',function(){
    gulp.watch('src/*',['htmlReplace']);
});

gulp.task('default', ['htmlReplace','watch']);