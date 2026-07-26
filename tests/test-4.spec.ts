import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/?zx=1784651019809');
  await expect(page.getByRole('img', { name: 'Google' })).toBeVisible();
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('g');
  await page.getByText('gemini ai').click();
  await expect(page.locator('b')).toContainText('About this page');
<<<<<<< HEAD
//ok1
// ok
=======
  await expect(page.locator('b')).toContainText('About this page');
  // ok
>>>>>>> a83f5395aebf8b42c3dd0d559969bb59e8074564
});
