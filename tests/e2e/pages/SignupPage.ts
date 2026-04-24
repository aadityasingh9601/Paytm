import { Page } from "@playwright/test";

export class SignupPage {
  constructor(private page: Page) {}

  // Element selectors defined once
  get emailInput() {
    return this.page.getByRole("textbox", { name: "Enter your email" });
  }

  get phoneInput() {
    return this.page.getByRole("textbox", { name: "Enter phone number" });
  }

  get passwordInput() {
    return this.page.getByRole("textbox", { name: "Enter password" });
  }

  get submitButton() {
    return this.page.getByRole("button", { name: "Next", exact: true });
  }

  // Actions
  //   async goto() {
  //     await this.page.goto('/signup');
  //   }

  async signup(email: string, phone: string, password: string) {
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
