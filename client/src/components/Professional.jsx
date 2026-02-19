import { useState, useEffect, useRef, useCallback } from "react";
import "./Professional.css";

const NAV_ITEMS = [
  { id: "hero", label: "Home", icon: "◆" },
  { id: "about", label: "About", icon: "○" },
  { id: "projects", label: "Work", icon: "□" },
  { id: "experience", label: "Journey", icon: "△" },
  { id: "contact", label: "Contact", icon: "◇" },
];

const PROJECTS = {
  clients: [
    { id: 1, title: "LGBT Pride Path", subtitle: "Community platform & resource hub", description: "Designed and developed lgbtpridepath.org — a platform connecting the LGBTQ+ community with resources, events, and safe spaces. Full-stack build with a focus on accessibility and inclusive design.", tags: ["React", "Node.js", "CSS", "Accessibility"], category: "Web Application", website: "https://lgbtpridepath.org", status: "completed", featured: true },
    { id: 2, title: "LGBT Pride Widget & Map", subtitle: "Embeddable widget & interactive map", description: "Interactive map and embeddable widget allowing organisations to showcase LGBTQ+ friendly locations and events. Built as a companion product to LGBT Pride Path with real-time data.", tags: ["React", "Mapbox", "JavaScript", "API"], category: "Web Application", website: "https://lgbtpridepath.org", status: "completed" },
    { id: 3, title: "Narayan Travelstead Law Portal", subtitle: "Legal services client portal", description: "Secure client-facing portal for Narayan Travelstead law firm. Document management, case tracking, appointment scheduling, and secure messaging — built with a focus on confidentiality and ease of use.", tags: ["React", "Node.js", "Express", "PostgreSQL"], category: "Web Application", status: "in-progress", featured: true },
    { id: 4, title: "Clair Dunne Psychotherapy", subtitle: "Professional therapy practice", description: "Full brand presence and web platform for a Dublin-based psychotherapist. Calming, accessible design with booking integration and content management.", tags: ["HTML", "CSS", "JavaScript"], category: "Web Design & Development", website: "https://clairdunne.com/", status: "completed" },
    { id: 5, title: "Clearvue Services", subtitle: "Commercial cleaning company", description: "Corporate website for a professional cleaning services company. Service showcases, quote request system, and responsive design throughout.", tags: ["HTML", "CSS", "JavaScript"], category: "Web Design & Development", website: "https://clearvueservices.com", status: "completed" },
    { id: 6, title: "Switch Construction", subtitle: "Construction & fit-out", description: "Professional web presence for a construction firm. Portfolio gallery, project case studies, and lead generation with modern responsive layouts.", tags: ["HTML", "CSS", "JavaScript"], category: "Web Design & Development", website: "https://switchconstruction.com", status: "completed" },
  ],
  personal: [
    { id: 7, title: "Spark AR Filters", subtitle: "500K+ impressions worldwide", description: "Collection of augmented reality filters on Meta's Spark AR platform. Gained viral traction with over half a million organic impressions.", tags: ["Spark AR", "JavaScript", "3D"], category: "AR Development", website: "https://www.facebook.com/sparkarhub", stats: { impressions: "~500K", reach: "Global" }, featured: true, status: "completed" },
    { id: 8, title: "Scorelect", subtitle: "Live GAA scoring platform", description: "Full-stack web app for live Gaelic games scoring. Real-time updates, user auth, and a responsive dashboard built with React and Flask.", tags: ["React", "Python", "Flask"], category: "Full-Stack App", website: "https://scorelect.com", github: "https://github.com/fechinmitchell", stats: { views: "5,396", users: "42" }, status: "completed" },
    { id: 9, title: "GPT Cover Letter Generator", subtitle: "Chrome extension · 700+ users", description: "AI-powered Chrome extension generating tailored cover letters from job postings. Published on Chrome Web Store with organic growth.", tags: ["JavaScript", "Chrome API", "GPT"], category: "Browser Extension", website: "https://chrome.google.com/webstore", github: "https://github.com/fechinmitchell", stats: { installs: "708", users: "20" }, status: "completed" },
    { id: 10, title: "OCR Rename", subtitle: "Document automation tool", description: "Web tool using optical character recognition to automatically rename and organise document files. Built to solve a real workflow pain point.", tags: ["JavaScript", "HTML", "OCR"], category: "Automation Tool", website: "https://ocrrename.com", github: "https://github.com/fechinmitchell", status: "completed" },
    { id: 11, title: "fechinmitchell.com", subtitle: "This portfolio", description: "An interactive portfolio telling my story through internet history. Authentic recreations of iconic digital interfaces from 1996 to today.", tags: ["React", "Node.js", "Express", "CSS"], category: "Creative Dev", github: "https://github.com/fechinmitchell", status: "completed" },
  ],
};

