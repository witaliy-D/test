import gulp from 'gulp';
const { src, dest } = gulp;
import { path } from '../path.js';
import browserSync from "browser-sync";


export function files() {
  return src(path.src.files, { encoding: false })
        .pipe(dest(path.build.files))
        .pipe(browserSync.stream());
}
