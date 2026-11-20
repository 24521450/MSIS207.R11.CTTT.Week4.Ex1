# Week 4 Ex1 · Danh bạ nhân sự

Danh bạ minh họa dùng React 19, React Router v7, JavaScript/JSX và Vite. Sidebar chọn hồ sơ theo ID trong URL. Dữ liệu mẫu gồm bốn hồ sơ có mã `sp-1` đến `sp-4`.

## Chạy ứng dụng

Dùng Node.js 24. Bộ test Playwright dùng Google Chrome đã cài trên máy.

```sh
npm ci
npm run dev
```

Mở địa chỉ Vite in trong terminal. Trang gốc chuyển đến `/people`. Mở `/people/sp-1` để vào thẳng hồ sơ, `/people/unknown-id` để xem 404 hồ sơ và `/unknown/route` để xem 404 trang.

## Kiểm chứng

```sh
npm ci
npm run lint
npm test
npm run build
```

Kết quả trên Windows với Node.js 24.15.0, npm 12.0.2 và Chrome 157.0.8103.79.

| Lệnh | Kết quả |
| --- | --- |
| `npm ci` | Cài thành công từ lockfile và npm audit báo 0 lỗ hổng. npm cảnh báo về phiên bản ESLint 9 và chặn postinstall của esbuild. |
| `npm run lint` | Đạt, 0 lỗi và 0 cảnh báo ESLint. |
| `npm test` | 18/18 lượt đạt, gồm 9 ca ở desktop 1440×900 và 9 ca ở mobile 375×812. |
| `npm run build` | Đạt. Vite tạo `dist/` và chunk riêng `assets/PersonDetail-*.js`. |

Suite Playwright tự build và chạy Vite Preview. Các ca test kiểm tra chuyển hướng, bố cục, liên kết active, nội dung hồ sơ, deep link, reload, Back/Forward, hai trường hợp 404 và kích thước vùng chi tiết trước, trong và sau lúc nạp chunk. Suite cũng kiểm tra cảnh báo, lỗi console và lỗi JavaScript trên từng trang đã mở.

### Kiểm tra bằng Chrome có giao diện

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4183 --strictPort
```

Đã mở bản build tại `http://127.0.0.1:4183` trong Chrome ở 375×812 và 1440×900. Luồng chuyển từ trang gốc, chọn hai hồ sơ, Back/Forward, mở trực tiếp, reload và hai loại 404 đều đạt. Hai cỡ màn hình hiển thị đúng số cột, không tràn ngang và không có cảnh báo hay lỗi trong console.

Mobile được kiểm tra bằng viewport giả lập. Thiết bị di động thật, trình duyệt khác và máy chủ production chưa được kiểm chứng. Khi phục vụ `dist/` trên máy chủ khác, cấu hình trả `index.html` cho các URL của SPA để deep link và reload hoạt động.

Contract, thứ tự triển khai và các lỗi quan sát được nằm trong [project-rules.md](project-rules.md), [TASK_DECOMPOSITION.md](TASK_DECOMPOSITION.md) và [AI_FAILURE_AUDIT.md](AI_FAILURE_AUDIT.md).
