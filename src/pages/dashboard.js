import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Icon = {
  user: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  briefcase: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>,
  star: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  plus: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  edit: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
  logout: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  close: <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  save: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  link: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
};

function Modal({ title, onClose, children }) {
  return (
    <div style={mStyles.overlay} onClick={onClose}>
      <div style={mStyles.modal} onClick={e => e.stopPropagation()}>
        <div style={mStyles.modalHeader}>
          <h3 style={mStyles.modalTitle}>{title}</h3>
          <button onClick={onClose} style={mStyles.closeBtn}>{Icon.close}</button>
        </div>
        {children}
      </div>
    </div>
  );
}

const mStyles = {
  overlay: { position:"fixed", inset:0, background:"rgba(10,12,20,0.7)", backdropFilter:"blur(4px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:"20px" },
  modal: { background:"#13152b", border:"1px solid #2a2d4a", borderRadius:"16px", width:"100%", maxWidth:"480px", overflow:"hidden" },
  modalHeader: { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"20px 24px", borderBottom:"1px solid #2a2d4a" },
  modalTitle: { margin:0, color:"#e8eaf6", fontSize:"18px", fontWeight:"700" },
  closeBtn: { background:"none", border:"none", color:"#6b7db3", cursor:"pointer", padding:"4px", borderRadius:"6px", display:"flex" },
};

const fStyle = { padding:"10px 14px", background:"#0d0f1f", border:"1px solid #2a2d4a", borderRadius:"8px", color:"#e8eaf6", fontSize:"14px", outline:"none", width:"100%", boxSizing:"border-box" };

function Field({ label, value, onChange, type = "text", placeholder, multiline }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
      <label style={{ fontSize:"12px", fontWeight:"600", color:"#6b7db3", textTransform:"uppercase", letterSpacing:"0.06em" }}>{label}</label>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} style={{ ...fStyle, resize:"vertical", minHeight:"80px" }} />
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={fStyle} />
      }
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Profile edit
  const [editingProfile, setEditingProfile] = useState(false);
  const [tempProfile, setTempProfile] = useState({ name: "", email: "" });
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

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Fetch real user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("https://app-backend-production-89a2.up.railway.app/api/auth/me", {
          credentials: "include",
        });
        if (!res.ok) { navigate("/login"); return; }
        const data = await res.json();
        setUser(data);
        setTempProfile({ name: data.name, email: data.email });
      } catch (err) {
        navigate("/login");
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  // Logout
  const handleLogout = async () => {
    await fetch("https://app-backend-production-89a2.up.railway.app/api/auth/logout", { method:"POST", credentials:"include" });
    navigate("/login");
  };

  // ✅ UPDATE PROFILE — saves to database
  const handleUpdateProfile = async () => {
    if (!tempProfile.name || !tempProfile.email) {
      showToast("Name and email are required", "error");
      return;
    }
    try {
      setSavingProfile(true);
      const res = await fetch("https://app-backend-production-89a2.up.railway.app/api/auth/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: tempProfile.name, email: tempProfile.email }),
      });
      const data = await res.json();
      if (!res.ok) { showToast(data || "Update failed", "error"); return; }
      setUser(data.user);        // ✅ sidebar updates instantly
      setEditingProfile(false);
      showToast("Profile updated successfully! ✅");
    } catch (err) {
      showToast("Server error", "error");
    } finally {
      setSavingProfile(false);
    }
  };

  // Project CRUD
  const openAddProject = () => { setEditProject(null); setProjectForm({ name:"", tech:"", status:"Active", url:"", desc:"" }); setProjectModal(true); };
  const openEditProject = (p) => { setEditProject(p); setProjectForm({...p}); setProjectModal(true); };
  const saveProject = () => {
    if (!projectForm.name) return;
    if (editProject) {
      setProjects(projects.map(p => p.id === editProject.id ? { ...projectForm, id: editProject.id } : p));
      showToast("Project updated!");
    } else {
      setProjects([...projects, { ...projectForm, id: Date.now() }]);
      showToast("Project added!");
    }
    setProjectModal(false);
  };
  const deleteProject = (id) => { setProjects(projects.filter(p => p.id !== id)); showToast("Project deleted!", "error"); };

  // Service CRUD
  const openAddService = () => { setEditService(null); setServiceForm({ name:"", price:"", desc:"", icon:"🚀" }); setServiceModal(true); };
  const openEditService = (sv) => { setEditService(sv); setServiceForm({...sv}); setServiceModal(true); };
  const saveService = () => {
    if (!serviceForm.name) return;
    if (editService) {
      setServices(services.map(s => s.id === editService.id ? { ...serviceForm, id: editService.id } : s));
      showToast("Service updated!");
    } else {
      setServices([...services, { ...serviceForm, id: Date.now() }]);
      showToast("Service added!");
    }
    setServiceModal(false);
  };
  const deleteService = (id) => { setServices(services.filter(s => s.id !== id)); showToast("Service deleted!", "error"); };

  const statusColor = { Active:"#22d3ee", Live:"#4ade80", Paused:"#fb923c", Draft:"#a78bfa" };

  if (loadingUser) {
    return (
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#080a18", color:"#4f8ef7", fontSize:"18px", fontWeight:"700" }}>
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div style={s.root}>

      {/* SIDEBAR */}
      <aside style={s.sidebar}>
        <div style={s.logo}>
          <span style={s.logoIcon}>⬡</span>
          <span style={s.logoText}>CoreStack</span>
        </div>

        <div style={s.avatarWrap}>
          <div style={s.avatar}>{getInitials(user?.name)}</div>
          <p style={s.sidebarName}>{user?.name || "User"}</p>
          <p style={s.sidebarTitle}>{user?.email || ""}</p>
        </div>

        <nav style={s.nav}>
          {[
            { id:"profile",  label:"Profile",  icon: Icon.user },
            { id:"projects", label:"Projects", icon: Icon.briefcase },
            { id:"services", label:"Services", icon: Icon.star },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ ...s.navBtn, ...(activeTab === tab.id ? s.navBtnActive : {}) }}>
              <span style={{ opacity: activeTab === tab.id ? 1 : 0.5 }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        <button onClick={handleLogout} style={s.logoutBtn}>
          {Icon.logout} Logout
        </button>
      </aside>

      {/* MAIN */}
      <main style={s.main}>
        <div style={s.header}>
          <div>
            <h1 style={s.pageTitle}>
              {activeTab === "profile"  && "My Profile"}
              {activeTab === "projects" && "Projects"}
              {activeTab === "services" && "Services"}
            </h1>
            <p style={s.pageSubtitle}>
              {activeTab === "profile"  && `Welcome back, ${user?.name?.split(" ")[0]}!`}
              {activeTab === "projects" && `${projects.length} projects total`}
              {activeTab === "services" && `${services.length} services offered`}
            </p>
          </div>
          {activeTab === "projects" && <button onClick={openAddProject} style={s.addBtn}>{Icon.plus} Add Project</button>}
          {activeTab === "services" && <button onClick={openAddService} style={s.addBtn}>{Icon.plus} Add Service</button>}
        </div>

        {/* ── PROFILE TAB ── */}
        {activeTab === "profile" && (
          <div style={s.section}>
            <div style={s.profileCard}>
              <div style={s.profileTop}>
                <div style={s.profileAvatar}>{getInitials(user?.name)}</div>
                <div>
                  <h2 style={s.profileName}>{user?.name}</h2>
                  <p style={s.profileRole}>{user?.email}</p>
                  <span style={s.profileBadge}>ID: #{user?.id}</span>
                </div>
              </div>

              {/* VIEW MODE */}
              {!editingProfile && (
                <>
                  <div style={s.infoGrid}>
                    <div style={s.infoItem}>
                      <span style={s.infoLabel}>Full Name</span>
                      <span style={s.infoValue}>{user?.name}</span>
                    </div>
                    <div style={s.infoItem}>
                      <span style={s.infoLabel}>Email Address</span>
                      <span style={s.infoValue}>{user?.email}</span>
                    </div>
                    <div style={s.infoItem}>
                      <span style={s.infoLabel}>User ID</span>
                      <span style={s.infoValue}>#{user?.id}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setTempProfile({ name: user.name, email: user.email });
                      setEditingProfile(true);
                    }}
                    style={s.editProfileBtn}
                  >
                    {Icon.edit} Edit Profile
                  </button>
                </>
              )}

              {/* EDIT MODE */}
              {editingProfile && (
                <div style={{ display:"flex", flexDirection:"column", gap:"16px", marginTop:"8px" }}>
                  <div style={{ height:"1px", background:"#1e2040", margin:"8px 0" }} />
                  <Field
                    label="Full Name"
                    value={tempProfile.name}
                    onChange={v => setTempProfile({ ...tempProfile, name: v })}
                    placeholder="John Doe"
                  />
                  <Field
                    label="Email Address"
                    type="email"
                    value={tempProfile.email}
                    onChange={v => setTempProfile({ ...tempProfile, email: v })}
                    placeholder="you@email.com"
                  />
                  <div style={{ display:"flex", gap:"10px", paddingTop:"4px" }}>
                    <button
                      onClick={handleUpdateProfile}
                      style={{ ...s.saveBtn, opacity: savingProfile ? 0.7 : 1 }}
                      disabled={savingProfile}
                    >
                      {Icon.save} {savingProfile ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      onClick={() => {
                        setEditingProfile(false);
                        setTempProfile({ name: user.name, email: user.email });
                      }}
                      style={s.cancelBtn}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Stats */}
            <div style={s.statsRow}>
              {[
                { label:"Projects", value: projects.length, color:"#4f8ef7" },
                { label:"Services", value: services.length, color:"#a78bfa" },
                { label:"Active", value: projects.filter(p => p.status==="Active"||p.status==="Live").length, color:"#4ade80" },
              ].map(stat => (
                <div key={stat.label} style={{ ...s.statCard, borderTop:`3px solid ${stat.color}` }}>
                  <p style={{ ...s.statNum, color: stat.color }}>{stat.value}</p>
                  <p style={s.statLabel}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PROJECTS TAB ── */}
        {activeTab === "projects" && (
          <div style={s.grid}>
            {projects.map(p => (
              <div key={p.id} style={s.card}>
                <div style={s.cardHeader}>
                  <div>
                    <h3 style={s.cardTitle}>{p.name}</h3>
                    <p style={s.cardDesc}>{p.desc}</p>
                  </div>
                  <span style={{ ...s.badge, background:`${statusColor[p.status]||"#6b7db3"}22`, color:statusColor[p.status]||"#6b7db3" }}>{p.status}</span>
                </div>
                <p style={s.cardMeta}>🛠 {p.tech}</p>
                {p.url && <a href={p.url} target="_blank" rel="noreferrer" style={s.cardLink}>{Icon.link} {p.url}</a>}
                <div style={s.cardActions}>
                  <button onClick={() => openEditProject(p)} style={s.iconBtn}>{Icon.edit} Edit</button>
                  <button onClick={() => deleteProject(p.id)} style={{ ...s.iconBtn, color:"#f87171" }}>{Icon.trash} Delete</button>
                </div>
              </div>
            ))}
            {projects.length === 0 && <div style={s.empty}>No projects yet. Click "Add Project" to get started!</div>}
          </div>
        )}

        {/* ── SERVICES TAB ── */}
        {activeTab === "services" && (
          <div style={s.grid}>
            {services.map(sv => (
              <div key={sv.id} style={s.card}>
                <div style={s.serviceIcon}>{sv.icon}</div>
                <h3 style={s.cardTitle}>{sv.name}</h3>
                <p style={s.cardDesc}>{sv.desc}</p>
                <p style={s.price}>{sv.price}</p>
                <div style={s.cardActions}>
                  <button onClick={() => openEditService(sv)} style={s.iconBtn}>{Icon.edit} Edit</button>
                  <button onClick={() => deleteService(sv.id)} style={{ ...s.iconBtn, color:"#f87171" }}>{Icon.trash} Delete</button>
                </div>
              </div>
            ))}
            {services.length === 0 && <div style={s.empty}>No services yet. Click "Add Service" to get started!</div>}
          </div>
        )}
      </main>

      {/* PROJECT MODAL */}
      {projectModal && (
        <Modal title={editProject ? "Edit Project" : "Add Project"} onClose={() => setProjectModal(false)}>
          <div style={{ padding:"24px", display:"flex", flexDirection:"column", gap:"16px" }}>
            <Field label="Project Name" value={projectForm.name} onChange={v => setProjectForm({...projectForm, name:v})} placeholder="My App" />
            <Field label="Description" value={projectForm.desc} onChange={v => setProjectForm({...projectForm, desc:v})} placeholder="What does it do?" multiline />
            <Field label="Technologies" value={projectForm.tech} onChange={v => setProjectForm({...projectForm, tech:v})} placeholder="React, Node.js" />
            <Field label="URL" value={projectForm.url} onChange={v => setProjectForm({...projectForm, url:v})} placeholder="https://myapp.com" />
            <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
              <label style={{ fontSize:"12px", fontWeight:"600", color:"#6b7db3", textTransform:"uppercase", letterSpacing:"0.06em" }}>Status</label>
              <select value={projectForm.status} onChange={e => setProjectForm({...projectForm, status:e.target.value})} style={fStyle}>
                {["Active","Live","Paused","Draft"].map(st => <option key={st}>{st}</option>)}
              </select>
            </div>
            <div style={{ display:"flex", gap:"10px", paddingTop:"8px" }}>
              <button onClick={saveProject} style={s.saveBtn}>{Icon.save} Save</button>
              <button onClick={() => setProjectModal(false)} style={s.cancelBtn}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}

      {/* SERVICE MODAL */}
      {serviceModal && (
        <Modal title={editService ? "Edit Service" : "Add Service"} onClose={() => setServiceModal(false)}>
          <div style={{ padding:"24px", display:"flex", flexDirection:"column", gap:"16px" }}>
            <Field label="Service Name" value={serviceForm.name} onChange={v => setServiceForm({...serviceForm, name:v})} placeholder="Web Development" />
            <Field label="Description" value={serviceForm.desc} onChange={v => setServiceForm({...serviceForm, desc:v})} placeholder="What do you offer?" multiline />
            <Field label="Price" value={serviceForm.price} onChange={v => setServiceForm({...serviceForm, price:v})} placeholder="$1,500" />
            <Field label="Icon (Emoji)" value={serviceForm.icon} onChange={v => setServiceForm({...serviceForm, icon:v})} placeholder="💻" />
            <div style={{ display:"flex", gap:"10px", paddingTop:"8px" }}>
              <button onClick={saveService} style={s.saveBtn}>{Icon.save} Save</button>
              <button onClick={() => setServiceModal(false)} style={s.cancelBtn}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}

      {/* TOAST */}
      {toast && (
        <div style={{ ...s.toast, background: toast.type === "error" ? "#f87171" : "#4ade80" }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

const s = {
  root: { display:"flex", minHeight:"100vh", background:"#080a18", fontFamily:"'DM Sans','Segoe UI',sans-serif", color:"#e8eaf6" },
  sidebar: { width:"240px", minHeight:"100vh", background:"#0d0f1f", borderRight:"1px solid #1e2040", display:"flex", flexDirection:"column", padding:"24px 16px", position:"sticky", top:0, height:"100vh" },
  logo: { display:"flex", alignItems:"center", gap:"10px", marginBottom:"32px", paddingLeft:"8px" },
  logoIcon: { fontSize:"22px", color:"#4f8ef7" },
  logoText: { fontWeight:"800", fontSize:"18px", color:"#e8eaf6", letterSpacing:"-0.02em" },
  avatarWrap: { display:"flex", flexDirection:"column", alignItems:"center", padding:"20px 0", borderBottom:"1px solid #1e2040", marginBottom:"20px" },
  avatar: { width:"64px", height:"64px", borderRadius:"50%", background:"linear-gradient(135deg,#4f8ef7,#a78bfa)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px", fontWeight:"800", color:"#fff", marginBottom:"10px" },
  sidebarName: { margin:"0 0 4px 0", fontWeight:"700", fontSize:"14px", color:"#e8eaf6" },
  sidebarTitle: { margin:0, fontSize:"12px", color:"#6b7db3" },
  nav: { display:"flex", flexDirection:"column", gap:"4px", flex:1 },
  navBtn: { display:"flex", alignItems:"center", gap:"10px", padding:"10px 14px", borderRadius:"10px", border:"none", background:"transparent", color:"#a0aec8", fontSize:"14px", fontWeight:"600", cursor:"pointer", textAlign:"left" },
  navBtnActive: { background:"linear-gradient(135deg,#4f8ef722,#a78bfa22)", color:"#e8eaf6", borderLeft:"3px solid #4f8ef7" },
  logoutBtn: { display:"flex", alignItems:"center", gap:"8px", padding:"10px 14px", borderRadius:"10px", border:"1px solid #2a2d4a", background:"transparent", color:"#f87171", fontSize:"14px", fontWeight:"600", cursor:"pointer", marginTop:"auto" },
  main: { flex:1, padding:"32px", overflowY:"auto" },
  header: { display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"28px" },
  pageTitle: { margin:"0 0 4px 0", fontSize:"26px", fontWeight:"800", color:"#e8eaf6", letterSpacing:"-0.03em" },
  pageSubtitle: { margin:0, fontSize:"14px", color:"#6b7db3" },
  addBtn: { display:"flex", alignItems:"center", gap:"6px", padding:"10px 18px", borderRadius:"10px", border:"none", background:"linear-gradient(135deg,#4f8ef7,#7c6af7)", color:"#fff", fontSize:"14px", fontWeight:"700", cursor:"pointer" },
  section: { display:"flex", flexDirection:"column", gap:"20px" },
  profileCard: { background:"#0d0f1f", border:"1px solid #1e2040", borderRadius:"16px", padding:"28px" },
  profileTop: { display:"flex", gap:"20px", alignItems:"flex-start", marginBottom:"24px" },
  profileAvatar: { width:"80px", height:"80px", minWidth:"80px", borderRadius:"50%", background:"linear-gradient(135deg,#4f8ef7,#a78bfa)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"28px", fontWeight:"800", color:"#fff" },
  profileName: { margin:"0 0 4px 0", fontSize:"22px", fontWeight:"800", color:"#e8eaf6" },
  profileRole: { margin:"0 0 8px 0", fontSize:"14px", color:"#4f8ef7", fontWeight:"600" },
  profileBadge: { display:"inline-block", padding:"3px 10px", borderRadius:"20px", background:"#1e2040", color:"#6b7db3", fontSize:"12px", fontWeight:"600" },
  infoGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"16px", marginBottom:"20px" },
  infoItem: { display:"flex", flexDirection:"column", gap:"4px" },
  infoLabel: { fontSize:"11px", fontWeight:"600", color:"#6b7db3", textTransform:"uppercase", letterSpacing:"0.06em" },
  infoValue: { fontSize:"14px", color:"#e8eaf6" },
  editProfileBtn: { display:"inline-flex", alignItems:"center", gap:"8px", padding:"10px 20px", borderRadius:"10px", border:"1px solid #2a2d4a", background:"transparent", color:"#4f8ef7", fontSize:"14px", fontWeight:"600", cursor:"pointer" },
  statsRow: { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"16px" },
  statCard: { background:"#0d0f1f", border:"1px solid #1e2040", borderRadius:"12px", padding:"20px", textAlign:"center" },
  statNum: { margin:"0 0 4px 0", fontSize:"32px", fontWeight:"800" },
  statLabel: { margin:0, fontSize:"13px", color:"#6b7db3", fontWeight:"600" },
  saveBtn: { display:"flex", alignItems:"center", gap:"6px", padding:"10px 20px", borderRadius:"10px", border:"none", background:"linear-gradient(135deg,#4f8ef7,#7c6af7)", color:"#fff", fontSize:"14px", fontWeight:"700", cursor:"pointer" },
  cancelBtn: { padding:"10px 20px", borderRadius:"10px", border:"1px solid #2a2d4a", background:"transparent", color:"#6b7db3", fontSize:"14px", fontWeight:"600", cursor:"pointer" },
  grid: { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:"16px" },
  card: { background:"#0d0f1f", border:"1px solid #1e2040", borderRadius:"14px", padding:"22px", display:"flex", flexDirection:"column", gap:"10px" },
  cardHeader: { display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"10px" },
  cardTitle: { margin:"0 0 4px 0", fontSize:"16px", fontWeight:"700", color:"#e8eaf6" },
  cardDesc: { margin:0, fontSize:"13px", color:"#8899bb", lineHeight:"1.5" },
  cardMeta: { fontSize:"13px", color:"#6b7db3", margin:0 },
  cardLink: { display:"flex", alignItems:"center", gap:"5px", fontSize:"12px", color:"#4f8ef7", textDecoration:"none" },
  cardActions: { display:"flex", gap:"8px", marginTop:"auto", paddingTop:"10px", borderTop:"1px solid #1e2040" },
  iconBtn: { display:"flex", alignItems:"center", gap:"5px", padding:"6px 12px", borderRadius:"7px", border:"1px solid #2a2d4a", background:"transparent", color:"#a0aec8", fontSize:"13px", fontWeight:"600", cursor:"pointer" },
  badge: { padding:"4px 10px", borderRadius:"20px", fontSize:"12px", fontWeight:"700", whiteSpace:"nowrap" },
  serviceIcon: { fontSize:"32px" },
  price: { margin:0, fontSize:"20px", fontWeight:"800", color:"#4ade80" },
  empty: { gridColumn:"1/-1", textAlign:"center", padding:"60px 20px", color:"#6b7db3", fontSize:"15px", background:"#0d0f1f", borderRadius:"14px", border:"1px dashed #2a2d4a" },
  toast: { position:"fixed", bottom:"24px", right:"24px", padding:"12px 20px", borderRadius:"10px", color:"#0a0c14", fontWeight:"700", fontSize:"14px", zIndex:9999, boxShadow:"0 8px 24px rgba(0,0,0,0.3)" },
};