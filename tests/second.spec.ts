import {test} from "@playwright/test"

test("practice locators", async ({page}) => {
  await page.goto("https://www.saucedemo.com")
  await page.locator("//input[@id='user-name']").fill("Akshay")
});
test("practice 2", async ({page}) => {
  await page.goto("https://www.saucedemo.com")
  await page.locator("//input[@id='user-name']").fill("Akshay")
});