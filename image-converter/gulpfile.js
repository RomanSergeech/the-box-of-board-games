import path from 'path'
import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import webp  from 'gulp-webp'

const source_folder = path.resolve()+"/assets"
const result_folder = path.resolve()+'/images'

const { src, dest, series, parallel } = gulp

const folderPath = {
   monopoly: {
      src: source_folder+'/**/*.{jpg,png}',
      dist: result_folder
   }
}

function convertImages( from, to ) {
   return src(from)
      .pipe(
         webp({
            quality: 100,
            method: 6
         })
      )
      .pipe(dest(to))
}

function images() {
   return convertImages(folderPath.monopoly.src, folderPath.monopoly.dist)

      // .pipe(src(path.images))
      // .pipe(
      //    imagemin({
      //       progressive: true,
      //       svgoPlugins: [{ removeViewBox: false }],
      //       interlaced: true,
      //       optimizationLevel: 3
      //    })
      // )
      // .pipe(dest('dist'))
}

const build = parallel(series(images))

export default build