import { expect, test } from './fixtures.js'

test('chuyển từ trang gốc đến hướng dẫn chọn hồ sơ', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveURL(/\/people$/)
  await expect(page.getByRole('main').getByRole('heading', {
    name: 'Chọn một hồ sơ',
  })).toBeVisible()
})

test('hiển thị liên kết hồ sơ có ID ổn định ở sidebar', async ({ page }) => {
  await page.goto('/people')

  const sidebar = page.getByRole('navigation', { name: 'Hồ sơ nhân sự' })
  await expect(sidebar.getByRole('link', { name: 'Nguyễn Minh Anh' }))
    .toHaveAttribute('href', '/people/sp-1')
  await expect(sidebar.getByRole('link', { name: 'Trần Gia Huy' }))
    .toHaveAttribute('href', '/people/sp-2')
  await expect(sidebar.locator('[aria-current="page"]')).toHaveCount(0)
})

test('đặt sidebar và vùng chi tiết theo kích thước màn hình', async ({ page, isMobile }) => {
  await page.goto('/people')

  const frame = page.locator('.people-frame')
  await expect(frame).toHaveCSS('display', 'grid')
  const sidebar = await page.getByRole('navigation').boundingBox()
  const detail = await page.getByRole('main').boundingBox()

  if (isMobile) {
    expect(detail.y).toBeGreaterThanOrEqual(sidebar.y + sidebar.height)
    expect(detail.x).toBe(sidebar.x)
    expect(detail.width).toBe(sidebar.width)
  } else {
    expect(sidebar.width).toBeGreaterThanOrEqual(280)
    expect(detail.width).toBeCloseTo(sidebar.width * 2, 0)
    expect(detail.x).toBeGreaterThanOrEqual(sidebar.x + sidebar.width)
    expect(detail.y).toBe(sidebar.y)
  }

  expect(await page.locator('html').evaluate((html) => html.scrollWidth))
    .toBeLessThanOrEqual(page.viewportSize().width)
})
