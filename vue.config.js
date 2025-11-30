const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // Ensures correct paths for production builds
  publicPath: process.env.NODE_ENV === 'production'
    ? '/myflix-Vue/'
    : '/',
  // Custom Webpack configuration
  configureWebpack: {
    plugins: [
      new (require('webpack')).DefinePlugin({
        '__VUE_OPTIONS_API__': JSON.stringify(true),
        '__VUE_PROD_DEVTOOLS__': JSON.stringify(false),
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(false)
      })
    ]
  }
})
