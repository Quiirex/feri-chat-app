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

test('home page is loaded correctly', async () => {
  await page.waitForLoadState('domcontentloaded');

  // Check if the container1 element is present
  const container1 = await page.$('.container1');
  expect(container1).not.toBeNull();

  // Check if the sidebar element is present
  const sidebar = await container1?.$('.sidebar');
  expect(sidebar).not.toBeNull();

  // Check if the navbar element is present
  const navbar = await sidebar?.$('.navbar');
  expect(navbar).not.toBeNull();

  // Check if the user element is present
  const user = await navbar?.$('.user');
  expect(user).not.toBeNull();

  // Check if the profile image is present
  const profileImage = await user?.$('img');
  expect(profileImage).not.toBeNull();

  // Check if the user name is present
  const userName = await user?.$('span');
  expect(userName).not.toBeNull();

  // Check if the log out button is present
  const logOutButton = await navbar?.$('#showlogout');
  expect(logOutButton).not.toBeNull();

  // Check if the search element is present
  const search = await sidebar?.$('.search');
  expect(search).not.toBeNull();

  // Check if the search form is present
  const searchForm = await search?.$('.searchForm');
  expect(searchForm).not.toBeNull();

  // Check if the chats element is present
  const chats = await sidebar?.$('.chats');
  expect(chats).not.toBeNull();

  // Check if the user chat element is present
  const userChat = await chats?.$('.userChat');
  expect(userChat).not.toBeNull();

  // Check if the user chat image is present
  const userChatImage = await userChat?.$('img');
  expect(userChatImage).not.toBeNull();

  // Check if the user chat info is present
  const userChatInfo = await userChat?.$('.userChatInfo');
  expect(userChatInfo).not.toBeNull();

  // Check if the user chat name is present
  const userChatName = await userChatInfo?.$('span');
  expect(userChatName).not.toBeNull();

  // Check if the user chat message is present
  const userChatMessage = await userChatInfo?.$('.message');
  expect(userChatMessage).not.toBeNull();

  // Check if the chat element is present
  const chat = await container1?.$('.chat');
  expect(chat).not.toBeNull();

  // Check if the chat info element is present
  const chatInfo = await chat?.$('.chatInfo');
  expect(chatInfo).not.toBeNull();

  // Check if the messages element is present
  const messages = await chat?.$('.messages');
  expect(messages).not.toBeNull();

  // Check if the no messages element is present
  const noMessages = await messages?.$('.noMessages');
  expect(noMessages).not.toBeNull();

  // Check if the input element is present
  const input = await chat?.$('.input');
  expect(input).not.toBeNull();

  // Check if the message input element is present
  const messageInput = await input?.$('input[type="text"]');
  expect(messageInput).not.toBeNull();

  // Check if the send button is present
  const sendButton = await input?.$('.send button');
  expect(sendButton).not.toBeNull();

  // Check if the file input element is present
  const fileInput = await input?.$('input[type="file"]');
  expect(fileInput).not.toBeNull();

  // Check if the emoji picker element is present
  const emojiPicker = await input?.$('.emoji-picker');
  expect(emojiPicker).not.toBeNull();
});

test('user can be searched for', async () => {
  await page.waitForLoadState('domcontentloaded');

  const searchInput = await page.$('.searchForm input[type="text"]');

  await searchInput?.fill('Luka Mlinarič');

  await page.waitForTimeout(1000);

  const searchResult = await page.textContent('.userChatInfo span');

  expect(searchResult).toBe('Luka Mlinarič');
});

test('user can send a message', async () => {
  await page.waitForLoadState('domcontentloaded');

  const selectedUser = await page.$('.chats .userChat');
  await selectedUser?.click();

  const messageInput = await page.$('.input input[type="text"]');
  const sendButton = await page.$('.input .send button:last-child');

  await messageInput?.fill('Test message');
  await sendButton?.click();

  await page.waitForTimeout(1000);

  const message = await page.textContent(
    '.messages .message.owner:last-child .messageContent'
  );

  expect(message).toBe('Test message');
});

test('user can send a message with an emoji', async () => {
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

test('user can log out', async () => {
  await page.waitForLoadState('domcontentloaded');

  const logOutButton = await page.$(
    'div.user:nth-child(2) > button:nth-child(1)'
  );
  await logOutButton?.click();

  await page.waitForTimeout(1000);

  const loginPage = await page.textContent('.logo');

  expect(loginPage).toBe(' FERI Chat ');
});
