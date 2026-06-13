import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WeatherWidget from "../components/weather"; // ✅ your existing weather component
import PricingPage from "../components/plans";
import API_URL from "../config";

// ─── ICONS ───────────────────────────────────────────────────────────────────
const Icon = {
  home:       <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  user:       <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  briefcase:  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>,
  star:       <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  cloud:      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
  credit:     <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  book:       <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  plus:       <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  edit:       <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash:      <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
  logout:     <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  close:      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  save:       <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  link:       <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  lock:       <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  check:      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
  zap:        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
};

// ─── SIDEBAR NAV SECTIONS ────────────────────────────────────────────────────
const NAV = {
  main: [
    { id: "overview",  label: "Overview",  icon: Icon.home },
    { id: "profile",   label: "Profile",   icon: Icon.user },
    { id: "projects",  label: "Projects",  icon: Icon.briefcase },
    { id: "services",  label: "Services",  icon: Icon.star },
  ],
  features: [
    { id: "weather",   label: "Weather",   icon: Icon.cloud },
    { id: "courses",   label: "Courses",   icon: Icon.book, pro: true },
  ],
  account: [
    { id: "pricing",   label: "Pricing",   icon: Icon.credit },
  ],
};

// ─── MODAL ───────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div style={m.overlay} onClick={onClose}>
      <div style={m.box} onClick={e => e.stopPropagation()}>
        <div style={m.head}>
          <span style={m.title}>{title}</span>
          <button onClick={onClose} style={m.closeBtn}>{Icon.close}</button>
        </div>
        {children}
      </div>
    </div>
  );
}
const m = {
  overlay: { position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", backdropFilter:"blur(6px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:"20px" },
  box: { background:"#111318", border:"1px solid #222530", borderRadius:"20px", width:"100%", maxWidth:"500px", overflow:"hidden", boxShadow:"0 40px 80px rgba(0,0,0,0.5)" },
  head: { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"22px 28px", borderBottom:"1px solid #1e2130" },
  title: { color:"#f0f2ff", fontSize:"17px", fontWeight:"700", letterSpacing:"-0.02em" },
  closeBtn: { background:"none", border:"none", color:"#556", cursor:"pointer", display:"flex", padding:"4px", borderRadius:"6px" },
};

// ─── FIELD ───────────────────────────────────────────────────────────────────
const fi = { padding:"11px 14px", background:"#0c0e17", border:"1px solid #222530", borderRadius:"10px", color:"#e8eaf6", fontSize:"14px", outline:"none", width:"100%", boxSizing:"border-box", fontFamily:"inherit" };
function Field({ label, value, onChange, type="text", placeholder, multiline }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
      <label style={{ fontSize:"11px", fontWeight:"700", color:"#556", textTransform:"uppercase", letterSpacing:"0.08em" }}>{label}</label>
      {multiline
        ? <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={3} style={{...fi,resize:"vertical",minHeight:"80px"}}/>
        : <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={fi}/>
      }
    </div>
  );
}

