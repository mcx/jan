import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: './tests',
  retries: 0,
  globalTimeout: 120000,
}

export default config
