import { Builder, ThenableWebDriver } from "selenium-webdriver";
import { Options as ChromeOptions } from "selenium-webdriver/chrome";
import { Options as FFOptions } from "selenium-webdriver/firefox";

interface ChromeBuilder {
	driver: "chrome";
	options?: ChromeOptions;
}

interface FFBuilder {
	driver: "firefox";
	options?: FFOptions;
}

/**
 * Lets you easily build a webdriver.
 * @example const driver = EasyBuild({ driver: "chrome", options: ChromeOptions })
 * @param builder {driver: "chrome" | "firefox", options: ChromeOptions | FFOptions}
 * @returns TheneableWebDriver
 */

// export default function EasyBuild(
// 	builder: ChromeBuilder | FFBuilder
// ): ThenableWebDriver {
// 	if (builder.driver === "chrome") {
// 		return new Builder()
// 			.forBrowser("chrome")
// 			.setChromeOptions(builder.options as ChromeOptions)
// 			.build();
// 	}

// 	if (builder.driver === "firefox") {
// 		return new Builder()
// 			.forBrowser("firefox")
// 			.setFirefoxOptions(builder.options as FFOptions)
// 			.build();
// 	}

// 	throw new Error("Driver not found.");
// }

export class EasyBuilder extends Builder {
	options;
	constructor(options?: ChromeOptions | FFOptions | undefined) {
		super();
		this.options = options;
	}

	buildChrome(): ThenableWebDriver {
		require("chromedriver");
		return this.forBrowser("chrome")
			.setChromeOptions(this.options as ChromeOptions)
			.build();
	}

	buildFirefox(): ThenableWebDriver {
		require("geckodriver");
		return this.forBrowser("firefox")
			.setFirefoxOptions(this.options as FFOptions)
			.build();
	}
}
