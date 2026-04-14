import { useState } from "react";

const C = {
  gold: "#E8A020", orange: "#D85A1A", brown: "#8B3A1A",
  cream: "#FDF6EC", darkBrown: "#3D1A08", tan: "#F5DDB8",
};
const font = "'Poppins', sans-serif";
const white = "#fff";
const whiteD = "rgba(255,255,255,0.88)";
const whiteDD = "rgba(255,255,255,0.62)";
const BG = { background: `linear-gradient(160deg, ${C.gold} 0%, ${C.orange} 70%, ${C.brown} 100%)` };

const festivalDays = [
  {
    day: "Day 1", date: "May 1", theme: "Kīhoʻihoʻi", color: "#b5a332",
    blocks: [
      {
        timeLabel: "8:30 – 11:00 AM", blockType: "MORNING",
        footer: "10:55 AM – 11:00 AM  ·  Eahou Global Session Orientation (5 minutes)",
        events: [
          { id: 2,  start: "8:30 AM",  end: "9:00 AM",  duration: "30 min", type: "CEREMONY",      name: "Opening Kīpaepae",            subtitle: "Led by Kumu Kekuhi & Hālau ʻŌhiʻa — a ceremonial opening rooted in Hawaiian protocol to set the spirit of the gathering.",   location: "JCC Main Hall" },
          { id: 3,  start: "9:00 AM",  end: "9:30 AM",  duration: "30 min", type: "KEYNOTE",       name: "Kekuhi Kealiʻikanakaʻole",    subtitle: "Kīhoʻihoʻi Kānāwai & the 5H Kaʻao Framework — an exploration of ancestral frameworks for Hawaiian regeneration and governance.",  location: "JCC Main Hall" },
          { id: 4,  start: "9:30 AM",  end: "9:50 AM",  duration: "20 min", type: "VISION SHARE",  name: "Eahou: Keoni DeFranco",       subtitle: "The vision of a self-determined Hawaiʻi — a bold and grounded articulation of what ea looks like as living practice today.",        location: "JCC Main Hall" },
          { id: 5,  start: "9:50 AM",  end: "10:20 AM", duration: "30 min", type: "PANEL · YOUTH", name: "Purple Kula ʻŌpio Panel",     subtitle: "Hālau Hekili youth at the intersection of tech and ea — young voices on culture, technology, and building futures rooted in place.", location: "JCC Terrace" },
          { id: 6,  start: "10:20 AM", end: "10:55 AM", duration: "35 min", type: "KEYNOTE",       name: "EarthFrame",                  subtitle: "Featuring speakers Keolu Fox & Josiah Hester — at the intersection of Indigenous knowledge, AI, and environmental sensing.",       location: "JCC Main Hall" },
        ]
      },
      {
        timeLabel: "11:10 AM – 12:30 PM", blockType: "CONCURRENT SESSIONS", note: "Concurrent sessions — pre-register your choice",
        events: [
          { id: 9,  start: "11:10 AM", end: "12:30 PM", duration: "80 min", type: "EAHOU GLOBAL SESSION", name: "Moananuiakea Storytelling & Media",          subtitle: "Indigenous narrative reclamation across Oceania — media makers and storytellers building sovereign communications infrastructure.",   location: "JCC Room A", preRegister: true },
          { id: 10, start: "11:10 AM", end: "12:30 PM", duration: "80 min", type: "EAHOU GLOBAL SESSION", name: "ʻĀina Justice & Return",                    subtitle: "Bold frameworks from Kenya, Bolivia, Aotearoa, Maui — land return and reparative justice in practice across the Pacific and beyond.", location: "JCC Room B", preRegister: true },
          { id: 11, start: "11:10 AM", end: "12:30 PM", duration: "80 min", type: "EAHOU GLOBAL SESSION", name: "Impact Fund-Shifting; Sovereign Wealth Fund", subtitle: "Regenerative finance keeping wealth in community — strategies for redirecting capital toward Indigenous-led economies.",              location: "JCC Room C", preRegister: true },
        ]
      },
      {
        timeLabel: "1:30 – 2:00 PM", blockType: "AFTERNOON",
        events: [
          { id: 13, start: "1:30 PM", end: "2:00 PM", duration: "30 min", type: "TECH SHOWCASE · OPEN", name: "ʻĀina Foundry Tech Showcase", subtitle: "Aloha ʻĀina tech tools — drop in anytime. Live demos of Indigenous-built technology tools for land stewardship and community data.", location: "JCC Lobby" },
        ]
      },
      {
        timeLabel: "2:00 – 3:30 PM", blockType: "AFTERNOON", note: "Concurrent sessions — pre-register your choice",
        events: [
          { id: 15, start: "2:00 PM", end: "3:30 PM", duration: "90 min", type: "EAHOU GLOBAL SESSION", name: "Resilient Food Systems",             subtitle: "Jamaica to Maui, Guåhan to Peru — food sovereignty in practice. Building regenerative food networks rooted in Indigenous science.",  location: "JCC Room A", preRegister: true },
          { id: 16, start: "2:00 PM", end: "3:30 PM", duration: "90 min", type: "EAHOU GLOBAL SESSION", name: "Cooperative Economics",              subtitle: "From Oaxaca to Hilo — collective ownership in practice. Models of solidarity economy and cooperative enterprise across communities.",   location: "JCC Room B", preRegister: true },
          { id: 17, start: "2:00 PM", end: "3:30 PM", duration: "90 min", type: "EAHOU GLOBAL SESSION", name: "Indigenous Tech & Data Sovereignty", subtitle: "Tech governance on our own terms — Hana to Mauritius to Pakistan. Communities reclaiming their data and digital infrastructure.",        location: "JCC Room C", preRegister: true },
        ]
      },
      {
        timeLabel: "3:30 – 9:00 PM", blockType: "EVENING",
        events: [
          { id: 19, start: "3:30 PM", end: "4:30 PM",  duration: "60 min",       type: "WORKSHOP",             name: "Hawaiʻi Co-op Hui",         subtitle: "Cooperative economics, SB2922, and building KŪPA'A — a working session on Hawaiʻi's cooperative movement and policy landscape.",  location: "JCC Room C" },
          { id: 21, start: "4:50 PM", end: "6:30 PM",  duration: "2 hrs",        type: "PAU HANA",             name: "Pau Hana on the Terraces",  subtitle: "JCC Terraces overlooking Mōʻiliʻili — open to all. Unwind, connect, and celebrate the day with community.",                         location: "JCC Terrace" },
          { id: 22, start: "5:30 PM", end: "9:00 PM",  duration: "3 hrs 30 min", type: "FILM FESTIVAL · FREE", name: "Eahou Short Film Festival", subtitle: "Inaugural showcase of films rooted in ea — RSVP required, space limited. An evening of Indigenous storytelling through the lens.",  location: "Shinnyo-En Hawaiʻi", rsvp: true },
        ]
      },
    ]
  },
  {
    day: "Day 2", date: "May 2", theme: "Kānāwai", color: "#f6bb35",
    blocks: [
      {
        timeLabel: "8:40 – 10:50 AM", blockType: "MORNING",
        events: [
          { id: 103, start: "8:40 AM", end: "10:50 AM", duration: "2 hrs 10 min", type: "TALK STORY",    name: "Hoʻihoʻi EA: EA in Our Lifetime",           subtitle: "Brandon Makaʻawaʻawa & ʻIlima Long on the Independence Movement — a candid conversation on sovereignty, activism, and the living practice of ea.", location: "JCC Main Hall" },
          { id: 105, start: "9:10 AM", end: "10:50 AM", duration: "100 min",      type: "EAHOU SESSION", name: "Governance, Sovereignty & Community Power", subtitle: "Chicago to Pueblo Territory, Waiʻanae to Panama — models of community governance and self-determination from across the Pacific and Americas.", location: "JCC Room B", preRegister: true },
        ]
      },
      {
        timeLabel: "11:05 AM – 12:05 PM", blockType: "WORKSHOPS (BLOCK #1)", note: "Choose one workshop — limited capacity, pre-register",
        events: [
          { id: 106, start: "11:05 AM", end: "12:05 PM", duration: "1 hr", type: "EAHOU LAB", name: "Digital Creators",           subtitle: "Visual storytelling for community moʻolelo — Canva workshop. Learn to craft compelling narratives using digital tools grounded in Hawaiian aesthetics.", location: "JCC Room C",     preRegister: true },
          { id: 107, start: "11:05 AM", end: "12:05 PM", duration: "1 hr", type: "EAHOU LAB", name: "Hālau ʻŌhiʻa",              subtitle: "Hula and chant as living practice and ʻāina knowledge — embodied learning connecting movement, memory, and relationship to land.",                   location: "JCC Studio",     preRegister: true },
          { id: 108, start: "11:05 AM", end: "12:05 PM", duration: "1 hr", type: "EAHOU LAB", name: "KILO: Environmental Sensors", subtitle: "Build sensors to monitor ahupuaʻa health in real time — hands-on tech workshop creating low-cost tools for Indigenous environmental stewardship.",  location: "JCC Makerspace", preRegister: true },
          { id: 109, start: "11:05 AM", end: "12:05 PM", duration: "1 hr", type: "EAHOU LAB", name: "Makaliʻi Metrics Soil Lab",  subtitle: "Hands in the dirt — ʻŌiwi soil science and ʻāina restoration. Learn traditional and scientific methods for assessing and restoring land health.",  location: "Outdoor Area",   preRegister: true },
        ]
      },
      {
        timeLabel: "2:15 – 3:15 PM", blockType: "WORKSHOPS (BLOCK #2)", note: "Choose one workshop — limited capacity, pre-register",
        events: [
          { id: 206, start: "2:15 PM", end: "3:15 PM", duration: "1 hr", type: "EAHOU LAB", name: "Digital Creators",           subtitle: "Visual storytelling for community moʻolelo — Canva workshop. Learn to craft compelling narratives using digital tools grounded in Hawaiian aesthetics.", location: "JCC Room C",     preRegister: true },
          { id: 207, start: "2:15 PM", end: "3:15 PM", duration: "1 hr", type: "EAHOU LAB", name: "Hālau ʻŌhiʻa",              subtitle: "Hula and chant as living practice and ʻāina knowledge — embodied learning connecting movement, memory, and relationship to land.",                   location: "JCC Studio",     preRegister: true },
          { id: 208, start: "2:15 PM", end: "3:15 PM", duration: "1 hr", type: "EAHOU LAB", name: "KILO: Environmental Sensors", subtitle: "Build sensors to monitor ahupuaʻa health in real time — hands-on tech workshop creating low-cost tools for Indigenous environmental stewardship.",  location: "JCC Makerspace", preRegister: true },
          { id: 209, start: "2:15 PM", end: "3:15 PM", duration: "1 hr", type: "EAHOU LAB", name: "Makaliʻi Metrics Soil Lab",  subtitle: "Hands in the dirt — ʻŌiwi soil science and ʻāina restoration. Learn traditional and scientific methods for assessing and restoring land health.",  location: "Outdoor Area",   preRegister: true },
        ]
      },
      {
        timeLabel: "3:30 – 4:30 PM", blockType: "WORKSHOPS (BLOCK #3)", note: "Choose one workshop — limited capacity, pre-register",
        events: [
          { id: 306, start: "3:30 PM", end: "4:30 PM", duration: "1 hr", type: "EAHOU LAB", name: "Digital Creators",           subtitle: "Visual storytelling for community moʻolelo — Canva workshop. Learn to craft compelling narratives using digital tools grounded in Hawaiian aesthetics.", location: "JCC Room C",     preRegister: true },
          { id: 307, start: "3:30 PM", end: "4:30 PM", duration: "1 hr", type: "EAHOU LAB", name: "Hālau ʻŌhiʻa",              subtitle: "Hula and chant as living practice and ʻāina knowledge — embodied learning connecting movement, memory, and relationship to land.",                   location: "JCC Studio",     preRegister: true },
          { id: 308, start: "3:30 PM", end: "4:30 PM", duration: "1 hr", type: "EAHOU LAB", name: "KILO: Environmental Sensors", subtitle: "Build sensors to monitor ahupuaʻa health in real time — hands-on tech workshop creating low-cost tools for Indigenous environmental stewardship.",  location: "JCC Makerspace", preRegister: true },
          { id: 309, start: "3:30 PM", end: "4:30 PM", duration: "1 hr", type: "EAHOU LAB", name: "Makaliʻi Metrics Soil Lab",  subtitle: "Hands in the dirt — ʻŌiwi soil science and ʻāina restoration. Learn traditional and scientific methods for assessing and restoring land health.",  location: "Outdoor Area",   preRegister: true },
        ]
      },
      {
        timeLabel: "5:00 – 9:00 PM", blockType: "NITE MĀKEKE",
        events: [
          { id: 116, start: "5:00 PM", end: "9:00 PM", duration: "4 hrs", type: "EVENING EVENT · FREE", name: "Nite Mākeke & Fashion Show", subtitle: "Local vendors · food trucks · live music · pua fashion show", location: "Church of the Crossroads" },
        ]
      },
    ]
  },
  {
    day: "Day 3", date: "May 3", theme: "Haku Waiwai", color: "#5b0a38",
    blocks: [
      {
        timeLabel: "8:40 – 9:10 AM", blockType: "MORNING",
        events: [
          { id: 202, start: "8:40 AM", end: "9:10 AM", duration: "30 min", type: "OPENING PANEL", name: "Opening Panel: Maui Resources", subtitle: "Day 3 morning programming will be announced soon.", location: "JCC Main Hall" },
        ]
      },
      {
        timeLabel: "9:30 AM – 12:00 PM", blockType: "WORKSHOP",
        events: [
          { id: 206, start: "9:30 AM", end: "12:00 PM", duration: "2.5 hrs", type: "WORKING ASSEMBLY", name: "Eahou Haku Waiwai Design Challenge", subtitle: "A collaborative design challenge weaving together the strands of the weekend — participants build regenerative models grounded in ea, ʻāina, and collective abundance.", location: "JCC Main Hall" },
          { id: 207, start: "9:30 AM", end: "12:00 PM", duration: "2.5 hrs", type: "WORKING ASSEMBLY", name: "Haku Waiwai Sharebacks",            subtitle: "Groups share out their Haku Waiwai designs — a celebration of collective vision and the abundance woven together across three days of gathering.",               location: "JCC Main Hall" },
        ]
      },
      {
        timeLabel: "1:45 – 2:30 PM", blockType: "CLOSING",
        events: [
          { id: 210, start: "1:45 PM", end: "2:30 PM", duration: "45 min", type: "CLOSING CEREMONY", name: "Closing Kīpaepae", subtitle: "Collective lei-weaving as shared commitment to carry ea forward — a ceremonial close honoring the work, the people, and the promise of a self-determined Hawaiʻi.", location: "JCC Main Hall" },
        ]
      },
    ]
  }
];

