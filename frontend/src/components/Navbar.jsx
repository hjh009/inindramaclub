import { Link, NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>인인극회</Link>
        <nav>
          <ul className={styles.menu}>
            <li><NavLink to="/" end className={({ isActive }) => isActive ? styles.active : ''}>홈</NavLink></li>
            <li><NavLink to="/gallery" className={({ isActive }) => isActive ? styles.active : ''}>갤러리</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
