const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const {
  email,
  password,
  incorrectEmail,
  incorrectPassport,
} = require("../user");

/* test("test", async ({ page }) => {
  // Go to https://netology.ru/free/management#/
  await page.goto("https://netology.ru/free/management#/");

  // Click a
  await page.click("a");
  await expect(page).toHaveURL("https://netology.ru/");

  // Click text=Учиться бесплатно
  await page.click("text=Учиться бесплатно");
  await expect(page).toHaveURL("https://netology.ru/free");

  page.click("text=Бизнес и управление");

  // Click text=Как перенести своё дело в онлайн
  await page.click("text=Как перенести своё дело в онлайн");
  await expect(page).toHaveURL(
    "https://netology.ru/programs/kak-perenesti-svoyo-delo-v-onlajn-bp"
  ); */

test("Успех", async ({ page }) => {
  // Go to https://netology.ru
  await page.goto('https://netology.ru/');
  await page.getByRole('link', { name: 'Войти' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(password);
  await page.getByTestId('login-submit-btn').click();
  await expect(page).toHaveURL("https://netology.ru/profile");
  await expect(page.locator('//*[@class="src-components-pages-Profile-Programs--title--Kw5NH"]')).toHaveText("Мои курсы и профессии")
});

test("Провал", async ({ page }) => {
  // Go to https://netology.ru
  await page.goto('https://netology.ru/');
  await page.getByRole('link', { name: 'Войти' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(incorrectEmail);
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(incorrectPassport);
  await page.getByTestId('login-submit-btn').click();
  await expect(page.getByTestId('login-error-hint')).toHaveText("Вы ввели неправильно логин или пароль")
});