
import realFavicon from 'gulp-real-favicon';

const FAVICON_DATA_FILE = 'faviconData.json';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).

export const favicons = done => {
  realFavicon.generateFavicon({
    masterPicture: 'src/img/favicon/favicon.png',
    dest: 'dist/img/favicons/',
    iconsPath: '.',
    design: {
      // ios: {
      //   pictureAspect: 'backgroundAndMargin',
      //   backgroundColor: '#ffffff',
      //   margin: '14%',
      //   assets: {
      //     ios6AndPriorIcons: false,
      //     ios7AndLaterIcons: false,
      //     precomposedIcons: false,
      //     declareOnlyDefaultIcon: true
      //   }
      // },
      desktopBrowser: {
        design: 'raw'
      }
      // windows: {
      //   pictureAspect: 'whiteSilhouette',
      //   backgroundColor: '#d22856',
      //   onConflict: 'override',
      //   assets: {
      //     windows80Ie10Tile: false,
      //     windows10Ie11EdgeTiles: {
      //       small: false,
      //       medium: true,
      //       big: false,
      //       rectangle: false
      //     }
      //   }
      // },
      // androidChrome: {
      //   pictureAspect: 'backgroundAndMargin',
      //   margin: '17%',
      //   backgroundColor: '#ffffff',
      //   themeColor: '#ffffff',
      //   manifest: {
      //     display: 'standalone',
      //     orientation: 'notSet',
      //     onConflict: 'override',
      //     declared: true
      //   },
      //   assets: {
      //     legacyIcon: false,
      //     lowResolutionIcons: false
      //   }
      // }
      // safariPinnedTab: {
      //   pictureAspect: 'silhouette',
      //   themeColor: '#d22856'
      // }
    },
    settings: {
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false,
      readmeFile: false,
      htmlCodeFile: false,
      usePathAsIs: false
    },
    markupFile: FAVICON_DATA_FILE
  }, function () {
    done();
  });
};

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
// gulp.task('inject-favicon-markups', function () {
//   return gulp.src([ 'dist/*.html' ])
//     .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
//     .pipe(gulp.dest('dist'));
// });

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
// gulp.task('check-for-favicon-update', function () {
//   const currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
//   realFavicon.checkForUpdates(currentVersion, function (err) {
//     if (err) {
//       throw err;
//     }
//   });
// });
