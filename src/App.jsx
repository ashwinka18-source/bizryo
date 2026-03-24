import { useState } from "react";

// ============================================================
// 🔧 CONFIG — Update these before deploying to Vercel!
// In Vercel: Settings → Environment Variables → Add VITE_ANTHROPIC_API_KEY
// ============================================================
// 🔧 FOR VERCEL: Set VITE_ANTHROPIC_API_KEY in Vercel Environment Variables
// 🔧 FOR LOCAL: Create .env file and add VITE_ANTHROPIC_API_KEY=your_key
const API_KEY = "";

const WHATSAPP = "919999999999"; // 🔧 Replace with your WhatsApp number
const NAMECHEAP_AFF = "https://namecheap.pxf.io/c/YOUR_ID"; // 🔧 Your Namecheap affiliate
const HOSTINGER_AFF = "https://hostinger.in/?REFERRALCODE=YOUR_CODE"; // 🔧 Your Hostinger affiliate
const GODADDY_AFF = "https://godaddy.com/?isc=YOUR_CODE"; // 🔧 Your GoDaddy affiliate
const BIGROCK_AFF = "https://bigrock.in/affiliate/YOUR_CODE"; // 🔧 Your BigRock affiliate

// ============================================================
const PACKAGES = {
  "Shop / Retail": { name: "Business Starter", price: "₹4,999", features: ["5 Pages", "Product Gallery", "WhatsApp Button", "Google Maps", "Mobile Responsive"] },
  "Restaurant / Food": { name: "Food & Menu Site", price: "₹6,999", features: ["Menu Page", "Online Ordering", "Photo Gallery", "Reservation Form", "Instagram Feed"] },
  "Freelancer / Consultant": { name: "Portfolio Pro", price: "₹5,499", features: ["Portfolio Gallery", "Services Page", "Contact Form", "Testimonials", "SEO Setup"] },
  "Startup / Tech": { name: "Business Growth", price: "₹14,999", features: ["10+ Pages", "Blog", "CMS Dashboard", "SEO Optimised", "Analytics"] },
  "Real Estate": { name: "Property Showcase", price: "₹12,999", features: ["Property Listings", "Virtual Tour", "Lead Forms", "Map Integration", "WhatsApp CTA"] },
  "Education / Coaching": { name: "EduSite", price: "₹8,999", features: ["Course Listings", "Enrollment Form", "Student Portal", "Video Support", "Certificate Page"] },
  "Healthcare": { name: "Health & Care", price: "₹9,999", features: ["Appointment Booking", "Doctor Profiles", "Service Pages", "Emergency CTA", "WhatsApp"] },
  "Other": { name: "Custom Website", price: "₹4,999", features: ["5 Pages", "Mobile Friendly", "Contact Form", "WhatsApp Button", "SEO Basics"] },
};
const BUSINESS_TYPES = Object.keys(PACKAGES);
const LOCATIONS = ["Local (City/District)", "All India 🇮🇳", "International 🌍"];

