import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useAuth } from '../../context/AuthContext';

const NavigationBar: React.FC = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={styles.navbar}>
      {/* Centered Links */}
      <div className={styles.centerLinks}>
        <ul className={styles.navList}>
          <li>
            <Link to="/create-room" className={styles.navLink}>
              Create Room
            </Link>
          </li>
          <li>
            <Link to="/join-room" className={styles.navLink}>
              Join Room
            </Link>
          </li>
          <li>
            <Link to="/" className={styles.navLink}>
              Your Rooms
            </Link>
          </li>
        </ul>
      </div>

      {/* Login/Logout aligned to right */}
      <div className={styles.authSection}>
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className={`${styles.navLink} ${styles.logoutButton}`}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
