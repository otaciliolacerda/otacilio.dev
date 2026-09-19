import fs from 'fs';
import matter from 'gray-matter';

const BLOG_DIR = `${process.cwd()}/content/blog`;

export function loadAllBlogPosts() {
  // Each file in `content/blog` is a blog post. The filename is the post id (slug)
  return fs.readdirSync(BLOG_DIR).map(postName => postName);
}

// Get day in format: Month day, Year. e.g. April 19, 2020
function getFormattedDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return formattedDate;
}

export function getSortedBlogPosts() {
  const posts = loadAllBlogPosts()
    .map(post => {
      const { data, content } = matter.read(`${BLOG_DIR}/${post}`);
      const publishedAt = new Date(data.date);

      if (Number.isNaN(publishedAt.valueOf())) {
        throw new Error(`Invalid publication date in ${post}`);
      }

      return {
        post: {
          ...data,
          date: getFormattedDate(publishedAt),
          content,
          slug: post.replace('.md', ''),
        },
        publishedAt,
      };
    })
    .sort((a, b) => b.publishedAt - a.publishedAt)
    .map(({ post }) => post);

  return posts;
}

export function getBlogPostsSlugs() {
  return loadAllBlogPosts().map(slug => ({ slug: slug.replace('.md', '') }));
}

export function getBlogPostBySlug(slug) {
  const posts = getSortedBlogPosts();
  const postIndex = posts.findIndex(({ slug: postSlug }) => postSlug === slug);

  if (postIndex === -1) {
    return null;
  }

  return {
    ...posts[postIndex],
    previousPost: posts[postIndex + 1] ?? null,
    nextPost: posts[postIndex - 1] ?? null,
  };
}
