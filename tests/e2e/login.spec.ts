import { test, expect } from "@playwright/test";

//Test to check the functionality of login page.

test.describe("tests the signin page", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto("http://localhost:3000/auth/signin");
  });

  test("basic functionality", async ({ page, request }) => {
    //Save test data into the database.
    await request.post("/api/auth/signup", {
      data: {
        email: "xyz@example.com",
        number: "00000000",
        password: "12345678",
      },
    });

    const phone = page.getByRole("textbox", { name: "Enter phone number" });
    const password = page.getByRole("textbox", { name: "Enter password" });
    const submitBtn = page.getByRole("button", { name: "Next", exact: true });

    await phone.fill("00000000");
    await password.fill("12345678");
    await submitBtn.click();
    //What you can do more is to test the redirect url logic conditionally, /setup if account not setup, then /dashboard
    //if account is setup alredy. Maybe use 2 tests for it.
    const toast = page.getByText("Logged in successfully!");
    await expect(toast).toBeVisible();

    //await expect(page).toHaveURL("http://localhost:3000/auth/signin");
  });

  test("navigation", async ({ page }) => {
    await page.getByRole("button", { name: "No account? Sign up!" }).click();
    await expect(page).toHaveURL("http://localhost:3000/auth/signup");
  });

  test("shows error if user doesn't exists!", async ({ page }) => {
    const phone = page.getByRole("textbox", { name: "Enter phone number" });
    const password = page.getByRole("textbox", { name: "Enter password" });
    const submitBtn = page.getByRole("button", { name: "Next", exact: true });

    await phone.fill(`${Math.floor(1000000000 + Math.random() * 9000000000)}`);
    await password.fill("12345678");
    await submitBtn.click();

    const toast = page.getByText("Invalid credentials!");
    await expect(toast).toBeVisible();
  });

  test("shows error when password is incorrect!", async ({ page, request }) => {
    //Save test data into the database.
    await request.post("/api/auth/signup", {
      data: {
        email: `test-${Date.now()}@abc.com`,
        number: "44444444",
        password: "12345678",
      },
    });

    const phone = page.getByRole("textbox", { name: "Enter phone number" });
    const password = page.getByRole("textbox", { name: "Enter password" });
    const submitBtn = page.getByRole("button", { name: "Next", exact: true });

    await phone.fill("44444444");
    await password.fill("12345677");
    await submitBtn.click();

    const toast = page.getByText("Incorrect password!");
    await expect(toast).toBeVisible();
  });
});
