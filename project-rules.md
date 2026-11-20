# Contract Week 4 Ex1

Nguồn yêu cầu là các mục 9–12 và 22 theo thứ tự trong `UIT-S3T-Lab-4.pptx`. Mục thứ 22 có nhãn “Slide 23” trong nội dung.

## Môi trường

- Dùng Node.js 24, React 19, React Router v7, JavaScript/JSX và Vite.
- Commit `package-lock.json` để cài đúng phiên bản bằng `npm ci`.
- Thực hiện trong repo `24521450/MSIS207.R11.CTTT.Week4.Ex1`.

## Định tuyến

| URL | Hành vi |
| --- | --- |
| `/` | Chuyển đến `/people` bằng `Navigate replace`. |
| `/people` | Hiển thị hướng dẫn chọn hồ sơ trong layout danh bạ. |
| `/people/:id` | Hiển thị hồ sơ tương ứng. Mở URL trực tiếp hoặc tải lại vẫn giữ hồ sơ và liên kết đang chọn. |
| `/people/:id` với ID lạ | Hiển thị 404 trong vùng chi tiết, giữ sidebar để chọn hồ sơ khác. |
| URL không khớp route | Hiển thị trang 404 có đường dẫn về danh bạ. |

- `PeopleLayout.jsx` nhận mảng `people`. Sidebar dùng `NavLink` với lớp theo `isActive`. Vùng nội dung dùng `Outlet`.
- `PersonDetail.jsx` nhận cùng mảng `people`, lấy `id` từ `useParams()` và tra bằng `people.find()`. Các trường `id`, `name`, `role` hiển thị bằng `dl`, `dt`, `dd`.
- Mỗi hồ sơ minh họa có một ID chuỗi ổn định, độc nhất. URL điều khiển hồ sơ đang chọn và liên kết active khi dùng Back/Forward.
- Desktop dùng `grid-template-columns: minmax(280px, 1fr) 2fr`. Màn hình đến 700px dùng một cột.
- Nạp `PersonDetail` bằng `React.lazy` trong `Suspense`. Skeleton có `aria-busy="true"` và `aria-live="polite"`. Vùng nội dung giữ kích thước khi thay skeleton bằng hồ sơ.

## Kiểm chứng

- Chạy test thất bại trước mỗi phần triển khai. Kiểm tra chuyển route, liên kết active, mở URL trực tiếp, tải lại, hai trường hợp 404 và Back/Forward.
- Chạy `npm ci`, `npm run lint`, `npm test` và `npm run build`. Mở ứng dụng ở 375px và desktop để kiểm tra luồng chính, kích thước và console.
- Ghi cách chạy và kết quả trong `README.md`. Ghi lỗi quan sát được và cách kiểm chứng bản sửa trong `AI_FAILURE_AUDIT.md`.
- Tạo đúng hai commit `feat: add router layout` và `feat: handle person detail routes`. Kiểm tra origin, phần staged và toàn văn commit trước khi push `main` bằng credential của GitHub CLI.
