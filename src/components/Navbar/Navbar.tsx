'use client';

import { usePathname } from 'next/navigation';
import NavLink from './NavLink';
import InventoryActions from '../Inventory/NavbarActions/NavbarActions';
import styles from './Navbar.module.css';

const links = [
  {
    name: 'Inventory',
    path: '/',
    actions: <InventoryActions />,
  },
  {
    name: 'Collections',
    path: '/collections',
    actions: <></>,
  },
  {
    name: 'Analytics',
    path: '/analytics',
    actions: <></>,
  },
];

const Navbar = () => {
  const currentPath = usePathname();
  // get the current active link
  const activeLink = links.find(link => link.path === currentPath);

  return (
    <header className={styles.navbarContainer}>
      <nav className={styles.navbar}>
        <ul>
          {links.map(link => {
            return (
              <li key={link.path}>
                <NavLink link={link} isActive={activeLink.path === link.path} />
              </li>
            );
          })}
        </ul>
        <div className={styles.navbarActions}>{activeLink.actions}</div>
      </nav>
    </header>
  );
};

export default Navbar;
