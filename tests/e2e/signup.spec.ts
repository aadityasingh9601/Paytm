import { test, expect } from "@playwright/test";

test.describe("tests the signup page", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto("http://localhost:3000/auth/signup");
  });

  test("basic functionality", async ({ page }) => {
    const email = page.getByRole("textbox", { name: "Enter your email" });
    const phone = page.getByRole("textbox", { name: "Enter phone number" });
    const password = page.getByRole("textbox", { name: "Enter password" });
    const submitBtn = page.getByRole("button", { name: "Next", exact: true });

    await email.click();
    await email.fill(`test-${Date.now()}@abc.com`);
    await phone.click();
    await phone.fill(`${Math.floor(1000000000 + Math.random() * 9000000000)}`);
    await password.click();
    await password.fill("12345678");
    await submitBtn.click();
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