// ─── PLAN BADGE ──────────────────────────────────────────────────────────────
const planColors = { free:"#556", professional:"#f59e0b", business:"#6366f1" };
function PlanBadge({ plan = "free" }) {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:"4px", padding:"3px 10px", borderRadius:"20px", fontSize:"11px", fontWeight:"700", textTransform:"uppercase", letterSpacing:"0.06em", background:`${planColors[plan]}22`, color:planColors[plan], border:`1px solid ${planColors[plan]}44` }}>
      {plan === "free" ? "Free" : plan === "professional" ? "⚡ Pro" : "💎 Business"}
    </span>
  );
}
function CoursesTab() {
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_URL}/api/courses`, {
          credentials: "include",
        });
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const openCourse = async (id) => {
    try {
      setError("");
      const res = await fetch(`${API_URL}/api/courses/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Cannot open course");
        return;
      }
      setSelected(data);
    } catch (err) {
      setError("Failed to load course");
    }
  };

  if (loading) return <p style={{color:"#556"}}>Loading courses...</p>;

  if (selected) return (
    <div>
      <button
        onClick={() => { setSelected(null); setError(""); }}
        style={{marginBottom:"16px",background:"transparent",border:"1px solid #1e2130",color:"#818cf8",padding:"8px 16px",borderRadius:"8px",cursor:"pointer",fontSize:"13px"}}
      >
        ← Back to courses
      </button>
      <h2 style={{color:"#f0f2ff",marginBottom:"8px"}}>{selected.title}</h2>
      <p style={{color:"#556",marginBottom:"16px"}}>{selected.description}</p>
      <div style={{whiteSpace:"pre-wrap",lineHeight:"1.9",color:"#c8cadc",background:"#0c0e17",padding:"24px",borderRadius:"12px",border:"1px solid #1e2130"}}>
        {selected.content}
      </div>
    </div>
  );

  return (
    <div>
      {error && (
        <div style={{background:"#ef444422",border:"1px solid #ef444444",borderRadius:"10px",padding:"12px 16px",color:"#ef4444",marginBottom:"16px",fontSize:"14px"}}>
          ⚠️ {error}
        </div>
      )}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"16px"}}>
        {courses.map(course => (
          <div key={course.id} style={{background:"#0f1120",border:"1px solid #1e2130",borderRadius:"16px",padding:"22px",cursor:"pointer"}}
            onClick={() => openCourse(course.id)}
          >
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"}}>
              <span style={{fontSize:"28px"}}>📚</span>
              {course.is_free ? (
                <span style={{fontSize:"11px",fontWeight:"700",color:"#10b981",background:"#10b98122",padding:"3px 8px",borderRadius:"6px"}}>Free</span>
              ) : (
                <span style={{fontSize:"11px",fontWeight:"700",color:"#f59e0b",background:"#f59e0b22",padding:"3px 8px",borderRadius:"6px"}}>Pro</span>
              )}
            </div>
            <h3 style={{margin:"0 0 6px 0",fontSize:"16px",fontWeight:"700",color:"#f0f2ff"}}>{course.title}</h3>
            <p style={{margin:"0 0 12px 0",fontSize:"13px",color:"#556",lineHeight:"1.5"}}>{course.description}</p>
            <span style={{fontSize:"12px",color:"#445",textTransform:"capitalize"}}>{course.level}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
// ─── DASHBOARD ───────────────────────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [userPlan, setUserPlan] = useState("free");// TODO: fetch from DB


  const handleAvatarUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("avatar", file);

  try {
    showToast("Uploading...");
    const res = await fetch(`${API_URL}/api/upload/avatar`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      showToast(data.message || "Upload failed", "error");
      return;
    }

    // ✅ Update user avatar immediately
    setUser(prev => ({ ...prev, avatar_url: data.avatar_url }));
    showToast("Profile picture updated ✅");

  } catch (err) {
    showToast("Upload failed", "error");
  }
};
  // Profile
  const [editingProfile, setEditingProfile] = useState(false);
  const [tempProfile, setTempProfile] = useState({ name:"", email:"", phone:"", address:"" });
  const [savingProfile, setSavingProfile] = useState(false);

  // Projects
  const [projects, setProjects] = useState([]);
  const [projectModal, setProjectModal] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [projectForm, setProjectForm] = useState({ name:"", tech:"", status:"Active", url:"", desc:"" });

  // Services
  const [services, setServices] = useState([]);
  const [serviceModal, setServiceModal] = useState(false);
  const [editService, setEditService] = useState(null);
  const [serviceForm, setServiceForm] = useState({ name:"", price:"", desc:"", icon:"🚀" });

  const [toast, setToast] = useState(null);

  const showToast = (msg, type="success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/api/auth/me`, { credentials:"include" });
        if (!res.ok) { navigate("/login"); return; }
        const data = await res.json();
        setUser(data);
         setUserPlan(data.plan || "free");
        setTempProfile({ name:data.name, email:data.email, phone:data.phone || "", address:data.address || "" });
      } catch { navigate("/login"); }
      finally { setLoadingUser(false); }
    };
    fetchUser();
  }, [navigate]);

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map(n=>n[0]).join("").toUpperCase().slice(0,2);
  };

  const handleLogout = async () => {
    await fetch(`${API_URL}/api/auth/logout`, { method:"POST", credentials:"include" });
    navigate("/login");
  };
