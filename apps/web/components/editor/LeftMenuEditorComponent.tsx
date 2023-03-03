import React, { useState } from 'react';
import styles from './LeftMenuEditorComponent.module.scss';

const LeftMenuEditorComponent = () => {
  const [activeLink, setActiveLink] = useState('');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const links = [
    { to: '#clinical-metadata', label: 'Clinical Metadata' },
    { to: '#drug-list', label: 'Drug List' },
    { to: '#management-group-list', label: 'Management Group List' },
    { to: '#site-list', label: 'Site List' },
    { to: '#sponsor-list', label: 'Sponsor List' },
    { to: '#staff-list', label: 'Staff List' },
    { to: '#treatment-list', label: 'Treatment List' },
  ];

  return (
    <nav className={styles['ctims-nav']}>
      <ul>
        {links.map((link, index) => (
          <li key={link.to}>
            <a
              href={link.to}
              onClick={() => handleLinkClick(link.to)}
              className={`${styles['menu-link']} ${
                activeLink === link.to ? `${styles.active}` : ''
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
