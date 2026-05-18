import { test, expect } from '@playwright/test';


    test('Login, Add Employee, Logout', async ({page}) => {

      // Step 1: Login
      await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      await page.getByPlaceholder('Username').fill('Admin');
      await page.getByPlaceholder('Password').fill('admin123');
      await page.getByRole('button', { name: 'Login' }).click();    
      await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
       
      // Step 2: Add Employee
        await page.getByRole('link', { name: 'PIM' }).click();
        await page.waitForLoadState('load');
        await page.getByRole('button', { name: 'Add' }).click();
        await page.getByPlaceholder('First Name').fill('Jitesh');
        await page.getByPlaceholder('Last Name').fill('jhgh');

// Capture the generated Employee ID
const employeeId =  page
  .locator('.oxd-input-group')
  .filter({ has: page.locator('label', { hasText: 'Employee Id' }) })
  .locator('.oxd-input.oxd-input--active');

const employeeIdValue = await employeeId.inputValue();

     console.log('Generated Employee ID:', employeeIdValue);

        await page.getByRole('button', { name: 'Save' }).click();
        await expect(page.locator('h6', {hasText:'Personal Details'})).toBeVisible();

     // Step 3 : Edit Employee Details
    await page.getByRole('link', { name: 'Employee List' }).click();
    await page.waitForTimeout(5000); // Wait for the employee list to load
    await employeeId.fill(employeeIdValue);

    await page.getByRole('button', { name: 'Search' }).click();
     
    const employee = page.locator('.oxd-table-card').filter({
    hasText: employeeIdValue
});

// Assertion
await expect(employee).toBeVisible();

// Click on that row
await employee.click();

// Assertion
await expect(page.getByPlaceholder('First Name')).toHaveValue('Jitesh');
await expect(page.getByPlaceholder('Last Name')).toHaveValue('jhgh');
await expect(employeeId).toHaveValue(employeeIdValue);

//fill personal details
await page
  .locator('.oxd-input-group')
  .filter({ has: page.locator('label', { hasText: "Driver's License Number" }) })
  .locator('.oxd-input.oxd-input--active').fill('DL123456');        

await page
  .locator('.oxd-input-group')
  .filter({ has: page.locator('label', { hasText: 'License Expiry Date' }) })
  .getByPlaceholder('yyyy-dd-mm').fill('2026-30-12');

await page.locator('.oxd-input-group')
.filter({has: page.locator('label', {hasText: 'Marital Status'})})
.locator('.oxd-select-text').click();

await page.keyboard.press('m');        // opens at 'Married'
await page.keyboard.press('Enter');    // confirms selection

await expect(page
  .locator('.oxd-input-group')
  .filter({ has: page.locator('label', { hasText: /^Marital Status$/ }) })
  .locator('.oxd-select-text-input'))
  .toHaveText('Married');

await page.getByRole('radio', { name: 'Male', exact: true }).check({ force: true });

await expect(page.getByRole('radio', { name: 'Male', exact: true })).toBeChecked();

// Step 1 — Click to open
await page
  .locator('.oxd-input-group')
  .filter({ has: page.locator('label', { hasText: /^Nationality$/ }) })
  .locator('.oxd-select-text-input')
  .click();

// Step 2 — Filter by text inside dropdown (no tag needed!)
await page
  .locator('.oxd-select-dropdown')
  .getByText('American', { exact: true })
  .click();

// Step 3 — Verify
await expect(page
  .locator('.oxd-input-group')
  .filter({ has: page.locator('label', { hasText: /^Nationality$/ }) })
  .locator('.oxd-select-text-input'))
  .toHaveText('American');

// Filter by Required text in same form-actions div
const saveButton = page
  .locator('.oxd-form-actions')
  .filter({ hasText: '* Required' })
  .getByRole('button', { name: 'Save' });

await saveButton.click();



//Restore

await page.getByRole('link', { name: 'PIM' }).click();

await page
  .locator('.oxd-input-group')
  .filter({ has: page.locator('label', { hasText: 'Employee Name' }) })
  .getByPlaceholder('Type for hints...').fill('jitesh');

await page.getByRole('button', { name: 'Search' }).click();

await expect(employee).toBeVisible();

const selectAllCheckbox = page
  .locator('.oxd-table-header-cell .oxd-checkbox-wrapper .oxd-checkbox-input');

await selectAllCheckbox.click();
await expect(page
  .locator('.oxd-table-header-cell .oxd-checkbox-wrapper input[type="checkbox"]'))
  .toBeChecked();

await page.getByRole('button', { name: 'Delete Selected' }).click();
await page.getByRole('button', { name: 'Yes, Delete' }).click();
await expect(employee).not.toBeVisible();







    });