import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css'; // Assuming you have AuthContext for authentication
import { useAuth } from '../../context/AuthContext';

const NavigationBar: React.FC = () => {
  const { logout, isAuthenticated } = useAuth(); // Logout function from AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className={styles.navbar}>
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
        {isAuthenticated && (
          <li>
            <button
              onClick={handleLogout}
              className={`${styles.navLink} ${styles.logoutButton}`}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavigationBar;
