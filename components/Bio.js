/* eslint-disable import/no-unresolved */
import clsx from 'clsx';

import Image from 'components/Image';
import { getSiteMetaData } from 'utils/helpers';

import profileImagePng from 'content/assets/profile.png';
import profileImageWebp from 'content/assets/profile.png?webp';
import profileImageLqip from 'content/assets/profile.png?lqip';

function Bio({ className }) {
  const { author, social } = getSiteMetaData();

  return (
    <div className={clsx(`flex items-center`, className)}>
      <Image
        className="flex-shrink-0 mb-0 mr-3 rounded-full w-14 h-14"
        src={profileImagePng}
        webpSrc={profileImageWebp}
        previewSrc={profileImageLqip}
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
