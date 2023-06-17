import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	workers: process.env.CI ? 1 : undefined,
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'tests'
};

export default config;
