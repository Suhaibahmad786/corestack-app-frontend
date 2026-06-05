import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan") || "professional";

  useEffect(() => {
    const savePlan = async () => {
      try {
        await fetch("http://localhost:5000/api/auth/update-plan", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ plan }),
        });

        // Redirect to dashboard after 3 seconds
        setTimeout(() => navigate("/dashboard"), 3000);
      } catch (err) {
        console.log("Error saving plan:", err);
        setTimeout(() => navigate("/dashboard"), 3000);
      }
    };

    savePlan();
  }, [plan, navigate]);

  return (
    <div style={{
      display:"flex", flexDirection:"column", alignItems:"center",
      justifyContent:"center", minHeight:"100vh",
      background:"#f4f7fe", fontFamily:"system-ui, sans-serif",
      textAlign:"center", padding:"20px"
    }}>
      <div style={{ fontSize:"72px", marginBottom:"20px" }}>🎉</div>
      <h1 style={{ fontSize:"32px", color:"#111827", marginBottom:"10px" }}>
        Payment Successful!
      </h1>
      <p style={{ fontSize:"18px", color:"#6b7280", marginBottom:"8px" }}>
        Welcome to the <strong style={{color:"#6366f1",textTransform:"capitalize"}}>{plan}</strong> plan!
      </p>
      <p style={{ color:"#9ca3af", fontSize:"14px" }}>
        Redirecting to your dashboard...
      </p>
      <div style={{
        marginTop:"20px", width:"40px", height:"40px",
        border:"4px solid #e5e7eb", borderTop:"4px solid #6366f1",
        borderRadius:"50%", animation:"spin 0.8s linear infinite"
      }}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}