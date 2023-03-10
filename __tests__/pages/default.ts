import {
	WebElement,
	WebDriver,
	until,
	By,
	IWebDriverCookie,
} from "selenium-webdriver";
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

	async takeScreenshot({
		dirPath,
		title,
	}: {
		dirPath?: string;
		title?: string;
	}): Promise<string> {
		const ss = await this.driver.takeScreenshot(); // Playwright does full page natively, this doesn't. Sucky.

		// Jest uses the location of the config as the rootdir. Thus: './' should start us in the top level of the directory instead of __tests__.
		const path = `${dirPath ?? "./__tests__/data/screenshots"}/${
			title ?? pathStripper(await this.driver.getTitle())
		}.png`;
		fs.writeFileSync(path, ss, {
			encoding: "base64",
		});
		return path;
	}

	getDate(): string {
		return new Date().toLocaleDateString().replace(/\//g, "-");
	}

	find(by: By): WebElement {
		return this.driver.findElement(by);
	}

	async addCookies(
		path: fs.PathLike = "./__tests__/data/secure/auth-state.json",
		cookie?: IWebDriverCookie
	) {
		const json = JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }));
		if (cookie) {
			await this.driver.manage().addCookie(cookie);
		} else {
			for (const storedCookie of json) {
				await this.driver.manage().addCookie(storedCookie);
			}
		}
	}
}
