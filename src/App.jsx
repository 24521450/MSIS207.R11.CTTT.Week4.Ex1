import React, { Suspense } from 'react'
import { Link, Navigate, Route, Routes } from 'react-router'
import NotFound from './NotFound.jsx'
import PeopleLayout from './PeopleLayout.jsx'
import { people } from './people.js'

const PersonDetail = React.lazy(() => import('./PersonDetail.jsx'))

function DetailSkeleton() {
  return (
    <div role="status" aria-busy="true" aria-live="polite">
      <p>Đang tải hồ sơ…</p>
      <div className="skeleton-lines" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1><Link to="/people">Danh bạ nhân sự</Link></h1>
      </header>

      <Routes>
        <Route path="/" element={<Navigate to="/people" replace />} />
        <Route path="/people" element={<PeopleLayout people={people} />}>
          <Route
            index
            element={
              <>
                <h2>Chọn một hồ sơ</h2>
                <p>Chọn tên trong danh sách để xem thông tin nhân sự.</p>
              </>
            }
          />
          <Route
            path=":id"
            element={
              <Suspense fallback={<DetailSkeleton />}>
                <PersonDetail people={people} />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <main className="content-area">
              <NotFound
                title="Không tìm thấy trang"
                message="Địa chỉ này không có trong ứng dụng."
              />
              <Link className="return-link" to="/people">Về danh bạ</Link>
            </main>
          }
        />
      </Routes>
    </div>
  )
}
