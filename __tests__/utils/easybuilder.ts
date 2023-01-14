require("chromedriver");
require("geckodriver");
import { Builder, ThenableWebDriver } from "selenium-webdriver";
import { Options as ChromeOptions } from "selenium-webdriver/chrome";
import { Options as FFOptions } from "selenium-webdriver/firefox";

export default function EasyBuild(
	driver: "chrome" | "firefox",
	options?: ChromeOptions | FFOptions
): ThenableWebDriver {
	if (driver === "chrome") {
		return new Builder()
			.forBrowser("chrome")
			.setChromeOptions(options as ChromeOptions)
			.build();
	}

	if (driver === "firefox") {
		return new Builder()
			.forBrowser("firefox")
			.setFirefoxOptions(options as FFOptions)
			.build();
	}

	throw new Error("Driver not specified.");
}
