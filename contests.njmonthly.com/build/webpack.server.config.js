const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(base, {
  target: 'node',
  devtool: '#source-map',
  entry: './src/entry-server.js',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  // https://webpack.js.org/configuration/externals/#externals
  // https://github.com/liady/webpack-node-externals
  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: /\.css$/
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin(),





    new webpack.NormalModuleReplacementPlugin(/\.\.\/\.\.\/node_modules\/vue2-leaflet\/dist\/vue2-leaflet\.js/, function(resource) {
      console.log('resource request', resource.request);
      resource.request = resource.request.replace(/\.\.\/\.\.\/node_modules\/vue2-leaflet\/dist\/vue2-leaflet\.js/, './Other.vue' );
    }),


    // new webpack.NormalModuleReplacementPlugin(/\.\.\/\.\.\/\.\.\/node_modules\/medium-zoom\/dist\/medium-zoom\.js/, function(resource) {
    //   console.log('resource request', resource.request);
    //   resource.request = resource.request.replace(/\.\.\/\.\.\/\.\.\/node_modules\/medium-zoom\/dist\/medium-zoom\.js/, './Other.vue' );
    // }),
  ]
})
