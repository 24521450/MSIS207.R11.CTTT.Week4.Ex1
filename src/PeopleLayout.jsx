import { NavLink, Outlet } from 'react-router'

export default function PeopleLayout({ people }) {
  return (
    <div className="people-frame">
      <nav className="sidebar" aria-labelledby="sidebar-heading">
        <h2 id="sidebar-heading">Hồ sơ nhân sự</h2>
        <ul className="people-list">
          {people.map((person) => (
            <li key={person.id}>
              <NavLink
                to={`/people/${person.id}`}
                end
                className={({ isActive }) => (isActive ? 'active-link' : 'link')}
              >
                {person.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <main className="content-area">
        <Outlet />
      </main>
    </div>
  )
}
