import {expect, test} from '@playwright/test';

test('Calendar selection for OrangeHRM', async ({page}) => {
  // Navigate to the OrangeHRM login page
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Log in to the application
 await page.getByPlaceholder('Username').fill('Admin');
 await page.getByPlaceholder('Password').fill('admin123');
 await page.getByRole('button', {name: 'Login'}).click();

 await expect(page.getByRole('heading', {name: 'Dashboard'})).toBeVisible();
 await page.getByRole('link', {name: 'PIM'}).click();

  const employeeId = page.locator('.oxd-input-group')
 .filter({has: page.locator('label', {hasText: 'Employee Id'})})
 .locator('.oxd-input.oxd-input--active');

 const employeeIdValue = '1020';

 await expect(page.getByRole('heading', {name: 'PIM', exact: true})).toBeVisible();

  const employee = page.locator('.oxd-table-card').filter({hasText: employeeIdValue});

 await expect(employee).toBeVisible();

 await employee.click();

 await expect(page.getByRole('heading', {name: 'Personal Details'})).toBeVisible();


 const yearOfBirth = '1997';
 const monthOfBirth = 'Jan';
 const dayOfBirth = '15';

 const calendar = page.locator('.oxd-input-group')
    .filter({has: page.locator('label', {hasText: 'Date of Birth'})})
    .getByPlaceholder('yyyy-dd-mm');

    await calendar.click();
    const calendarWidget = page.locator('.oxd-date-input-calendar');
    await calendarWidget.waitFor({state: 'visible'});
    await calendarWidget.getByText('2026').click();
    await calendarWidget.getByText(yearOfBirth).click();
    await calendarWidget.getByText('May').click();
    await calendarWidget.getByText(monthOfBirth).click();
    await calendarWidget.getByText(dayOfBirth).click();

    
    const monthNumber = new Date(`${monthOfBirth} 1 2000`).getMonth() + 1;
    const monthPadded = String(monthNumber).padStart(2, '0');
    await expect(calendar).toHaveValue(`${yearOfBirth}-${dayOfBirth}-${monthPadded}`);



});

