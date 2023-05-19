import Link from 'next/link';
import styles from './NavLink.module.css';

const NavLink = ({ link, isActive }) => {
  return (
    <Link
      className={styles.navlink}
      style={isActive ? { color: '#333333', fontWeight: '600' } : {}}
      href={link.path}
    >
      {link.name}
    </Link>
  );
};

export default NavLink;
