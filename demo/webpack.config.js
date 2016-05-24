module.exports = {
  context: __dirname,
  entry: [
    './app.js'
  ],
  output: {
    path: __dirname,
    filename: './build/app.js'
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
