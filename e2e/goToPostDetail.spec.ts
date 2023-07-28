import { test, expect } from "@playwright/test";
// @todo: modify tests to check if the post detail is displayed

test.describe("When an user wants to see post detail", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("And use the post image, Then user is redirect to post detail url", async ({
    page,
  }) => {
    const postThumbnail = await page
      .getByRole("article")
      .first()
      .getByRole("img")
      .first();

    await postThumbnail.click();

    await expect(page).toHaveURL(/\/.*-.*/);
  });

  test("And use the post title, Then user is redirect to post detail url", async ({
    page,
  }) => {
    const postTitle = await page
      .getByRole("article")
      .first()
      .getByRole("heading");

    await postTitle.click();

    await expect(page).toHaveURL(/\/.*-.*/);
  });
});
