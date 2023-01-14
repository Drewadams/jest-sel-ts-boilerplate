import { WebElement, WebDriver, until, Locator } from "selenium-webdriver";

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

	async waitForElementLocated(element: Locator): Promise<WebElement> {
		try {
			await this.driver.wait(until.elementLocated(element));
		} catch (err) {
			if (err instanceof Error) {
				throw err;
			}
		}
		return this.driver.findElement(element);
	}
}
