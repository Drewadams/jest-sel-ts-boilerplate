import { EasyBuilder } from "./utils/easybuilder";
import LoginPage from "./pages/login";
import { ThenableWebDriver } from "selenium-webdriver";
import { rmSync, existsSync, readdir } from "fs";

const screenSize = {
	width: 1920 * 0.9,
	height: 1080 * 0.9,
};

// jest.setTimeout(30000);

let driver: ThenableWebDriver;
let page: LoginPage;
const authPath = "./__tests__/data/secure/auth-state.json";
const ssPath = "./__tests__/data/screenshots/login";

beforeAll(() => {
	if (existsSync(authPath)) {
		rmSync(authPath);
	}
	readdir(ssPath, (err, files) => {
		if (err) throw err;
		for (const file of files) {
			rmSync(ssPath + "/" + file);
		}
	});
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
	await page.takeScreenshot({ dirPath: ssPath, title: "pre-login" });
	await page.logIn({ saveState: true });
	await page.takeScreenshot({ dirPath: ssPath, title: "post-login" });
	await driver.quit();
});

test("Reused state", async () => {
	await page.driver.get("https://leanin.org");
	await page.addCookies();
	await page.driver.navigate().refresh();
	await page.takeScreenshot({
		dirPath: ssPath,
		title: "reused-state-home",
	});
	await driver.quit();
});
