import { expect, test } from '@playwright/test';
import { PageManager } from '../pages/pageManager';

test.describe('OrangeHRM PIM page object', () => {
  test('should add a new employee and find them in Employee List', async ({ page }) => {
    const pm = new PageManager(page);
    const testData = pm.dataUtils.generateEmployeeData();

    await pm.loginPage.goto();
    await pm.loginPage.login('Admin', 'admin123');
    await expect(pm.loginPage.dashboardHeading).toBeVisible();

    await pm.pimPage.gotoPim();
    await pm.pimPage.clickAdd();

    const employeeId = await pm.pimPage.addEmployee(testData.firstName, testData.lastName);
    await pm.pimPage.expectPersonalDetails();

    await pm.pimPage.gotoPim();
    await pm.pimPage.employeeListLink.click();
    await pm.pimPage.searchEmployeeById(employeeId);
    await pm.pimPage.expectEmployeeRowById(employeeId);

  });
});
