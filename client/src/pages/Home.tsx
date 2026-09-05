import { useEffect, useState, type CSSProperties } from "react";
import { ArrowUpRight, Check, Mail } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

type BentoId = "about" | "projects" | "services" | "certificates" | "contact";

type BentoItem = {
  id: BentoId;
  label: string;
  kanji: string;
  title: string;
  eyebrow: string;
  description: string;
  color: string;
  style?: CSSProperties;
};

const bentoItems: BentoItem[] = [
  { id: "about", label: "ABOUT ME", kanji: "米", title: "Tyrone Phoenix D. Olbes", eyebrow: "About · Full-Stack Developer & Creative Designer", description: "I'm a 20-year-old creative developer and designer based in Manila, PH. I specialize in crafting digital experiences that seamlessly blend bold visual design with precise engineering. From early-stage startups to established brands, I help teams ship remarkable experiences across web and mobile.", color: "#f3bf35", style: { gridArea: "rice" } },
  { id: "projects", label: "PROJECTS", kanji: "豚", title: "Projects", eyebrow: "The tonkatsu · 02", description: "Selected digital plates: products I shaped from first sketch to the last satisfying click.", color: "#ef7656", style: { gridArea: "tonkatsu" } },
  { id: "services", label: "SERVICES", kanji: "卵", title: "Services", eyebrow: "The tamagoyaki · 03", description: "A layered approach to making useful things: strategy, identity, and interfaces that feel obvious.", color: "#e7a12d", style: { gridArea: "tamagoyaki" } },
  { id: "certificates", label: "CERTIFICATES", kanji: "お", title: "Certificates", eyebrow: "The onigiri · 04", description: "Small proof points from a curious practice — courses, collaborations, and lessons that stuck.", color: "#d94e6b", style: { gridArea: "onigiri" } },
  { id: "contact", label: "CONTACT", kanji: "餅", title: "Contact", eyebrow: "The mochi · 05", description: "Have a good idea, a tricky brief, or simply want to say hello? The kettle is always on.", color: "#9c72e2", style: { gridArea: "mochi" } },
];

type Certificate = { title: string; category: string; image: string };

const certificates: Certificate[] = [
  { title: "Executive Diploma in Technology Management", category: "Network", image: "/certificates/Network/Cert1.jpg" },
  { title: "Entrepreneurship: Ideas, Market Analysis, Competitive Advantage Plan", category: "Finance", image: "/certificates/Finance/Cert2.jpg" },
  { title: "Combining AI and Excel for Exceptional Professional Outcomes", category: "Excel", image: "/certificates/Excel/Cert3.jpg" },
  { title: "Learn Microsoft Excel: From Zero to Hero", category: "Excel", image: "/certificates/Excel/Cert4.jpg" },
  { title: "Senior Executive Business Management and Leadership Program", category: "Network", image: "/certificates/Network/Cert5.jpg" },
  { title: "C++ And Java Training Crash Course for Beginners", category: "Java", image: "/certificates/Java/Cert6.jpg" },
  { title: "Forex Trading Guide: Master Forex Trading Skills", category: "Finance", image: "/certificates/Finance/Cert7.jpg" },
  { title: "Mastering Software Estimation: Techniques and Best Practices", category: "Network", image: "/certificates/Network/Cert8.jpg" },
  { title: "Day Trading for Beginners: How to Make Money Trading Stocks", category: "Finance", image: "/certificates/Finance/Cert9.jpg" },
  { title: "Mastering Adobe Premiere Pro CC: From Beginner to Pro Editor", category: "Multimedia", image: "/certificates/Multimedia/Cert10.jpg" },
  { title: "NMAP Mastery: Ultimate Guide to Network Scanning", category: "Network", image: "/certificates/Network/Cert11.jpg" },
  { title: "Ethical Hacking: Web Enumeration", category: "Cyber Security", image: "/certificates/Cyber Security/Cert12.jpg" },
  { title: "Cyber Security: Anti-Virus Protection", category: "Cyber Security", image: "/certificates/Cyber Security/Cert13.jpg" },
  { title: "Python Development & Data Science: Variables and Data Types", category: "Python", image: "/certificates/Python/Cert14.jpg" },
  { title: "Java Fundamentals Course For Beginners", category: "Java", image: "/certificates/Java/Cert15.jpg" },
  { title: "Ethical Hacking: Hack by Uploading", category: "Cyber Security", image: "/certificates/Cyber Security/Cert16.jpg" },
  { title: "JPCS PCU Membership", category: "Extracurricular", image: "/certificates/Extracurricular/JPCS PCU 0076 Tyrone Phoenix D. Olbes-1.png" },
];
const certificateCategories = ["All", ...Array.from(new Set(certificates.map(certificate => certificate.category)))] as const;
const extraCertificate: Certificate = { title: "New Certificate", category: "Extracurricular", image: "/certificates/Extracurricular/Certificate18.png" };

