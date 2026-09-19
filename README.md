My personal page: [otacilio.dev](https://otacilio.dev)

## Development

This site uses [Node.js 24 LTS](https://nodejs.org/) and npm. With `nvm` installed, set up the project with:

```sh
nvm install
nvm use
npm ci
npm run dev
```

Before publishing, run:

```sh
npm run lint
npm run format:check
npm run build
```

## Architecture

This site uses Next.js's App Router. The root layout in `app/layout.js` owns global styles, fonts, document metadata,
and theme support. Routes live alongside it:

- `app/page.js` renders the post index.
- `app/blog/[slug]/page.js` statically generates each post from its front matter and Markdown.
- `app/not-found.js` renders the custom 404 page.

## Writing posts

Write posts in `content/blog/<slug>.md`. Put a post's images in `public/assets/blog/<slug>/` and reference them by filename in the Markdown. Site-wide images live in `public/assets/`.