const EXPERIENCE = [
  { role: "Lead Developer", company: "FM Software — Self-employed", period: "2023 — Present", description: "Running a software studio partnering with businesses across USA, Ireland, UK, and Australia. Building websites, web apps, mobile apps, and creative technology from concept to launch." },
  { role: "MSc Software Engineering", company: "University of Hertfordshire", period: "2022 — 2023", description: "Graduated with Distinction. Thesis on modern web application architecture and performance optimisation." },
  { role: "Software Engineer", company: "Heathrow Airport", period: "2019 — 2020", description: "Worked on mission-critical systems across Terminals. Real-time C#/.NET applications, PLC integration, and SCADA systems operating 24/7 with zero tolerance for downtime." },
  { role: "BEng Electronic & Computer Engineering", company: "NUI Galway", period: "2014 — 2018", description: "Foundation in hardware, embedded systems, signal processing, and software development." },
];

const SKILLS = [
  { group: "Frontend", items: ["React", "TypeScript", "Next.js", "HTML/CSS", "Tailwind"] },
  { group: "Backend", items: ["Node.js", "Express", "Python", "Flask", "Java"] },
  { group: "Infrastructure", items: ["AWS", "Docker", "CI/CD", "Git", "Linux"] },
  { group: "Creative", items: ["Spark AR", "Figma", "Ableton Live", "After Effects"] },
];

const GlobeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
);
const GHIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
);
const ArrowIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
);
const SendIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);

function StatusBadge({ status }) {
  if (!status) return null;
  const isComplete = status === "completed";
  return (
    <span className={`status-badge ${isComplete ? "status-badge--done" : "status-badge--wip"}`}>
      <span className="status-badge__dot" />
      {isComplete ? "Completed" : "In Progress"}
    </span>
  );
}

