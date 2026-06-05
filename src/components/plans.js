import React from 'react';
import axios from 'axios';

const PricingPlansOnly = ({ user }) => {
  const currentPlan = user?.plan || "free";
  const hasUsedTrial = user?.has_used_trial || false;

  const handleCheckout = async (plan) => {
    try {
      if (plan === "starter") {
        await axios.put(
          "http://localhost:5000/api/auth/update-plan",
          { plan: "free" },
          { withCredentials: true }
        );
        window.location.reload();
        return;
      }

      if (plan === "trial") {
        const response = await axios.post(
          "http://localhost:5000/api/payment/create-trial-session",
          {},
          { withCredentials: true }
        );
        window.location.href = response.data.url;
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/payment/create-checkout-session",
        { plan },
        { withCredentials: true }
      );
      window.location.href = response.data.url;

    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const getButtonText = (plan) => {
    if (plan.planType === "trial") {
      if (hasUsedTrial) return "Trial Used";
      return "Start Free Trial";
    }
    if (plan.planType === "starter") {
      if (currentPlan === "free") return "Current Plan";
      return "Downgrade to Free";
    }
    if (plan.planType === "professional") {
      if (currentPlan === "professional") return "Current Plan";
      if (currentPlan === "business") return "Downgrade";
      return "Upgrade";
    }
    if (plan.planType === "business") {
      if (currentPlan === "business") return "Current Plan";
      return "Upgrade";
    }
    return plan.buttonText;
  };

  const isCurrentPlan = (planType) => {
    if (planType === "starter" && currentPlan === "free") return true;
    if (planType === currentPlan) return true;
    return false;
  };

  const pricingPlans = [
    {
      title: "Free Trial",
      price: "0",
      planType: "trial",
      duration: "15 days",
      features: [
        "Full Professional access",
        "All Pro features unlocked",
        "Courses access",
        "Cancel anytime"
      ],
      isPopular: false,
      isTrial: true,
    },
    {
      title: "Starter",
      price: "0",
      planType: "starter",
      features: ["3 Projects", "Basic Support", "1GB Storage"],
      isPopular: false,
    },
    {
      title: "Professional",
      price: "29",
      planType: "professional",
      features: ["Unlimited Projects", "Priority Support", "10GB Storage", "Courses Access"],
      isPopular: true,
    },
    {
      title: "Business",
      price: "99",
      planType: "business",
      features: ["Enterprise Security", "Custom Domain", "Unlimited Storage", "Courses Access"],
      isPopular: false,
    }
  ];

  const styles = {
    container: {
      width: '100%',
      padding: '10px',
      boxSizing: 'border-box',
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      gap: '16px',
      width: '100%',
      flexWrap: 'nowrap',
    },
    card: (isPopular, isCurrent) => ({
      flex: 1,
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      border: isCurrent 
        ? '2px solid #10b981'  // green for current plan
        : isPopular 
          ? '2px solid #6366f1' 
          : '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      boxShadow: isCurrent
        ? '0 10px 15px -3px rgba(16, 185, 129, 0.1)'
        : isPopular 
          ? '0 10px 15px -3px rgba(99, 102, 241, 0.1)' 
          : 'none',
    }),
    currentBadge: {
      position: 'absolute',
      top: '-12px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#10b981',
      color: '#fff',
      fontSize: '11px',
      fontWeight: '700',
      padding: '3px 12px',
      borderRadius: '20px',
      whiteSpace: 'nowrap',
    },
    planTitle: {
      fontSize: '13px',
      fontWeight: '600',
      color: '#6366f1',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '12px',
    },
    price: {
      fontSize: '32px',
      fontWeight: '800',
      color: '#111827',
      display: 'flex',
      alignItems: 'baseline',
      marginBottom: '20px',
    },
    featureList: {
      listStyle: 'none',
      padding: 0,
      margin: '0 0 24px 0',
      flexGrow: 1,
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '6px 0',
      color: '#4b5563',
      fontSize: '14px',
    },
    button: (isPopular, isCurrent, isDisabled) => ({
      width: '100%',
      padding: '10px',
      borderRadius: '8px',
      border: isCurrent 
        ? '1px solid #10b981'
        : isPopular 
          ? 'none' 
          : '1px solid #d1d5db',
      backgroundColor: isCurrent
        ? '#f0fdf4'
        : isPopular 
          ? '#6366f1' 
          : '#ffffff',
      color: isCurrent
        ? '#10b981'
        : isPopular 
          ? '#ffffff' 
          : '#374151',
      fontWeight: '600',
      fontSize: '14px',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.6 : 1,
      transition: 'background-color 0.2s',
    })
  };

  return (
    <div style={styles.container}>
      <div style={styles.row}>
        {pricingPlans.map((plan, index) => {
          const isCurrent = isCurrentPlan(plan.planType);
          const isDisabled = 
            isCurrent || 
            (plan.isTrial && hasUsedTrial);

          return (
            <div
              key={index}
              style={styles.card(plan.isPopular, isCurrent)}
              onMouseEnter={(e) => {
                if (!isCurrent) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Current plan badge */}
              {isCurrent && (
                <div style={styles.currentBadge}>✓ Current Plan</div>
              )}

              <div style={styles.planTitle}>{plan.title}</div>

              <div style={styles.price}>
                <span style={{ fontSize: '18px', fontWeight: '600' }}>$</span>
                {plan.price}
                {plan.duration ? (
                  <span style={{ fontSize: '14px', color: '#9ca3af', fontWeight: '400', marginLeft: '4px' }}>/{plan.duration}</span>
                ) : (
                  <span style={{ fontSize: '14px', color: '#9ca3af', fontWeight: '400', marginLeft: '4px' }}>/mo</span>
                )}
              </div>

              <ul style={styles.featureList}>
                {plan.features.map((feature, i) => (
                  <li key={i} style={styles.featureItem}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="#10b981">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                style={styles.button(plan.isPopular, isCurrent, isDisabled)}
                onClick={() => !isDisabled && handleCheckout(plan.planType)}
                disabled={isDisabled}
              >
                {getButtonText(plan)}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PricingPlansOnly;