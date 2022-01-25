'use strict'
import gulp from 'gulp'

const {series, watch, src, dest, lastRun} = gulp

// Define "require"
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import twig from 'gulp-twig'
import browserSync from 'browser-sync'
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import autoprefixer from 'gulp-autoprefixer'
import rename from 'gulp-rename'
import cleanCSS from 'gulp-clean-css'
const uglifyEs = require('gulp-uglify-es').default
import imagemin from 'gulp-imagemin'
import newer from 'gulp-newer'
import imageminOptiPng from 'imagemin-optipng'
import imageminMozJpeg from 'imagemin-mozjpeg'
import svgMin from 'gulp-svgmin'
import svgStore from 'gulp-svgstore'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'
import TerserPlugin from 'terser-webpack-plugin'

const pathFiles = {
  html: {
    src: ['./src/twig/**/*.twig', '!./src/twig/templates/*.twig'],
    build: './build',
    watch: './src/twig/**/*.twig'
  },
  css: {
    src: ['./src/styles/**/**/*.scss', '!./src/styles/vendor/**'],
    build: './build/assets/css/',
    watch: './src/styles/**/**/*.scss'
  },
  js: {
    src: ['./src/js/**/!(_)*.js', '!./src/js/vendor/'],
    srcVendor: './src/js/vendor.js',
    build: './build/assets/js/',
    watch: './src/js/**/*.js',
    entry: './src/js/scripts.js'
  },
  img: {
    src: './src/img/**/*.+(png|jpg|jpeg|svg)',
    build: './build/assets/img/',
    watch: './src/img/**/*.+(png|jpg|jpeg|svg)'
  },
  fonts: {
    src: './src/fonts/*.*',
    build: './build/assets/fonts/',
    watch: './src/fonts/*.**'
  },
  favicon: {
    src: './src/favicon/*.*',
    build: './build/assets/favicon/',
    watch: './src/favicon/*.**'
  }
}

const html = () => {
  return src(pathFiles.html.src)
    .pipe(twig())
    .pipe(dest(pathFiles.html.build))
    .pipe(browserSync.stream())
}

const scss = () => {
  return src(pathFiles.css.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(dest(pathFiles.css.build))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(cleanCSS({
      level: {
        1: {
          specialComments: 0
        }
      }
    }))
    .pipe(dest(pathFiles.css.build))
    .pipe(browserSync.stream())
}

const js = () => {
  return src(pathFiles.js.src)
    .pipe(dest(pathFiles.js.build))
    .pipe(webpackStream({
      mode: "production",
      entry: {
        'scripts.min': pathFiles.js.entry
      },
      performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
      },
      output: {
        filename: "[name].js"
      },
      module: {
        rules: [{
          test: /\.js$/,
          exclude: /^_(\w+)(\.js)$|node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }]
      },
      optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
      },
      plugins: []
    }), webpack)
    .pipe(dest(pathFiles.js.build))
    .pipe(browserSync.stream())
}

const images = () => {
  return src(pathFiles.img.src)
    .pipe(newer(pathFiles.img.src))
    .pipe(imagemin([
      imageminOptiPng({
        optimizationLevel: 5
      }),
      imageminMozJpeg({
        progressive: true,
        quality: 85
      })
    ]))
    .pipe(dest(pathFiles.img.build))
    .on("end", browserSync.reload);
}

const fonts = () => {
  return src(pathFiles.fonts.src)
    .pipe(dest(pathFiles.fonts.build))
    .pipe(browserSync.stream())
}

const favicon = () => {
  return src(pathFiles.favicon.src)
    .pipe(dest(pathFiles.favicon.build))
    .pipe(browserSync.stream())
}

const myServer = () => {
  browserSync.init({
    server: {
      baseDir: pathFiles.html.build
    },
    port: 4505,
    notify: false,
    tunnel: true
  })
  watch(pathFiles.html.watch, {usePolling: true}, html);
  watch(pathFiles.css.watch, scss);
  watch(pathFiles.js.watch, js);
  //watch(pathFiles.js.watch, jsVendor);
}

const svgSprite = () => {
  return src('./src/img/icons/*.svg')
    .pipe(svgMin(function getOptions() {
      return {
        plugins: [
          'removeDoctype',
          'removeComments',
          'sortAttrs',
          {
            name: 'cleanupIDs',
            parmas: {
              prefix: 'icons',
              minify: true
            }
          }
        ]
      }
    }))
    .pipe(svgStore())
    .pipe(dest(pathFiles.img.build));
}

export {js}
export {html}
export {scss}
export {images}
export {fonts}
export {favicon}
export {myServer}
export {svgSprite}

const defaultGulp = series(html, scss, js, images, fonts, favicon, myServer);

export {defaultGulp}
