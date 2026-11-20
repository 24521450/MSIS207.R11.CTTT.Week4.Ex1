# Nhật ký lỗi và kiểm chứng

## Lỗi quan sát được khi triển khai

| Hiện tượng | Cách xử lý | Cách kiểm chứng |
| --- | --- | --- |
| `npm install --prefer-offline` báo `ETARGET` cho `@babel/helper-module-transforms@^7.29.13`. | Đọc lại metadata gói từ npm registry bằng `npm view --prefer-online`. | Chạy lại cài đặt để xác nhận npm phân giải được dependency này. |
| Lần build đầu báo thiếu `@rollup/rollup-win32-x64-msvc`. Lockfile tạo từ metadata cũ thiếu các gói phụ thuộc tùy hệ điều hành của Rollup. | Làm mới metadata các gói Rollup rồi tạo lại lockfile trong thư mục trống. | Kiểm tra lockfile có đầy đủ mục `optionalDependencies`, sau đó chạy `npm ci` và `npm run build` thành công trên Windows. |
| Chrome ghi lỗi HTTP 404 cho `/favicon.ico` khi mở bản preview. | Khai báo icon nội tuyến trong `index.html`. | Test console trên cả hai viewport đạt. Mở lại bản build trong Chrome và luồng đã thử có 0 cảnh báo, 0 lỗi console. |
| ESLint báo `no-undef` cho `document` trong callback đo chiều rộng của test layout. | Truyền phần tử `html` vào callback của `locator.evaluate` và đọc `scrollWidth` từ đối số. | `npm run lint` đạt và test layout vẫn kiểm tra tràn ngang ở cả hai viewport. |
| Lần chạy đầu bộ test chi tiết không thu thập được test vì thiếu dấu `)` ở cuối ca skeleton. | Đóng lời gọi `test(...)`. | Playwright thu thập 12 lượt test chi tiết. Cả 12 đều thất bại với route chưa triển khai rồi đạt sau khi thêm route. |

## Kết quả test trước và sau khi triển khai

| Phần | Trước khi triển khai | Sau khi triển khai |
| --- | --- | --- |
| Layout | Khung ứng dụng rỗng thất bại 6/6 lượt. URL vẫn là `/`, sidebar và CSS Grid chưa xuất hiện. | 6/6 lượt đạt với redirect, liên kết và bố cục ở 375px và desktop. |
| Chi tiết | 12/12 lượt thất bại trên commit layout. Router báo `No routes matched location` cho URL hồ sơ và đường dẫn lạ. | 12/12 lượt chi tiết đạt. Tổng suite đạt 18/18, gồm ca giữ nguyên kích thước vùng chi tiết khi chặn tạm chunk tải động. |

`npm ci` cuối cùng vẫn báo ESLint 9 hết hỗ trợ và chặn postinstall của esbuild theo mặc định npm 12. Cài đặt thành công, trình build dùng được binary theo nền tảng, và lint, test, build đều đạt.
