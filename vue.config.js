const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.module
      .rule('typescript')
      .test(/\.tsx?$/)
      .use('ts-loader')
      .loader('ts-loader')
      .end();
  },

  configureWebpack: {
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.vue', '.json']
    },
  },

  publicPath: '/',
})