export default function Professional() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [projectTab, setProjectTab] = useState("clients");
  const [tabAnimating, setTabAnimating] = useState(false);
  const sectionRefs = useRef({});

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          const offsets = NAV_ITEMS.map(({ id }) => {
            const el = sectionRefs.current[id];
            if (!el) return { id, top: 0 };
            return { id, top: el.getBoundingClientRect().top };
          });
          const active = offsets.reduce((closest, curr) =>
            Math.abs(curr.top - 100) < Math.abs(closest.top - 100) ? curr : closest
          );
          setActiveSection(active.id);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const navProgress = Math.min(Math.max((scrollY - 80) / 300, 0), 1);
  const eased = navProgress < 0.5
    ? 4 * navProgress * navProgress * navProgress
    : 1 - Math.pow(-2 * navProgress + 2, 3) / 2;

  const switchTab = (tab) => {
    if (tab === projectTab) return;
    setTabAnimating(true);
    setTimeout(() => { setProjectTab(tab); setTabAnimating(false); }, 280);
  };

  const currentProjects = PROJECTS[projectTab];

  return (
    <div className="pro">
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500&display=swap" rel="stylesheet" />

      <div className="bg-layer">
        <div className="bg-orb bg-orb--burgundy" />
        <div className="bg-orb bg-orb--forest" />
        <div className="bg-grain" />
      </div>

      <nav className="nav" style={{
        "--p": eased, position: "fixed", zIndex: 100,
        top: `${eased * 50}%`,
        left: `calc(${(1 - eased) * 50}% - ${(1 - eased) * 50}%)`,
        transform: `translateY(${eased * -50}%) translateX(${eased * 20}px)`,
        width: eased < 0.5 ? "100%" : "auto",
        padding: eased < 0.3 ? "1rem 2rem" : "0.8rem",
      }}>
        <div className="nav__inner" style={{
          flexDirection: eased > 0.5 ? "column" : "row",
          justifyContent: "center",
          gap: eased > 0.5 ? "0.3rem" : "0.5rem",
          background: `rgba(8, 8, 8, ${0.7 + eased * 0.25})`,
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          borderRadius: eased > 0.5 ? "16px" : "50px",
          padding: eased > 0.5 ? "0.8rem 0.5rem" : "0.4rem 0.6rem",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}>
          {NAV_ITEMS.map(({ id, label, icon }) => (
            <button key={id} onClick={() => scrollTo(id)}
              className={`nav__btn ${activeSection === id ? "nav__btn--active" : ""}`}
              title={label}
              style={{
                flexDirection: eased > 0.5 ? "column" : "row",
                padding: eased > 0.5 ? "0.55rem 0.65rem" : "0.4rem 0.7rem",
                gap: eased > 0.5 ? "0.15rem" : "0.35rem",
              }}>
              <span className="nav__icon">{icon}</span>
              <span className="nav__label" style={{ fontSize: eased > 0.5 ? "0.55rem" : "0.72rem" }}>{label}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="main" style={{ paddingLeft: eased > 0.3 ? `${eased * 90}px` : 0, transition: "padding-left 0.1s linear" }}>

        {/* HERO */}
        <section ref={(el) => (sectionRefs.current.hero = el)} className="section hero">
          <div className="hero__wrapper">
            <div className="hero__grid">
              <div className="hero__left">
                <div className="hero__label">
                  <span className="hero__label-diamond">◆</span><span>FM Software</span>
                  <span className="hero__label-line" /><span>Galway, Ireland</span>
                </div>
                <h1 className="hero__name">Let's Build<br /><span className="gold-italic">Software</span><br />Together</h1>
                <p className="hero__intro">FM Software partners with businesses to design, develop, and ship digital products that actually work. From web apps and websites to mobile and creative tech.</p>
                <div className="hero__actions">
                  <button className="btn btn--primary" onClick={() => scrollTo("projects")}>See Our Work <SendIcon /></button>
                  <button className="btn btn--ghost" onClick={() => scrollTo("contact")}>Start a Project</button>
                </div>
              </div>
              <div className="hero__right">
                <div className="hero__highlight-card">
                  <div className="hero__highlight">
                    <span className="hero__highlight-val">6+</span>
                    <span className="hero__highlight-label">Client Projects Delivered</span>
                    <span className="hero__highlight-sub">Businesses across Ireland, UK & Australia</span>
                  </div>
                  <div className="hero__highlight-sep" />
                  <div className="hero__highlight">
                    <span className="hero__highlight-val">500K+</span>
                    <span className="hero__highlight-label">Users Reached</span>
                    <span className="hero__highlight-sub">Through AR filters, web apps & browser extensions</span>
                  </div>
                  <div className="hero__highlight-sep" />
                  <div className="hero__highlight">
                    <span className="hero__highlight-val">MSc</span>
                    <span className="hero__highlight-label">Software Engineering</span>
                    <span className="hero__highlight-sub">Distinction — University of Hertfordshire</span>
                  </div>
                </div>
                <div className="hero__services">
                  <span className="hero__service">Web Apps</span>
                  <span className="hero__service">Websites</span>
                  <span className="hero__service">Mobile Apps</span>
                  <span className="hero__service">AR Experiences</span>
                  <span className="hero__service">Creative Dev</span>
                  <span className="hero__service">Automation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section ref={(el) => (sectionRefs.current.about = el)} className="section about">
          <div className="section__container section__container--wide">
            <div className="section__label"><span className="section__num">01</span><span className="section__line" /><span>How It Works</span></div>
            <div className="about__layout">
              {/* Photo */}
              <div className="about__photo-wrap">
                <div className="about__photo">
                  {/* Replace src with your actual image path, e.g. "/images/fechin.jpg" */}
                  <img src="/images/fechin.jpg" alt="Fechín Mitchell" className="about__photo-img" />
                </div>
                <div className="about__photo-caption">
                  <span className="about__photo-name">Fechín Mitchell</span>
                  <span className="about__photo-title">Software Developer</span>
                </div>
              </div>
              {/* Text */}
              <div className="about__text">
                <h2 className="section__title">Your Vision.<br /><span className="gold-italic">My Code.</span></h2>
                <p className="about__p">FM Software is a one-person software studio run by Fechín Mitchell — a software engineer from Galway with a Master's (Distinction) and hands-on experience building mission-critical systems at Heathrow Airport.</p>
                <p className="about__p">Working with me is simple: you tell me what you need, I listen, I ask the right questions, then I build it properly. No agency overhead, no middlemen, no fluff — just direct communication with the person writing your code.</p>
                <p className="about__p">Whether it's a client portal, a company website, or something more creative — I treat every project with the same standard: it ships on time, it works flawlessly, and it looks unforgettable.</p>
              </div>
              {/* Skills */}
              <div className="about__skills">
                <h3 className="about__skills-title">What I Work With</h3>
                {SKILLS.map((s) => (
                  <div key={s.group} className="skill-group">
                    <span className="skill-group__label">{s.group}</span>
                    <div className="skill-group__items">
                      {s.items.map((item) => <span key={item} className="skill-chip">{item}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section ref={(el) => (sectionRefs.current.projects = el)} className="section projects">
          <div className="section__container">
            <div className="section__label"><span className="section__num">02</span><span className="section__line" /><span>Selected Work</span></div>
            <h2 className="section__title">Built for Real <span className="gold-italic">Businesses</span></h2>
            <p className="section__desc">Every project starts with a conversation. Here's what those conversations turned into.</p>
            <div className="tabs">
              <button className={`tab ${projectTab === "clients" ? "tab--active" : ""}`} onClick={() => switchTab("clients")}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                Client Work<span className="tab__count">{PROJECTS.clients.length}</span>
              </button>
              <button className={`tab ${projectTab === "personal" ? "tab--active" : ""}`} onClick={() => switchTab("personal")}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                Personal Projects<span className="tab__count">{PROJECTS.personal.length}</span>
              </button>
            </div>
            <div className={`proj-grid ${tabAnimating ? "proj-grid--exit" : "proj-grid--enter"}`}>
              {currentProjects.map((p, i) => (
                <div key={p.id} className={`card ${p.featured ? "card--featured" : ""}`} style={{ animationDelay: `${i * 0.07}s` }}>
                  <div className="card__accent" />
                  <div className="card__head">
                    <span className="card__cat">{p.category}</span>
                    <div className="card__head-right">
                      <StatusBadge status={p.status} />
                      {p.featured && <span className="card__badge">Featured</span>}
                    </div>
                  </div>
                  <h3 className="card__title">{p.title}</h3>
                  <p className="card__sub">{p.subtitle}</p>
                  <p className="card__desc">{p.description}</p>
                  {p.stats && (
                    <div className="card__stats">
                      {Object.entries(p.stats).map(([k, v]) => (
                        <div key={k} className="card__stat"><span className="card__stat-v">{v}</span><span className="card__stat-k">{k}</span></div>
                      ))}
                    </div>
                  )}
                  <div className="card__tags">
                    {p.tags.map((t) => <span key={t} className="card__tag">{t}</span>)}
                  </div>
                  <div className="card__links">
                    {p.website && <a href={p.website} target="_blank" rel="noopener noreferrer" className="card__link card__link--site"><GlobeIcon /> Visit Site <ArrowIcon /></a>}
                    {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="card__link card__link--gh"><GHIcon /> Source <ArrowIcon /></a>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section ref={(el) => (sectionRefs.current.experience = el)} className="section experience">
          <div className="section__container">
            <div className="section__label"><span className="section__num">03</span><span className="section__line" /><span>Background</span></div>
            <h2 className="section__title">The Journey <span className="gold-italic">So Far</span></h2>
            <div className="timeline">
              {EXPERIENCE.map((item, i) => (
                <div key={i} className="tl-item">
                  <div className="tl-marker">
                    <div className="tl-dot" />
                    {i < EXPERIENCE.length - 1 && <div className="tl-line" />}
                  </div>
                  <div className="tl-content">
                    <span className="tl-period">{item.period}</span>
                    <h4 className="tl-role">{item.role}</h4>
                    <span className="tl-company">{item.company}</span>
                    <p className="tl-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section ref={(el) => (sectionRefs.current.contact = el)} className="section contact">
          <div className="section__container section__container--center">
            <div className="section__label section__label--center">
              <span className="section__num">04</span><span className="section__line" /><span>Get In Touch</span>
            </div>
            <h2 className="section__title section__title--center">Have an Project?<br /><span className="gold-italic">Let's Talk.</span></h2>
            <p className="contact__p">Whether you need a full web app, a fresh website, or just want to explore what's possible — I'd love to hear about your project. No commitment, just a conversation.</p>
            <div className="contact__grid">
              <a href="mailto:fechinmitchell@gmail.com" className="contact__card">
                <span className="contact__card-icon">✉</span><span className="contact__card-label">Email</span>
                <span className="contact__card-val">fechinmitchell@gmail.com</span>
              </a>
              <a href="https://github.com/fechinmitchell" target="_blank" rel="noopener noreferrer" className="contact__card">
                <span className="contact__card-icon">⌘</span><span className="contact__card-label">GitHub</span>
                <span className="contact__card-val">fechinmitchell</span>
              </a>
              <a href="https://linkedin.com/in/fechinmitchell" target="_blank" rel="noopener noreferrer" className="contact__card">
                <span className="contact__card-icon">◈</span><span className="contact__card-label">LinkedIn</span>
                <span className="contact__card-val">fechinmitchell</span>
              </a>
              <a href="#" className="contact__card">
                <span className="contact__card-icon">𝕏</span><span className="contact__card-label">Twitter / X</span>
                <span className="contact__card-val">@fechinmitchell</span>
              </a>
            </div>
            <div className="contact__cta">
              <a href="mailto:fechinmitchelldesign@gmail.com" className="btn btn--primary btn--lg">Start a Project <SendIcon /></a>
            </div>
            <footer className="footer">
              <span className="footer__line" />
              <p className="footer__text">© 2025 FM Studio · Fechín Mitchell · Galway, Ireland</p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}