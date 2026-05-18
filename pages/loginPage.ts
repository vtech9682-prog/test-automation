import { Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  constructor(page: Page) {
    this.page = page;
  }
 
  get usernameInput() {
    return this.page.getByPlaceholder('Username');
  }

  get passwordInput() {

    return this.page.getByPlaceholder('Password');
  }

  get loginButton() {
    return this.page.getByRole('button', { name: 'Login' });
  }

  get dashboardHeading() {
    return this.page.getByRole('heading', { name: 'Dashboard' });
  }

  async goto() {
    await this.page.goto(this.baseUrl);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }


}
