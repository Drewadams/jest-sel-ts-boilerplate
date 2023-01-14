require("chromedriver");
import { Builder, By, until } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

const screenSize = {
	width: 640,
	height: 480,
};

test("should first", async () => {
	// const options = new Options().headless().windowSize(screenSize);
	const driver = new Builder()
		.forBrowser("chrome")
		// .setChromeOptions(options)
		.build();
	await driver.get("https://leanin.org/login?next=https://leanin.org/#signin");

	await driver.quit();
});

/*
	Add in some clicks and a form submit. 
*/
