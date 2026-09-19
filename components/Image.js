/* eslint-disable @next/next/no-img-element */

const dimensions = {
  '404.png': { width: 860, height: 923 },
  'blog/profile.png': { width: 269, height: 269 },
  'blog/hello-world/shiba.jpeg': { width: 921, height: 614 },
};

function Image({ alt, src, className }) {
  const normalizedSrc = src.replace(/^\//, '');
  const imageDimensions = dimensions[normalizedSrc];

  if (!imageDimensions) {
    throw new Error(`Missing image dimensions for ${normalizedSrc}. Add them to components/Image.js.`);
  }

  return (
    <img
      alt={alt}
      className={className}
      decoding="async"
      height={imageDimensions.height}
      loading="lazy"
      src={`/assets/${normalizedSrc}`}
      width={imageDimensions.width}
    />
  );
}

export default Image;