const VIEWS = ["myplan", "schedule", "feedback"];
const NAV_LABELS = ["My Plan", "Schedule", "Feedback"];

const IconProfile = ({ color, size = 20 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill={color}><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7H4z"/></svg>);
const IconCalendar = ({ color, size = 20 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="17" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/><rect x="7" y="13" width="3" height="3" rx="0.5" fill={color}/><rect x="13" y="13" width="3" height="3" rx="0.5" fill={color}/></svg>);
const IconChat = ({ color, size = 20 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M2 4a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H7l-5 4V4z"/></svg>);
const IconPin = ({ color, size = 13 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z"/></svg>);
const IconBell = ({ color, size = 18 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 22a2 2 0 002-2H10a2 2 0 002 2zm6-6V11a6 6 0 00-5-5.91V4a1 1 0 00-2 0v1.09A6 6 0 006 11v5l-2 2v1h16v-1l-2-2z"/></svg>);
const IconStar = ({ color, size = 20 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2l2.9 6.1L22 9.2l-5 4.9 1.2 6.9L12 17.7l-6.2 3.3L7 14.1 2 9.2l7.1-1.1z"/></svg>);
const IconFlower = ({ color, size = 28 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill={color}><circle cx="12" cy="12" r="2.5"/><ellipse cx="12" cy="6" rx="2" ry="3"/><ellipse cx="12" cy="18" rx="2" ry="3"/><ellipse cx="6" cy="12" rx="3" ry="2"/><ellipse cx="18" cy="12" rx="3" ry="2"/><ellipse cx="7.5" cy="7.5" rx="2" ry="3" transform="rotate(-45 7.5 7.5)"/><ellipse cx="16.5" cy="16.5" rx="2" ry="3" transform="rotate(-45 16.5 16.5)"/><ellipse cx="16.5" cy="7.5" rx="2" ry="3" transform="rotate(45 16.5 7.5)"/><ellipse cx="7.5" cy="16.5" rx="2" ry="3" transform="rotate(45 7.5 16.5)"/></svg>);
const IconX = ({ color, size = 18 }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>);

const NavIcon = ({ v, active }) => {
  const c = active ? C.tan : whiteDD;
  if (v === "myplan") return <IconProfile color={c} />;
  if (v === "schedule") return <IconCalendar color={c} />;
  return <IconChat color={c} />;
};

const inp = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.35)", fontSize: 16, boxSizing: "border-box", background: "rgba(0,0,0,0.28)", color: white, fontFamily: font };
const card = { background: "rgba(0,0,0,0.30)", border: "0.5px solid rgba(255,255,255,0.18)", borderRadius: 12, padding: "14px", marginBottom: 10 };
const btnPrimary = { background: white, color: C.darkBrown, border: "none", borderRadius: 8, padding: "11px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", width: "100%", fontFamily: font };
const DotBg = () => (<div style={{ position: "fixed", inset: 0, opacity: 0.08, backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "18px 18px", pointerEvents: "none", zIndex: 0 }} />);

const themeInfo = [
  { key: "kihoihoi", color: "#b5a332", label: "Kīhoʻihoʻi", sub: "Regeneration through Return", body: "To restore what was taken, return what was displaced. Kīhoʻihoʻi is the active practice of bringing back — knowledge, land, language, relationship — rooted in ceremony and ancestral law." },
  { key: "kanawai",  color: "#f6bb35", label: "Kānāwai",    sub: "The Living Law of Water",    body: "Ancestral ecological law rooted in how kūpuna managed wai together. Kānāwai reminds us that capacity belongs to the community — shared stewardship over shared resources." },
  { key: "haku",     color: "#5b0a38", label: "Haku Waiwai",sub: "Weaving Abundance",           body: "Real wealth is not accumulated — it is woven. Haku Waiwai is the art of building genuine abundance through ʻāina, culture, and collective ownership. The lei as economic model." },
];

function MeaningWidget() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ ...card, padding: "16px" }}>
      <div style={{ textAlign: "center", marginBottom: 16, borderBottom: "0.5px solid rgba(255,255,255,0.15)", paddingBottom: 14 }}>
        <div style={{ fontSize: 11, color: whiteDD, letterSpacing: 3, textTransform: "uppercase", fontFamily: font, marginBottom: 10 }}>EA · HOU · / ˈea ˈhouː /</div>
        <p style={{ fontSize: 13, color: whiteD, fontFamily: font, lineHeight: 1.7, margin: "0 0 10px" }}><em style={{ color: C.tan }}>Ea</em> is not a moment — it is a living current. Sovereignty. Life. Breath. The Hawaiian word holds all three meanings at once, inseparable from each other, as they are inseparable in life itself.</p>
        <p style={{ fontSize: 13, color: whiteD, fontFamily: font, lineHeight: 1.7, margin: "0 0 10px" }}><em style={{ color: C.tan }}>Hou</em> means again. New. Renewed. To breathe again.</p>
        <p style={{ fontSize: 13, color: whiteD, fontFamily: font, lineHeight: 1.7, margin: 0 }}>Together, <em style={{ color: C.tan }}>Eahou</em> is the continuous restoration of sovereignty — not a status to be achieved, but a practice to be lived daily in relationship with ʻāina, lāhui, and each other.</p>
      </div>
      <div style={{ fontSize: 11, color: whiteDD, letterSpacing: 2, textTransform: "uppercase", fontFamily: font, marginBottom: 12 }}>The Three Pillars of Eahou Fest</div>
      {themeInfo.map(t => (
        <div key={t.key} style={{ background: "rgba(0,0,0,0.25)", border: `0.5px solid ${t.color}55`, borderRadius: 10, marginBottom: 8, overflow: "hidden" }}>
          <button onClick={() => setOpen(open === t.key ? null : t.key)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "12px 14px", display: "flex", alignItems: "center", gap: 10, textAlign: "left" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: t.color, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: white, fontFamily: font }}>{t.label}</div>
              <div style={{ fontSize: 11, color: t.color === "#5b0a38" ? "#d080b0" : t.color, fontStyle: "italic", fontFamily: font }}>{t.sub}</div>
            </div>
            <div style={{ color: whiteDD, fontSize: 14, transform: open === t.key ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>▾</div>
          </button>
          {open === t.key && <div style={{ padding: "0 14px 14px", fontSize: 13, color: whiteD, fontFamily: font, lineHeight: 1.7 }}>{t.body}</div>}
        </div>
      ))}
      <div style={{ background: "rgba(0,0,0,0.2)", border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "14px", marginTop: 4, textAlign: "center" }}>
        <div style={{ fontSize: 14, fontStyle: "italic", color: white, fontFamily: font, marginBottom: 6 }}>Mōhala i ka wai ka maka o ka pua</div>
        <div style={{ fontSize: 12, color: whiteD, fontFamily: font, marginBottom: 6 }}>Flowers thrive where there is water</div>
        <div style={{ fontSize: 10, color: whiteDD, letterSpacing: 1, fontFamily: font }}>ʻŌlelo Noʻeau #2178</div>
      </div>
      <div style={{ marginTop: 14, borderTop: "0.5px solid rgba(255,255,255,0.12)", paddingTop: 14 }}>
        <div style={{ fontSize: 10, color: whiteDD, letterSpacing: 2, textTransform: "uppercase", fontFamily: font, marginBottom: 8 }}>Purple Maiʻa Foundation</div>
        <p style={{ fontSize: 12, color: whiteD, fontFamily: font, lineHeight: 1.7, margin: "0 0 8px" }}>Purple Maiʻa Foundation works at the intersection of culture, education, and technology in Hawaiʻi — building Indigenous tech tools, cooperative economic infrastructure, and the next generation of culturally grounded ʻŌiwi innovators.</p>
        <p style={{ fontSize: 12, color: whiteD, fontFamily: font, lineHeight: 1.7, margin: 0 }}>Eahou Fest is a gathering of the lāhui and all who share the vision of a self-determined, regenerative Hawaiʻi.</p>
      </div>
    </div>
  );
}

function SessionCard({ ev, dayColor, inPlan, registered, onToggle, onRegister, onMore }) {
  const dimColor = dayColor === "#5b0a38" ? "#d080b0" : dayColor === "#f6bb35" ? "#c89a00" : dayColor;
  const isAction = ev.preRegister || ev.rsvp;
  const actionLabel = ev.rsvp ? "RSVP" : "PRE-REGISTER";
  const actionDone = registered;
  return (
    <div style={{ background: "rgba(0,0,0,0.32)", border: `0.5px solid ${dayColor}55`, borderRadius: 14, padding: "14px 16px", marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
        {ev.type && <div style={{ fontSize: 10, color: dimColor, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: font, paddingTop: 2 }}>{ev.type}</div>}
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginLeft: "auto" }}>
          {isAction ? (
            <button onClick={() => onRegister(ev.id)} style={{ background: actionDone ? dayColor : "transparent", border: `1px solid ${dayColor}`, borderRadius: 20, padding: "5px 14px", fontSize: 11, color: actionDone ? white : dimColor, fontWeight: 600, cursor: "pointer", fontFamily: font, letterSpacing: 0.5, transition: "all 0.15s" }}>
              {actionDone ? "✓ " + actionLabel : actionLabel}
            </button>
          ) : (
            <button onClick={() => onToggle(ev)} style={{ background: inPlan ? dayColor : "rgba(255,255,255,0.14)", border: `0.5px solid ${inPlan ? dayColor : "rgba(255,255,255,0.25)"}`, borderRadius: 20, padding: "5px 14px", fontSize: 11, color: inPlan ? white : whiteD, fontWeight: inPlan ? 600 : 400, cursor: "pointer", fontFamily: font }}>
              {inPlan ? "✓ Added" : "+ Add"}
            </button>
          )}
        </div>
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color: white, fontFamily: font, lineHeight: 1.3, marginBottom: ev.subtitle ? 4 : 8 }}>{ev.name}</div>
      {ev.subtitle && <div style={{ fontSize: 13, color: whiteD, fontFamily: font, lineHeight: 1.5, marginBottom: 8 }}>{ev.subtitle}</div>}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {ev.location ? (
          <div style={{ fontSize: 12, color: whiteDD, display: "flex", alignItems: "center", gap: 4, fontFamily: "monospace" }}>
            <IconPin color={whiteDD} size={12} />{ev.location}
          </div>
        ) : <div />}
        <button onClick={() => onMore(ev)} style={{ background: "none", border: "none", cursor: "pointer", color: whiteDD, fontSize: 12, fontFamily: font, padding: 0, marginLeft: 8 }}>More →</button>
      </div>
    </div>
  );
}

function BlockHeader({ block }) {
  return (
    <div style={{ marginBottom: 12, marginTop: 6 }}>
      <div style={{ fontSize: 11, color: whiteDD, letterSpacing: 2, textTransform: "uppercase", fontFamily: "monospace", marginBottom: block.note ? 4 : 0 }}>
        {block.timeLabel} · {block.blockType}
      </div>
      {block.note && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: whiteDD, fontFamily: "monospace" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: whiteDD, flexShrink: 0 }} />
          {block.note}
        </div>
      )}
    </div>
  );
}

function SessionModal({ ev, dayColor, inPlan, registered, onToggle, onRegister, onClose }) {
  if (!ev) return null;
  const dimColor = dayColor === "#5b0a38" ? "#d080b0" : dayColor === "#f6bb35" ? "#c89a00" : dayColor;
  const isAction = ev.preRegister || ev.rsvp;
  const actionLabel = ev.rsvp ? "RSVP" : "PRE-REGISTER";
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", flexDirection: "column", justifyContent: "flex-end", maxWidth: 480, margin: "0 auto" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }} />
      <div style={{ position: "relative", ...BG, borderRadius: "20px 20px 0 0", padding: "20px 20px 36px", border: "0.5px solid rgba(255,255,255,0.2)", borderBottom: "none" }}>
        <DotBg />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ width: 40, height: 4, background: "rgba(255,255,255,0.3)", borderRadius: 2 }} />
            <button onClick={onClose} style={{ background: "rgba(0,0,0,0.3)", border: "0.5px solid rgba(255,255,255,0.2)", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <IconX color={white} size={16} />
            </button>
          </div>
          <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
            {ev.type && <span style={{ background: dayColor, borderRadius: 20, padding: "4px 12px", fontSize: 10, color: white, fontFamily: font, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>{ev.type}</span>}
            <span style={{ background: "rgba(255,255,255,0.22)", borderRadius: 20, padding: "4px 12px", fontSize: 10, color: white, fontFamily: font, fontWeight: 500 }}>{ev.start}{ev.end ? ` – ${ev.end}` : ""}</span>
            <span style={{ background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "4px 12px", fontSize: 10, color: whiteD, fontFamily: font }}>{ev.duration}</span>
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: white, fontFamily: font, marginBottom: 6 }}>{ev.name}</div>
          {ev.subtitle && <div style={{ fontSize: 14, color: whiteD, fontFamily: font, lineHeight: 1.6, marginBottom: 12 }}>{ev.subtitle}</div>}
          {ev.location && <div style={{ fontSize: 13, color: whiteDD, display: "flex", alignItems: "center", gap: 5, marginBottom: 16, fontFamily: "monospace" }}><IconPin color={whiteDD} size={13} />{ev.location}</div>}
          <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: 10, padding: "12px 14px", marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: whiteDD, letterSpacing: 1, textTransform: "uppercase", fontFamily: font, marginBottom: 6 }}>About this session</div>
            <div style={{ fontSize: 13, color: whiteD, fontFamily: font, lineHeight: 1.7 }}>Details for this session will be available closer to the festival. Check back soon!</div>
          </div>
          {isAction ? (
            <button onClick={() => { onRegister(ev.id); onClose(); }} style={{ ...btnPrimary, background: registered ? dayColor : white, color: registered ? white : C.darkBrown }}>
              {registered ? "✓ " + actionLabel : actionLabel}
            </button>
          ) : (
            <button onClick={() => { onToggle(ev); onClose(); }} style={{ ...btnPrimary }}>
              {inPlan ? "Remove from My Plan" : "Add to My Plan"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [view, setView] = useState("myplan");
  const [profile, setProfile] = useState({ name: "", age: "", gender: "", reason: "" });
  const [activeDay, setActiveDay] = useState(0);
  const [myPlan, setMyPlan] = useState([]);
  const [registered, setRegistered] = useState({});
  const [feedback, setFeedback] = useState({ overall: 0, highlight: "", improve: "", ea: "", recommend: "" });
  const [feedbackSaved, setFeedbackSaved] = useState(false);
  const [notification, setNotification] = useState(null);
  const [modalSession, setModalSession] = useState(null);

  const canSubmit = profile.name && profile.age && profile.gender && profile.reason;
  const toggleWorkshop = (ev) => {
    if (myPlan.find(x => x.id === ev.id)) setMyPlan(myPlan.filter(x => x.id !== ev.id));
    else { setMyPlan([...myPlan, ev]); setNotification("Reminder set!"); setTimeout(() => setNotification(null), 2500); }
  };
  const toggleRegistered = (id) => {
    setRegistered(r => ({ ...r, [id]: !r[id] }));
    setNotification("Registered!"); setTimeout(() => setNotification(null), 2500);
  };
  const inPlan = (id) => myPlan.some(x => x.id === id);
  const allPlanItems = festivalDays.flatMap(d => d.blocks.flatMap(b => b.events.filter(e => inPlan(e.id) || !!registered[e.id]).map(e => ({ ...e, dayLabel: d.day, dayColor: d.color, dayTheme: d.theme, dayDate: d.date }))));
  const day = festivalDays[activeDay];
  const modalDay = modalSession ? festivalDays.find(fd => fd.blocks.some(b => b.events.some(e => e.id === modalSession.id))) : null;

  if (screen === "splash") {
    return (
      <div style={{ fontFamily: font, maxWidth: 480, margin: "0 auto", minHeight: "100dvh", position: "relative", ...BG }}>
        <DotBg />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ padding: "max(env(safe-area-inset-top, 0px), 44px) 24px 28px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: whiteDD, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16, fontFamily: font }}>Purple Maiʻa · 2026</div>
            <div style={{ fontFamily: "'Knewave', sans-serif", fontSize: 52, color: "#FDF6EC", lineHeight: 1, marginBottom: 16, letterSpacing: 1 }}>EĀHOU FEST</div>
            <div style={{ fontSize: 14, color: whiteD, fontFamily: font, marginBottom: 4 }}>May 1–3, 2026</div>
            <div style={{ fontSize: 13, color: whiteDD, fontFamily: font }}>Mōʻiliʻili, Oʻahu</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 18 }}>
              {festivalDays.map(d => <div key={d.day} style={{ background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "4px 12px", fontSize: 11, color: white, fontFamily: font, fontStyle: "italic", border: "0.5px solid rgba(255,255,255,0.2)" }}>{d.theme}</div>)}
            </div>
          </div>
          <div style={{ padding: "0 20px 40px" }}>
            <p style={{ fontSize: 16, fontWeight: 600, color: white, marginBottom: 2, fontFamily: font }}>Welina mai — Let's create your Eahou profile</p>
            <p style={{ fontSize: 13, color: whiteD, marginBottom: 20, fontFamily: font }}>Fill in your details to access the festival app.</p>
            <div style={card}>
              {[{ label: "Full name", key: "name", type: "text", ph: "e.g. Hunter Naho'oikaika" }, { label: "Age", key: "age", type: "number", ph: "e.g. 24" }].map(f => (
                <div key={f.key} style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 12, color: whiteD, marginBottom: 6, display: "block", fontFamily: font }}>{f.label}</label>
                  <input style={inp} type={f.type} placeholder={f.ph} value={profile[f.key]} onChange={e => setProfile({ ...profile, [f.key]: e.target.value })} />
                </div>
              ))}
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, color: whiteD, marginBottom: 6, display: "block", fontFamily: font }}>Gender</label>
                <select style={inp} value={profile.gender} onChange={e => setProfile({ ...profile, gender: e.target.value })}>
                  <option value="">Select...</option><option>Male</option><option>Female</option><option>Non-binary</option><option>Prefer not to say</option>
                </select>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 12, color: whiteD, marginBottom: 6, display: "block", fontFamily: font }}>Why are you attending Eahou Fest?</label>
                <textarea style={{ ...inp, minHeight: 90, resize: "vertical" }} placeholder="Tell us what brings you here..." value={profile.reason} onChange={e => setProfile({ ...profile, reason: e.target.value })} />
              </div>
              <button style={{ ...btnPrimary, opacity: canSubmit ? 1 : 0.5 }} onClick={() => { if (canSubmit) setScreen("app"); }}>Enter Eahou Fest →</button>
              {!canSubmit && <p style={{ fontSize: 11, color: whiteDD, textAlign: "center", marginTop: 8, fontFamily: font }}>Please fill in all fields to continue</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: font, maxWidth: 480, margin: "0 auto", paddingBottom: "calc(80px + env(safe-area-inset-bottom, 0px))", minHeight: "100dvh", position: "relative", ...BG }}>
      <DotBg />
      <div style={{ position: "relative", zIndex: 1 }}>
        {notification && (
          <div style={{ position: "fixed", top: "max(env(safe-area-inset-top, 0px), 16px)", left: "50%", transform: "translateX(-50%)", background: "rgba(255,255,255,0.95)", color: C.darkBrown, borderRadius: 20, padding: "10px 20px", fontSize: 13, fontWeight: 500, zIndex: 100, whiteSpace: "nowrap", fontFamily: font, display: "flex", alignItems: "center", gap: 8 }}>
            <IconBell color={C.orange} size={15} /> {notification}
          </div>
        )}
        <div style={{ padding: "24px 20px 16px" }}>
          <div style={{ fontSize: 11, color: whiteDD, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8, fontFamily: font }}>Purple Maiʻa · 2026</div>
          <div style={{ fontFamily: "'Knewave', sans-serif", fontSize: 42, color: "#FDF6EC", lineHeight: 1, marginBottom: 6, letterSpacing: 1 }}>EĀHOU FEST</div>
          <div style={{ fontSize: 13, color: whiteD, fontFamily: font }}>May 1–3, 2026 · Mōʻiliʻili, Oʻahu</div>
        </div>
        <div style={{ padding: "0 16px" }}>

          {view === "myplan" && (
            <div>
              <p style={{ fontSize: 18, fontWeight: 700, color: white, marginBottom: 16, fontFamily: font }}>Aloha, {profile.name}</p>
              <div style={{ background: "rgba(0,0,0,0.35)", border: "0.5px solid rgba(255,255,255,0.2)", borderRadius: 16, padding: "20px", marginBottom: 14, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "12px 12px", pointerEvents: "none" }} />
                <div style={{ position: "relative" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <div>
                      <div style={{ fontSize: 10, color: whiteDD, letterSpacing: 2, textTransform: "uppercase", fontFamily: font, marginBottom: 4 }}>Attendee</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: white, fontFamily: font }}>{profile.name}</div>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 10, padding: "8px 10px" }}><IconFlower color="rgba(255,255,255,0.8)" size={28} /></div>
                  </div>
                  <div style={{ display: "flex", gap: 20, marginBottom: 14 }}>
                    {[["Age", profile.age], ["Gender", profile.gender], ["Sessions", `${allPlanItems.length} added`]].map(([l, v]) => (
                      <div key={l}><div style={{ fontSize: 10, color: whiteDD, fontFamily: font }}>{l}</div><div style={{ fontSize: 13, color: white, fontWeight: 500, fontFamily: font }}>{v}</div></div>
                    ))}
                  </div>
                  <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.15)", paddingTop: 12, marginBottom: 14 }}>
                    <div style={{ fontSize: 10, color: whiteDD, fontFamily: font, marginBottom: 4 }}>Attending because</div>
                    <div style={{ fontSize: 12, color: whiteD, fontFamily: font, fontStyle: "italic" }}>"{profile.reason}"</div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {festivalDays.map(d => <div key={d.day} style={{ background: d.color, borderRadius: 20, padding: "3px 10px", fontSize: 10, color: white, fontFamily: font, fontWeight: 600 }}>{d.theme}</div>)}
                  </div>
                </div>
              </div>
              <MeaningWidget />
            </div>
          )}

          {view === "schedule" && (
            <div>
              <p style={{ fontSize: 15, fontWeight: 600, color: white, marginBottom: 14, fontFamily: font }}>Festival schedule</p>
              {allPlanItems.length > 0 && (
                <div style={{ ...card, marginBottom: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: white, fontFamily: font, marginBottom: 12 }}>Your plan · {allPlanItems.length} session{allPlanItems.length !== 1 ? "s" : ""}</div>
                  {festivalDays.map(d => {
                    const items = allPlanItems.filter(x => x.dayLabel === d.day);
                    if (!items.length) return null;
                    const dimC = d.color === "#5b0a38" ? "#d080b0" : d.color === "#f6bb35" ? "#c89a00" : d.color;
                    return (
                      <div key={d.day} style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: dimC, marginBottom: 8, fontFamily: font, display: "flex", alignItems: "center", gap: 5 }}>
                          <div style={{ width: 7, height: 7, borderRadius: "50%", background: d.color }} />{d.day} · {d.date} — {d.theme}
                        </div>
                        {items.map(ev => (
                          <div key={ev.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: `${d.color}22`, border: `0.5px solid ${d.color}55`, borderRadius: 10, marginBottom: 6 }}>
                            <div style={{ textAlign: "center", minWidth: 48, flexShrink: 0 }}>
                              <div style={{ fontSize: 10, color: white, fontWeight: 600, fontFamily: font }}>{ev.start.split(" ")[1]}</div>
                              <div style={{ fontSize: 12, fontWeight: 600, color: white, fontFamily: font }}>{ev.start.split(" ")[0]}</div>
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 12, fontWeight: 500, color: white, fontFamily: font }}>{ev.name}</div>
                              {ev.location && <div style={{ fontSize: 11, color: whiteDD, fontFamily: font }}>{ev.location}</div>}
                            </div>
                            <IconBell color={d.color} size={16} />
                          </div>
                        ))}
                      </div>
                    );
                  })}
                  <div style={{ fontSize: 11, color: whiteDD, display: "flex", alignItems: "center", gap: 6, fontFamily: font, borderTop: "0.5px solid rgba(255,255,255,0.1)", paddingTop: 10 }}>
                    <IconBell color={C.tan} size={14} /> Reminders set 15 min before each session
                  </div>
                </div>
              )}
              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                {festivalDays.map((d, i) => (
                  <button key={i} onClick={() => setActiveDay(i)} style={{ flex: 1, padding: "8px 6px", borderRadius: 8, cursor: "pointer", fontFamily: font, background: activeDay === i ? d.color : "rgba(0,0,0,0.28)", color: activeDay === i ? white : whiteD, border: `0.5px solid ${activeDay === i ? d.color : "rgba(255,255,255,0.18)"}`, fontWeight: activeDay === i ? 600 : 400, textAlign: "center" }}>
                    <div style={{ fontSize: 12 }}>{d.day}</div>
                    <div style={{ fontSize: 10, opacity: 0.85 }}>{d.date}</div>
                    <div style={{ fontSize: 10, marginTop: 2, fontStyle: "italic", opacity: 0.8 }}>{d.theme}</div>
                  </button>
                ))}
              </div>
              <div style={{ borderRadius: 10, padding: "10px 14px", marginBottom: 16, background: "rgba(0,0,0,0.25)", border: `0.5px solid ${day.color}88`, display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: day.color, flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: day.color === "#5b0a38" ? "#d080b0" : day.color, fontFamily: font }}>{day.theme}</span>
                <span style={{ fontSize: 12, color: whiteD, fontFamily: font }}>· {day.day}, {day.date}</span>
              </div>
              {day.blocks.map((block, bi) => (
                <div key={bi}>
                  <BlockHeader block={block} />
                  {block.events.map(ev => (
                    <SessionCard key={ev.id} ev={ev} dayColor={day.color} inPlan={inPlan(ev.id)} registered={!!registered[ev.id]} onToggle={toggleWorkshop} onRegister={toggleRegistered} onMore={setModalSession} />
                  ))}
                  {block.footer && (
                    <div style={{ fontSize: 11, color: whiteDD, fontFamily: "monospace", letterSpacing: 0.3, padding: "4px 4px 12px", fontStyle: "italic" }}>{block.footer}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {view === "feedback" && (
            <div>
              <p style={{ fontSize: 15, fontWeight: 600, color: white, marginBottom: 14, fontFamily: font }}>Share your feedback</p>
              {feedbackSaved ? (
                <div style={{ ...card, padding: "28px 16px", textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}><IconFlower color={C.tan} size={36} /></div>
                  <div style={{ fontWeight: 600, fontSize: 16, color: white, marginBottom: 6, fontFamily: font }}>Mahalo for your feedback!</div>
                  <div style={{ fontSize: 13, color: whiteD, fontFamily: font }}>Your response helps us make Eahou Fest even better next year.</div>
                </div>
              ) : (
                <div>
                  <div style={card}>
                    <label style={{ fontSize: 12, color: whiteD, marginBottom: 12, display: "block", fontFamily: font }}>How would you describe your overall experience at Eahou Fest?</label>
                    <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                      {[1,2,3,4,5].map(n => (
                        <button key={n} onClick={() => setFeedback({ ...feedback, overall: n })} style={{ flex: 1, padding: "10px 0", borderRadius: 8, cursor: "pointer", border: `0.5px solid ${feedback.overall >= n ? C.gold : "rgba(255,255,255,0.2)"}`, background: feedback.overall >= n ? "rgba(232,160,32,0.25)" : "rgba(0,0,0,0.2)", display: "flex", justifyContent: "center" }}>
                          <IconStar color={feedback.overall >= n ? C.gold : whiteDD} size={20} />
                        </button>
                      ))}
                    </div>
                    <div style={{ fontSize: 11, color: whiteDD, textAlign: "center", fontFamily: font }}>{["","Poor","Fair","Good","Great","Excellent"][feedback.overall] || "Tap to rate"}</div>
                  </div>
                  {[
                    { key: "highlight", label: "What was the most meaningful or impactful part of your experience?", ph: "e.g. The closing ceremony was unforgettable..." },
                    { key: "ea", label: "How will ea manifest in your life after this weekend?", ph: "Share how you'll carry this experience forward..." },
                    { key: "improve", label: "What could we improve?", ph: "Any suggestions are welcome..." },
                  ].map(f => (
                    <div key={f.key} style={card}>
                      <label style={{ fontSize: 12, color: whiteD, marginBottom: 6, display: "block", fontFamily: font }}>{f.label}</label>
                      <textarea style={{ ...inp, minHeight: 80, resize: "vertical" }} placeholder={f.ph} value={feedback[f.key] || ""} onChange={e => setFeedback({ ...feedback, [f.key]: e.target.value })} />
                    </div>
                  ))}
                  <div style={card}>
                    <label style={{ fontSize: 12, color: whiteD, marginBottom: 10, display: "block", fontFamily: font }}>Would you recommend Eahou Fest to others?</label>
                    <div style={{ display: "flex", gap: 8 }}>
                      {["Definitely", "Maybe", "No"].map(opt => (
                        <button key={opt} onClick={() => setFeedback({ ...feedback, recommend: opt })} style={{ flex: 1, padding: "9px 0", borderRadius: 8, cursor: "pointer", fontSize: 12, fontFamily: font, background: feedback.recommend === opt ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)", color: feedback.recommend === opt ? white : whiteD, border: `0.5px solid ${feedback.recommend === opt ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)"}`, fontWeight: feedback.recommend === opt ? 600 : 400 }}>{opt}</button>
                      ))}
                    </div>
                  </div>
                  <button style={btnPrimary} onClick={() => { if (feedback.overall > 0) setFeedbackSaved(true); }}>Submit feedback</button>
                </div>
              )}
            </div>
          )}
        </div>
        <nav style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "rgba(61,26,8,0.97)", borderTop: "0.5px solid rgba(255,255,255,0.12)", display: "flex", zIndex: 10, paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
          {VIEWS.map((v, i) => (
            <button key={v} onClick={() => setView(v)} style={{ flex: 1, padding: "12px 0 10px", border: "none", background: "none", cursor: "pointer", fontSize: 11, color: view === v ? C.tan : whiteDD, fontWeight: view === v ? 600 : 400, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, fontFamily: font, WebkitTapHighlightColor: "transparent" }}>
              <NavIcon v={v} active={view === v} />
              {NAV_LABELS[i]}
            </button>
          ))}
        </nav>
      </div>
      {modalSession && <SessionModal ev={modalSession} dayColor={modalDay?.color || C.orange} inPlan={inPlan(modalSession.id)} registered={!!registered[modalSession.id]} onToggle={toggleWorkshop} onRegister={toggleRegistered} onClose={() => setModalSession(null)} />}
    </div>
  );
}