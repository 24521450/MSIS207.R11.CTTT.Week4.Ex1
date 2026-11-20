import { Link, Navigate, Route, Routes } from 'react-router'
import PeopleLayout from './PeopleLayout.jsx'
import { people } from './people.js'

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
        </Route>
      </Routes>
    </div>
  )
}
