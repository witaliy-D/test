import gulp from 'gulp';
import gulpif from 'gulp-if';
import imageminWebp from 'imagemin-webp';
import webpImg from 'gulp-webp';
import debug from 'gulp-debug';

const production = !!process.argv.includes('--production');

export const webp = () => {
  return gulp.src(['src/img/**/*.{jpeg,png,jpg}', '!src/img/sprite/*', '!src/img/symbols/*', '!src/img/favicon/*'])
    .pipe(webpImg(gulpif(production, imageminWebp({
      lossless: true,
      quality: 100,
      alphaQuality: 100
    }))))
    .pipe(debug({title: 'webp'}))
    .pipe(gulp.dest('dist/img'));
};
