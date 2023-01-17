import { EasyBuilder } from "./utils/easybuilder";
import LoginPage from "./pages/login";
import { Options as ChromeOptions } from "selenium-webdriver/chrome";
import { ThenableWebDriver } from "selenium-webdriver";
import { rmSync, existsSync } from "fs";

const screenSize = {
	width: 1920 * 0.9,
	height: 1080 * 0.9,
};

// jest.setTimeout(30000);

let driver: ThenableWebDriver;
let page: LoginPage;
const authPath = "./__tests__/data/secure/auth-state.json";

beforeAll(() => {
	if (existsSync(authPath)) {
		rmSync(authPath);
	}
});

beforeEach(async () => {
	// const options = new ChromeOptions().headless().windowSize(screenSize).addArguments("--start-maximized");
	driver = new EasyBuilder().buildChrome({
		viewport: screenSize,
		headless: true,
	});
	page = new LoginPage(driver);
});

test("Chrome: Login", async () => {
	await page.goto();
	await page.takeScreenshot({ title: "pre-login" });
	await page.logIn({ saveState: true });
	await page.takeScreenshot({ title: "post-login" });
	await driver.quit();
});

test("Reused state", async () => {
	await page.driver.get("https://leanin.org");
	await page.addCookies();
	await page.driver.navigate().refresh();
	await page.takeScreenshot();
	await driver.quit();
});
