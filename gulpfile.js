var gulp = require('gulp');
var modsFixer = require('./index');

gulp.task('mod-fix', function () {
  return gulp.src('./in/*.css')
    .pipe(modsFixer())
    .pipe(gulp.dest('./out'));
});

gulp.task('default', ['mod-fix']);