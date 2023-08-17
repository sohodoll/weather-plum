const { DefinePlugin } = require('webpack')

module.exports = {
  transpileDependencies: true,
  publicPath: '/dist/',
  filenameHashing: false,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
      }),
    ],
  },
  chainWebpack: (config) => {
    config.optimization.delete('splitChunks') // Disable chunk splitting

    // Exclude font files from default rules
    config.module
      .rule('fonts')
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: Infinity,
        esModule: false, // Disable ES modules for fonts
        name: 'app.[hash:8].[ext]', // Include font data in app.js
      })

    // Exclude default scss rule
    config.module
      .rule('scss')
      .oneOf('normal')
      .use('sass-loader')
      .tap((options) => ({
        ...options,
      }))
  },
}
