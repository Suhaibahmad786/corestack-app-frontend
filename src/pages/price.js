import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// 1. THE HEADER COMPONENT (Defined in the same file)
const Header = () => {
  const hStyles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 50px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
    },
    navLogo: { display: 'flex', alignItems: 'center', gap: '10px' },
    navLogoIcon: { fontSize: '24px', color: '#6366f1' },
    navLogoText: { fontWeight: 'bold', fontSize: '20px', color: '#111827' },
    navLinks: { display: 'flex', gap: '25px', alignItems: 'center' },
    navLink: { textDecoration: 'none', color: '#4b5563', fontWeight: '500' },
    navLoginBtn: { padding: '8px 16px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontWeight: '600' },
    navSignupBtn: { padding: '10px 20px', backgroundColor: '#6366f1', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600' }
  };

  return (
    <nav style={hStyles.navbar}>
      <div style={hStyles.navLogo}>
        <span style={hStyles.navLogoIcon}>⬡</span>
        <span style={hStyles.navLogoText}>CoreStack</span>
      </div>
      <div style={hStyles.navLinks}>
        <Link to="/" style={hStyles.navLink}>Home</Link>
        <Link to="/contact" style={hStyles.navLink}>Contact Us</Link>
        <Link to="/price" style={hStyles.navLink}>Price</Link>
        <Link to="/login"><button style={hStyles.navLoginBtn}>Sign In</button></Link>
        <Link to="/signup"><button style={hStyles.navSignupBtn}>Sign Up</button></Link>
      </div>
    </nav>
  );
};

// 2. THE MAIN PRICING PAGE COMPONENT
const PricingPage = () => {
 const handleCheckout = async (plan) => {

    try {

      if (plan === "starter") {
        alert("Starter plan activated!");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/payment/create-checkout-session",
        {
          plan,
        }
      );

      window.location.href = response.data.url;

    } catch (error) {

      console.log(error);
      alert("Something went wrong");
    }
  };

  const pricingPlans = [
    {
      title: "Starter",
      price: "0",
      planType: "starter",
      features: ["3 Projects", "Basic Support", "1GB Storage"],
      buttonText: "Join for Free",
      isPopular: false,
    },
    {
      title: "Professional",
      price: "29",
      planType: "professional",
      features: ["Unlimited Projects", "Priority Support", "10GB Storage"],
      buttonText: "Subscribe Now",
      isPopular: true,
    },
    {
      title: "Business",
      price: "99",
      planType: "business",
      features: ["Enterprise Security", "Custom Domain", "Unlimited Storage"],
      buttonText: "Subscribe Now",
      isPopular: false,
    }
  ];

  const styles = {
    container: {
      padding: '60px 20px',
      textAlign: 'center',
      backgroundColor: '#f4f7fe',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    header: { marginBottom: '50px' },
    grid: {
      display: 'flex',
      flexDirection: 'row',     // Forces one row
      justifyContent: 'center',
      alignItems: 'stretch',    // Makes cards equal height
      gap: '20px',
      maxWidth: '1100px',
      margin: '0 auto',
    },
    card: (isPopular) => ({
      backgroundColor: '#fff',
      padding: '40px 30px',
      borderRadius: '20px',
      flex: '1',                 // Makes cards take equal space
      minWidth: '280px',
      boxShadow: isPopular ? '0 20px 40px rgba(99, 102, 241, 0.2)' : '0 10px 20px rgba(0,0,0,0.05)',
      border: isPopular ? '2px solid #6366f1' : '1px solid #e5e7eb',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }),
    badge: {
      position: 'absolute',
      top: '-15px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#6366f1',
      color: 'white',
      padding: '5px 15px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 'bold',
    },
    priceTag: { fontSize: '48px', fontWeight: '800', margin: '20px 0', color: '#1f2937' },
    featureList: { listStyle: 'none', padding: 0, margin: '30px 0', textAlign: 'left' },
    featureItem: { padding: '10px 0', color: '#4b5563', borderBottom: '1px solid #f3f4f6' },
    button: (isPopular) => ({
      width: '100%',
      padding: '15px',
      borderRadius: '12px',
      border: 'none',
      backgroundColor: isPopular ? '#6366f1' : '#1f2937',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '16px',
    })
  };

  return (
    <div style={{ backgroundColor: '#f4f7fe' }}>
      {/* 1. Header sits at the very top */}
      <Header />

      {/* 2. Main Pricing Content */}
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={{ fontSize: '36px', color: '#111827' }}>Choose Your Plan</h1>
          <p style={{ color: '#6b7280' }}>No hidden fees. Scale as you grow.</p>
        </div>

        {/* 3. The Row of cards */}
        <div style={styles.grid}>
          {pricingPlans.map((plan, index) => (
            <div key={index} style={styles.card(plan.isPopular)}>
              {plan.isPopular && <div style={styles.badge}>RECOMMENDED</div>}
              
              <div>
                <h2 style={{ textTransform: 'uppercase', fontSize: '14px', color: '#6366f1' }}>{plan.title}</h2>
                <div style={styles.priceTag}>
                  <span style={{ fontSize: '20px', verticalAlign: 'top' }}>$</span>
                  {plan.price}
                  <span style={{ fontSize: '16px', color: '#9ca3af' }}>/mo</span>
                </div>

                <ul style={styles.featureList}>
                  {plan.features.map((feature, i) => (
                    <li key={i} style={styles.featureItem}>
                      <span style={{ color: '#10b981', marginRight: '10px' }}>✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>

<button 
  style={styles.button(plan.isPopular)}

  onClick={() => handleCheckout(plan.planType)}

  onMouseOver={(e) => e.target.style.opacity = '0.9'}

  onMouseOut={(e) => e.target.style.opacity = '1'}
>
  {plan.buttonText}
</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;