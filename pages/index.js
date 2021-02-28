import Head from 'next/head';
import Image from 'next/image';

import { AwesomeButtonSocial } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

import styles from 'styles/index.module.css';

function Index() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome</title>
      </Head>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Image alt="the author" src="/img/photo.png" width="180" height="180" />
        </div>
        <div className={styles.cardContent}>
          <strong style={{ fontSize: '1.6rem' }}>Otacilio Lacerda</strong>
          <strong style={{ fontSize: '1.2rem' }}>Fullstack Developer</strong>
          <br />
          <span style={{ textAlign: 'left' }}>
            I am always looking for something new to learn. Currently interested in API Design and how to make the web a
            better place.
          </span>
        </div>
        <div className={styles.cardFooter}>
          <AwesomeButtonSocial
            icon
            size="icon"
            type="github"
            href="https://github.com/otaciliolacerda"
            target="_blank"
          />
          <AwesomeButtonSocial
            icon
            size="icon"
            type="linkedin"
            href="https://www.linkedin.com/in/otaciliolacerda"
            target="_blank"
          />
          <AwesomeButtonSocial icon size="icon" type="twitter" href="https://twitter.com/otaciliofl" target="_blank" />
        </div>
      </div>
    </div>
  );
}

export default Index;
