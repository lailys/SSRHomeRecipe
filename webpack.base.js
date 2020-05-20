const path = require('path');
// const webpackNodeExternals = require('webpack-node-externals');

const config = {

  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        },
        exclude: [/node_modules/, /public/, /build/]
      },

      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      },
     

    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".wasm", ".mjs", "*", ".css", ".style", "*"]
  },

}
