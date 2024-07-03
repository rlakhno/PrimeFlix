const path = require('path');

module.exports = {
  // Other Webpack configurations...
  resolve: {
    fallback: {
      "fs": false,
      "path": require.resolve("path-browserify"),
      "url": require.resolve("url/"),
      "buffer": require.resolve("buffer/"),
      "stream": require.resolve("stream-browserify"),
      "util": require.resolve("util/"),
      "http": require.resolve("stream-http")
    }
  }
};
