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

    await email.fill(`test-${Date.now()}@abc.com`);
    await phone.fill(`${Math.floor(1000000000 + Math.random() * 9000000000)}`);
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

  test("shows error when email already registered!", async ({
    page,
    request,
  }) => {
    //Save test data into the database.
    await request.post("/api/auth/signup", {
      data: {
        email: "abc@example.com",
        number: `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        password: "12345678",
      },
    });

    const email = page.getByRole("textbox", { name: "Enter your email" });
    const phone = page.getByRole("textbox", { name: "Enter phone number" });
    const password = page.getByRole("textbox", { name: "Enter password" });
    const submitBtn = page.getByRole("button", { name: "Next", exact: true });

    await email.fill("abc@example.com");
    await phone.fill(`${Math.floor(1000000000 + Math.random() * 9000000000)}`);
    await password.fill("12345678");
    await submitBtn.click();
    //If everything goes well
    const toast = page.getByText("Email already registered! Choose new one!");
    await expect(toast).toBeVisible();
  });

  test("shows error when phone number already registered!", async ({
    page,
    request,
  }) => {
    //Save test data into the database.
    await request.post("/api/auth/signup", {
      data: {
        email: `test-${Date.now()}@abc.com`,
        number: "44444444",
        password: "12345678",
      },
    });

    const email = page.getByRole("textbox", { name: "Enter your email" });
    const phone = page.getByRole("textbox", { name: "Enter phone number" });
    const password = page.getByRole("textbox", { name: "Enter password" });
    const submitBtn = page.getByRole("button", { name: "Next", exact: true });

    await email.fill(`test-${Date.now()}@abc.com`);
    await phone.fill("44444444");
    await password.fill("12345678");
    await submitBtn.click();
    //If everything goes well
    const toast = page.getByText(
      "Phone no. already registered, choose new one!",
    );
    await expect(toast).toBeVisible();
  });
});