const handleCancelSubscription = async () => {
  const confirm = window.confirm(
    "Are you sure? You will keep access until end of billing period."
  );
  if (!confirm) return;

  try {
    const res = await fetch(
      `${API_URL}/api/payment/cancel-subscription`,
      { method: "POST", credentials: "include" }
    );
    const data = await res.json();

    if (!res.ok) {
      showToast(data.message || "Cancel failed", "error");
      return;
    }

    // ✅ Refetch user immediately
    const userRes = await fetch(`${API_URL}/api/auth/me`, {
      credentials: "include"
    });
    const userData = await userRes.json();
    setUser(userData);
    setUserPlan(userData.plan || "free");

    showToast("Subscription cancelled ✅");

  } catch (err) {
    showToast("Something went wrong", "error");
  }
};
  const handleUpdateProfile = async () => {
    if (!tempProfile.name || !tempProfile.email) { showToast("Name and email required","error"); return; }
    try {
      setSavingProfile(true);
      const res = await fetch(`${API_URL}/api/auth/update-profile`, {
        method:"PUT", headers:{"Content-Type":"application/json"}, credentials:"include",
        body: JSON.stringify({ name:tempProfile.name, email:tempProfile.email, phone:tempProfile.phone, address:tempProfile.address }),
      });
      const data = await res.json();
      if (!res.ok) { showToast(data||"Update failed","error"); return; }
      setUser(data.user);
      setEditingProfile(false);
      showToast("Profile updated ✅");
    } catch { showToast("Server error","error"); }
    finally { setSavingProfile(false); }
  };

  // Project CRUD
  const openAddProject = () => { setEditProject(null); setProjectForm({name:"",tech:"",status:"Active",url:"",desc:""}); setProjectModal(true); };
  const openEditProject = (p) => { setEditProject(p); setProjectForm({...p}); setProjectModal(true); };
  const saveProject = () => {
    if (!projectForm.name) return;
    if (editProject) { setProjects(projects.map(p=>p.id===editProject.id?{...projectForm,id:editProject.id}:p)); showToast("Project updated!"); }
    else { setProjects([...projects,{...projectForm,id:Date.now()}]); showToast("Project added!"); }
    setProjectModal(false);
  };
  const deleteProject = (id) => { setProjects(projects.filter(p=>p.id!==id)); showToast("Deleted","error"); };

  // Service CRUD
  const openAddService = () => { setEditService(null); setServiceForm({name:"",price:"",desc:"",icon:"🚀"}); setServiceModal(true); };
  const openEditService = (sv) => { setEditService(sv); setServiceForm({...sv}); setServiceModal(true); };
  const saveService = () => {
    if (!serviceForm.name) return;
    if (editService) { setServices(services.map(s=>s.id===editService.id?{...serviceForm,id:editService.id}:s)); showToast("Service updated!"); }
    else { setServices([...services,{...serviceForm,id:Date.now()}]); showToast("Service added!"); }
    setServiceModal(false);
  };
  const deleteService = (id) => { setServices(services.filter(s=>s.id!==id)); showToast("Deleted","error"); };

  const statusColor = { Active:"#22d3ee", Live:"#4ade80", Paused:"#fb923c", Draft:"#a78bfa" };

  if (loadingUser) return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:"#090b14",flexDirection:"column",gap:"16px"}}>
      <div style={{width:"40px",height:"40px",border:"3px solid #1e2130",borderTop:"3px solid #6366f1",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <p style={{color:"#556",fontSize:"14px",margin:0}}>Loading your workspace...</p>
    </div>
  );

  const NavSection = ({ title, items }) => (
    <div style={{marginBottom:"24px"}}>
      <p style={{margin:"0 0 6px 12px",fontSize:"10px",fontWeight:"700",color:"#334",textTransform:"uppercase",letterSpacing:"0.1em"}}>{title}</p>
      {items.map(tab => {
        const isActive = activeTab === tab.id;
        const isLocked = tab.pro && userPlan === "free";
        return (
          <button key={tab.id}
            onClick={() => !isLocked && setActiveTab(tab.id)}
            style={{
              display:"flex", alignItems:"center", justifyContent:"space-between",
              width:"100%", padding:"9px 12px", borderRadius:"10px", border:"none",
              background: isActive ? "rgba(99,102,241,0.15)" : "transparent",
              color: isActive ? "#818cf8" : isLocked ? "#334" : "#8899bb",
              fontSize:"13px", fontWeight:"600", cursor: isLocked ? "default" : "pointer",
              textAlign:"left", marginBottom:"2px",
              borderLeft: isActive ? "2px solid #6366f1" : "2px solid transparent",
            }}>
            <span style={{display:"flex",alignItems:"center",gap:"10px"}}>
              <span style={{opacity: isActive ? 1 : isLocked ? 0.3 : 0.6}}>{tab.icon}</span>
              {tab.label}
            </span>
            {isLocked && <span style={{fontSize:"10px",color:"#f59e0b",background:"#f59e0b22",padding:"2px 6px",borderRadius:"4px",fontWeight:"700"}}>PRO</span>}
          </button>
        );
      })}
    </div>
  );

  return (
    <div style={s.root}>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #222530; border-radius: 4px; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .tab-content { animation: fadeIn 0.2s ease; }
      `}</style>

      {/* ══ SIDEBAR ══════════════════════════════════════════════════════════ */}
      <aside style={s.sidebar}>
        {/* Logo */}
        <div style={s.logo}>
          <div style={s.logoMark}>C</div>
          <span style={s.logoText}>CoreStack</span>
        </div>

        {/* User card */}
        <div style={s.userCard}>
          <div style={s.userAvatar}>
  {user?.avatar_url ? (
    <img
      src={user.avatar_url}
      alt="avatar"
      style={{
        width:"36px",
        height:"36px",
        borderRadius:"50%",
        objectFit:"cover"
      }}
    />
  ) : (
    getInitials(user?.name)
  )}
</div>
          <div style={{flex:1,minWidth:0}}>
            <p style={s.userName}>{user?.name||"User"}</p>
            <p style={s.userEmail}>{user?.email||""}</p>
          </div>
          <PlanBadge plan={userPlan} />
        </div>

        {/* Nav */}
        <nav style={{flex:1,padding:"8px 0",overflowY:"auto"}}>
          <NavSection title="Main" items={NAV.main} />
          <NavSection title="Features" items={NAV.features} />
          <NavSection title="Account" items={NAV.account} />
        </nav>

        {/* Logout */}
        <button onClick={handleLogout} style={s.logoutBtn}>
          {Icon.logout}
          <span>Sign out</span>
        </button>
      </aside>

      {/* ══ MAIN ═════════════════════════════════════════════════════════════ */}
      <main style={s.main}>

        {/* Top bar */}
        <div style={s.topbar}>
          <div>
            <h1 style={s.pageTitle}>
              {activeTab==="overview"  && "Overview"}
              {activeTab==="profile"   && "My Profile"}
              {activeTab==="projects"  && "Projects"}
              {activeTab==="services"  && "Services"}
              {activeTab==="weather"   && "Weather"}
              {activeTab==="courses"   && "Courses"}
              {activeTab==="pricing"   && "Pricing Plans"}
            </h1>
            <p style={s.pageSubtitle}>
              {activeTab==="overview"  && `Good to see you, ${user?.name?.split(" ")[0]} 👋`}
              {activeTab==="profile"   && "Manage your account information"}
              {activeTab==="projects"  && `${projects.length} project${projects.length!==1?"s":""}`}
              {activeTab==="services"  && `${services.length} service${services.length!==1?"s":""} offered`}
              {activeTab==="weather"   && "Live weather powered by geolocation"}
              {activeTab==="courses"   && "Learn and grow with our courses"}
              {activeTab==="pricing"   && "Choose the plan that's right for you"}
            </p>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            {activeTab==="projects" && <button onClick={openAddProject} style={s.addBtn}>{Icon.plus} New Project</button>}
            {activeTab==="services" && <button onClick={openAddService} style={s.addBtn}>{Icon.plus} New Service</button>}
          </div>
        </div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab==="overview" && (
          <div className="tab-content" style={{display:"flex",flexDirection:"column",gap:"20px"}}>
            {/* Stats */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:"16px"}}>
              {[
                {label:"Projects",  value:projects.length,  color:"#6366f1", icon:"📁"},
                {label:"Services",  value:services.length,  color:"#f59e0b", icon:"⚡"},
                {label:"Active",    value:projects.filter(p=>p.status==="Active"||p.status==="Live").length, color:"#10b981", icon:"🟢"},
                {label:"Plan",      value:userPlan.charAt(0).toUpperCase()+userPlan.slice(1), color:"#ec4899", icon:"💎"},
              ].map(stat => (
                <div key={stat.label} style={s.statCard}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"}}>
                    <span style={{fontSize:"22px"}}>{stat.icon}</span>
                    <span style={{fontSize:"11px",fontWeight:"700",color:stat.color,background:`${stat.color}22`,padding:"3px 8px",borderRadius:"6px",textTransform:"uppercase",letterSpacing:"0.06em"}}>{stat.label}</span>
                  </div>
                  <p style={{margin:0,fontSize:"32px",fontWeight:"800",color:stat.color,letterSpacing:"-0.03em"}}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div style={s.card}>
              <h3 style={s.cardTitle}>Quick Actions</h3>
              <div style={{display:"flex",gap:"10px",flexWrap:"wrap",marginTop:"14px"}}>
                {[
                  {label:"Edit Profile",  tab:"profile",  color:"#6366f1"},
                  {label:"Add Project",   action:openAddProject, color:"#f59e0b"},
                  {label:"Add Service",   action:openAddService, color:"#10b981"},
                  {label:"Check Weather", tab:"weather",  color:"#22d3ee"},
                  {label:"Update Plan",  tab:"pricing",  color:"#ec4899"},
                ].map(a => (
                  <button key={a.label}
                    onClick={() => a.action ? a.action() : setActiveTab(a.tab)}
                    style={{padding:"8px 16px",borderRadius:"8px",border:`1px solid ${a.color}44`,background:`${a.color}11`,color:a.color,fontSize:"13px",fontWeight:"600",cursor:"pointer"}}>
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Projects */}
            {projects.length > 0 && (
              <div style={s.card}>
                <h3 style={s.cardTitle}>Recent Projects</h3>
                <div style={{display:"flex",flexDirection:"column",gap:"8px",marginTop:"14px"}}>
                  {projects.slice(0,3).map(p => (
                    <div key={p.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:"#0c0e17",borderRadius:"10px",border:"1px solid #1e2130"}}>
                      <span style={{color:"#c8cadc",fontSize:"14px",fontWeight:"600"}}>{p.name}</span>
                      <span style={{fontSize:"12px",fontWeight:"700",color:statusColor[p.status]||"#556",background:`${statusColor[p.status]||"#556"}22`,padding:"3px 8px",borderRadius:"6px"}}>{p.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── PROFILE TAB ── */}
{activeTab==="profile" && (
  <div className="tab-content" style={{display:"flex",flexDirection:"column",gap:"16px",maxWidth:"680px"}}>
    <div style={s.card}>
      {/* Avatar row */}
<div style={{position:"relative",flexShrink:0}}>
  {user?.avatar_url ? (
    <img
      src={user.avatar_url}
      alt="avatar"
      style={{width:"72px",height:"72px",borderRadius:"50%",objectFit:"cover"}}
    />
  ) : (
    <div style={{width:"72px",height:"72px",borderRadius:"50%",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"26px",fontWeight:"800",color:"#fff"}}>
      {getInitials(user?.name)}
    </div>
  )}
  {/* Upload button */}
  <label htmlFor="avatar-upload" style={{
    position:"absolute",bottom:"0",right:"0",
    width:"24px",height:"24px",borderRadius:"50%",
    background:"#6366f1",border:"2px solid #090b14",
    display:"flex",alignItems:"center",justifyContent:"center",
    cursor:"pointer",fontSize:"12px"
  }}>
    ✏️
  </label>
  <input
    id="avatar-upload"
    type="file"
    accept="image/*"
    style={{display:"none"}}
    onChange={handleAvatarUpload}
  />
</div>
      {/* View mode */}
      {!editingProfile && (
        <>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:"16px",marginBottom:"20px"}}>
            {[{label:"Full Name",value:user?.name},{label:"Email",value:user?.email},{label:"Phone",value:user?.phone || "—"},{label:"Address",value:user?.address || "—"},{label:"User ID",value:`#${user?.id}`}].map(item=>(
              <div key={item.label}>
                <p style={{margin:"0 0 4px 0",fontSize:"11px",fontWeight:"700",color:"#445",textTransform:"uppercase",letterSpacing:"0.08em"}}>{item.label}</p>
                <p style={{margin:0,fontSize:"14px",color:"#c8cadc"}}>{item.value}</p>
              </div>
            ))}
          </div>
          <button onClick={()=>{setTempProfile({name:user.name,email:user.email,phone:user.phone||"",address:user.address||""});setEditingProfile(true);}} style={s.outlineBtn}>
            {Icon.edit} Edit Profile
          </button>
        </>
      )}

      {/* Edit mode */}
      {editingProfile && (
        <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
          <Field label="Full Name" value={tempProfile.name} onChange={v=>setTempProfile({...tempProfile,name:v})} placeholder="John Doe"/>
          <Field label="Email" type="email" value={tempProfile.email} onChange={v=>setTempProfile({...tempProfile,email:v})} placeholder="you@email.com"/>
          <Field label="Phone" type="tel" value={tempProfile.phone} onChange={v=>setTempProfile({...tempProfile,phone:v})} placeholder="+1 234 567 8900"/>
          <Field label="Address" value={tempProfile.address} onChange={v=>setTempProfile({...tempProfile,address:v})} placeholder="123 Main St, City"/>
          <div style={{display:"flex",gap:"10px",paddingTop:"4px"}}>
            <button onClick={handleUpdateProfile} disabled={savingProfile} style={{...s.primaryBtn,opacity:savingProfile?0.7:1}}>
              {Icon.save} {savingProfile?"Saving...":"Save Changes"}
            </button>
            <button onClick={()=>setEditingProfile(false)} style={s.ghostBtn}>Cancel</button>
          </div>
        </div>
      )}
    </div>

    {/* ← ADD THIS CARD BELOW */}
{userPlan !== "free" && (
  <div style={s.card}>
    <h3 style={{margin:"0 0 6px 0",fontSize:"15px",fontWeight:"700",color:"#f0f2ff"}}>
      Subscription
    </h3>
    <p style={{margin:"0 0 16px 0",fontSize:"13px",color:"#556"}}>
      You are on the{" "}
      <strong style={{color:planColors[userPlan]}}>{userPlan}</strong> plan.
    </p>

    {user?.subscription_status === "cancelling" ? (
      <div style={{
        background:"#f59e0b11",
        border:"1px solid #f59e0b44",
        borderRadius:"10px",
        padding:"12px 16px",
        color:"#f59e0b",
        fontSize:"13px"
      }}>
        ⚠️ Your subscription is cancelling. You keep access until billing period ends.
      </div>
    ) : (
      <button
        onClick={handleCancelSubscription}
        style={{
          padding:"9px 18px",
          borderRadius:"10px",
          border:"1px solid #ef444444",
          background:"#ef444411",
          color:"#ef4444",
          fontSize:"13px",
          fontWeight:"600",
          cursor:"pointer",
        }}
      >
        Cancel Subscription
      </button>
    )}
  </div>
)}

  </div>
)}

        {/* ── PROJECTS TAB ── */}
        {activeTab==="projects" && (
          <div className="tab-content" style={s.grid}>
            {projects.map(p=>(
              <div key={p.id} style={s.card}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"10px",marginBottom:"10px"}}>
                  <div>
                    <h3 style={{margin:"0 0 4px 0",fontSize:"16px",fontWeight:"700",color:"#f0f2ff",letterSpacing:"-0.01em"}}>{p.name}</h3>
                    <p style={{margin:0,fontSize:"13px",color:"#556",lineHeight:"1.5"}}>{p.desc}</p>
                  </div>
                  <span style={{padding:"4px 10px",borderRadius:"20px",fontSize:"11px",fontWeight:"700",background:`${statusColor[p.status]||"#556"}22`,color:statusColor[p.status]||"#556",whiteSpace:"nowrap",flexShrink:0}}>{p.status}</span>
                </div>
                {p.tech && <p style={{margin:"0 0 8px 0",fontSize:"12px",color:"#445"}}>🛠 {p.tech}</p>}
                {p.url && <a href={p.url} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:"5px",fontSize:"12px",color:"#6366f1",textDecoration:"none",marginBottom:"8px"}}>{Icon.link}{p.url}</a>}
                <div style={{display:"flex",gap:"8px",marginTop:"auto",paddingTop:"12px",borderTop:"1px solid #1a1c28"}}>
                  <button onClick={()=>openEditProject(p)} style={s.iconBtn}>{Icon.edit} Edit</button>
                  <button onClick={()=>deleteProject(p.id)} style={{...s.iconBtn,color:"#ef4444",borderColor:"#ef444422"}}>{Icon.trash} Delete</button>
                </div>
              </div>
            ))}
            {projects.length===0 && <div style={s.empty}>No projects yet.<br/><span style={{fontSize:"13px"}}>Click "New Project" to get started!</span></div>}
          </div>
        )}

        {/* ── SERVICES TAB ── */}
        {activeTab==="services" && (
          <div className="tab-content" style={s.grid}>
            {services.map(sv=>(
              <div key={sv.id} style={s.card}>
                <div style={{fontSize:"32px",marginBottom:"10px"}}>{sv.icon}</div>
                <h3 style={{margin:"0 0 4px 0",fontSize:"16px",fontWeight:"700",color:"#f0f2ff"}}>{sv.name}</h3>
                <p style={{margin:"0 0 10px 0",fontSize:"13px",color:"#556",lineHeight:"1.5"}}>{sv.desc}</p>
                <p style={{margin:"0 0 12px 0",fontSize:"22px",fontWeight:"800",color:"#10b981",letterSpacing:"-0.02em"}}>{sv.price}</p>
                <div style={{display:"flex",gap:"8px",marginTop:"auto",paddingTop:"12px",borderTop:"1px solid #1a1c28"}}>
                  <button onClick={()=>openEditService(sv)} style={s.iconBtn}>{Icon.edit} Edit</button>
                  <button onClick={()=>deleteService(sv.id)} style={{...s.iconBtn,color:"#ef4444",borderColor:"#ef444422"}}>{Icon.trash} Delete</button>
                </div>
              </div>
            ))}
            {services.length===0 && <div style={s.empty}>No services yet.<br/><span style={{fontSize:"13px"}}>Click "New Service" to get started!</span></div>}
          </div>
        )}

        {/* ── WEATHER TAB ── */}
        {activeTab==="weather" && (
          <div className="tab-content" style={{width:"100%"}}>
            <WeatherWidget />
          </div>
        )}

        {/* ── COURSES TAB (Pro only) ── */}
        {activeTab==="courses" && (
          <div className="tab-content">
            {userPlan==="free" ? (
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"80px 20px",textAlign:"center"}}>
                <div style={{width:"64px",height:"64px",borderRadius:"50%",background:"#f59e0b22",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"20px",fontSize:"28px"}}>{Icon.lock}</div>
                <h2 style={{margin:"0 0 10px 0",fontSize:"24px",fontWeight:"800",color:"#f0f2ff"}}>Courses are a Pro feature</h2>
                <p style={{margin:"0 0 24px 0",fontSize:"15px",color:"#556",maxWidth:"380px",lineHeight:"1.6"}}>Upgrade to Professional or Business plan to unlock access to all courses and learning materials.</p>
                <button onClick={()=>setActiveTab("pricing")} style={s.primaryBtn}>{Icon.zap} View Pricing Plans</button>
              </div>
            ) : (
  <CoursesTab />
            )}
          </div>
        )}

        {/* ── PRICING TAB ── */}
{activeTab==="pricing" && (
  <div className="tab-content">
    <PricingPage user={user}/>
  </div>
)}
      </main>

      {/* ══ MODALS ═══════════════════════════════════════════════════════════ */}
      {projectModal && (
        <Modal title={editProject?"Edit Project":"New Project"} onClose={()=>setProjectModal(false)}>
          <div style={{padding:"24px",display:"flex",flexDirection:"column",gap:"14px"}}>
            <Field label="Project Name" value={projectForm.name} onChange={v=>setProjectForm({...projectForm,name:v})} placeholder="My Awesome App"/>
            <Field label="Description" value={projectForm.desc} onChange={v=>setProjectForm({...projectForm,desc:v})} placeholder="What does it do?" multiline/>
            <Field label="Technologies" value={projectForm.tech} onChange={v=>setProjectForm({...projectForm,tech:v})} placeholder="React, Node.js, PostgreSQL"/>
            <Field label="URL" value={projectForm.url} onChange={v=>setProjectForm({...projectForm,url:v})} placeholder="https://myapp.com"/>
            <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
              <label style={{fontSize:"11px",fontWeight:"700",color:"#556",textTransform:"uppercase",letterSpacing:"0.08em"}}>Status</label>
              <select value={projectForm.status} onChange={e=>setProjectForm({...projectForm,status:e.target.value})} style={fi}>
                {["Active","Live","Paused","Draft"].map(st=><option key={st}>{st}</option>)}
              </select>
            </div>
            <div style={{display:"flex",gap:"10px",paddingTop:"4px"}}>
              <button onClick={saveProject} style={s.primaryBtn}>{Icon.save} Save</button>
              <button onClick={()=>setProjectModal(false)} style={s.ghostBtn}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}

      {serviceModal && (
        <Modal title={editService?"Edit Service":"New Service"} onClose={()=>setServiceModal(false)}>
          <div style={{padding:"24px",display:"flex",flexDirection:"column",gap:"14px"}}>
            <Field label="Service Name" value={serviceForm.name} onChange={v=>setServiceForm({...serviceForm,name:v})} placeholder="Web Development"/>
            <Field label="Description" value={serviceForm.desc} onChange={v=>setServiceForm({...serviceForm,desc:v})} placeholder="What do you offer?" multiline/>
            <Field label="Price" value={serviceForm.price} onChange={v=>setServiceForm({...serviceForm,price:v})} placeholder="$1,500"/>
            <Field label="Icon (Emoji)" value={serviceForm.icon} onChange={v=>setServiceForm({...serviceForm,icon:v})} placeholder="💻"/>
            <div style={{display:"flex",gap:"10px",paddingTop:"4px"}}>
              <button onClick={saveService} style={s.primaryBtn}>{Icon.save} Save</button>
              <button onClick={()=>setServiceModal(false)} style={s.ghostBtn}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}

      {/* TOAST */}
      {toast && (
        <div style={{...s.toast,background:toast.type==="error"?"#ef4444":"#10b981"}}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const s = {
  root: { display:"flex", minHeight:"100vh", background:"#090b14", fontFamily:"'DM Sans','Segoe UI',sans-serif", color:"#e8eaf6" },

  // Sidebar
  sidebar: { width:"248px", minHeight:"100vh", background:"#0c0e17", borderRight:"1px solid #141620", display:"flex", flexDirection:"column", padding:"20px 12px", position:"sticky", top:0, height:"100vh" },
  logo: { display:"flex", alignItems:"center", gap:"10px", marginBottom:"20px", padding:"4px 8px" },
  logoMark: { width:"30px", height:"30px", borderRadius:"8px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px", fontWeight:"900", color:"#fff" },
  logoText: { fontWeight:"800", fontSize:"17px", color:"#f0f2ff", letterSpacing:"-0.03em" },
  userCard: { display:"flex", alignItems:"center", gap:"10px", padding:"12px", background:"#0f1120", borderRadius:"12px", border:"1px solid #1e2130", marginBottom:"20px" },
  userAvatar: { width:"36px", height:"36px", minWidth:"36px", borderRadius:"50%", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px", fontWeight:"800", color:"#fff" },
  userName: { margin:"0 0 2px 0", fontWeight:"700", fontSize:"13px", color:"#f0f2ff", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" },
  userEmail: { margin:0, fontSize:"11px", color:"#445", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" },
  logoutBtn: { display:"flex", alignItems:"center", gap:"8px", padding:"10px 12px", borderRadius:"10px", border:"1px solid #1e2130", background:"transparent", color:"#ef4444", fontSize:"13px", fontWeight:"600", cursor:"pointer", marginTop:"8px" },

  // Main
  main: { flex:1, padding:"28px 32px", overflowY:"auto", maxWidth:"calc(100vw - 248px)" },
  topbar: { display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"24px" },
  pageTitle: { margin:"0 0 4px 0", fontSize:"24px", fontWeight:"800", color:"#f0f2ff", letterSpacing:"-0.03em" },
  pageSubtitle: { margin:0, fontSize:"13px", color:"#445" },
  addBtn: { display:"flex", alignItems:"center", gap:"6px", padding:"9px 16px", borderRadius:"10px", border:"none", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", color:"#fff", fontSize:"13px", fontWeight:"700", cursor:"pointer" },

  // Cards
  card: { background:"#0f1120", border:"1px solid #1e2130", borderRadius:"16px", padding:"22px" },
  cardTitle: { margin:0, fontSize:"15px", fontWeight:"700", color:"#f0f2ff", letterSpacing:"-0.01em" },
  statCard: { background:"#0f1120", border:"1px solid #1e2130", borderRadius:"14px", padding:"20px" },
  grid: { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"16px" },
  empty: { gridColumn:"1/-1", textAlign:"center", padding:"60px 20px", color:"#445", fontSize:"15px", fontWeight:"600", background:"#0f1120", borderRadius:"14px", border:"1px dashed #1e2130", lineHeight:"1.8" },

  // Buttons
  primaryBtn: { display:"inline-flex", alignItems:"center", gap:"6px", padding:"10px 18px", borderRadius:"10px", border:"none", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", color:"#fff", fontSize:"14px", fontWeight:"700", cursor:"pointer" },
  outlineBtn: { display:"inline-flex", alignItems:"center", gap:"6px", padding:"9px 18px", borderRadius:"10px", border:"1px solid #2a2d4a", background:"transparent", color:"#818cf8", fontSize:"13px", fontWeight:"600", cursor:"pointer" },
  ghostBtn: { padding:"9px 18px", borderRadius:"10px", border:"1px solid #1e2130", background:"transparent", color:"#445", fontSize:"13px", fontWeight:"600", cursor:"pointer" },
  iconBtn: { display:"inline-flex", alignItems:"center", gap:"5px", padding:"6px 12px", borderRadius:"8px", border:"1px solid #1e2130", background:"transparent", color:"#778", fontSize:"12px", fontWeight:"600", cursor:"pointer" },

  // Toast
  toast: { position:"fixed", bottom:"24px", right:"24px", padding:"12px 20px", borderRadius:"12px", color:"#fff", fontWeight:"700", fontSize:"14px", zIndex:9999, boxShadow:"0 8px 30px rgba(0,0,0,0.4)" },
};