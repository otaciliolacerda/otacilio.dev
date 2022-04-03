import withOptimizedImages from "next-optimized-images";

/**
 * @type {import("next").NextConfig}
 */
const nextConfig = withOptimizedImages({
  images: {
    disableStaticImages: true
  },
  removeOriginalExtension: false,
  optimizeImagesInDev: true,
  reactStrictMode: true
});

export default nextConfig;
