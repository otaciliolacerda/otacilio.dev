import fs from 'fs';
import matter from 'gray-matter';

const BLOG_DIR = `${process.cwd()}/content/blog`;

export function loadAllBlogPosts() {
  // Each folder inside `content/blog` is a blog post. The folder name is the post id (slug)
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
      const { data, content } = matter.read(`${BLOG_DIR}/${post}/index.md`);

      return {
        ...data,
        date: getFormattedDate(data.date),
        content,
        slug: post,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return posts;
}

export function getBlogPostsSlugs() {
  return loadAllBlogPosts().map(slug => ({ params: { slug } }));
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
