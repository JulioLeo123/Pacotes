import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function ProfileDropdown({ currentUser, logout, navigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const initials = currentUser?.name
    ? currentUser.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '';

  return (
    <div className="profile-dropdown" ref={ref}>
      <button
        type="button"
        className="profile-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="avatar">{initials || '👤'}</span>
        <span className="profile-label">Perfil</span>
      </button>

      {open && (
        <div className="dropdown-menu" role="menu">
          <div className="menu-header">
            <div className="avatar large">{initials || '👤'}</div>
            <div className="user-info">
              <div className="name">{currentUser?.name}</div>
              {currentUser?.email && <div className="email muted">{currentUser.email}</div>}
            </div>
          </div>

          <nav className="menu-actions">
            <NavLink to="/minha-conta" onClick={() => setOpen(false)} className="menu-link">Minha conta</NavLink>
            <button
              type="button"
              className="btn menu-logout"
              onClick={() => {
                logout();
                setOpen(false);
                navigate('/');
              }}
            >
              Sair
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
