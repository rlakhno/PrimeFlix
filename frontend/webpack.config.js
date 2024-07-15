//  webpack.config.js

const path = require('path');
const webpack = require('webpack'); // Import webpack to use plugins

module.exports = {
  mode: 'development', // or 'production'
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    fallback: {
      "zlib": require.resolve("browserify-zlib"),
      "path": require.resolve("path-browserify"),
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "fs": false,
      "url": require.resolve("url/"),
      "buffer": require.resolve("buffer/"),
      "util": require.resolve("util/"),
      "http": require.resolve("stream-http"),
      "async_hooks": false,
      "vm": require.resolve("vm-browserify"),
      "querystring": require.resolve("querystring-es3"),
      "assert": require.resolve("assert/")
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /express\/lib\/view\.js/,
      contextRegExp: /express/,
    }),
  ],
};

// ............................................................

// const path = require('path');

// module.exports = {
//   // Your other Webpack configuration options
//   resolve: {
//     fallback: {
//       "zlib": false,
//       "path": require.resolve("path-browserify"),
//       "stream": require.resolve("stream-browserify"),
//       "crypto": require.resolve("crypto-browserify"),
//       "fs": false,
//       "url": require.resolve("url/"),
//       "buffer": require.resolve("buffer/"),
//       "util": require.resolve("util/"),
//       "http": require.resolve("stream-http")// Add any other required polyfills here
//     },
//   },
//   module: {
//     rules: [
//       // Your existing module rules
//     ],
//   },
//   // Any other needed configurations
// };

// ...................................................................

// const path = require('path');

// module.exports = {
//   // Other Webpack configurations...
//   resolve: {
//     fallback: {
//"       fs": false,
//       "path": require.resolve("path-browserify"),
//       "url": require.resolve("url/"),
//       "buffer": require.resolve("buffer/"),
//       "stream": require.resolve("stream-browserify"),
//       "util": require.resolve("util/"),
//       "http": require.resolve("stream-http")
//     }
//   }
// };
