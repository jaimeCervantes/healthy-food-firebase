import { test, expect } from "@playwright/test";
import { login } from "./functions/login";

test.describe("When the user login wants to look her profile ", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);

    await page.goto("/usuario/example-user-id");
  });

  test("Then there must be an avatar, a user name, an email, a phone number and a 'Cerrar sesión' button", async ({
    page,
  }) => {
    await expect(page.getByTestId("icon-avatar")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Example User" }),
    ).toBeVisible();
    await expect(page.getByText("user@example.com")).toBeVisible();
    await expect(page.getByText("Numero de telefono:")).toBeVisible();
    await expect(page.getByText("Cerrar sesión")).toBeVisible();
  });

  test("Then if push button 'Cerrar sesión', user go to index and can't publish", async ({
    page,
  }) => {
    await page.getByText("Cerrar sesión").click();
    await expect(page.getByText("Bienvenido.")).toBeVisible();
    await page.goto("/publish");
    await expect(page.getByText("INICIAR SESIÓN")).toBeVisible();
  });
});
