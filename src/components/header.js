import { Link } from 'react-router-dom';     
<nav style={styles.navbar}>
        <div style={styles.navLogo}>
          <span style={styles.navLogoIcon}>⬡</span>
          <span style={styles.navLogoText}>CoreStack</span>
        </div>
        <div style={styles.navLinks}>
          <Link to="/" style={styles.navLink}>Home</Link>
          <Link to="/contact" style={styles.navLink}>Contact Us</Link>
          <Link to="/courses" style={styles.navLink}>Courses</Link>
          <Link to="/weather" style={styles.navLink}>Weather</Link>
          <Link to="/price" style={styles.navLink}>Price</Link>
          <Link to="/login">
            <button style={styles.navLoginBtn}>Sign In</button>
          </Link>
          <Link to="/signup">
            <button style={styles.navSignupBtn}>Sign Up</button>
          </Link>
        </div>
      </nav>


export default Header;