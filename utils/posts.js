import fs from 'fs';
import matter from 'gray-matter';

const POSTS_FOLDER = `${process.cwd()}/content/posts`;

export function getPostsFolders() {
  // Get all posts folders located in `content/posts`
  const postsFolders = fs.readdirSync(POSTS_FOLDER).map(folderName => ({
    directory: folderName,
    filename: `${folderName}.md`,
  }));

  return postsFolders;
}

// Get day in format: Month day, Year. e.g. April 19, 2020
function getFormattedDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return formattedDate;
}

export function getSortedPosts() {
  const postFolders = getPostsFolders();

  const posts = postFolders
    .map(({ filename, directory }) => {
      // Get raw content from file
      const markdownWithMetadata = fs.readFileSync(`${POSTS_FOLDER}/${directory}/${filename}`).toString();

      // Parse markdown, get data and content.
      const { data, content } = matter(markdownWithMetadata);

      // Remove .md file extension from post name
      const slug = filename.replace('.md', '');

      return {
        ...data,
        date: getFormattedDate(data.date),
        content,
        slug,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return posts;
}

export function getPostsSlugs() {
  const postFolders = getPostsFolders();

  const paths = postFolders.map(({ filename }) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return paths;
}

export function getPostBySlug(slug) {
  const posts = getSortedPosts();
  const postIndex = posts.findIndex(({ slug: postSlug }) => postSlug === slug);
  return {
    ...posts[postIndex],
    previousPost: posts[postIndex + 1],
    nextPost: posts[postIndex - 1],
  };
}
