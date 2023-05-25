import {
    ElectronApplication,
    Page, _electron as electron,
    test,
    expect
} from '@playwright/test';

let electronApp: ElectronApplication

let page: Page;

test.beforeAll(async () => {
    // Launch Electron app.
    electronApp = await electron.launch({ args: ['dist-electron/main/index.js'] });

    // Evaluation expression in the Electron context.
     await electronApp.evaluate(async ({ app }) => {
        // This runs in the main Electron process, parameter here is always
        // the result of the require('electron') in the main app script.
        return app.getAppPath();
    });

    // Get the first window that the app opens, wait if necessary.
    page = await electronApp.firstWindow();

    // Wait for the page to be visible.
     await page.waitForLoadState('domcontentloaded');
})

test.afterAll(async () => {
    await electronApp.close();
})

test('Show correct title', async () => {
    expect(await page.title()).toContain('FERI Chat 0.1.0')
});
  