import { test, expect } from "@playwright/test";
import { SignupPage } from "./pages/SignupPage";

test.describe("tests the signup page", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto("http://localhost:3000/auth/signup");
  });

  test("basic functionality", async ({ page }) => {
    const signupPage = new SignupPage(page);

    await signupPage.signup(
      `test-${Date.now()}@abc.com`,
      `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      "12345678",
    );
    await expect(page.getByText("User created successfully!")).toBeVisible();
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

    const signupPage = new SignupPage(page);

    await signupPage.signup(
      "abc@example.com",
      `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      "12345678",
    );

    const toastMsg = page.getByText(
      "Email already registered! Choose new one!",
    );
    await expect(toastMsg).toBeVisible();
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

    const signupPage = new SignupPage(page);
    await signupPage.signup(
      `test-${Date.now()}@abc.com`,
      "44444444",
      "12345678",
    );

    const toastMsg = page.getByText(
      "Phone no. already registered, choose new one!",
    );
    await expect(toastMsg).toBeVisible();
  });
});
