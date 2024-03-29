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

  await page.goto('http://localhost:5173/login');

  // Wait for the page to be visible.
  await page.waitForLoadState('domcontentloaded');
});

test.afterAll(async () => {
  await electronApp.close();
});

test('login form renders correctly', async () => {
  const emailInput = await page.$('.email');
  const passwordInput = await page.$('.password');
  const submitButton = await page.$('.loginButton');

  expect(emailInput).toBeTruthy();
  expect(passwordInput).toBeTruthy();
  expect(submitButton).toBeTruthy();
});

test('Unvalid credentials', async () => {
  const emailInput = await page.$('.email');
  const passwordInput = await page.$('.password');
  const submitButton = await page.$('.loginButton');

  await emailInput?.fill('test@test.com');
  await passwordInput?.fill('test');
  await submitButton?.click();

  await page.waitForTimeout(1000);

  const error = await page.$('.error');

  expect(error).toBeTruthy();
});

test('Valid credentials', async () => {
  const emailInput = await page.$('.email');
  const passwordInput = await page.$('.password');
  const submitButton = await page.$('.loginButton');

  await emailInput?.fill('srecko.debevc@gmail.com');
  await passwordInput?.fill('Test123');
  await submitButton?.click();

  await page.waitForTimeout(3000);

  const userName = await page.textContent('.user > span');

  expect(userName).toBe('Srečko Debevc');
});
