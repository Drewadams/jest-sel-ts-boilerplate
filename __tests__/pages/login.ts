import { PathLike, writeFileSync } from "fs";
import { WebDriver, By, until } from "selenium-webdriver";
import DefaultPage from "./default";

interface LoginParams {
	email?: string;
	pass?: string;
	saveState?: true | PathLike;
}
export default class LoginPage extends DefaultPage {
	driver: WebDriver;
	passwordInput = By.id("signin-password");
	emailInput = By.id("signin-email");
	submitButton = By.xpath(
		'//div[contains(@class, "flex-sm-12 flex-6")]/button[@type="submit" and contains(text(), "Sign In")]'
	);

	constructor(driver: WebDriver) {
		super(driver);
		this.driver = driver; // For clarity - even though its included in super.
	}

	async goto(): Promise<string> {
		const path = `${process.env.BASE_URL}/login#signin`;
		console.log("Navigating to: " + path);
		await this.driver.get(path);
		await this.driver.wait(
			until.elementIsVisible(this.driver.findElement(this.emailInput))
		);

		return path;
	}

	async logIn({ email, pass, saveState }: LoginParams = {}): Promise<{
		user: User;
		statePath?: PathLike;
	}> {
		email = email ?? (process.env.EMAIL as string);
		pass = pass ?? (process.env.PASSWORD as string);
		if (!(await this.driver.findElement(this.emailInput).isDisplayed())) {
			await this.goto();
		}
		await this.find(this.emailInput).sendKeys(email);
		await this.find(this.passwordInput).sendKeys(pass);
		await this.find(this.submitButton).click();
		await this.driver.wait(
			until.titleIs(
				"Fostering Women’s Leadership & Workplace Inclusion | Lean In"
			)
		);
		// const url = await this.driver.getCurrentUrl();
		// expect(url).toEqual("");
		if (saveState) {
			const statePath =
				typeof saveState != "boolean"
					? saveState
					: "./__tests__/data/secure/auth-state.json";
			const cookies = await this.driver.manage().getCookies();
			writeFileSync(statePath, JSON.stringify(cookies, null, 2));
			return {
				user: { email, pass },
				statePath: statePath,
			};
		}
		return {
			user: { email, pass },
		};
	}
}
