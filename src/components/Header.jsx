import React from 'react';
import './Header.css';

const Header = ({ user, onSignOut }) => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Portfolio</h1>
        {user && (
          <div className="user-info">
            <img src={user.photoURL} alt={user.displayName} className="user-avatar" />
            <span className="user-name">{user.displayName}</span>
            <button onClick={onSignOut} className="signout-btn">
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
