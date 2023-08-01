import { test, expect } from "@playwright/test";
import { login } from "./functions/login";

test.describe("When a registered user wants to publish a healthy food", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);

    await page.goto("/publicar");
  });

  test("Then user enters the title, description, price and image", async ({
    page,
  }) => {
    const descripcion = "Ensalada de verduras con papas hervidas";

    await page
      .getByLabel(/titulo de la publicación/i)
      .fill("Ensalada de verduras");
    await page.getByLabel(/precio/i).fill("35.00");

    await page
      .getByTestId("image-publish")
      .setInputFiles("./e2e/dummies/food.jpg");

    await page.getByTestId("description-publish").fill(descripcion);

    await page.getByRole("button", { name: /publicar/i }).click();

    await expect(page).toHaveURL("/");

    const post = await page.getByText(descripcion).last();

    await expect(post).toBeVisible();
  });
});
