import { expect, test } from '@playwright/test';

test('renders the home page and theme control', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('automating');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', "Otacilio Lacerda's personal blog");
  await expect(page.getByRole('link', { name: 'Hello World' })).toBeVisible();
  await expect(page.getByRole('button')).toBeVisible();
});

test('renders a post with generated metadata and its public image', async ({ page }) => {
  await page.goto('/blog/hello-world');

  await expect(page).toHaveTitle('Hello World');
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://otacilio.dev/assets/blog/hello-world/shiba.jpeg'
  );
  await expect(page.getByRole('heading', { level: 1, name: 'Hello World' })).toBeVisible();
  await expect(page.getByAltText('random shiba inu sticker to test image')).toHaveAttribute(
    'src',
    '/assets/blog/hello-world/shiba.jpeg'
  );
});

test('renders the custom 404 page', async ({ page }) => {
  await page.goto('/this-page-does-not-exist');

  await expect(page.getByRole('heading', { level: 1, name: 'Sorry' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Back to Home Page' })).toBeVisible();
  await expect(page.getByAltText('dog looking confused')).toHaveAttribute('src', '/assets/404.png');
});

test('renders the custom 404 page for unknown post slugs', async ({ page }) => {
  await page.goto('/blog/does-not-exist');

  await expect(page.getByRole('heading', { level: 1, name: 'Sorry' })).toBeVisible();
});
