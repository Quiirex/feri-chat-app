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

test('user logs in correctly', async () => {
    const emailInput = await page.$('.email');
    const passwordInput = await page.$('.password');
    const submitButton = await page.$('.loginButton');

    await emailInput?.fill('mojca.pokr@gmail.com');
    await passwordInput?.fill('mojcapokr');
    await submitButton?.click();

    await page.waitForTimeout(3000);

    const userName = await page.textContent('.user > span');

    expect(userName).toBe('Mojca Pokraculja');
});

test('emoji picker exists', async () => {
    await page.waitForLoadState('domcontentloaded');
    const container1 = await page.$('.container1');
    const chat = await container1?.$('.chat');
    const input = await chat?.$('.input');
    const emojiPicker = await input?.$('.emoji-picker');
    expect(emojiPicker).not.toBeNull();
});

test('send message with emoji', async () => {
    await page.waitForLoadState('domcontentloaded');

    const selectedUser = await page.$('.chats .userChat');
    await selectedUser?.click();

    const messageInput = await page.$('.input input[type="text"]');
    const emojiButton = await page.$('.input .send .emoji-picker + button');
    const emoji = await page.$(
        'li.epr-emoji-category:nth-child(2) > div:nth-child(2) > button:nth-child(1)'
    );
    const sendButton = await page.$('.input .send button:last-child');

    await messageInput?.fill('Test message 😀');
    await emojiButton?.click();
    await page.waitForTimeout(1000);
    await emoji?.click();
    await page.waitForTimeout(1000);
    await sendButton?.click();

    await page.waitForTimeout(1000);

    const message = await page.textContent(
        '.messages .message.owner:last-child .messageContent'
    );

    expect(message).toBe('Test message 😀');
});


test('user can send a message with enter', async () => {
    await page.waitForLoadState('domcontentloaded');
  
    const selectedUser = await page.$('.chats .userChat');
    await selectedUser?.click();
  
    const messageInput = await page.$('.input input[type="text"]');
    const sendButton = await page.$('.input .send button:last-child');
  
    await messageInput?.fill('Test message sent with enter');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
  
    const message = await page.textContent(
      '.messages .message.owner:last-child .messageContent'
    );
  
    expect(message).toBe('Test message sent with enter');
  });

// test('send urgent message', async () => {
//     await page.waitForLoadState('domcontentloaded');
//     const selectedUser = await page.$('.chats .userChat');
//     await selectedUser?.click();

//     const messageInput = await page.$('.input input[type="text"]');
//     const sendButton = await page.$('.input .send button:last-child');

//     await messageInput?.fill('Test message 😀');

//     await sendButton?.click({ button: 'right' });
//     await page.waitForTimeout(1000);

//     page.on('dialog', async (dialog) => {
//         if (dialog.type() === 'confirm') {
//             await dialog.accept();
//         }
//     });
//     await page.waitForTimeout(1000);

//     const message = await page.textContent(
//         '.messages .message.owner:last-child .messageContent'
//     );
//     expect(message).toContain('Test message 😀');
// });