// ============================================================
// STYLES
// ============================================================
const S = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Sans:wght@300;400;500;600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{background:#030712}
  ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#030712}::-webkit-scrollbar-thumb{background:#4f46e5;border-radius:2px}
  .card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:20px;backdrop-filter:blur(10px)}
  .btn{background:linear-gradient(135deg,#4f46e5,#7c3aed);border:none;color:white;padding:14px 28px;border-radius:50px;font-family:inherit;font-size:15px;font-weight:700;cursor:pointer;transition:all 0.3s;letter-spacing:0.3px;text-decoration:none;display:inline-block}
  .btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(79,70,229,0.4)}
  .btn:disabled{opacity:0.4;cursor:not-allowed;transform:none}
  .btn-ghost{background:rgba(255,255,255,0.05);border:1.5px solid rgba(255,255,255,0.1);color:#94a3b8;padding:12px 24px;border-radius:50px;font-family:inherit;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.3s}
  .btn-ghost:hover{background:rgba(255,255,255,0.08);color:#e2e8f0}
  .btn-green{background:linear-gradient(135deg,#16a34a,#15803d)}
  .input{background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,255,255,0.09);border-radius:14px;padding:15px 18px;font-family:inherit;font-size:15px;color:#e2e8f0;width:100%;outline:none;transition:all 0.3s}
  .input:focus{border-color:#4f46e5;background:rgba(79,70,229,0.07);box-shadow:0 0 0 3px rgba(79,70,229,0.12)}
  .input::placeholder{color:#374151}
  .chip{display:inline-flex;align-items:center;padding:9px 18px;border-radius:50px;border:1.5px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);cursor:pointer;font-size:13px;font-weight:500;transition:all 0.2s;color:#94a3b8}
  .chip:hover{border-color:#4f46e5;color:#a5b4fc}
  .chip.on{border-color:#4f46e5;background:rgba(79,70,229,0.18);color:#a5b4fc}
  .tag{padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:0.3px}
  .tag-g{background:rgba(34,197,94,0.12);color:#4ade80;border:1px solid rgba(34,197,94,0.2)}
  .tag-r{background:rgba(239,68,68,0.12);color:#f87171;border:1px solid rgba(239,68,68,0.2)}
  .tag-v{background:rgba(79,70,229,0.15);color:#a5b4fc;border:1px solid rgba(79,70,229,0.25)}
  .tag-y{background:rgba(245,158,11,0.12);color:#fbbf24;border:1px solid rgba(245,158,11,0.2)}
  @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  .fadeUp{animation:fadeUp 0.6s ease forwards}
  .pulse{animation:pulse 2s infinite}
  .float{animation:float 4s ease-in-out infinite}
  .orb{position:fixed;border-radius:50%;filter:blur(90px);pointer-events:none;z-index:0}
  nav a,nav button{text-decoration:none;cursor:pointer}
  .domain-row:hover{background:rgba(79,70,229,0.06);border-color:rgba(79,70,229,0.3)}
  .domain-row{transition:all 0.2s}
  .nav-link{color:#64748b;font-size:14px;font-weight:600;transition:color 0.2s;background:none;border:none;font-family:inherit;padding:6px 12px;border-radius:8px}
  .nav-link:hover,.nav-link.active{color:#a5b4fc}
  textarea.input{resize:vertical;min-height:120px}
  .prose p{color:#94a3b8;line-height:1.85;margin-bottom:18px;font-size:15px}
  .prose h2{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:#e2e8f0;margin:28px 0 12px}
  .prose strong{color:#e2e8f0;font-weight:700}
`;

// ============================================================
// SHARED UI
// ============================================================
function Orbs() {
  return <>
    <div className="orb" style={{width:500,height:500,background:"rgba(79,70,229,0.1)",top:-200,right:-150}}/>
    <div className="orb" style={{width:400,height:400,background:"rgba(124,58,237,0.07)",bottom:-150,left:-100}}/>
    <div className="orb" style={{width:300,height:300,background:"rgba(16,185,129,0.05)",top:"45%",left:"35%"}}/>
  </>;
}

function Nav({ page, setPage }) {
  const BLOG_URL = "https://bizryo.com/blog"; // ✅ Hashnode mapped to main domain for best SEO
  return (
    <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(3,7,18,0.85)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,0.06)",padding:"0 24px"}}>
      <div style={{maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
        <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>setPage("home")}>
          <div style={{width:34,height:34,borderRadius:10,background:"linear-gradient(135deg,#4f46e5,#7c3aed)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>⚡</div>
          <span style={{fontFamily:"Syne",fontWeight:800,fontSize:20,background:"linear-gradient(135deg,#e2e8f0,#a5b4fc)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>BizRyo</span>
        </div>
        <div style={{display:"flex",gap:4,alignItems:"center"}}>
          <button className={`nav-link${page==="home"?" active":""}`} onClick={()=>setPage("home")}>Home</button>
          <button className={`nav-link${page==="tool"?" active":""}`} onClick={()=>setPage("tool")}>Free Tool</button>
          <a href={BLOG_URL} target="_blank" rel="noreferrer" className="nav-link">Blog ↗</a>
          <button className={`nav-link${page==="contact"?" active":""}`} onClick={()=>setPage("contact")}>Contact</button>
          <a href={`https://wa.me/${WHATSAPP}?text=Hi! I want to build a website for my business`} target="_blank" rel="noreferrer"
            className="btn btn-green" style={{padding:"9px 20px",fontSize:13,marginLeft:8}}>💬 WhatsApp Us</a>
        </div>
      </div>
    </nav>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{borderTop:"1px solid rgba(255,255,255,0.06)",padding:"40px 24px",textAlign:"center",position:"relative",zIndex:10}}>
      <div style={{fontFamily:"Syne",fontWeight:800,fontSize:18,marginBottom:8,background:"linear-gradient(135deg,#e2e8f0,#a5b4fc)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>BizRyo</div>
      <p style={{color:"#374151",fontSize:13,marginBottom:16}}>AI-powered business identity engine for Indian businesses</p>
      <div style={{display:"flex",justifyContent:"center",gap:24,marginBottom:20}}>
        {[["home","Home"],["tool","Free Tool"],["contact","Contact"]].map(([p,l])=>(
          <button key={p} onClick={()=>setPage(p)} style={{color:"#4b5563",fontSize:13,background:"none",border:"none",cursor:"pointer",fontFamily:"inherit"}}>{l}</button>
        ))}
        <a href="https://bizryo.com/blog" target="_blank" rel="noreferrer" style={{color:"#4b5563",fontSize:13,textDecoration:"none"}}>Blog ↗</a>
      </div>
      <p style={{color:"#1f2937",fontSize:12}}>© 2026 BizRyo • Made with ❤️ for Indian Businesses</p>
    </footer>
  );
}

// ============================================================
// HOME PAGE
// ============================================================
function HomePage({ setPage }) {
  const steps = [
    {emoji:"📝",title:"Enter Business Details",desc:"Tell us your business name, type, and target market. Takes 30 seconds."},
    {emoji:"🤖",title:"AI Analyses Your Business",desc:"Our Claude AI instantly generates domain names, social handles, and brand identity tailored to you."},
    {emoji:"📊",title:"See Your Online Readiness",desc:"Get a detailed score showing exactly what your business is missing online — and how to fix it."},
    {emoji:"🚀",title:"Launch with Confidence",desc:"Register your perfect domain, pick the best hosting deal, and get your website built by our team."},
  ];
  const testimonials = [
    {name:"Rahul Menon",biz:"Restaurant Owner, Kochi",text:"BizRyo suggested the perfect domain for my restaurant. Got my website built in 48 hours. My bookings doubled!",stars:5},
    {name:"Priya Sharma",biz:"Freelance Designer, Mumbai",text:"I had no idea what domain to pick. BizRyo's AI gave me 6 options with SEO scores. Super helpful!",stars:5},
    {name:"Mohammed Shafeeq",biz:"Electronics Shop, Calicut",text:"Found out my business was only 25% ready online. Fixed everything with BizRyo's recommendations!",stars:5},
  ];
  return (
    <div className="fadeUp" style={{position:"relative",zIndex:10}}>
      {/* Hero */}
      <div style={{textAlign:"center",padding:"80px 24px 64px",maxWidth:800,margin:"0 auto"}}>
        <div className="tag tag-v" style={{display:"inline-block",marginBottom:24,fontSize:12,padding:"6px 16px"}}>🇮🇳 Free Tool for Indian Businesses</div>
        <h1 style={{fontFamily:"Syne",fontSize:"clamp(36px,6vw,64px)",fontWeight:800,lineHeight:1.05,letterSpacing:"-2px",marginBottom:24}}>
          <span style={{background:"linear-gradient(135deg,#f8fafc 0%,#c7d2fe 50%,#8b5cf6 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
            Your Business Details.<br/>Your Online Identity.
          </span>
        </h1>
        <p style={{color:"#64748b",fontSize:18,lineHeight:1.8,marginBottom:40,maxWidth:560,margin:"0 auto 40px"}}>
          Enter your business name and get AI-powered domain suggestions, social media handles, brand identity, pricing comparison and website packages — completely free.
        </p>
        <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
          <button className="btn" onClick={()=>setPage("tool")} style={{fontSize:16,padding:"16px 36px"}}>⚡ Try Free Tool</button>
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="btn btn-green" style={{fontSize:16,padding:"16px 36px"}}>💬 Get Free Consultation</a>
        </div>
        <p style={{color:"#1f2937",fontSize:12,marginTop:16}}>No signup • No credit card • Results in 10 seconds</p>
      </div>

      {/* Stats */}
      <div style={{maxWidth:900,margin:"0 auto",padding:"0 24px 80px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:16}}>
          {[["10,000+","Domain Suggestions Made"],["₹0","Always Free Tool"],["500+","Businesses Helped"],["24 hrs","Website Delivery Time"]].map(([v,l])=>(
            <div key={l} className="card" style={{padding:"24px 20px",textAlign:"center"}}>
              <div style={{fontFamily:"Syne",fontSize:30,fontWeight:800,background:"linear-gradient(135deg,#a5b4fc,#8b5cf6)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{v}</div>
              <div style={{color:"#475569",fontSize:13,marginTop:6}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div style={{maxWidth:900,margin:"0 auto",padding:"0 24px 80px"}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <h2 style={{fontFamily:"Syne",fontSize:36,fontWeight:800,letterSpacing:"-1px",marginBottom:12}}>How BizRyo Works</h2>
          <p style={{color:"#64748b"}}>From business name to complete online identity in 4 simple steps</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:20}}>
          {steps.map((s,i)=>(
            <div key={i} className="card" style={{padding:"28px 24px",position:"relative"}}>
              <div style={{position:"absolute",top:20,right:20,fontFamily:"Syne",fontSize:13,fontWeight:800,color:"#1e1b4b"}}>0{i+1}</div>
              <div style={{fontSize:32,marginBottom:16}}>{s.emoji}</div>
              <h3 style={{fontFamily:"Syne",fontSize:16,fontWeight:800,marginBottom:8,color:"#e2e8f0"}}>{s.title}</h3>
              <p style={{color:"#475569",fontSize:13,lineHeight:1.7}}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{maxWidth:900,margin:"0 auto",padding:"0 24px 80px"}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <h2 style={{fontFamily:"Syne",fontSize:36,fontWeight:800,letterSpacing:"-1px",marginBottom:12}}>Everything You Need in One Free Tool</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16}}>
          {[
            {emoji:"🌐",t:"AI Domain Suggestions",d:"10 domain name ideas tailored to your business type with SEO scores"},
            {emoji:"📊",t:"Business Readiness Score",d:"Find out exactly what's missing online and how to fix it"},
            {emoji:"📱",t:"Social Media Handle Check",d:"Check Instagram, Facebook, YouTube and more simultaneously"},
            {emoji:"🎨",t:"Brand Identity AI",d:"Get a tagline and brand colour suggestions for your business"},
            {emoji:"💰",t:"Domain Price Comparison",d:"Compare prices across Namecheap, Hostinger, GoDaddy, BigRock"},
            {emoji:"📦",t:"Website Package Finder",d:"Get the right website package recommendation for your business type"},
          ].map(f=>(
            <div key={f.t} className="card" style={{padding:"24px",display:"flex",gap:16,alignItems:"flex-start"}}>
              <div style={{fontSize:24,flexShrink:0}}>{f.emoji}</div>
              <div>
                <h3 style={{fontFamily:"Syne",fontSize:15,fontWeight:800,color:"#e2e8f0",marginBottom:6}}>{f.t}</h3>
                <p style={{color:"#475569",fontSize:13,lineHeight:1.6}}>{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={{maxWidth:900,margin:"0 auto",padding:"0 24px 80px"}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <h2 style={{fontFamily:"Syne",fontSize:36,fontWeight:800,letterSpacing:"-1px",marginBottom:12}}>What Indian Businesses Say</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:20}}>
          {testimonials.map((t,i)=>(
            <div key={i} className="card" style={{padding:"28px"}}>
              <div style={{color:"#fbbf24",fontSize:14,marginBottom:14}}>{"★".repeat(t.stars)}</div>
              <p style={{color:"#94a3b8",fontSize:14,lineHeight:1.7,marginBottom:20,fontStyle:"italic"}}>"{t.text}"</p>
              <div>
                <div style={{fontFamily:"Syne",fontWeight:700,fontSize:14,color:"#e2e8f0"}}>{t.name}</div>
                <div style={{color:"#475569",fontSize:12}}>{t.biz}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div style={{maxWidth:900,margin:"0 auto",padding:"0 24px 80px"}}>
        <div style={{background:"linear-gradient(135deg,rgba(79,70,229,0.15),rgba(124,58,237,0.1))",border:"1.5px solid rgba(79,70,229,0.25)",borderRadius:24,padding:"48px 40px",textAlign:"center"}}>
          <h2 style={{fontFamily:"Syne",fontSize:32,fontWeight:800,letterSpacing:"-1px",marginBottom:12}}>Ready to Go Online?</h2>
          <p style={{color:"#64748b",marginBottom:32,fontSize:16}}>Join thousands of Indian businesses that found their online identity with BizRyo</p>
          <button className="btn" onClick={()=>setPage("tool")} style={{fontSize:16,padding:"16px 40px"}}>⚡ Start Free — Takes 30 Seconds</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// TOOL PAGE
// ============================================================
function ToolPage() {
  const [stage, setStage] = useState(0); // 0=form, 1=loading, 2=results
  const [bizName, setBizName] = useState("");
  const [bizType, setBizType] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState(null);
  const [loadMsg, setLoadMsg] = useState("");
  const [error, setError] = useState("");

  const msgs = ["🔍 Analysing your business...","🌐 Generating domain ideas...","📊 Calculating readiness score...","📱 Checking social handles...","🎨 Creating brand identity...","💰 Finding best prices..."];

  async function analyse() {
    if (!bizName||!bizType||!location) return;
    setStage(1); setError("");
    let i=0; setLoadMsg(msgs[0]);
    const iv = setInterval(()=>{ i=(i+1)%msgs.length; setLoadMsg(msgs[i]); }, 1100);
    const prompt = `You are a business branding expert for Indian and global markets. A user provided:
- Business Name: "${bizName}"
- Business Type: "${bizType}"
- Target Market: "${location}"

Return ONLY valid JSON (no markdown, no extra text) with this exact structure:
{
  "domains": [
    {"name":"example.com","seoScore":88,"reason":"Short, memorable, great for Google","available":true,"ext":".com"},
    {"name":"example.in","seoScore":80,"reason":"Perfect for Indian market, cheaper","available":true,"ext":".in"},
    {"name":"example.io","seoScore":72,"reason":"Modern, startup-friendly","available":true,"ext":".io"},
    {"name":"example.co","seoScore":68,"reason":"Short global alternative","available":false,"ext":".co"},
    {"name":"example.store","seoScore":62,"reason":"Ideal for retail businesses","available":true,"ext":".store"},
    {"name":"example.biz","seoScore":55,"reason":"Business focused extension","available":true,"ext":".biz"}
  ],
  "social": [
    {"platform":"Instagram","handle":"@yourbiz","available":true},
    {"platform":"Facebook","handle":"@yourbiz","available":true},
    {"platform":"YouTube","handle":"@yourbiz","available":false},
    {"platform":"Twitter/X","handle":"@yourbiz","available":true},
    {"platform":"LinkedIn","handle":"yourbiz","available":true}
  ],
  "score":24,
  "breakdown":[
    {"item":"No website found","impact":-30,"fix":"Build a professional website"},
    {"item":"No Google Business Profile","impact":-22,"fix":"Set up Google Business for free"},
    {"item":"No domain registered","impact":-25,"fix":"Register your domain today"},
    {"item":"Has a business name","impact":21,"fix":null}
  ],
  "tagline":"A short catchy tagline for this business",
  "colors":["#hexcolor1","#hexcolor2"],
  "topPick":"example.com",
  "registrars":[
    {"name":"Namecheap","price":"₹749","badge":"Most Popular","color":"#f97316","url":"NAMECHEAP"},
    {"name":"Hostinger","price":"₹699","badge":"Best Value 🔥","color":"#7c3aed","url":"HOSTINGER"},
    {"name":"GoDaddy","price":"₹899","badge":"Trusted Brand","color":"#0ea5e9","url":"GODADDY"},
    {"name":"BigRock","price":"₹799","badge":"Best for India","color":"#16a34a","url":"BIGROCK"}
  ]
}
Make domain suggestions creative and relevant to "${bizName}". Score should be 15-40 to create urgency. Keep JSON valid.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1200,messages:[{role:"user",content:prompt}]})
      });
      const data = await res.json();
      const txt = data.content?.map(b=>b.text||"").join("")||"";
      const clean = txt.replace(/```json|```/g,"").trim();
      const parsed = JSON.parse(clean);
      clearInterval(iv);
      setResults(parsed); setStage(2);
    } catch(e) {
      clearInterval(iv);
      setError("Something went wrong. Please try again.");
      setStage(0);
    }
  }

  const aff = {NAMECHEAP:NAMECHEAP_AFF,HOSTINGER:HOSTINGER_AFF,GODADDY:GODADDY_AFF,BIGROCK:BIGROCK_AFF};
  const pkg = PACKAGES[bizType]||PACKAGES["Other"];
  const scoreColor = s => s>=70?"#4ade80":s>=40?"#fbbf24":"#f87171";

  return (
    <div className="fadeUp" style={{position:"relative",zIndex:10,maxWidth:860,margin:"0 auto",padding:"48px 24px 80px"}}>
      {/* Header */}
      <div style={{textAlign:"center",marginBottom:48}}>
        <div className="tag tag-v" style={{display:"inline-block",marginBottom:16,fontSize:12,padding:"5px 14px"}}>⚡ AI-Powered • 100% Free</div>
        <h1 style={{fontFamily:"Syne",fontSize:"clamp(28px,4vw,44px)",fontWeight:800,letterSpacing:"-1.5px",marginBottom:12}}>
          <span style={{background:"linear-gradient(135deg,#f8fafc,#a5b4fc)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
            Find Your Business Identity
          </span>
        </h1>
        <p style={{color:"#475569",fontSize:16}}>Enter your business details and get everything you need to go online</p>
      </div>

      {/* FORM */}
      {stage===0 && (
        <div className="card" style={{padding:"40px 36px"}}>
          {error && <div style={{background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.2)",borderRadius:12,padding:"12px 16px",color:"#f87171",fontSize:14,marginBottom:24}}>{error}</div>}
          <div style={{marginBottom:28}}>
            <label style={{display:"block",marginBottom:10,fontSize:12,fontWeight:700,color:"#64748b",letterSpacing:"1px",textTransform:"uppercase"}}>Business Name</label>
            <input className="input" placeholder="e.g. Sri Traders, Kerala Spice, TechNova..." value={bizName} onChange={e=>setBizName(e.target.value)} />
          </div>
          <div style={{marginBottom:28}}>
            <label style={{display:"block",marginBottom:12,fontSize:12,fontWeight:700,color:"#64748b",letterSpacing:"1px",textTransform:"uppercase"}}>Business Type</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {BUSINESS_TYPES.map(t=><div key={t} className={`chip ${bizType===t?"on":""}`} onClick={()=>setBizType(t)}>{t}</div>)}
            </div>
          </div>
          <div style={{marginBottom:36}}>
            <label style={{display:"block",marginBottom:12,fontSize:12,fontWeight:700,color:"#64748b",letterSpacing:"1px",textTransform:"uppercase"}}>Target Market</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {LOCATIONS.map(l=><div key={l} className={`chip ${location===l?"on":""}`} onClick={()=>setLocation(l)}>{l}</div>)}
            </div>
          </div>
          <button className="btn" disabled={!bizName||!bizType||!location} onClick={analyse} style={{width:"100%",fontSize:16,padding:"17px"}}>
            ⚡ Analyse My Business — Free
          </button>
          <p style={{textAlign:"center",color:"#1f2937",fontSize:12,marginTop:12}}>No signup needed • Results in ~10 seconds • Powered by Claude AI</p>
        </div>
      )}

      {/* LOADING */}
      {stage===1 && (
        <div style={{textAlign:"center",padding:"80px 0"}}>
          <div style={{width:72,height:72,borderRadius:"50%",background:"linear-gradient(135deg,#4f46e5,#7c3aed)",margin:"0 auto 28px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,boxShadow:"0 0 50px rgba(79,70,229,0.4)"}} className="float">⚡</div>
          <h2 style={{fontFamily:"Syne",fontSize:26,fontWeight:800,marginBottom:12}}>Analysing <span style={{color:"#a5b4fc"}}>{bizName}</span></h2>
          <p className="pulse" style={{color:"#64748b",fontSize:16}}>{loadMsg}</p>
          <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:28}}>
            {[0,1,2,3].map(i=><div key={i} style={{width:7,height:7,borderRadius:"50%",background:"#4f46e5",animation:`pulse ${0.8+i*0.15}s infinite`}}/>)}
          </div>
        </div>
      )}

      {/* RESULTS */}
      {stage===2 && results && (
        <div>
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:32}}>
            <button className="btn-ghost" onClick={()=>{setStage(0);setResults(null);}}>← Try Another</button>
            <div>
              <h2 style={{fontFamily:"Syne",fontSize:22,fontWeight:800}}>Results for <span style={{color:"#a5b4fc"}}>{bizName}</span></h2>
              <p style={{color:"#475569",fontSize:13}}>{bizType} • {location}</p>
            </div>
          </div>

          {/* Readiness Score */}
          <div className="card" style={{padding:"28px",marginBottom:20,display:"flex",gap:28,alignItems:"center",flexWrap:"wrap"}}>
            <div style={{textAlign:"center",minWidth:90}}>
              <div style={{fontFamily:"Syne",fontSize:48,fontWeight:800,color:scoreColor(results.score),lineHeight:1}}>{results.score}</div>
              <div style={{fontSize:11,color:"#475569",marginTop:4,fontWeight:600}}>OUT OF 100</div>
            </div>
            <div style={{flex:1,minWidth:200}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                <h3 style={{fontFamily:"Syne",fontSize:17,fontWeight:800}}>📊 Online Readiness Score</h3>
                <span className="tag tag-r">Needs Improvement</span>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {results.breakdown?.map((b,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10,fontSize:13}}>
                    <span>{b.impact<0?"❌":"✅"}</span>
                    <span style={{color:b.impact<0?"#f87171":"#4ade80",flex:1}}>{b.item}</span>
                    {b.fix && <span style={{color:"#374151",fontSize:11}}>{b.fix}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Domain Suggestions */}
          <div className="card" style={{padding:"28px",marginBottom:20}}>
            <h3 style={{fontFamily:"Syne",fontSize:18,fontWeight:800,marginBottom:6}}>🌐 AI Domain Suggestions</h3>
            <p style={{color:"#475569",fontSize:13,marginBottom:20}}>Tailored to your business. Click Register to buy at the best price.</p>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {results.domains?.map((d,i)=>(
                <div key={i} className="domain-row card" style={{padding:"14px 18px",display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
                  <div style={{flex:1,minWidth:150}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                      <span style={{fontFamily:"Syne",fontWeight:800,fontSize:15,color:"#e2e8f0"}}>{d.name}</span>
                      {i===0 && <span style={{background:"linear-gradient(135deg,#f59e0b,#d97706)",color:"white",fontSize:9,padding:"2px 8px",borderRadius:"20px",fontWeight:700}}>⭐ TOP PICK</span>}
                      <span className={d.available?"tag tag-g":"tag tag-r"}>{d.available?"✓ Available":"✗ Taken"}</span>
                    </div>
                    <div style={{color:"#374151",fontSize:12}}>{d.reason}</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{background:d.seoScore>=80?"rgba(34,197,94,0.12)":d.seoScore>=65?"rgba(245,158,11,0.12)":"rgba(239,68,68,0.12)",color:d.seoScore>=80?"#4ade80":d.seoScore>=65?"#fbbf24":"#f87171",padding:"4px 10px",borderRadius:"20px",fontWeight:800,fontSize:13}}>
                      SEO {d.seoScore}
                    </div>
                    {d.available && <a href={NAMECHEAP_AFF} target="_blank" rel="noreferrer" className="btn" style={{padding:"8px 16px",fontSize:12}}>Register →</a>}
                  </div>
                </div>
              ))}
            </div>
            <div style={{marginTop:16,padding:"14px 18px",background:"rgba(245,158,11,0.07)",borderRadius:12,border:"1px solid rgba(245,158,11,0.15)",fontSize:13,color:"#fbbf24"}}>
              💡 Register <strong>{results.topPick}</strong> first — best SEO score for your business!
            </div>
          </div>

          {/* Price Comparison */}
          <div className="card" style={{padding:"28px",marginBottom:20}}>
            <h3 style={{fontFamily:"Syne",fontSize:18,fontWeight:800,marginBottom:6}}>💰 Domain Price Comparison</h3>
            <p style={{color:"#475569",fontSize:13,marginBottom:20}}>Compare prices for <strong style={{color:"#a5b4fc"}}>{results.topPick}</strong> across top registrars</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:12}}>
              {results.registrars?.map(r=>(
                <a key={r.name} href={aff[r.url]||"#"} target="_blank" rel="noreferrer" style={{textDecoration:"none"}}>
                  <div className="card" style={{padding:"18px",textAlign:"center",cursor:"pointer",borderColor:"rgba(255,255,255,0.07)",transition:"all 0.25s"}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=r.color+"50";e.currentTarget.style.background=r.color+"10";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.07)";e.currentTarget.style.background="rgba(255,255,255,0.03)";}}>
                    <div className="tag" style={{display:"inline-block",marginBottom:10,background:r.color+"20",color:r.color,border:`1px solid ${r.color}30`,fontSize:10}}>{r.badge}</div>
                    <div style={{fontFamily:"Syne",fontWeight:800,fontSize:15,color:"#e2e8f0",marginBottom:4}}>{r.name}</div>
                    <div style={{fontFamily:"Syne",fontWeight:800,fontSize:20,color:r.color,marginBottom:10}}>{r.price}<span style={{fontSize:11,fontWeight:400,color:"#475569"}}>/yr</span></div>
                    <div style={{color:r.color,fontSize:12,fontWeight:600}}>Buy Here →</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Social Handles — Honest Manual Check */}
          <div className="card" style={{padding:"28px",marginBottom:20}}>
            <h3 style={{fontFamily:"Syne",fontSize:18,fontWeight:800,marginBottom:6}}>📱 Social Media Username Suggestions</h3>
            <div style={{background:"rgba(245,158,11,0.08)",border:"1px solid rgba(245,158,11,0.2)",borderRadius:12,padding:"12px 16px",marginBottom:20,display:"flex",gap:10,alignItems:"flex-start"}}>
              <span>⚠️</span>
              <p style={{color:"#fbbf24",fontSize:13,lineHeight:1.6}}>Social platforms don't allow automatic checks. We suggest the best handle — click <strong>Check Now</strong> to verify on each platform directly.</p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:12}}>
              {[
                {platform:"Instagram",emoji:"📸",url:`https://instagram.com/${bizName.toLowerCase().replace(/\s+/g,"")}`,color:"#e1306c"},
                {platform:"Facebook",emoji:"👍",url:`https://facebook.com/${bizName.toLowerCase().replace(/\s+/g,"")}`,color:"#1877f2"},
                {platform:"YouTube",emoji:"▶️",url:`https://youtube.com/@${bizName.toLowerCase().replace(/\s+/g,"")}`,color:"#ff0000"},
                {platform:"Twitter/X",emoji:"🐦",url:`https://x.com/${bizName.toLowerCase().replace(/\s+/g,"")}`,color:"#e2e8f0"},
                {platform:"LinkedIn",emoji:"💼",url:`https://linkedin.com/company/${bizName.toLowerCase().replace(/\s+/g,"-")}`,color:"#0a66c2"},
              ].map((s,i)=>{
                const handle = `@${bizName.toLowerCase().replace(/\s+/g,"")}`;
                return (
                  <div key={i} className="card" style={{padding:"16px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <span>{s.emoji}</span>
                        <span style={{fontSize:12,fontWeight:700,color:"#64748b"}}>{s.platform}</span>
                      </div>
                      <span className="tag tag-y" style={{fontSize:10}}>Unverified</span>
                    </div>
                    <div style={{fontFamily:"Syne",fontWeight:700,fontSize:14,color:"#e2e8f0",marginBottom:10}}>{handle}</div>
                    <a href={s.url} target="_blank" rel="noreferrer"
                      style={{display:"block",textAlign:"center",padding:"7px",borderRadius:8,background:s.color+"20",border:`1px solid ${s.color}40`,color:s.color,fontSize:12,fontWeight:700,textDecoration:"none"}}>
                      Check on {s.platform} →
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Brand Identity */}
          <div className="card" style={{padding:"28px",marginBottom:20}}>
            <h3 style={{fontFamily:"Syne",fontSize:18,fontWeight:800,marginBottom:20}}>🎨 AI Brand Identity</h3>
            <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
              <div style={{flex:1,minWidth:180,background:"rgba(255,255,255,0.02)",borderRadius:14,padding:"18px"}}>
                <div style={{fontSize:11,color:"#374151",marginBottom:8,letterSpacing:"1px",textTransform:"uppercase",fontWeight:700}}>Suggested Tagline</div>
                <div style={{fontFamily:"Syne",fontSize:16,fontWeight:700,color:"#a5b4fc",lineHeight:1.5}}>"{results.tagline}"</div>
              </div>
              <div style={{flex:1,minWidth:180,background:"rgba(255,255,255,0.02)",borderRadius:14,padding:"18px"}}>
                <div style={{fontSize:11,color:"#374151",marginBottom:12,letterSpacing:"1px",textTransform:"uppercase",fontWeight:700}}>Brand Colours</div>
                <div style={{display:"flex",gap:12}}>
                  {results.colors?.map((c,i)=>(
                    <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                      <div style={{width:44,height:44,borderRadius:12,background:c,boxShadow:`0 4px 16px ${c}50`}}/>
                      <span style={{fontSize:10,color:"#374151"}}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Package Recommender */}
          <div className="card" style={{padding:"28px",marginBottom:20,background:"linear-gradient(135deg,rgba(79,70,229,0.1),rgba(124,58,237,0.06))",border:"1.5px solid rgba(79,70,229,0.2)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:20}}>
              <div style={{flex:1,minWidth:200}}>
                <div className="tag tag-v" style={{display:"inline-block",marginBottom:10,fontSize:11}}>Recommended For You</div>
                <h3 style={{fontFamily:"Syne",fontSize:20,fontWeight:800,marginBottom:12}}>📦 {pkg.name}</h3>
                {pkg.features.map((f,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:"#94a3b8",marginBottom:7}}>
                    <span style={{color:"#4ade80"}}>✓</span>{f}
                  </div>
                ))}
              </div>
              <div style={{textAlign:"center",minWidth:160}}>
                <div style={{fontFamily:"Syne",fontSize:40,fontWeight:800,background:"linear-gradient(135deg,#a5b4fc,#7c3aed)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{pkg.price}</div>
                <div style={{color:"#374151",fontSize:12,marginBottom:16}}>One-time • No hidden fees</div>
                <a href={`https://wa.me/${WHATSAPP}?text=Hi! I want the ${pkg.name} package for ${bizName}`} target="_blank" rel="noreferrer" className="btn btn-green" style={{fontSize:13,padding:"12px 24px"}}>
                  Get This Package →
                </a>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div style={{textAlign:"center",padding:"48px 24px",background:"linear-gradient(135deg,rgba(79,70,229,0.12),rgba(124,58,237,0.08))",borderRadius:24,border:"1.5px solid rgba(79,70,229,0.2)"}}>
            <div style={{fontSize:44,marginBottom:16}} className="float">🚀</div>
            <h3 style={{fontFamily:"Syne",fontSize:26,fontWeight:800,marginBottom:10}}>Ready to launch <span style={{color:"#a5b4fc"}}>{bizName}</span> online?</h3>
            <p style={{color:"#475569",fontSize:15,marginBottom:28,maxWidth:460,margin:"0 auto 28px"}}>Our team builds your complete website in 24 hours. Free consultation, no obligation.</p>
            <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
              <a href={`https://wa.me/${WHATSAPP}?text=Hi! I used BizRyo for ${bizName} and want a website!`} target="_blank" rel="noreferrer" className="btn btn-green" style={{fontSize:15,padding:"15px 32px"}}>💬 Chat on WhatsApp</a>
              <button className="btn-ghost" onClick={()=>{setStage(0);setResults(null);}}>Try Another Business</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// CONTACT PAGE
// ============================================================
function ContactPage() {
  const [form, setForm] = useState({name:"",phone:"",biz:"",msg:""});
  const [sent, setSent] = useState(false);
  function send() {
    if (!form.name||!form.phone) return;
    const txt = `Hi! I came from BizRyo website.%0AName: ${form.name}%0APhone: ${form.phone}%0ABusiness: ${form.biz}%0AMessage: ${form.msg||"I want to build a website"}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${txt}`,"_blank");
    setSent(true);
  }
  return (
    <div className="fadeUp" style={{position:"relative",zIndex:10,maxWidth:680,margin:"0 auto",padding:"48px 24px 80px"}}>
      <div style={{textAlign:"center",marginBottom:48}}>
        <h1 style={{fontFamily:"Syne",fontSize:"clamp(28px,4vw,44px)",fontWeight:800,letterSpacing:"-1.5px",marginBottom:12}}>
          <span style={{background:"linear-gradient(135deg,#f8fafc,#a5b4fc)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Get a Free Consultation</span>
        </h1>
        <p style={{color:"#475569",fontSize:16}}>Tell us about your business. We'll get back on WhatsApp within 2 hours.</p>
      </div>
      {sent ? (
        <div style={{textAlign:"center",padding:"60px 24px"}}>
          <div style={{fontSize:56,marginBottom:20}} className="float">🎉</div>
          <h2 style={{fontFamily:"Syne",fontSize:24,fontWeight:800,marginBottom:12}}>WhatsApp Opened!</h2>
          <p style={{color:"#475569"}}>Complete sending the message on WhatsApp. We'll reply within 2 hours!</p>
          <button className="btn" style={{marginTop:28}} onClick={()=>setSent(false)}>Send Another Message</button>
        </div>
      ) : (
        <div className="card" style={{padding:"40px 36px"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
            <div>
              <label style={{display:"block",marginBottom:8,fontSize:12,fontWeight:700,color:"#64748b",letterSpacing:"1px",textTransform:"uppercase"}}>Your Name *</label>
              <input className="input" placeholder="Rahul Menon" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
            </div>
            <div>
              <label style={{display:"block",marginBottom:8,fontSize:12,fontWeight:700,color:"#64748b",letterSpacing:"1px",textTransform:"uppercase"}}>WhatsApp Number *</label>
              <input className="input" placeholder="9876543210" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
            </div>
          </div>
          <div style={{marginBottom:20}}>
            <label style={{display:"block",marginBottom:8,fontSize:12,fontWeight:700,color:"#64748b",letterSpacing:"1px",textTransform:"uppercase"}}>Business Name</label>
            <input className="input" placeholder="e.g. Sri Traders, Kerala Spice..." value={form.biz} onChange={e=>setForm({...form,biz:e.target.value})}/>
          </div>
          <div style={{marginBottom:32}}>
            <label style={{display:"block",marginBottom:8,fontSize:12,fontWeight:700,color:"#64748b",letterSpacing:"1px",textTransform:"uppercase"}}>How Can We Help?</label>
            <textarea className="input" placeholder="Tell us about your business and what you need..." value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})}/>
          </div>
          <button className="btn btn-green" disabled={!form.name||!form.phone} onClick={send} style={{width:"100%",fontSize:16,padding:"17px"}}>
            💬 Send via WhatsApp
          </button>
          <p style={{textAlign:"center",color:"#1f2937",fontSize:12,marginTop:12}}>We reply within 2 hours • Free consultation • No obligation</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginTop:28}}>
            {[["⚡","Fast Delivery","Website in 24–48 hours"],["💰","Fair Pricing","Starting at ₹4,999"],["🤝","Free Support","30 days post-launch"]].map(([e,t,d])=>(
              <div key={t} style={{textAlign:"center",padding:"16px 12px",background:"rgba(255,255,255,0.02)",borderRadius:12,border:"1px solid rgba(255,255,255,0.06)"}}>
                <div style={{fontSize:20,marginBottom:8}}>{e}</div>
                <div style={{fontFamily:"Syne",fontWeight:700,fontSize:13,color:"#e2e8f0",marginBottom:4}}>{t}</div>
                <div style={{color:"#374151",fontSize:11}}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  const [page, setPage] = useState("home");
  return (
    <div style={{minHeight:"100vh",background:"#030712",fontFamily:"'Instrument Sans','DM Sans',sans-serif",color:"#e2e8f0",position:"relative",overflowX:"hidden"}}>
      <style>{S}</style>
      <Orbs/>
      <Nav page={page} setPage={setPage}/>
      {page==="home" && <HomePage setPage={setPage}/>}
      {page==="tool" && <ToolPage/>}
      {page==="contact" && <ContactPage/>}
      <Footer setPage={setPage}/>
    </div>
  );
}
