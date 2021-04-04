/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import Link from 'next/link';
import ReactMarkdown from 'react-markdown/with-html';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/cjs/styles/prism/dracula';

import Seo from 'components/Seo';
import Bio from 'components/Bio';
import Image from 'components/Image';
import Layout from 'components/Layout';
import { getPostBySlug, getPostsSlugs } from 'utils/posts';

function CodeBlock({ language, value }) {
  return (
    <SyntaxHighlighter style={style} language={language}>
      {value}
    </SyntaxHighlighter>
  );
}

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

function Post({ title, description, date, content, nextPost, previousPost }) {
  return (
    <Layout>
      <Seo title={title} description={description} />

      <article>
        <header className="mb-8">
          <h1 className="mb-2 text-6xl font-black leading-none font-display">{title}</h1>
          <p className="text-sm">{date}</p>
        </header>
        <ReactMarkdown
          className="mb-4 prose lg:prose-lg dark:prose-dark"
          escapeHtml={false}
          source={content}
          renderers={{ code: CodeBlock, image: MarkdownImage }}
        />
        <hr className="mt-4" />
        <footer>
          <Bio className="mt-8 mb-16" />
        </footer>
      </article>

      <nav className="flex flex-wrap justify-between mb-10">
        {previousPost ? (
          <Link href={{ pathname: '/post/[slug]', query: { slug: previousPost.slug } }}>
            <a className="text-lg font-bold">← {previousPost.title}</a>
          </Link>
        ) : (
          <div />
        )}
        {nextPost ? (
          <Link href={{ pathname: '/post/[slug]', query: { slug: nextPost.slug } }}>
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
    paths: getPostsSlugs(),
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const postData = getPostBySlug(slug);

  if (!postData.previousPost) {
    postData.previousPost = null;
  }

  if (!postData.nextPost) {
    postData.nextPost = null;
  }

  return { props: postData };
}

export default Post;
