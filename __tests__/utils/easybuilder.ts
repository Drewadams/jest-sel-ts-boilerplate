import { Builder, ThenableWebDriver } from "selenium-webdriver";
import { Options as ChromeOptions } from "selenium-webdriver/chrome";
import { Options as FFOptions } from "selenium-webdriver/firefox";

interface ViewportSize {
	width: number;
	height: number;
}
interface BuildOptions {
	viewport?: ViewportSize;
	headless?: boolean;
}

/**
 * Lets you easily build a webdriver.
 * @example const driver = EasyBuild({ driver: "chrome", options: ChromeOptions })
 * @param builder {driver: "chrome" | "firefox", options: ChromeOptions | FFOptions}
 * @returns TheneableWebDriver
 */
export class EasyBuilder extends Builder {
	options;
	constructor(options?: ChromeOptions | FFOptions | undefined) {
		super();
		this.options = options;
	}

	buildChrome({ viewport, headless }: BuildOptions = {}): ThenableWebDriver {
		require("chromedriver");
		if (viewport) {
			const browserOptions = new ChromeOptions().windowSize(viewport);
			if (headless) {
				browserOptions.headless();
			}
			return this.forBrowser("chrome").setChromeOptions(browserOptions).build();
		}
		return this.forBrowser("chrome").build();
	}

	buildFirefox({ viewport, headless }: BuildOptions = {}): ThenableWebDriver {
		require("geckodriver");
		if (viewport) {
			const browserOptions = new FFOptions().windowSize(viewport);
			if (headless) {
				browserOptions.headless();
			}
			return this.forBrowser("firefox")
				.setFirefoxOptions(browserOptions)
				.build();
		}
		return this.forBrowser("firefox").build();
	}

	/**
	 *
	 * @param viewport: Size of viewport.
	 * @param headless: Boolean - whether to run browsers headless.
	 * @returns
	 */
	buildCrossBrowser({ viewport, headless }: BuildOptions = {}): Array<{
		browserName: "chrome" | "firefox";
		driver: ThenableWebDriver;
	}> {
		require("geckodriver");
		require("chromedriver");

		let ffOptions = new FFOptions();
		let cOptions = new ChromeOptions();
		if (viewport) {
			ffOptions.windowSize(viewport);
			cOptions.windowSize(viewport);
			if (headless) {
				ffOptions.headless();
				cOptions.headless();
			}
		}
		return [
			{
				browserName: "chrome",
				driver: this.forBrowser("chrome").setChromeOptions(cOptions).build(),
			},
			{
				browserName: "firefox",
				driver: this.forBrowser("firefox").setFirefoxOptions(ffOptions).build(),
			},
		];
	}
}
