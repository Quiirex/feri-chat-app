import {
  ElectronApplication,
  Page,
  _electron as electron,
  expect,
  test,
} from '@playwright/test';

let electronApp: ElectronApplication;

let page: Page;

test.beforeAll(async () => {
  // Launch Electron app.
  electronApp = await electron.launch({
    args: ['dist-electron/main/index.js'],
  });

  // Evaluation expression in the Electron context.
  await electronApp.evaluate(async ({ app }) => {
    // This runs in the main Electron process, parameter here is always
    // the result of the require('electron') in the main app script.
    return app.getAppPath();
  });

  // Get the first window that the app opens, wait if necessary.
  page = await electronApp.firstWindow();

  await page.goto('http://localhost:5173/register');

  // Wait for the page to be visible.
  await page.waitForLoadState('domcontentloaded');
});

test.afterAll(async () => {
  await electronApp.close();
});

test('register valid', async () => {
  const firstNameInput = await page.$('.firstname');
  const lastNameInput = await page.$('.lastname');
  const emailInput = await page.$('.email');
  const passwordInput = await page.$('.password');
  const confirmPasswordInput = await page.$('.passwordAgain');
  const submitButton = await page.$('.registerButton');
  expect(firstNameInput).toBeTruthy();
  expect(lastNameInput).toBeTruthy();
  expect(emailInput).toBeTruthy();
  expect(passwordInput).toBeTruthy();
  expect(confirmPasswordInput).toBeTruthy();
  expect(submitButton).toBeTruthy();
});

test('register invalid', async () => {
  const emailInput = await page.$('.email');

  await emailInput?.fill('test');

  const error = await page.$('.error');
  expect(error).toBeTruthy();
});
