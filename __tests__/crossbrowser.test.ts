import { EasyBuilder } from "./utils/easybuilder";
import LoginPage from "./pages/login";
import { rmSync, existsSync, readdir } from "fs";
import { addAttach } from "jest-html-reporters/helper";

const screenSize = {
	width: 1920 * 0.9,
	height: 1080 * 0.9,
};

// jest.setTimeout(30000);

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

describe("Crossbrowser tests for Login", () => {
	const driverArray = new EasyBuilder().buildCrossBrowser({
		viewport: screenSize,
		headless: true,
	});

	for (const { browserName, driver } of driverArray) {
		// Can't run concurrently for some reason?

		test(`${browserName}: Crossbrowser login`, async () => {
			page = new LoginPage(driver);
			await page.goto();
			let reportImagePath = await page.takeScreenshot({
				dirPath: ssPath,
				title: `${browserName}-prelogin`,
			});
			await addAttach({
				attach: reportImagePath,
				description: "Pre-login screenshot",
			});
			await page.logIn();

			reportImagePath = await page.takeScreenshot({
				dirPath: ssPath,
				title: `${browserName}-postlogin`,
			});
			await addAttach({
				attach: reportImagePath,
				description: "Post-login screenshot",
			});
			await driver.quit();
		});
	}
});

// test("Unfortunate crossbrowser run", async () => {
// 	const driverArray = new EasyBuilder().buildCrossBrowser({
// 		viewport: screenSize,
// 		headless: true,
// 	});
// 	for (const { browserName, driver } of driverArray) {
// 		page = new LoginPage(driver);
// 		await page.goto();
// 		await page.takeScreenshot({
// 			dirPath: ssPath,
// 			title: `${browserName}-prelogin`,
// 		});
// 		await page.logIn();
// 		await page.takeScreenshot({
// 			dirPath: ssPath,
// 			title: `${browserName}-postlogin`,
// 		});
// 		await driver.quit();
// 	}
// });
