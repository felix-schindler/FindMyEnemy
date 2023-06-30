import { test, expect } from '@playwright/experimental-ct-svelte';
import DiscoverEnemy from '../src/lib/components/DiscoverEnemy.svelte';
import AccountButton from '../src/lib/components/AccountButton.svelte';

test.use({ viewport: { width: 500, height: 500 } });

test('discover enemy', async ({ page, mount }) => {
	const component = await mount(DiscoverEnemy, {
		props: {
			user: {
				id: 1,
				username: 'test',
				personality: 'INFP'
			}
		}
	});

	const username = component.locator('div.user-details>p');
	expect(username.textContent()).toBe('test');

	const personality = component.locator('div.user-information>p');
	expect(personality.textContent()).toBe('INFP');

	component.click();
	await page.waitForNavigation();

	const { pathname } = new URL(page.url());
	expect(pathname).toBe('/enemy-account/1');
});

test('account button', async ({ page, mount }) => {
	const component = await mount(AccountButton);

	const account_button = component.locator('a.account-button');
	account_button.click();
	await page.waitForNavigation();

	const { pathname } = new URL(page.url());
	expect(pathname).toBe('/account');
});
