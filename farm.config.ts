import type { UserConfig } from '@farmfe/core'

export function defineConfig(config: UserConfig) {
  return config
}

export default defineConfig({
  compilation: {
    input: {
      home: './index.html' // Home Page
    }
  }
})
