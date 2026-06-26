import { Link } from "react-router";
import { useState, useEffect, useRef } from "react";
import {
    MessageCircle, Users, Video, Globe, Shield, Zap, ShipWheelIcon,
    ArrowRight, Play, CheckCircle, Menu, X, Clock, Quote
} from "lucide-react";
import ThemeSelector from "../components/ThemeSelector";

// ── Phrases Helper ────────────────────────────────────────────────────────────
const PHRASES = [
    { lang: "Bengali", text: "আপনি কেমন আছেন?", trans: "How are you?" },
    { lang: "Spanish", text: "¿Hablas inglés?", trans: "Do you speak English?" },
    { lang: "Japanese", text: "よろしくお願いします", trans: "Nice to meet you" },
    { lang: "French", text: "Enchanté de vous rencontrer", trans: "Pleased to meet you" },
    { lang: "Mandarin", text: "你好，我叫…", trans: "Hello, my name is…" },
    { lang: "Arabic", text: "كيف حالك؟", trans: "How are you?" },
    { lang: "Portuguese", text: "Onde fica a biblioteca?", trans: "Where is the library?" },
    { lang: "Hindi", text: "आप कहाँ से हैं?", trans: "Where are you from?" },
];

function PhraseTicker() {
    const [idx, setIdx] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const id = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setIdx(i => (i + 1) % PHRASES.length);
                setVisible(true);
            }, 400);
        }, 3000);
        return () => clearInterval(id);
    }, []);

    const p = PHRASES[idx];
    return (
        <div className="inline-flex items-center gap-3 bg-base-300/40 backdrop-blur-sm border border-base-300/60 rounded-full px-5 py-2.5 text-sm shadow-sm transition-all duration-300 hover:border-primary/40 hover:bg-base-300/60">
            <span className="text-primary font-bold text-xs uppercase tracking-widest">{p.lang}</span>
            <span
                className="text-base-content font-medium transition-all duration-300"
                style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(-6px)" }}
            >
                {p.text}
            </span>
            <span className="text-base-content/50 text-xs italic">{p.trans}</span>
        </div>
    );
}

const NAV_LINKS = ["Features", "How It Works", "About", "Blog"];

