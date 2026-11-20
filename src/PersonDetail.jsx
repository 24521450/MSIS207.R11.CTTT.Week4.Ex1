import { useParams } from 'react-router'
import NotFound from './NotFound.jsx'

export default function PersonDetail({ people }) {
  const { id } = useParams()
  const person = people.find((entry) => entry.id === id)

  if (!person) {
    return (
      <NotFound
        title="Không tìm thấy hồ sơ"
        message="Mã hồ sơ trong URL không có trong danh bạ. Chọn một tên trong danh sách để tiếp tục."
      />
    )
  }

  return (
    <>
      <h2>{person.name}</h2>
      <dl className="person-details">
        <div>
          <dt>Họ và tên</dt>
          <dd>{person.name}</dd>
        </div>
        <div>
          <dt>Vai trò</dt>
          <dd>{person.role}</dd>
        </div>
        <div>
          <dt>Mã hồ sơ</dt>
          <dd>{person.id}</dd>
        </div>
      </dl>
    </>
  )
}
