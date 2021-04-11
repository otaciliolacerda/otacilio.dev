const withOptimizedImages = require('next-optimized-images');

module.exports = withOptimizedImages({
  /* config for next-optimized-images */
  // your config for other plugins or the general next.js here...
  optimizeImagesInDev: false,

  future: {
    webpack5: true,
  },
});
