const { GenerateSW } = require('workbox-webpack-plugin')

module.exports = {
  transpileDependencies: [
    'quasar'
  ],
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: true
    }
  },
  publicPath: './',
  productionSourceMap: false,
  configureWebpack: {
      output: {
          filename: 'js/[name].[hash].bundle.js'
      },
      plugins: [
          new GenerateSW({
          //  swSrc: './src/service-worker.js',
              exclude: [/.*manifest\.json.*/, /.*index\.html.*/, /.*web\.config.*/, /.*service-worker\.js.*/],
              cleanupOutdatedCaches: true,
              clientsClaim: true,
              skipWaiting: true,
             // mode: 'production',
             // sourcemap: false,
          })
      ]
  },
  /*
  pwa: {
    name: 'Kvar',
    themeColor: '#ffe100',
    msTileColor: '#ffe100',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'dev/sw.js',
      // ...other Workbox options...
    }
  },
  */
  chainWebpack: config => {
    config.optimization.minimize(true)
  }
}
