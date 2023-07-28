import { expect, test } from "@playwright/test";

test.describe("When a user wants see details of a publication", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/papas-fritas-4545");
  });

  test("Then the details should be shown", async ({ page }) => {
    await expect(page.getByTestId("image-food")).toBeVisible();
    await expect(page.getByText("Ensalada de lechuga italiana")).toBeVisible();
    await expect(page.getByText("$25.00")).toBeVisible();
    await expect(page.getByTestId("avatar")).toBeVisible();
    await expect(page.getByText("Descripción")).toBeVisible();
  });

  test("Then if you press the button with the icon to return, the user goes to the index", async ({
    page,
  }) => {
    await page.getByTestId("go-home").click();
    await expect(page).toHaveURL("/");
  });
});
