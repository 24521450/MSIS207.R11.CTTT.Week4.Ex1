import { expect, test as base } from '@playwright/test'

export { expect }

export const test = base.extend({
  browserDiagnostics: [async ({ page }, use) => {
    const messages = []

    page.on('console', (message) => {
      if (['warning', 'error'].includes(message.type())) {
        messages.push(`${message.location().url} ${message.text()}`.trim())
      }
    })
    page.on('pageerror', (error) => messages.push(error.message))

    await use()
    expect(messages, 'Cảnh báo và lỗi trong trình duyệt').toEqual([])
  }, { auto: true }],
})
