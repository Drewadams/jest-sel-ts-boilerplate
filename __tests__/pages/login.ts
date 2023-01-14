import { WebElement, WebDriver, By, until } from "selenium-webdriver";
import DefaultPage from "./default";

export default class LoginPage extends DefaultPage {
	driver: WebDriver;
	emailInput: WebElement;
	passwordInput: WebElement;
	submitButton: WebElement;

	constructor(driver: WebDriver) {
		super(driver);
		this.driver = driver; // For clarity - even though its included in super.
		this.emailInput = driver.findElement(By.id("signin-email"));
		this.passwordInput = driver.findElement(By.id("signin-password"));
		this.submitButton = driver.findElement(
			By.xpath(
				'//div[contains(@class, "flex-sm-12 flex-6")]/button[@type="submit" and contains(text(), "Sign In")]'
			)
		);
	}

	async goto(): Promise<string> {
		const path = `${process.env.BASE_URL}/login`;
		console.log("Navigating to: " + path);
		await this.driver.get(path);
		await this.driver.wait(until.elementIsVisible(this.emailInput));
		return path;
	}

	async logIn(params: { email?: string; pass?: string }) {
		const email = params?.email ?? "drewistesting+automated@gmail.com";
		const pass = params?.pass ?? "qwertyuiop";
		if (!(await this.emailInput.isDisplayed())) {
			await this.goto();
		}
		await this.emailInput.sendKeys(email);
		await this.passwordInput.sendKeys(pass);
		await this.submitButton.click();
		const url = await this.driver.getCurrentUrl();
		expect(url).toBe("");
	}
}
