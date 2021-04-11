import 'lazysizes';

function Image({ alt, src, className }) {
  // eslint-disable-next-line no-param-reassign
  src = src.charAt(0) === '/' ? src.substring(1) : src;

  console.log('----------------------------------------------------');
  console.log('webp: ', require(`content/assets/${src}?webp`));
  console.log('png: ', require(`content/assets/${src}`));
  console.log('lqip: ', require(`content/assets/${src}?trace`));
  console.log('----------------------------------------------------');

  return (
    <picture className={className}>
      <source type="image/webp" data-srcset={require(`content/assets/${src}?webp`)} />
      <source type="image/png" data-srcset={require(`content/assets/${src}`)} />
      <img className={`lazyload blur ${className}`} alt={alt} src={require(`content/assets/${src}?trace`).trace} />
    </picture>
  );
}

export default Image;
