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

      return {
        ...data,
        date: getFormattedDate(data.date),
        content,
        slug: post.replace('.md', ''),
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return posts;
}

export function getBlogPostsSlugs() {
  return loadAllBlogPosts().map(slug => ({ params: { slug: slug.replace('.md', '') } }));
}

export function getBlogPostBySlug(slug) {
  const posts = getSortedBlogPosts();
  const postIndex = posts.findIndex(({ slug: postSlug }) => postSlug === slug);
  return {
    ...posts[postIndex],
    previousPost: posts[postIndex + 1],
    nextPost: posts[postIndex - 1],
  };
}
