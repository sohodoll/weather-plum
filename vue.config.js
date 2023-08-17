module.exports = {
  transpileDependencies: true,
  publicPath: '/dist/',
  filenameHashing: false,
  productionSourceMap: false,
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    module: {
      rules: [
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                limit: Infinity,
                name: 'fonts/[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
  },
}
