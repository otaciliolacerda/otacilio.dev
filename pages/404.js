/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';

import Image from 'components/Image';
import Layout from 'components/Layout';

function NotFound() {
  return (
    <Layout>
      <Image alt="dog looking confused" src="404.png" className="grid justify-items-center h-80" />
      <div className="container w-full">
        <h1 className="text-6xl m-5 text-center">Sorry</h1>
        <h3 className="text-4xl m-5 text-center">I could not find this page</h3>
        <p className="text-lg font-bold w-full text-center">
          <Link href="/">
            <a>Back to Home Page</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}

export default NotFound;
