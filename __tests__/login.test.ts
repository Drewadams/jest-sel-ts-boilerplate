import EasyBuild from "./utils/easybuilder";
import LoginPage from "./pages/login";
import { Options } from "selenium-webdriver/chrome";

const screenSize = {
	width: 1920 * 0.9,
	height: 1080 * 0.9,
};

// jest.setTimeout(30000);

test("Chrome: Login", async () => {
	const options = new Options().headless().windowSize(screenSize); //.addArguments("--start-maximized");
	const driver = EasyBuild("chrome", options);
	const page = new LoginPage(driver);
	await page.goto();
	await page.takeScreenshot({ title: "pre-login" });
	await page.logIn({ saveState: true });
	await page.takeScreenshot({ title: "post-login" });
	await driver.quit();
});

test("test 2", async () => {
	console.log("second test ran");
});
