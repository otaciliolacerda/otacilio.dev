/* eslint-disable import/no-unresolved */
import clsx from 'clsx';

import Image from 'components/Image';
import { getSiteMetaData } from 'utils/helpers';

const profileImage = '/img/profile.png';

function Bio({ className }) {
  const { author, social } = getSiteMetaData();

  return (
    <div className={clsx(`flex items-center`, className)}>
      <Image
        className="flex-shrink-0 mb-0 mr-3 rounded-full w-32 h-32"
        src={profileImage}
        webpSrc={`${profileImage}?webp`}
        previewSrc={`${profileImage}?lqip`}
        alt="Profile"
      />

      <p className="text-base leading-7">
        Hi, I am <a href={`https://twitter.com/${social.twitter}`}>{author.name}</a>
        <br />
        {author.summary}
      </p>
    </div>
  );
}

export default Bio;
