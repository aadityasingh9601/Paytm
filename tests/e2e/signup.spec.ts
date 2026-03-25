import { test, expect } from "@playwright/test";

//Test to check the functionality of login page.

test.describe("tests the signup page", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto("http://localhost:3000/auth/signup");
  });

  test("basic functionality", async ({ page }) => {
    await page.getByRole("textbox", { name: "Enter your email" }).click();
    await page
      .getByRole("textbox", { name: "Enter your email" })
      .fill("test@abcdef.com");
    await page.getByRole("textbox", { name: "Enter phone number" }).click();
    await page
      .getByRole("textbox", { name: "Enter phone number" })
      .fill("1234567807");
    await page.getByRole("textbox", { name: "Enter password" }).click();
    await page
      .getByRole("textbox", { name: "Enter password" })
      .fill("12345678");
    await page.getByRole("button", { name: "Next", exact: true }).click();
    //If everything goes well
    await expect(page).toHaveURL("http://localhost:3000/auth/signin");
  });

  test("navigation", async ({ page }) => {
    await page
      .getByRole("button", { name: "Existing account? Log in!" })
      .click();

    await expect(page).toHaveURL("http://localhost:3000/auth/signin");
  });
});
