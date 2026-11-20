# Các phần triển khai

## 1. Layout và route danh bạ

- Dựng cấu hình Vite, ESLint và Playwright trên Node.js 24.
- Viết test cho chuyển hướng từ `/`, hướng dẫn ở route index, URL của các liên kết và bố cục ở 375px và desktop. Chạy test trên khung ứng dụng rỗng.
- Thêm dữ liệu minh họa, `PeopleLayout.jsx`, các route và CSS Grid. Chạy lại các test rồi commit `feat: add router layout`.

## 2. Hồ sơ, lịch sử và 404

- Viết và chạy test cho điều hướng giữa hồ sơ, active link, mở URL trực tiếp, reload, Back/Forward, 404 và kích thước vùng chi tiết khi tải.
- Thêm route con `:id`, `PersonDetail.jsx`, hai trạng thái 404 và skeleton cho module tải động.
- Chạy lại các test, kiểm tra trình duyệt và console. Ghi lệnh, kết quả và lỗi đã kiểm chứng vào tài liệu. Commit `feat: handle person detail routes`.
- Kiểm tra hai commit và origin trước khi push `main`.
