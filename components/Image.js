import 'lazysizes';

function Image({ alt, src, className }) {
  // eslint-disable-next-line no-param-reassign
  src = src.charAt(0) === '/' ? src.substring(1) : src;

  console.log(require(`content/assets/${src}`));
  console.log(require(`content/assets/${src}`).default);

  return (
    <picture className={className}>
      <source type="image/webp" data-srcset={require(`content/assets/${src}?webp`).default} />
      <source type="image/png" data-srcset={require(`content/assets/${src}`).default} />
      <img className={`lazyload blur ${className}`} alt={alt} src={require(`content/assets/${src}?trace`).trace} />
    </picture>
  );
}

export default Image;
