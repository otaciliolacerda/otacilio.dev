import Link from 'next/link';
import { notFound } from 'next/navigation';

import rehypeRaw from 'rehype-raw';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/cjs/styles/prism/dracula';

import Bio from 'components/Bio';
import Image from 'components/Image';
import Layout from 'components/Layout';
import { getSiteMetaData } from 'utils/helpers';
import { getBlogPostBySlug, getBlogPostsSlugs } from 'utils/posts';

const siteMetadata = getSiteMetaData();

export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogPostsSlugs();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  const previewImage = post.preview
    ? `/assets/blog/${post.slug}/${post.preview}`
    : `/assets/${siteMetadata.previewImage.replace(/^\//, '')}`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      images: [previewImage],
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description: post.description,
      creator: siteMetadata.social.twitter,
      images: [previewImage],
    },
  };
}

async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { title, date, content, nextPost, previousPost } = post;

  return (
    <Layout>
      <article>
        <header className="mb-8">
          <h1 className="mb-2 text-6xl font-black leading-none font-display">{title}</h1>
          <p className="text-sm">{date}</p>
        </header>
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ className, children }) {
              const match = /language-(\w+)/.exec(className || '');

              return match ? (
                <SyntaxHighlighter style={style} language={match[1]}>
                  {children}
                </SyntaxHighlighter>
              ) : (
                <code className={className}>{children}</code>
              );
            },
            img({ alt, src }) {
              return <Image alt={alt} src={`blog/${slug}/${src}`} className="w-full" />;
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
          <Link className="text-lg font-bold" href={`/blog/${previousPost.slug}`}>
            ← {previousPost.title}
          </Link>
        ) : (
          <div />
        )}
        {nextPost ? (
          <Link className="text-lg font-bold" href={`/blog/${nextPost.slug}`}>
            {nextPost.title} →
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </Layout>
  );
}

export default BlogPostPage;
