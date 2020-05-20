const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  // Inform webpack that we're building a bundle
  // for nodeJS, rather than for the browser
  target: 'node',
  // Tell webpack the root file of our
  // server application
  entry: {
    // vendor: ["@babel/polyfill", "react"],
    bundle: ["@babel/polyfill",'./src/index.js']
  },
  // Tell webpack where to put the output file
  // that is generated
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
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
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      }


    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".wasm", ".mjs", ".style","*"]
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
},
  externals: [webpackNodeExternals()]
    
};




module.exports = config;