const foodImageSlugs: Partial<Record<BentoId, string>> = { about: "rice", projects: "tonkatsu", services: "tamagoyaki", certificates: "onigiri", contact: "mochi" };
const soundEffects = { foodClick: "/sounds/food-click.mp3", lidOpen: "/sounds/lid-open.mp3", lidClose: "/sounds/lid-close.mp3" } as const;
const assetUrl = (asset: string) => `${import.meta.env.BASE_URL}${asset.replace(/^\/+/, "")}`;
function playSound(source: string) {
  const audio = new Audio(assetUrl(source));
  audio.volume = 0.4;
  void audio.play().catch(() => undefined);
}
function FoodImages({ id, isHovered }: { id: BentoId; isHovered: boolean }) {
  const slug = foodImageSlugs[id];
  const [normalAvailable, setNormalAvailable] = useState(true);
  const [hoverAvailable, setHoverAvailable] = useState(true);
  const [lettuceAvailable, setLettuceAvailable] = useState(true);
  if (!slug) return null;
  return <>{id === "projects" && <img className="lettuce-bed-image" src={assetUrl("/food-images/lettuce.png")} alt="" aria-hidden="true" onError={() => setLettuceAvailable(false)} style={{ display: lettuceAvailable ? undefined : "none" }} />}<img className={`food-image food-image-normal ${isHovered ? "is-hidden" : ""}`} src={assetUrl(`/food-images/${slug}.png`)} alt="" aria-hidden="true" onError={() => setNormalAvailable(false)} style={{ display: normalAvailable ? undefined : "none" }} /><img className={`food-image food-image-hover ${isHovered ? "is-visible" : ""}`} src={assetUrl(`/food-images/${slug}-hover.png`)} alt="" aria-hidden="true" onError={() => setHoverAvailable(false)} style={{ display: hoverAvailable ? undefined : "none" }} /></>;
}
function FoodIllustration({ id, isHovered }: { id: BentoId; isHovered: boolean }) {
  return <FoodImages id={id} isHovered={isHovered} />;
}
function ExtraCertificateHolder({ onOpen }: { onOpen: (certificate: Certificate) => void }) {
  const [imageAvailable, setImageAvailable] = useState(true);
  return <button type="button" className="certificate-card certificate-holder" onClick={() => imageAvailable && onOpen(extraCertificate)}><span className="certificate-number">18</span>{imageAvailable ? <img src={assetUrl(extraCertificate.image)} alt="Additional certificate" loading="lazy" onError={() => setImageAvailable(false)} /> : <div className="certificate-holder-placeholder"><span>＋</span><small>add certificate image</small></div>}<span className="certificate-copy"><strong>Project Tuklas Teknolohiya: Python Programming</strong><small>Extracurricular</small></span></button>;
}
function Stamp({ item }: { item: BentoItem }) {
  return <span className="hanko" style={{ "--stamp-color": item.color } as CSSProperties}><span className="hanko-inner">{item.label}</span></span>;
}
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`} aria-pressed={theme === "dark"}><span aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span><b>{theme === "light" ? "dark" : "light"}</b></button>;
}
function BentoCompartment({ item, activeId, hoveredId, onOpen, onHover }: { item: BentoItem; activeId: BentoId | null; hoveredId: BentoId | null; onOpen: (id: BentoId) => void; onHover: (id: BentoId | null) => void }) {
  const isActive = activeId === item.id;
  return <button type="button" className={`bento-compartment ${item.id}-compartment ${isActive ? "is-active" : ""}`} style={item.style} onMouseEnter={() => onHover(item.id)} onFocus={() => onHover(item.id)} onBlur={() => onHover(null)} onClick={() => onOpen(item.id)} aria-label={`Open ${item.title}`} aria-pressed={isActive}><span className="compartment-rim" /><FoodIllustration id={item.id} isHovered={hoveredId === item.id} /><span className="food-kanji" aria-hidden="true">{item.kanji}</span><Stamp item={item} /></button>;
}
function ContentBlock({ item, onClose, isClosing }: { item: BentoItem; onClose: () => void; isClosing: boolean }) {
  const [certificateFilter, setCertificateFilter] = useState<(typeof certificateCategories)[number]>("All");
  const [aboutImageAvailable, setAboutImageAvailable] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const filteredCertificates = certificateFilter === "All" ? certificates : certificates.filter(certificate => certificate.category === certificateFilter);
  return <>
    <button type="button" className="card-scrim" onClick={onClose} aria-label="Close section card" />
    <article className={`interaction-card ${item.id}-card ${isClosing ? "is-closing" : ""}`} style={{ "--spot-color": item.color } as CSSProperties} role="dialog" aria-modal="true" aria-labelledby="interaction-card-title">
    <div className="interaction-card-top"><span>{item.eyebrow}</span><button type="button" onClick={onClose} aria-label="Close section card"><span className="card-close-label">close</span> ×</button></div>
    {item.id === "about" ? <div className="about-heading-with-image"><div className="about-heading-copy"><h2 id="interaction-card-title">{item.title}</h2><p>{item.description}</p></div><div className="about-image-holder">{aboutImageAvailable ? <img src={assetUrl("/about-image.png")} alt="About Tyrone" onError={() => setAboutImageAvailable(false)} /> : <span>add image · about-image.png</span>}</div></div> : <><h2 id="interaction-card-title">{item.title}</h2><p>{item.description}</p></>}
    {item.id === "about" && <div className="about-content">
      <div className="card-details"><span><b>Education</b>3rd Year · BS Information Technology</span><span><b>Based in</b>Manila, Philippines</span><span><b>Current focus</b>Full-stack development + creative design</span></div>
      <section className="about-section"><b>Highlights</b><div className="about-stats"><span><strong>3rd Year</strong>BS Information Technology</span><span><strong>4</strong>Projects in Progress</span><span><strong>9</strong>Verified Certificates</span><span><strong>99+</strong>Good Vibes</span></div></section>
      <section className="about-section"><b>Skills &amp; Tools</b><p>Java · C++ · C# · HTML · CSS · JavaScript · PostgreSQL · REST API · Docker · Git · Figma · Canva · CapCut · Node.js · PHP · Webflow</p></section>
      <section className="about-section"><b>Education</b><div className="about-entry"><strong>Philippine Christian University Manila</strong><span>Bachelor of Science in Information Technology — Dean's Lister</span><small>Pedro Gil, Ermita, Manila · Anticipated Graduation: May 2029</small></div><div className="about-entry"><strong>Philippine Christian University Manila</strong><span>Information and Communications Technology — Scholarship Qualifier</span><small>Pedro Gil, Ermita, Manila · May 2024</small></div></section>
      <section className="about-section"><b>Affiliations</b><div className="about-entry"><strong>Junior Philippine Computer Society</strong><span>Auditor · 2025 – Present</span><ul><li>Submit financial reports for each JPCS project to the committee within one week of completion.</li><li>Conduct regular audits of organizational financial records to ensure accuracy and transparency.</li><li>Recommend improvements to financial practices and strengthen internal controls.</li><li>Report financial discrepancies or concerns to the organization's leadership.</li><li>Maintain independence and impartiality from financial management processes.</li><li>Perform additional duties assigned by the President or JPCS National Board of Directors.</li></ul></div><div className="about-entry"><strong>PsychoShopping</strong><span>Graphic Designer &amp; Social Media Manager · 2019 – 2023</span><ul><li>Designed graphics for social posts, promotional materials, and digital campaigns.</li><li>Developed posters, banners, and marketing layouts aligned with brand guidelines.</li><li>Edited images, layouts, and typography to produce clean, professional visuals.</li><li>Created content calendars and planned campaigns to drive brand awareness and sales.</li><li>Maintained brand consistency across channels and managed online reputation.</li></ul></div></section>
    </div>}
    {item.id === "projects" && <div className="project-grid"><div className="project-entry"><b>01</b><strong>Point of Sales System</strong><span>Web Design · Development · 2026</span><p>Full-stack POS platform centralizing inventory, sales, and employee management. Built with Java, HTML, CSS, JavaScript, PostgreSQL, REST APIs, Docker, and GitHub deployment.</p><a href="https://tyronepos.onrender.com" target="_blank" rel="noreferrer">Live project <ArrowUpRight size={14} /></a></div><div className="project-entry"><b>02</b><strong>Pet Arena</strong><span>Game · Web Development · 2026</span><p>Pet Arena is a mini auto-battler inspired by games like Super Auto Pets. You recruit up to 5 pets from a shelf onto your team, each with a small stat block (ATK/HP) and a passive ability that triggers before the fight. You hit “Start Battle,” your team is pitted against a randomly generated enemy squad, and the fight plays out automatically. No manual control once it begins, just cards lunging at each other, damage numbers popping, and pets dropping until one side is wiped out.</p><a href="https://github.com/Cheems-codes/ArenaOfPets" target="_blank" rel="noreferrer">Live site <ArrowUpRight size={14} /></a></div><div className="project-entry"><b>03</b><strong>QuizAct</strong><span>Quiz App · HTML · CSS · JavaScript · 2026</span><p>Signal Sprint is a single-page timed quiz app with 10 mixed multiple-choice and fill-in-the-blank questions, a 20-second timer per question, keyboard navigation, auto-saved answers, and a scored results review. This was an activity given by our professor to be completed within one hour.</p><a href="https://cheems-codes.github.io/QuizAct/" target="_blank" rel="noreferrer">Live site <ArrowUpRight size={14} /></a></div><div className="project-entry"><b>04</b><strong>KITA: Personal Banking App</strong><span>Finance · Work in Progress · 2026</span><p>Personal finance management for tracking income and expenses, setting budgets, and gaining spending insights through authorized bank and e-wallet notifications.</p></div><div className="project-entry"><b>05</b><strong>KuyaWell</strong><span>Educational · Healthcare · Work in Progress · 2026</span><p>Web and mobile health companion that tracks wellness indicators, predicts chronic disease risk with Machine Learning, and delivers lifestyle recommendations.</p></div><div className="project-entry"><b>06</b><strong>Halikha</strong><span>E-commerce · Advertising · Work in Progress · 2026</span><p>Marketplace for local artists and small shops with online storefronts, seller chat, and AI-powered recommendations.</p></div><div className="project-entry"><b>07</b><strong>Woord</strong><span>Gamified Education · Work in Progress · 2026</span><p>Interactive web-based game that teaches etymology through the mechanics of a crafting survival game.</p></div></div>}
    {item.id === "services" && <div className="service-grid"><div><b>01</b><strong>UI / UX Design</strong><p>Research-driven interfaces that delight users and hit business goals.</p></div><div><b>02</b><strong>Web Development</strong><p>Fast, accessible, and beautifully engineered websites and apps.</p></div><div><b>03</b><strong>Brand Identity</strong><p>Visual systems that give your brand a distinct, memorable presence.</p></div><div><b>04</b><strong>Motion &amp; Animation</strong><p>Micro-interactions and scroll-triggered animations that breathe life into products.</p></div></div>}
    {item.id === "certificates" && <><div className="certificate-filters" role="group" aria-label="Filter certificates by topic">{certificateCategories.map(category => <button type="button" key={category} className={certificateFilter === category ? "is-selected" : ""} onClick={() => setCertificateFilter(category)}>{category}</button>)}</div><div className="certificate-grid">{filteredCertificates.map((certificate, index) => <button type="button" className="certificate-card" key={certificate.image} onClick={() => setSelectedCertificate(certificate)} aria-label={`Open ${certificate.title} certificate`}><span className="certificate-number">{String(index + 1).padStart(2, "0")}</span><img src={assetUrl(certificate.image)} alt={`${certificate.title} certificate`} loading="lazy" /><span className="certificate-copy"><strong>{certificate.title}</strong><small>{certificate.category}</small></span></button>)}{(certificateFilter === "All" || certificateFilter === extraCertificate.category) && <ExtraCertificateHolder onOpen={setSelectedCertificate} />}</div>{selectedCertificate && <div className="certificate-viewer" role="dialog" aria-modal="true" aria-label="Certificate image viewer"><button type="button" className="certificate-viewer-scrim" onClick={() => setSelectedCertificate(null)} aria-label="Close certificate viewer" /><div className="certificate-viewer-panel"><button type="button" className="certificate-viewer-close" onClick={() => setSelectedCertificate(null)} aria-label="Close certificate viewer">×</button><img src={assetUrl(selectedCertificate.image)} alt="Enlarged certificate" /></div></div>}</>}
    {item.id === "contact" && <div className="contact-content"><h3>Let's Build Something Great.</h3><div className="contact-columns"><div><b>Contact details</b><a href="mailto:olbeseurico@gmail.com"><Mail size={14} />olbeseurico@gmail.com</a><span>+63 994 484 3696</span><span>Kahilom 1, Pandacan, Manila</span></div><div><b>Social links</b><a href="https://linkedin.com/in/tyrone-olbes-083513302" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a><a href="https://github.com/Cheems-codes" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a><a href="https://www.facebook.com/tyrone.olbes" target="_blank" rel="noreferrer">Facebook <ArrowUpRight size={13} /></a><a href="https://www.instagram.com/yurikophoenix/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a></div></div></div>}
    </article>
  </>;
}

export default function Home() {
  const [hoveredId, setHoveredId] = useState<BentoId | null>(null);
  const [selectedId, setSelectedId] = useState<BentoId | null>(null);
  const [lidOpen, setLidOpen] = useState(false);
  const [lidClosing, setLidClosing] = useState(false);
  const [closingId, setClosingId] = useState<BentoId | null>(null);
  const visibleId = selectedId;
  const visibleItem = bentoItems.find(item => item.id === selectedId);
  const openCard = (id: BentoId) => { setClosingId(null); setSelectedId(id); playSound(soundEffects.foodClick); };
  const closeCard = () => { if (!selectedId || closingId) return; setClosingId(selectedId); setHoveredId(null); window.setTimeout(() => { setSelectedId(null); setClosingId(null); }, 220); };
  const resetBento = () => { setSelectedId(null); setHoveredId(null); setLidClosing(true); playSound(soundEffects.lidClose); window.setTimeout(() => { setLidOpen(false); setLidClosing(false); }, 650); };
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") closeCard(); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, [selectedId, closingId]);

  return <main className="bento-canvas"><div className="bento-stage" onMouseLeave={() => setHoveredId(null)}>
      <div className="bento-box" aria-label="Interactive bento box portfolio">
      <div className="bento-lid-shine" /><div className="bento-grid">{bentoItems.map(item => <BentoCompartment key={item.id} item={item} activeId={visibleId} hoveredId={hoveredId} onHover={setHoveredId} onOpen={openCard} />)}</div><div className="bento-badge">LOVE<br /><span>お弁当</span></div>
    </div>
    <button type="button" className={`bento-lid ${lidOpen && !lidClosing ? "is-open" : ""} ${lidClosing ? "is-closing" : ""}`} onClick={() => { setLidOpen(true); setLidClosing(false); playSound(soundEffects.lidOpen); }} aria-label="Open Tyrone's Bento Box" aria-hidden={lidOpen} tabIndex={lidOpen ? -1 : 0}>
      <span className="lid-highlight" />
      <span className="sticky-note"><strong>Tyrone's<br />Bento Box</strong><i className="tape-mark" /></span>
      <span className="lid-prompt">click me to start <b>↗</b></span>
    </button>
    <div className="bento-controls">{lidOpen && <button type="button" className="reset-bento" onClick={resetBento} aria-label="Put the lid back on the bento"><span>↺</span> put the lid back</button>}<ThemeToggle /></div>
    {visibleItem && <ContentBlock item={visibleItem} isClosing={closingId === visibleItem.id} onClose={closeCard} />}
  </div></main>;
}
