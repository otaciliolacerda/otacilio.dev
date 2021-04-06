/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';

import Seo from 'components/Seo';
import Bio from 'components/Bio';
import Layout from 'components/Layout';
import { getSortedBlogPosts } from 'utils/posts';

function Blog({ posts }) {
  return (
    <Layout>
      <Seo metaType="blog" />
      <Bio className="my-14" />
      {posts.map(({ title, description, date, slug }) => (
        <article key={slug}>
          <header className="mb-2">
            <h3 className="mb-2">
              <Link href={{ pathname: '/blog/[slug]', query: { slug } }}>
                <a className="text-4xl font-bold text-yellow-600 font-display"> {title}</a>
              </Link>
            </h3>
            <span className="text-sm">{date}</span>
          </header>
          <section>
            <p className="mb-8 text-lg">{description}</p>
          </section>
        </article>
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getSortedBlogPosts();

  return {
    props: {
      posts,
    },
  };
}

export default Blog;