// ── Main Component ─────────────────────────────────────────────────────────────
export default function LandingPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    // Mouse Glow Positions state
    const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
    const [isHoveringClickable, setIsHoveringClickable] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            
            // Check if the cursor is currently resting on a button, link, or card node
            const target = e.target;
            const isClickable = target.closest('a, button, .card, [role="button"], input, select');
            setIsHoveringClickable(!!isClickable);
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("mousemove", handleMouseMove);
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className="min-h-screen bg-base-200 text-base-content selection:bg-primary selection:text-primary-content font-sans antialiased relative">

            {/* ── MOUSE LIGHT GLOW TRACKER (Hidden on mobile for touch fidelity) ── */}
            <div
                className="hidden lg:block fixed pointer-events-none z-[9999] rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out"
                style={{
                    left: `${mousePos.x}px`,
                    top: `${mousePos.y}px`,
                    width: isHoveringClickable ? "8px" : "5px",
                    height: isHoveringClickable ? "8px" : "5px",
                    backgroundColor: "hsl(var(--p))",
                    boxShadow: `0 0 10px hsl(var(--p) / 0.95), 0 0 24px hsl(var(--p) / 0.4)`,
                }}
            />
            <div
                className="hidden lg:block fixed pointer-events-none z-[9998] rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
                style={{
                    left: `${mousePos.x}px`,
                    top: `${mousePos.y}px`,
                    width: isHoveringClickable ? "200px" : "140px",
                    height: isHoveringClickable ? "200px" : "140px",
                    background: "radial-gradient(circle, hsl(var(--p) / 0.38) 0%, hsl(var(--s) / 0.2) 40%, transparent 74%)",
                    filter: "blur(16px)",
                    opacity: isHoveringClickable ? 0.8 : 0.55,
                    mixBlendMode: "screen",
                }}
            />

            {/* ── NAVBAR ────────────────────────────────────────────────────────────── */}
            <nav className={`fixed top-0 left-0 right-0 z-50 px-4 lg:px-8 h-20 flex items-center justify-between transition-all duration-300 ${scrolled ? "bg-base-100/90 backdrop-blur-md shadow-lg border-b border-base-300" : "bg-transparent"
                }`}>
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5 group">
                    <ShipWheelIcon className="size-8 text-primary transition-transform duration-500 group-hover:rotate-45" />
                    <span className="text-2xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-mono">
                        BatChit
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map(l => (
                        <a
                            key={l}
                            href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
                            className="text-sm font-semibold text-base-content/70 hover:text-primary transition-colors"
                        >
                            {l}
                        </a>
                    ))}
                </div>

                {/* Action Controls */}
                <div className="hidden md:flex items-center gap-3">
                    <ThemeSelector />
                    <Link to="/login" className="btn btn-ghost btn-sm rounded-full">Login</Link>
                    <Link to="/signup" className="btn btn-primary btn-sm rounded-full bg-gradient-to-r from-primary to-secondary border-none text-primary-content shadow-md shadow-primary/20 hover:scale-105 transition-transform">Sign Up</Link>
                </div>

                {/* Mobile Toggle Panel */}
                <div className="flex items-center gap-2 md:hidden">
                    <ThemeSelector />
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="btn btn-ghost btn-circle text-base-content"
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Drawer Menu */}
            {menuOpen && (
                <div className="fixed inset-0 z-40 bg-base-100/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 p-4">
                    {NAV_LINKS.map(l => (
                        <a
                            key={l}
                            href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
                            onClick={() => setMenuOpen(false)}
                            className="text-2xl font-bold text-base-content/80 hover:text-primary transition-colors"
                        >
                            {l}
                        </a>
                    ))}
                    <div className="w-full max-w-xs flex flex-col gap-3 mt-4">
                        <Link to="/login" onClick={() => setMenuOpen(false)} className="btn btn-outline w-full rounded-full">Login</Link>
                        <Link to="/signup" onClick={() => setMenuOpen(false)} className="btn btn-primary w-full rounded-full bg-gradient-to-r from-primary to-secondary border-none">Get Started</Link>
                    </div>
                </div>
            )}

            {/* ── HERO SECTION ──────────────────────────────────────────────────────── */}
            <section className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden pt-24 pb-16">
                {/* Dynamic Theme Glow Blobs */}
                <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-72 h-72 md:w-[600px] md:h-[600px] rounded-full bg-radial-gradient from-primary/15 to-transparent blur-3xl pointer-events-none" />
                <div className="absolute bottom-[10%] right-[10%] w-48 h-48 md:w-80 md:h-80 rounded-full bg-radial-gradient from-secondary/10 to-transparent blur-3xl pointer-events-none" />

                <div className="max-w-4xl relative z-10 flex flex-col items-center">
                    <div className="mb-8">
                        <PhraseTicker />
                    </div>

                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
                        Speak Any Language<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            With Real People
                        </span>
                    </h1>

                    <p className="text-base sm:text-xl text-base-content/75 max-w-2xl mb-10 leading-relaxed">
                        BatChit connects you with native speakers worldwide for live video conversations — because absolute fluency only comes from actually talking.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link to="/signup" className="btn btn-primary btn-lg rounded-full bg-gradient-to-r from-primary to-secondary border-none text-primary-content shadow-lg shadow-primary/20 gap-2 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-primary/30 transition-all">
                            Start for Free <ArrowRight size={18} />
                        </Link>
                        <Link to="/login" className="btn btn-outline btn-lg rounded-full gap-2 hover:bg-base-300">
                            <Play size={16} className="fill-current" /> Watch Demo
                        </Link>
                    </div>

                    {/* Social Proof Metric Strip */}
                    <div className="mt-16 grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-2xl">
                        {[
                            { n: "50K+", label: "Active Learners" },
                            { n: "120+", label: "Languages" },
                            { n: "4.9★", label: "User Rating" },
                        ].map(s => (
                            <div key={s.n} className="card bg-base-100 border border-base-300 hover:border-primary/30 shadow-sm rounded-2xl p-4 text-center transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1.5">
                                <div className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-tight">{s.n}</div>
                                <div className="text-xs sm:text-sm text-base-content/50 mt-1 font-semibold">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURES SECTION ───────────────────────────────────────────────────── */}
            <section id="features" className="py-24 px-4 max-w-7xl mx-auto overflow-hidden">
                <div className="text-center mb-16">
                    <span className="badge badge-primary badge-outline px-4 py-3 uppercase tracking-widest text-xs font-bold mb-4">
                        Features
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                        Everything You Need to <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Go Fluent</span>
                    </h2>
                    <p className="text-base-content/60 text-base sm:text-lg max-w-md mx-auto font-medium">
                        Tools built around one core framework: real conversations beat text study guidelines every single time.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { icon: <MessageCircle size={26} />, title: "Real-time Chat", desc: "Practice writing with instant fluid hints — stay in flow without ever leaving the message terminal." },
                        { icon: <Video size={26} />, title: "HD Video Calls", desc: "Low-latency streaming video to hone precise accent pronunciation with speakers face-to-face." },
                        { icon: <Users size={26} />, title: "Smart Matching", desc: "Paired efficiently by system language targets, matching proficiency thresholds, and hobby interests." },
                        { icon: <Globe size={26} />, title: "120+ Languages", desc: "From Mandarin Chinese to localized Swahili dialects — if it is natively spoken, your companion is here." },
                        { icon: <Shield size={26} />, title: "Safe Space", desc: "Moderated community environments, strict response tool metrics, and structured privacy protections." },
                        { icon: <Zap size={26} />, title: "Instant Sessions", desc: "Zero advanced scheduling required — simply initialize matching paths to unlock real calls instantly." },
                    ].map((f, i) => (
                        <div 
                            key={i} 
                            className="group relative card bg-base-100 border border-base-300 hover:border-primary/30 p-8 shadow-sm rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/5 text-primary flex items-center justify-center mb-6 border border-base-200 group-hover:scale-110 group-hover:from-primary/20 group-hover:to-secondary/15 transition-all duration-300">
                                {f.icon}
                            </div>
                            <h3 className="text-xl font-extrabold mb-2 tracking-tight text-base-content group-hover:text-primary transition-colors duration-200" style={{ fontFamily: "'Syne', sans-serif" }}>
                                {f.title}
                            </h3>
                            <p className="text-sm text-base-content/65 leading-relaxed font-medium">
                                {f.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── HOW IT WORKS SECTION ───────────────────────────────────────────────── */}
            <section id="how-it-works" className="py-24 px-4 bg-base-100 border-y border-base-300 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="badge badge-primary badge-outline px-4 py-3 uppercase tracking-widest text-xs font-bold mb-4">
                            How It Works
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-black tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                            From Signup to <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Conversation</span>
                        </h2>
                        <p className="text-sm sm:text-base text-base-content/60 max-w-md mx-auto mt-3 font-medium">
                            Five simple operations standing between you and absolute target language immersion.
                        </p>
                    </div>

                    <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
                        {/* BACKGROUND SVG CONNECTOR LINE (Desktop Only) */}
                        <div className="hidden lg:block absolute top-14 left-[8%] right-[8%] h-[2px] pointer-events-none select-none z-0">
                            <svg className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line
                                    x1="0" y1="1" x2="100%" y2="1"
                                    stroke="url(#gradient-line)"
                                    strokeWidth="2"
                                    strokeDasharray="8 6"
                                    className="animate-pulse"
                                />
                                <defs>
                                    <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="var(--p)" stopOpacity="0.2" />
                                        <stop offset="50%" stopColor="var(--s)" stopOpacity="0.6" />
                                        <stop offset="100%" stopColor="var(--p)" stopOpacity="0.2" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>

                        {[
                            { step: "01", title: "Sign Up or Login", desc: "Create your profile parameters or sign right back in to resume exactly where your study left off." },
                            { step: "02", title: "Complete Onboarding", desc: "Define target fluency thresholds, active calendar availability, and custom peer matches." },
                            { step: "03", title: "Send Request", desc: "Audit filtered speaker matrices and dispatch communication handshakes seamlessly." },
                            { step: "04", title: "Wait for Acceptance", desc: "The exact moment your counterpart accepts, the pipeline terminal automatically unlocks." },
                            { step: "05", title: "Chat or Video Call", desc: "Initialize chat lines with overlay translation hints or open HD video ports for live sessions." },
                        ].map((s, i) => (
                            <div
                                key={i}
                                className="group relative card bg-base-200/50 backdrop-blur-sm border border-base-300 hover:border-primary/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1.5 flex flex-col items-center text-center z-10"
                            >
                                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-primary-content text-sm font-black shadow-md shadow-primary/20 mb-6 relative group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                                    {s.step}
                                    {i < 4 && (
                                        <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-base-100 border border-base-300 items-center justify-center text-base-content/40 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-4 transition-all duration-300 shadow-sm z-20">
                                            <ArrowRight className="size-3 text-primary animate-pulse" />
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-lg font-extrabold tracking-tight text-base-content mb-2 group-hover:text-primary transition-colors duration-200" style={{ fontFamily: "'Syne', sans-serif" }}>
                                    {s.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-base-content/60 font-medium leading-relaxed max-w-[220px]">
                                    {s.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ABOUT SECTION ──────────────────────────────────────────────────────── */}
            <section id="about" className="py-24 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="badge badge-primary badge-outline px-4 py-3 uppercase tracking-widest text-xs font-bold mb-4">About BatChit</span>
                        <h2 className="text-3xl sm:text-5xl font-black mb-6 tracking-tight leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>
                            We Believe Language<br />is a <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Living Thing</span>
                        </h2>
                        <p className="text-base text-base-content/70 leading-relaxed mb-4 font-medium">
                            BatChit was born out of shared frustration with mechanical language suites that downscale interactions to strict card loops and generic streaks. Authentic capability thrives in modern dynamic accents, fluid cultural inside jokes, and raw breakthroughs.
                        </p>
                        <p className="text-base text-base-content/70 leading-relaxed mb-8 font-medium">
                            Our decentralized operations map across continuous time zones. We forged the collaborative dynamic frameworks we needed during our own learning tracks.
                        </p>
                        <div className="space-y-3.5">
                            {[
                                "Founded by modern polyglots, engineered for learners",
                                "Privacy focus — tracking loops completely disabled",
                                "Community moderated base with accessible channels",
                            ].map((pt, i) => (
                                <div key={i} className="group flex items-start gap-3 bg-base-100/40 hover:bg-base-100 border border-transparent hover:border-base-300/60 p-3 rounded-xl transition-all duration-200">
                                    <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm sm:text-base font-bold text-base-content/80 group-hover:text-base-content transition-colors">{pt}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats Mosaic Layout */}
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { n: "50K+", label: "Learners worldwide", highlight: true },
                            { n: "1.2M", label: "Conversations held", highlight: false },
                            { n: "120+", label: "Languages spoken", highlight: false },
                            { n: "94%", label: "Report real progress", highlight: true },
                        ].map((s, i) => (
                            <div
                                key={i}
                                className={`card border rounded-2xl p-8 text-center shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 ${s.highlight 
                                    ? "bg-gradient-to-br from-primary/10 to-secondary/5 border-primary/20 hover:border-primary/40 shadow-primary/5" 
                                    : "bg-base-100 border-base-300 hover:border-secondary/40 shadow-base-content/5"
                                }`}
                            >
                                <div className="text-3xl sm:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>{s.n}</div>
                                <div className="text-xs sm:text-sm text-base-content/50 mt-2 font-bold">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS SECTION ───────────────────────────────────────────────── */}
            <section className="py-24 px-4 bg-gradient-to-b from-base-100 to-base-200 border-t border-base-300">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="badge badge-primary badge-outline px-4 py-3 uppercase tracking-widest text-xs font-bold mb-4">Testimonials</span>
                        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                            Real Learners, <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Real Results</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { quote: "After three months on BatChit, I finally held a full conversation with my grandmother in Bangla. Nothing else had gotten me there.", name: "Priya S.", lang: "Bangla learner" },
                            { quote: "The matching algorithm is scary good. My partner and I swapped — she learned English, I learned Japanese. We're still friends a year later.", name: "Marcus T.", lang: "Japanese learner" },
                            { quote: "I tried five other apps. BatChit is the only one where I felt like I was actually talking to a human, not solving a puzzle.", name: "Amara L.", lang: "French learner" },
                        ].map((t, i) => (
                            <div key={i} className="card bg-base-100 border border-base-300 hover:border-primary/30 p-8 shadow-sm rounded-2xl relative transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2">
                                <Quote size={28} className="text-primary/30 mb-4 transition-transform duration-300 group-hover:scale-110" />
                                <p className="text-base-content/80 text-base italic leading-relaxed mb-6 font-medium">"{t.quote}"</p>
                                <div className="mt-auto border-t border-base-200 pt-4">
                                    <div className="font-extrabold text-base tracking-tight text-base-content">{t.name}</div>
                                    <div className="text-xs text-base-content/40 mt-0.5 font-bold">{t.lang}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── BLOG SECTION ───────────────────────────────────────────────────────── */}
            <section id="blog" className="py-24 px-4 max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
                    <div>
                        <span className="badge badge-primary badge-outline px-4 py-3 uppercase tracking-widest text-xs font-bold mb-4">The BatChit Blog</span>
                        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                            Language Insights &amp; <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Learning Tips</span>
                        </h2>
                    </div>
                    <a href="#blog" className="btn btn-outline btn-md rounded-full sm:self-end gap-2">
                        All Articles <ArrowRight size={16} />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { tag: "Science", time: "5 min", title: "Why Adults Actually Learn Languages Faster Than Children", excerpt: "Neuroscience is overturning the standard core validation models — and those discoveries affect study plans.", color: "border-primary hover:border-primary" },
                        { tag: "Practice", time: "7 min", title: "The 20-Minute Daily Habit That Accelerates Fluency", excerpt: "Structural regularity beats single-day spikes. Here is the daily conversation schedule threshold broken down.", color: "border-secondary hover:border-secondary" },
                        { tag: "Culture", time: "4 min", title: "What Your Accent Says — and Why It Doesn't Matter", excerpt: "Conversations with sociolinguists exploring core tracking accents, validation targets, and expressions.", color: "border-accent hover:border-accent" },
                    ].map((b, i) => (
                        <div key={i} className={`card bg-base-100 border-t-4 ${b.color} border-x border-b border-base-300 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-300 flex flex-col group rounded-2xl overflow-hidden`}>
                            <div className="p-6 sm:p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="badge badge-sm font-bold tracking-wider uppercase px-2.5 py-2 bg-base-200 text-base-content/80 border-none">{b.tag}</span>
                                    <div className="flex items-center gap-1.5 text-xs text-base-content/40 font-bold">
                                        <Clock size={13} /> {b.time} read
                                    </div>
                                </div>
                                <h3 className="text-xl font-black mb-3 tracking-tight group-hover:text-primary transition-colors line-clamp-2" style={{ fontFamily: "'Syne', sans-serif" }}>{b.title}</h3>
                                <p className="text-sm text-base-content/60 leading-relaxed mb-6 line-clamp-3 font-medium">{b.excerpt}</p>
                                <a href="#blog" className="text-sm font-bold text-primary inline-flex items-center gap-1 mt-auto hover:underline">
                                    Read Article <ArrowRight size={14} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CALL-TO-ACTION BANNER ─────────────────────────────────────────────── */}
            <section className="py-16 px-4 max-w-6xl mx-auto">
                <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-3xl text-center px-6 py-16 sm:p-20 overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/40 card">
                    <div className="absolute -top-24 -right-24 w-60 h-60 bg-radial-gradient from-secondary/20 to-transparent blur-2xl pointer-events-none" />

                    <h2 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>
                        Your First Conversation<br />is One Click Away
                    </h2>
                    <p className="text-base sm:text-lg text-base-content/70 max-w-md mx-auto mb-10 leading-relaxed font-medium">
                        Join 50,000 global language tracking users who prioritized live human connections over sterile text card apps.
                    </p>
                    <Link to="/signup" className="btn btn-primary btn-lg rounded-full bg-gradient-to-r from-primary to-secondary border-none text-primary-content shadow-lg shadow-primary/30 gap-2 hover:scale-105 transition-transform">
                        Get Started — It's Free <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            {/* ── FOOTER ────────────────────────────────────────────────────────────── */}
            <footer className="bg-base-100 border-t border-base-300 pt-20 pb-10 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">

                        {/* Brand block */}
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <ShipWheelIcon className="size-7 text-primary" />
                                <span className="text-xl font-extrabold font-mono tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                    BatChit
                                </span>
                            </div>
                            <p className="text-sm text-base-content/50 max-w-xs leading-relaxed font-semibold">
                                A globally mapped multi-language ecosystem connecting users inside fluid conversational interfaces.
                            </p>
                        </div>

                        {/* Links loop */}
                        {[
                            { title: "Product", links: ["Features", "How It Works", "Pricing", "Changelog"] },
                            { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
                            { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Settings", "Contact"] },
                        ].map(col => (
                            <div key={col.title}>
                                <div className="text-xs font-bold uppercase tracking-widest text-base-content/40 mb-4">{col.title}</div>
                                <ul className="space-y-3">
                                    {col.links.map(l => (
                                        <li key={l}>
                                            <a href="#" className="text-sm font-semibold text-base-content/60 hover:text-primary transition-colors">{l}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-base-300 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs font-bold text-base-content/40">
                            &copy; {new Date().getFullYear()} BatChit. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            {["Twitter", "LinkedIn", "Discord", "GitHub"].map(s => (
                                <a key={s} href="#" className="text-xs font-bold text-base-content/40 hover:text-primary transition-colors">{s}</a>
							))}
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
}