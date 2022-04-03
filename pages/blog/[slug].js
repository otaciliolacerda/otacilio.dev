/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useRouter } from 'next/router';

import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/cjs/styles/prism/dracula';

import SEO from 'components/SEO';
import Bio from 'components/Bio';
import Image from 'components/Image';
import Layout from 'components/Layout';

import { getBlogPostBySlug, getBlogPostsSlugs } from 'utils/posts';

function Post({ title, description, date, preview, content, nextPost, previousPost }) {
  const router = useRouter();

  return (
    <Layout>
      <SEO title={title} description={description} preview={preview} metaType="article" />

      <article>
        <header className="mb-8">
          <h1 className="mb-2 text-6xl font-black leading-none font-display">{title}</h1>
          <p className="text-sm">{date}</p>
        </header>
        <ReactMarkdown
          // className="dark:prose-dark"
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');

              return !inline && match ? (
                <SyntaxHighlighter style={style} language={match[1]}>
                  {children}
                </SyntaxHighlighter>
              ) : (
                <code className={className}>{children}</code>
              );
            },
            img({ alt, src }) {
              const imgUrl = `${router.asPath}/${src}`;
              return <Image alt={alt} src={imgUrl} className="w-full" />;
            },
          }}
        >
          {content}
        </ReactMarkdown>
        <hr className="mt-4" />
        <footer>
          <Bio className="mt-8 mb-16" />
        </footer>
      </article>

      <nav className="flex flex-wrap justify-between mb-10">
        {previousPost ? (
          <Link href={{ pathname: '/blog/[slug]', query: { slug: previousPost.slug } }}>
            <a className="text-lg font-bold">← {previousPost.title}</a>
          </Link>
        ) : (
          <div />
        )}
        {nextPost ? (
          <Link href={{ pathname: '/blog/[slug]', query: { slug: nextPost.slug } }}>
            <a className="text-lg font-bold">{nextPost.title} →</a>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: getBlogPostsSlugs(),
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const postData = getBlogPostBySlug(slug);

  if (!postData.previousPost) {
    postData.previousPost = null;
  }

  if (!postData.nextPost) {
    postData.nextPost = null;
  }

  return { props: postData };
}

export default Post;
