const path = require('path');
const merge = require('webpack-merge');
// const webpackNodeExternals = require('webpack-node-externals');

const config = {

  // Tell webpack the root file of our
  // server application
  entry: {
    bundle: ["@babel/polyfill",'./src/client/client.js']
  },
  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets:
            ["@babel/preset-env", "@babel/preset-react"]
          }
        },
        exclude: [/node_modules/, /public/,/build/]
      },

      {
        test: /\.css$/,
        exclude:/\.module\.css$/i,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      }


    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".wasm", ".mjs", "*", ".css", ".style","*",]
  },
//   externals: [webpackNodeExternals()]
performance: {
  hints: false,
  maxEntrypointSize: 512000,
  maxAssetSize: 512000
}
    
};




module.exports = config;

