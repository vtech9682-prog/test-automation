import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { PageManager } from '../pages/pageManager';

test.describe('OrangeHRM login page object', () => {
  test('should log in successfully and display the dashboard', async ({ page }) => {
    //const loginPage = new LoginPage(page);
    const pm = new PageManager(page);
    await pm.loginPage.goto();
    await pm.loginPage.login('Admin', 'admin123');
    await expect(pm.loginPage.dashboardHeading).toBeVisible();
    });

});
