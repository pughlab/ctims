import React, { useState } from 'react';
import styles from './LeftMenuEditorComponent.module.scss';

const LeftMenuEditorComponent = () => {
  const [activeLink, setActiveLink] = useState('');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const links = [
    { to: '/', label: 'Clinical Metadata' },
    { to: '/about', label: 'Drug List' },
    { to: '/services', label: 'Management Group List' },
    { to: '/contact', label: 'Site List' },
    { to: '/contact', label: 'Sponsor List' },
    { to: '/contact', label: 'Staff List' },
    { to: '/contact', label: 'Treatment List' },
  ];

  return (
    <nav className={styles['ctims-nav']}>
      <ul>
        {links.map((link) => (
          <li key={link.to}>
            <a
              href={link.to}
              onClick={() => handleLinkClick(link.to)}
              className={`${styles['menu-link']} ${
                activeLink === link.to ? 'active' : ''
              }`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LeftMenuEditorComponent;
