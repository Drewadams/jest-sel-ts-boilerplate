import { WebElement, WebDriver, until, By } from "selenium-webdriver";
import * as fs from "fs";
import { config } from "dotenv";
import pathStripper from "../utils/pathStripper";

config();

export default class DefaultPage {
	driver: WebDriver;

	constructor(driver: WebDriver) {
		this.driver = driver;
	}

	async waitForVisible(element: WebElement): Promise<WebElement> {
		try {
			await this.driver.wait(until.elementIsVisible(element));
		} catch (err) {
			if (err instanceof Error) {
				throw err;
			}
		}
		return element;
	}

	async takeScreenshot(options?: { path?: string; title?: string }) {
		const ss = await this.driver.takeScreenshot(); // Playwright does full page natively, this doesn't. Sucky.

		// Jest uses the location of the config as the rootdir. Thus: './' should start us in the top level of the directory instead of __tests__.
		fs.writeFileSync(
			options?.path ??
				`./__tests__/data/screenshots/${
					options?.title ?? pathStripper(await this.driver.getTitle())
				}.png`,
			ss,
			{
				encoding: "base64",
			}
		);
	}

	getDate(): string {
		return new Date().toLocaleDateString().replace(/\//g, "-");
	}

	find(by: By): WebElement {
		return this.driver.findElement(by);
	}
}
