module.exports = {
  entry: [
    './index.js'
  ],
  output: {
    path: __dirname,
    filename: './build/index.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-2']
      }
    }]
  }
};
