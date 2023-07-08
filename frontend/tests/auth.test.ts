import { expect, test } from '@playwright/test';

// Tests for the /users route
test.describe('User authenitcation', () => {
	const username = 'test_user-' + crypto.randomUUID();
	const password = 'test_password';

	test('Take the test', async ({ page }) => {
		await page.goto('/auth/onboarding');

		// Click trough the onboarding by clicking the button with the class "mainBtn"
		await page.click('button.mainBtn');
		await page.click('button.mainBtn');

		const { pathname } = new URL(page.url());
		expect(pathname).toBe('/auth/onboarding');

		// Click through all the 35 questions
		for (let i = 0; i < 35; i++) {
			const button = await page.waitForSelector('li>button');
			await button.click();
		}

		// Check if h1 has the text "INFP"
		const h1 = await page.waitForSelector('h1');
		expect(await h1.innerText()).toBe('INFP');
		// Go to register page
		await page.click('a.mainBtn');

		await page.waitForNavigation();
		const { pathname: regPath, search: regSearch } = new URL(page.url());
		expect(regPath).toBe('/auth/register');
		expect(regSearch).toBe('?personality=INFP');

		await page.close();
	});

	test('Register', async ({ page }) => {
		// Navigate to the register page
		await page.goto('/auth/register?personality=INFP&next=/account');

		// Fill in the form and submit it
		await page.fill('input[placeholder="username"]', username);
		await page.fill('input[placeholder="password"]', password);
		await page.fill('input[placeholder="repeat password"]', password);
		await page.click('button[type="submit"]');

		// Wait for the registration to complete
		await page.waitForNavigation();

		// Check if the user is redirected to the account page
		const { pathname } = new URL(page.url());
		expect(pathname).toBe('/account');

		// Check the displayed username
		const nameSpan = await page.waitForSelector('div.username-field>span');
		expect(await nameSpan.innerText()).toBe(username);

		// Log out
		await page.click('button.mainBtn');
		await page.waitForNavigation();

		// Check if the user is redirected to the login page
		const { pathname: loginPath } = new URL(page.url());
		expect(loginPath).toBe('/auth');

		await page.close();
	});

	test('Login and delete account', async ({ page }) => {
		// Navigate to the login page
		await page.goto('/auth');

		// Fill in the form and submit it
		await page.fill('input[placeholder="username"]', username);
		await page.fill('input[placeholder="password"]', password);
		await page.click('button[type="submit"]');

		await page.waitForNavigation();

		const { pathname: homePath } = new URL(page.url());
		expect(homePath).toBe('/');
		const name_on_home = await page.waitForSelector('h1');
		expect(await name_on_home.innerText()).toBe('Hi ' + username);

		await page.click('a.account-button');
		await page.waitForNavigation();

		// Check if the user is redirected to the account page
		const { pathname: accPath } = new URL(page.url());
		expect(accPath).toBe('/account');

		// Delete account
		page.on('dialog', async (dialog) => {
			if (dialog.message() == 'Are you sure you want to delete your account?') {
				await dialog.accept();
			} else {
				await dialog.dismiss();
			}
		});

		await page.click('button > img[alt="Delete Account"]');
		await page.waitForNavigation();

		// Check if the user is redirected to the login page
		const { pathname: loginPath } = new URL(page.url());
		expect(loginPath).toBe('/auth');

		await page.close();
	});
});
