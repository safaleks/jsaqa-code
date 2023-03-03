const { connect } = require("puppeteer");

let page;


describe("Github page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });

  afterEach(() => {
    page.close();
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub for teams · Build like the best teams on the planet · GitHub");
  }, 10000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 10000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg.btn-muted-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Sign up for free");
  }, 10000);
});

describe("Puppeteer before and after hooks", () => {

  jest.setTimeout(50000);

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/login");
  });

  afterEach(async () => {
    page.close();
  });

  test("The h1 header content'", async () => {
    await page.waitForSelector("h1");
    const title = await page.title();
    expect(title).toEqual("Sign in to GitHub · GitHub");
  }, 10000);

  test("The h1 header content'", async () => {
    const link = await page.$("a[href^='/site/terms']");
    await link.click();
    await page.waitForTimeout(1000);
    await page.waitForSelector("h1");
    const title3 = await page.title();
    expect(title3).toEqual("GitHub Terms of Service - GitHub Docs");
  }, 10000);

  test("The h1 security header content'", async () => {
    const link = await page.$("a[href^='/security']");
    await link.click();
    await page.waitForTimeout(10000);
    const title4 = await page.title();
    expect(title4).toEqual("GitHub Security · GitHub");
  }, 30000);
});
