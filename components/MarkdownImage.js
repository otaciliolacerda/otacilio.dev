/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import Image from 'components/Image';

function MarkdownImage({ alt, src }) {
  return (
    <Image
      alt={alt}
      src={require(`content/assets/${src}`)}
      webpSrc={require(`content/assets/${src}?webp`)}
      previewSrc={require(`content/assets/${src}?lqip`)}
      className="w-full"
    />
  );
}

export default MarkdownImage;
