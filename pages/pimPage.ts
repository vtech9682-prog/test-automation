import { expect, Page } from '@playwright/test';

export class PimPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get pimLink() {
    return this.page.getByRole('link', { name: 'PIM' });
  }

  get addButton() {
    return this.page.getByRole('button', { name: 'Add' });
  }

  get firstNameInput() {
    return this.page.getByPlaceholder('First Name');
  }

  get lastNameInput() {
    return this.page.getByPlaceholder('Last Name');
  }

  get saveButton() {
    return this.page.getByRole('button', { name: 'Save' });
  }

  get personalDetailsHeading() {
    return this.page.getByRole('heading', { name: 'Personal Details' });
  }

  get employeeNameSearchInput() {
    return this.page
      .locator('.oxd-input-group')
      .filter({ has: this.page.locator('label', { hasText: 'Employee Name' }) })
      .locator('input');
  }

  get employeeIdSearchInput() {
    return this.page
      .locator('.oxd-input-group')
      .filter({ has: this.page.locator('label', { hasText: 'Employee Id' }) })
      .locator('input');
  }

  get searchButton() {
    return this.page.getByRole('button', { name: 'Search' });
  }

  get employeeListLink() {
    return this.page.getByRole('link', { name: 'Employee List' });
  }

  async gotoPim() {
    await this.pimLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickAdd() {
    await this.addButton.click();
  }

  async addEmployee(firstName: string, lastName: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);

    const employeeIdInput = this.page
      .locator('.oxd-input-group')
      .filter({ has: this.page.locator('label', { hasText: 'Employee Id' }) })
      .locator('input');

    const employeeIdValue = await employeeIdInput.inputValue();
    await this.saveButton.click();
    return employeeIdValue;
  }

  employeeRowByText(text: string) {
    return this.page.locator('.oxd-table-card').filter({ hasText: text });
  }

  async searchEmployee(employeeName: string) {
    await this.employeeNameSearchInput.fill(employeeName);
    await this.searchButton.click();
  }

  async searchEmployeeById(employeeId: string) {
    await this.employeeIdSearchInput.fill(employeeId);
    await this.searchButton.click();
  }

  async expectEmployeeRow(employeeName: string) {
    await expect(this.employeeRowByText(employeeName).first()).toBeVisible();
  }

  async expectEmployeeRowById(employeeId: string) {
    await expect(this.employeeRowByText(employeeId).first()).toBeVisible();
  }

  async expectPersonalDetails() {
    await expect(this.personalDetailsHeading).toBeVisible();
  }
}
