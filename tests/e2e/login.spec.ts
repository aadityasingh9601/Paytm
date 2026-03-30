import { test, expect } from "@playwright/test";

//Test to check the functionality of login page.

test.describe("tests the signin page", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto("http://localhost:3000/auth/signin");
  });

  test("navigation", async ({ page }) => {
    await page.getByRole("button", { name: "No account? Sign up!" }).click();

    await expect(page).toHaveURL("http://localhost:3000/auth/signup");
  });
});
