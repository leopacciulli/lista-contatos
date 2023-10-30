import { Link, useLocation } from 'react-router-dom'
import './styles.scss'

function Header() {
  const route = useLocation()
  const isUserListPathActive = route.pathname === '/'

  return (
    <header>
      <nav>
        <div className={isUserListPathActive ? 'active' : 'inactive'}>
          <Link to="/">Usuários cadastrados</Link>
        </div>
        <div className={isUserListPathActive ? 'inactive' : 'active'}>
          <Link to="/user-form">Novo usuário</Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
