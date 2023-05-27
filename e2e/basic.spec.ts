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
  electronApp = await electron.launch({
    args: ['dist-electron/main/index.js'],
  });

  await electronApp.evaluate(async ({ app }) => {
    return app.getAppPath();
  });

  page = await electronApp.firstWindow();

  await page.goto('http://localhost:5173/login');

  await page.waitForLoadState('domcontentloaded');
});

test.afterAll(async () => {
  await electronApp.close();
});

test('Show correct title', async () => {
  expect(await page.title()).toContain('FERI Chat 0.1.0');
});

test('Show correct login form title', async () => {
  expect(await page.textContent('.loginButton')).toBe('Login');
});

test('Login title', async () => {
  expect(await page.textContent('.logo')).toBe(' FERI Chat ');
});

test('Login form', async () => {
  expect(await page.textContent('.login')).toBeTruthy();
});

test('Credentials are empty', async () => {
  const loginButton = await page.$('.loginButton');
  await loginButton?.click();
  await page.waitForTimeout(1000);
  expect(await page.textContent('.error')).toBe(' Invalid credentials ');
});

test('Menu appear', async () => {
  expect(await page.textContent('#menu-bar')).toBeTruthy();
});
