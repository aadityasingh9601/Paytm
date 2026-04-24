import { Page } from "@playwright/test";

export class SigninPage {
  constructor(private page: Page) {}

  // Element selectors defined once

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

  async signin(phone: string, password: string) {
    await this.phoneInput.fill(phone);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
