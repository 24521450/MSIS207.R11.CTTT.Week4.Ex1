import { expect, test } from './fixtures.js'

async function expectProfile(page, id, name) {
  await expect(page).toHaveURL(new RegExp(`/people/${id}$`))
  await expect(page.getByRole('main').getByRole('heading', { name })).toBeVisible()
  const sidebar = page.getByRole('navigation', { name: 'Hồ sơ nhân sự' })
  const active = sidebar.getByRole('link', { name })
  await expect(active).toHaveAttribute('aria-current', 'page')
  await expect(active).toHaveClass('active-link')
  await expect(sidebar.locator('[aria-current="page"]')).toHaveCount(1)
}

test('đổi hồ sơ từ sidebar và cập nhật liên kết active', async ({ page }) => {
  await page.goto('/people')
  await page.getByRole('link', { name: 'Nguyễn Minh Anh' }).click()
  await expectProfile(page, 'sp-1', 'Nguyễn Minh Anh')

  const detail = page.getByRole('main').locator('dl')
  await expect(detail.locator('dt')).toHaveText(['Họ và tên', 'Vai trò', 'Mã hồ sơ'])
  await expect(detail.locator('dd')).toHaveText(['Nguyễn Minh Anh', 'Kỹ sư phần mềm', 'sp-1'])

  await page.getByRole('link', { name: 'Trần Gia Huy' }).click()
  await expectProfile(page, 'sp-2', 'Trần Gia Huy')
  await expect(page.getByRole('link', { name: 'Nguyễn Minh Anh' })).toHaveClass('link')
})

test('đọc ID từ URL trực tiếp và giữ hồ sơ khi tải lại', async ({ page }) => {
  await page.goto('/people/sp-3')
  await expectProfile(page, 'sp-3', 'Lê Thu Hà')
  await expect(page.getByRole('main')).toContainText('Nhà thiết kế sản phẩm')

  await page.reload()
  await expectProfile(page, 'sp-3', 'Lê Thu Hà')
  await expect(page.getByRole('main')).toContainText('Nhà thiết kế sản phẩm')
})

test('khôi phục hồ sơ và liên kết active bằng Back và Forward', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/people$/)
  await page.getByRole('link', { name: 'Nguyễn Minh Anh' }).click()
  await expectProfile(page, 'sp-1', 'Nguyễn Minh Anh')
  await page.getByRole('link', { name: 'Trần Gia Huy' }).click()
  await expectProfile(page, 'sp-2', 'Trần Gia Huy')

  await page.goBack()
  await expectProfile(page, 'sp-1', 'Nguyễn Minh Anh')
  await page.goBack()
  await expect(page).toHaveURL(/\/people$/)
  await expect(page.getByRole('heading', { name: 'Chọn một hồ sơ' })).toBeVisible()
  await expect(page.locator('[aria-current="page"]')).toHaveCount(0)

  await page.goForward()
  await expectProfile(page, 'sp-1', 'Nguyễn Minh Anh')
  await page.goForward()
  await expectProfile(page, 'sp-2', 'Trần Gia Huy')
})

test('hiển thị 404 trong danh bạ khi ID không tồn tại', async ({ page }) => {
  await page.goto('/people/unknown-id')

  await expect(page).toHaveURL(/\/people\/unknown-id$/)
  await expect(page.getByRole('main').getByRole('alert')).toContainText('404 · Không tìm thấy hồ sơ')
  await expect(page.getByRole('navigation')).toBeVisible()
  await expect(page.locator('[aria-current="page"]')).toHaveCount(0)
  await page.getByRole('link', { name: 'Nguyễn Minh Anh' }).click()
  await expectProfile(page, 'sp-1', 'Nguyễn Minh Anh')
})

test('hiển thị trang 404 và đường về danh bạ với URL không khớp route', async ({ page }) => {
  await page.goto('/unknown/route')

  await expect(page).toHaveURL(/\/unknown\/route$/)
  await expect(page.getByRole('main').getByRole('alert')).toContainText('404 · Không tìm thấy trang')
  await page.getByRole('link', { name: 'Về danh bạ' }).click()
  await expect(page).toHaveURL(/\/people$/)
  await expect(page.getByRole('heading', { name: 'Chọn một hồ sơ' })).toBeVisible()
})

test('tải module chi tiết theo yêu cầu và giữ kích thước vùng nội dung', async ({ page }) => {
  const chunk = Promise.withResolvers()
  let requested = false

  await page.route('**/assets/PersonDetail-*.js', async (route) => {
    requested = true
    await chunk.promise
    await route.continue()
  })

  try {
    await page.goto('/people')
    await expect(page.getByRole('heading', { name: 'Chọn một hồ sơ' })).toBeVisible()
    expect(requested).toBe(false)

    const detail = page.getByRole('main')
    const selectionBounds = await detail.boundingBox()
    await page.getByRole('link', { name: 'Nguyễn Minh Anh' }).click()

    const skeleton = detail.getByRole('status')
    await expect(skeleton).toBeVisible()
    await expect(skeleton).toHaveAttribute('aria-busy', 'true')
    await expect(skeleton).toHaveAttribute('aria-live', 'polite')
    await expect.poll(() => requested).toBe(true)
    const loadingBounds = await detail.boundingBox()
    expect(loadingBounds).toEqual(selectionBounds)

    chunk.resolve()
    await expectProfile(page, 'sp-1', 'Nguyễn Minh Anh')
    await expect(skeleton).toHaveCount(0)
    expect(await detail.boundingBox()).toEqual(loadingBounds)
  } finally {
    chunk.resolve()
  }
})
