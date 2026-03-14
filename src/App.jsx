import { useState, useEffect, useRef } from "react";

// ─── COLORS ────────────────────────────────────────────────────────────────
const C = {
  blue: "#4FC3F7",
  blueDark: "#0288D1",
  blueLight: "#B3E5FC",
  red: "#EF5350",
  redDark: "#C62828",
  redLight: "#FFCDD2",
  bg: "#FFF8F8",
  white: "#FFFFFF",
  text: "#2D2D2D",
  muted: "#9E9E9E",
  correct: "#66BB6A",
  wrong: "#EF5350",
};

// ─── KEYFRAMES ─────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${C.bg}; }

  @keyframes floatUp {
    0%,100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  @keyframes slideUp {
    from { opacity:0; transform:translateY(24px) scale(0.97); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }
  @keyframes popIn {
    0%   { transform: scale(0.5); opacity:0; }
    70%  { transform: scale(1.1); }
    100% { transform: scale(1); opacity:1; }
  }
  @keyframes wiggle {
    0%,100% { transform: rotate(0deg); }
    25%  { transform: rotate(-6deg); }
    75%  { transform: rotate(6deg); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes heartbeat {
    0%,100% { transform: scale(1); }
    14%  { transform: scale(1.12); }
    28%  { transform: scale(1); }
    42%  { transform: scale(1.08); }
    70%  { transform: scale(1); }
  }
  @keyframes confettiFall {
    0%   { transform: translateY(-10px) rotate(0deg); opacity:1; }
    100% { transform: translateY(110vh) rotate(720deg); opacity:0; }
  }
  @keyframes dotBounce {
    0%,80%,100% { transform: scale(0); }
    40% { transform: scale(1); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes pulse {
    0%,100% { opacity:1; }
    50% { opacity:0.5; }
  }

  .slideUp { animation: slideUp 0.45s cubic-bezier(.22,.68,0,1.2) forwards; }
  .floatUp { animation: floatUp 3s ease-in-out infinite; }
  .wiggle  { animation: wiggle 0.5s ease-in-out; }
  .heartbeat { animation: heartbeat 1.5s ease-in-out infinite; }

  .btn-blue {
    background: ${C.blue};
    color: white;
    border: 3px solid ${C.blueDark};
    border-radius: 16px;
    padding: 14px 28px;
    font-family: 'Fredoka One', cursive;
    font-size: 18px;
    cursor: pointer;
    transition: transform 0.15s, box-shadow 0.15s;
    box-shadow: 0 4px 0 ${C.blueDark};
    letter-spacing: 0.5px;
  }
  .btn-blue:hover { transform: translateY(-2px); box-shadow: 0 6px 0 ${C.blueDark}; }
  .btn-blue:active { transform: translateY(2px); box-shadow: 0 2px 0 ${C.blueDark}; }

  .btn-red {
    background: ${C.red};
    color: white;
    border: 3px solid ${C.redDark};
    border-radius: 16px;
    padding: 14px 28px;
    font-family: 'Fredoka One', cursive;
    font-size: 18px;
    cursor: pointer;
    transition: transform 0.15s, box-shadow 0.15s;
    box-shadow: 0 4px 0 ${C.redDark};
    letter-spacing: 0.5px;
  }
  .btn-red:hover { transform: translateY(-2px); box-shadow: 0 6px 0 ${C.redDark}; }
  .btn-red:active { transform: translateY(2px); box-shadow: 0 2px 0 ${C.redDark}; }

  .btn-white {
    background: white;
    color: ${C.text};
    border: 3px solid #ddd;
    border-radius: 16px;
    padding: 12px 24px;
    font-family: 'Fredoka One', cursive;
    font-size: 16px;
    cursor: pointer;
    transition: transform 0.15s, box-shadow 0.15s;
    box-shadow: 0 4px 0 #ddd;
  }
  .btn-white:hover { transform: translateY(-2px); box-shadow: 0 6px 0 #ddd; }

  input, textarea {
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    font-weight: 600;
    width: 100%;
    padding: 13px 18px;
    border-radius: 14px;
    border: 3px solid #E0E0E0;
    outline: none;
    transition: border-color 0.2s;
    background: white;
    color: ${C.text};
    resize: none;
  }
  input:focus, textarea:focus { border-color: ${C.blue}; }

  .card {
    background: white;
    border-radius: 28px;
    padding: 36px 32px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04);
    width: 100%;
    max-width: 440px;
  }

  .tag {
    display: inline-block;
    border-radius: 20px;
    padding: 5px 14px;
    font-family: 'Fredoka One', cursive;
    font-size: 13px;
    letter-spacing: 0.5px;
  }
  .tag-blue { background: ${C.blueLight}; color: ${C.blueDark}; }
  .tag-red  { background: ${C.redLight};  color: ${C.redDark};  }
`;

// ─── SVG ILLUSTRATIONS ─────────────────────────────────────────────────────

// Joy-Con heart logo (inline SVG matching the image)
function JoyConHeart({ size = 120 }) {
  return (
    <svg width={size} height={size * 0.88} viewBox="0 0 200 176" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left Joy-Con (blue) */}
      <path d="M18 88 C18 44 40 16 72 16 L88 16 L88 160 L72 160 C40 160 18 132 18 88Z" fill={C.blue} stroke={C.blueDark} strokeWidth="5"/>
      {/* Left face details */}
      <circle cx="53" cy="58" r="10" fill={C.blueDark} opacity="0.7"/>
      <circle cx="53" cy="118" r="7" fill={C.blueDark} opacity="0.5"/>
      <circle cx="68" cy="136" r="7" fill={C.blueDark} opacity="0.5"/>
      <circle cx="38" cy="136" r="7" fill={C.blueDark} opacity="0.5"/>
      <circle cx="38" cy="100" r="7" fill={C.blueDark} opacity="0.5"/>
      {/* minus button */}
      <rect x="62" y="36" width="14" height="4" rx="2" fill="white" opacity="0.8"/>
      {/* SL rail */}
      <rect x="14" y="72" width="6" height="32" rx="3" fill={C.blueDark} opacity="0.5"/>

      {/* Right Joy-Con (red) */}
      <path d="M182 88 C182 44 160 16 128 16 L112 16 L112 160 L128 160 C160 160 182 132 182 88Z" fill={C.red} stroke={C.redDark} strokeWidth="5"/>
      {/* Right face buttons */}
      <circle cx="147" cy="70" r="7" fill="#FFEB3B" stroke={C.redDark} strokeWidth="2"/>
      <circle cx="162" cy="85" r="7" fill={C.correct} stroke={C.redDark} strokeWidth="2"/>
      <circle cx="147" cy="100" r="7" fill={C.blue} stroke={C.redDark} strokeWidth="2"/>
      <circle cx="132" cy="85" r="7" fill="#FF7043" stroke={C.redDark} strokeWidth="2"/>
      {/* plus button */}
      <rect x="124" y="34" width="14" height="4" rx="2" fill="white" opacity="0.8"/>
      <rect x="129" y="29" width="4" height="14" rx="2" fill="white" opacity="0.8"/>
      {/* SR rail */}
      <rect x="180" y="72" width="6" height="32" rx="3" fill={C.redDark} opacity="0.5"/>

      {/* Center connector */}
      <rect x="88" y="60" width="24" height="56" rx="4" fill="#EEE" stroke="#CCC" strokeWidth="2"/>

      {/* Heart outline glow */}
      <path d="M100 170 C70 148 20 118 20 88 C20 44 100 44 100 44 C100 44 180 44 180 88 C180 118 130 148 100 170Z" fill="none" stroke="white" strokeWidth="3" opacity="0.3"/>
    </svg>
  );
}

// Pixel heart
function PixelHeart({ size = 20, color = C.red }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill={color} xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="2" width="3" height="1"/><rect x="6" y="2" width="3" height="1"/>
      <rect x="0" y="3" width="4" height="2"/><rect x="6" y="3" width="4" height="2"/>
      <rect x="0" y="5" width="10" height="2"/><rect x="1" y="7" width="8" height="1"/>
      <rect x="2" y="8" width="6" height="1"/><rect x="3" y="9" width="4" height="1"/>
      <rect x="4" y="10" width="2" height="1"/>
    </svg>
  );
}

// Controller icon
function ControllerIcon({ color = C.blue, size = 28 }) {
  return (
    <svg width={size} height={size * 0.65} viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="44" height="20" rx="10" fill={color} stroke="white" strokeWidth="2"/>
      <rect x="10" y="13" width="8" height="3" rx="1.5" fill="white" opacity="0.7"/>
      <rect x="12.5" y="10.5" width="3" height="8" rx="1.5" fill="white" opacity="0.7"/>
      <circle cx="32" cy="11" r="2.5" fill="#FFEB3B" stroke="white" strokeWidth="1"/>
      <circle cx="38" cy="14" r="2.5" fill={C.correct} stroke="white" strokeWidth="1"/>
      <circle cx="32" cy="17" r="2.5" fill={C.red} stroke="white" strokeWidth="1"/>
      <circle cx="26" cy="14" r="2.5" fill={color === C.blue ? "#90CAF9" : "#FFCDD2"} stroke="white" strokeWidth="1"/>
    </svg>
  );
}

// Star
function Star({ x, y, size, color, delay }) {
  return (
    <div style={{
      position: "absolute", left: x, top: y, fontSize: size,
      animation: `floatUp ${2 + delay}s ease-in-out infinite`, animationDelay: `${delay}s`,
      pointerEvents: "none", userSelect: "none",
    }}>{color === "blue" ? "⭐" : "💗"}</div>
  );
}

// ─── QUESTIONS ──────────────────────────────────────────────────────────────
const QUESTIONS = [
  "What's my absolute favorite food? 🍕",
  "What song have I been obsessed with lately? 🎵",
  "What's my go-to comfort movie or show? 🎬",
  "What's my biggest pet peeve? 😤",
  "Where would I go on my dream vacation? ✈️",
  "What do I do when I'm having a bad day? 💙",
  "What's my weirdest habit? 😄",
  "What's my favorite time of day? ⏰",
  "What would I order at a café? ☕",
  "What's one thing I'm really proud of? 🌟",
];

// ─── STORAGE HELPERS ────────────────────────────────────────────────────────
const STORAGE_KEY = "loveGame_v2";

async function saveGame(gameCode, data) {
  try {
    await window.storage.set(`${STORAGE_KEY}:${gameCode}`, JSON.stringify(data), true);
  } catch (e) { console.error(e); }
}

async function loadGame(gameCode) {
  try {
    const r = await window.storage.get(`${STORAGE_KEY}:${gameCode}`, true);
    return r ? JSON.parse(r.value) : null;
  } catch (e) { return null; }
}

function makeCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

// ─── CONFETTI ───────────────────────────────────────────────────────────────
function Confetti() {
  const pieces = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 1.5}s`,
    dur: `${2 + Math.random() * 2}s`,
    color: [C.blue, C.red, "#FFEB3B", C.correct, "#FF7043", C.blueLight, C.redLight][i % 7],
    size: 8 + Math.random() * 10,
    shape: Math.random() > 0.5 ? "50%" : "2px",
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
      {pieces.map(p => (
        <div key={p.id} style={{
          position: "absolute", left: p.left, top: -20,
          width: p.size, height: p.size,
          backgroundColor: p.color, borderRadius: p.shape,
          animation: `confettiFall ${p.dur} ${p.delay} ease-in forwards`,
        }} />
      ))}
    </div>
  );
}

// ─── LOADING DOTS ───────────────────────────────────────────────────────────
function LoadingDots({ color = C.blue }) {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center", justifyContent: "center", padding: "8px 0" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 10, height: 10, borderRadius: "50%", background: color,
          animation: `dotBounce 1.2s ${i * 0.16}s ease-in-out infinite`,
        }} />
      ))}
    </div>
  );
}

// ─── SCREEN: HOME ───────────────────────────────────────────────────────────
function HomeScreen({ onHost, onJoin }) {
  const [joining, setJoining] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="slideUp" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 20px", minHeight: "100vh", background: C.bg, fontFamily: "'Nunito', sans-serif", position: "relative", overflow: "hidden" }}>
      {/* BG stars */}
      <Star x="5%" y="8%" size={18} color="blue" delay={0} />
      <Star x="88%" y="12%" size={14} color="red" delay={0.5} />
      <Star x="12%" y="72%" size={12} color="red" delay={1} />
      <Star x="82%" y="65%" size={16} color="blue" delay={1.5} />
      <Star x="50%" y="5%" size={10} color="blue" delay={0.8} />

      <div className="heartbeat" style={{ marginBottom: 8 }}>
        <JoyConHeart size={140} />
      </div>

      <h1 style={{ fontFamily: "'Fredoka One', cursive", fontSize: 32, textAlign: "center", lineHeight: 1.2, marginBottom: 6 }}>
        <span style={{ color: C.blue }}>LOVE IS A</span><br />
        <span style={{ color: C.red }}>2 PLAYER</span><br />
        <span style={{ color: C.blue }}>GAME</span>
      </h1>
      <p style={{ color: C.muted, fontSize: 15, marginBottom: 32, fontWeight: 600 }}>
        How well do you know each other? 💕
      </p>

      <div className="card" style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
        {!joining ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <ControllerIcon color={C.blue} size={32} />
              <span style={{ fontFamily: "'Fredoka One'", fontSize: 17, color: C.text }}>Create a game</span>
            </div>

            <input placeholder="Your name (Player 1 🎮)" value={name} onChange={e => setName(e.target.value)} maxLength={20} />

            <button className="btn-blue" style={{ width: "100%" }} onClick={() => name.trim() && onHost(name.trim())}>
              Host New Game ✨
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", color: C.muted, fontSize: 13, fontWeight: 700 }}>
              <div style={{ flex: 1, height: 2, background: "#F0F0F0", borderRadius: 2 }} />
              OR
              <div style={{ flex: 1, height: 2, background: "#F0F0F0", borderRadius: 2 }} />
            </div>

            <button className="btn-red" style={{ width: "100%" }} onClick={() => setJoining(true)}>
              Join with Code 🔑
            </button>
          </>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <ControllerIcon color={C.red} size={32} />
              <span style={{ fontFamily: "'Fredoka One'", fontSize: 17, color: C.text }}>Join a game</span>
            </div>

            <input placeholder="Your name (Player 2 💕)" value={name} onChange={e => setName(e.target.value)} maxLength={20} />
            <input
              placeholder="Game code (e.g. AB3K9)"
              value={code}
              onChange={e => setCode(e.target.value.toUpperCase())}
              maxLength={5}
              style={{ textTransform: "uppercase", letterSpacing: 4, textAlign: "center", fontFamily: "'Fredoka One', cursive", fontSize: 22 }}
            />

            <button className="btn-red" style={{ width: "100%" }} onClick={() => name.trim() && code.length === 5 && onJoin(name.trim(), code)}>
              Join Game 🎮
            </button>
            <button className="btn-white" style={{ width: "100%" }} onClick={() => setJoining(false)}>
              ← Back
            </button>
          </>
        )}
      </div>

      <p style={{ marginTop: 20, color: C.muted, fontSize: 13, fontWeight: 600, textAlign: "center" }}>
        💡 You can play from different devices!<br />Share the game code with your player 2
      </p>
    </div>
  );
}

// ─── SCREEN: LOBBY ──────────────────────────────────────────────────────────
function LobbyScreen({ game, playerName, isHost, onStartAnswering, onRefresh }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard?.writeText(game.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const p2Joined = !!game.p2Name;

  return (
    <div className="slideUp" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 20px", minHeight: "100vh", background: C.bg, fontFamily: "'Nunito', sans-serif" }}>
      <div className="floatUp" style={{ marginBottom: 16 }}>
        <JoyConHeart size={100} />
      </div>
      <h2 style={{ fontFamily: "'Fredoka One'", fontSize: 26, color: C.text, marginBottom: 4 }}>Game Lobby</h2>
      <p style={{ color: C.muted, fontSize: 14, fontWeight: 600, marginBottom: 24 }}>Share the code with your Player 2!</p>

      <div className="card" style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
        {/* Game code */}
        <div style={{ background: `linear-gradient(135deg, ${C.blueLight}, ${C.redLight})`, borderRadius: 20, padding: "20px 36px", textAlign: "center", width: "100%", cursor: "pointer" }} onClick={copyCode}>
          <p style={{ fontFamily: "'Fredoka One'", fontSize: 12, color: C.muted, letterSpacing: 2, marginBottom: 4 }}>GAME CODE</p>
          <p style={{ fontFamily: "'Fredoka One'", fontSize: 44, letterSpacing: 10, color: C.text }}>{game.code}</p>
          <p style={{ fontFamily: "'Fredoka One'", fontSize: 12, color: copied ? C.correct : C.muted, marginTop: 4 }}>
            {copied ? "✓ Copied!" : "Tap to copy"}
          </p>
        </div>

        {/* Players */}
        <div style={{ width: "100%", display: "flex", gap: 12 }}>
          <div style={{ flex: 1, background: C.blueLight, borderRadius: 16, padding: "14px 12px", textAlign: "center", border: `3px solid ${C.blue}` }}>
            <p style={{ fontSize: 24 }}>🎮</p>
            <p style={{ fontFamily: "'Fredoka One'", fontSize: 15, color: C.blueDark }}>{game.p1Name}</p>
            <span className="tag tag-blue">P1 · Host</span>
          </div>
          <div style={{ flex: 1, background: p2Joined ? C.redLight : "#F5F5F5", borderRadius: 16, padding: "14px 12px", textAlign: "center", border: `3px solid ${p2Joined ? C.red : "#E0E0E0"}` }}>
            {p2Joined ? (
              <>
                <p style={{ fontSize: 24 }}>💕</p>
                <p style={{ fontFamily: "'Fredoka One'", fontSize: 15, color: C.redDark }}>{game.p2Name}</p>
                <span className="tag tag-red">P2 · Joined!</span>
              </>
            ) : (
              <>
                <LoadingDots color={C.muted} />
                <p style={{ fontFamily: "'Fredoka One'", fontSize: 13, color: C.muted }}>Waiting...</p>
                <span className="tag" style={{ background: "#EEE", color: C.muted }}>P2</span>
              </>
            )}
          </div>
        </div>

        {!p2Joined && (
          <button className="btn-white" style={{ width: "100%" }} onClick={onRefresh}>
            🔄 Refresh
          </button>
        )}

        {p2Joined && (
          <div style={{ width: "100%", animation: "popIn 0.4s ease forwards" }}>
            <p style={{ textAlign: "center", color: C.correct, fontWeight: 800, fontSize: 15, marginBottom: 12 }}>
              🎉 {game.p2Name} joined! Ready to play?
            </p>
            <button className={isHost ? "btn-blue" : "btn-red"} style={{ width: "100%" }} onClick={onStartAnswering}>
              Start Answering! 🕹️
            </button>
          </div>
        )}

        {!p2Joined && !isHost && (
          <p style={{ color: C.muted, fontSize: 13, fontWeight: 600, textAlign: "center" }}>
            You've joined! Waiting for {game.p1Name} to start...
          </p>
        )}
      </div>
    </div>
  );
}

// ─── SCREEN: ANSWER ─────────────────────────────────────────────────────────
function AnswerScreen({ playerName, isBlue, questions, onDone }) {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [current, setCurrent] = useState(0);
  const [key, setKey] = useState(0);
  const [saving, setSaving] = useState(false);

  const color = isBlue ? C.blue : C.red;
  const darkColor = isBlue ? C.blueDark : C.redDark;

  const next = () => {
    if (!answers[current].trim()) return;
    if (current < questions.length - 1) {
      setKey(k => k + 1);
      setCurrent(c => c + 1);
    } else {
      setSaving(true);
      setTimeout(() => onDone(answers), 400);
    }
  };

  const pct = ((current + 1) / questions.length) * 100;

  return (
    <div className="slideUp" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 20px", minHeight: "100vh", background: isBlue ? "#F0FAFF" : "#FFF0F0", fontFamily: "'Nunito', sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <ControllerIcon color={color} size={28} />
        <span style={{ fontFamily: "'Fredoka One'", fontSize: 16, color: darkColor }}>{playerName}'s turn</span>
      </div>

      <div className="card" style={{ border: `3px solid ${color}` }}>
        {/* Progress */}
        <div style={{ width: "100%", height: 8, background: "#F0F0F0", borderRadius: 4, marginBottom: 8, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${darkColor})`, borderRadius: 4, transition: "width 0.4s ease" }} />
        </div>
        <p style={{ color: C.muted, fontSize: 12, fontWeight: 700, marginBottom: 20, textAlign: "right" }}>
          {current + 1} / {questions.length}
        </p>

        <div key={key} style={{ animation: "slideUp 0.3s ease forwards" }}>
          <p style={{ fontFamily: "'Fredoka One'", fontSize: 20, color: C.text, textAlign: "center", lineHeight: 1.4, marginBottom: 20 }}>
            {questions[current]}
          </p>
          <p style={{ fontSize: 13, color: C.muted, fontWeight: 700, marginBottom: 6 }}>
            YOUR ANSWER (only you can see this!)
          </p>
          <textarea
            rows={3}
            placeholder="Type your answer..."
            value={answers[current]}
            onChange={e => { const a = [...answers]; a[current] = e.target.value; setAnswers(a); }}
          />
        </div>

        <button
          className={isBlue ? "btn-blue" : "btn-red"}
          style={{ width: "100%", marginTop: 16, opacity: answers[current].trim() && !saving ? 1 : 0.5 }}
          onClick={next}
          disabled={!answers[current].trim() || saving}
        >
          {saving ? "Saving..." : current < questions.length - 1 ? "Next Question →" : "Submit Answers ✓"}
        </button>
      </div>
    </div>
  );
}

// ─── SCREEN: WAITING ────────────────────────────────────────────────────────
function WaitingScreen({ playerName, otherName, onRefresh }) {
  return (
    <div className="slideUp" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 20px", minHeight: "100vh", background: C.bg, fontFamily: "'Nunito', sans-serif" }}>
      <div className="floatUp"><JoyConHeart size={110} /></div>
      <h2 style={{ fontFamily: "'Fredoka One'", fontSize: 24, color: C.text, marginTop: 16, marginBottom: 8 }}>
        Almost there! 🎮
      </h2>
      <p style={{ color: C.muted, fontWeight: 600, fontSize: 15, textAlign: "center", marginBottom: 32 }}>
        Your answers are saved!<br />
        Waiting for <span style={{ color: C.red }}>{otherName}</span> to finish...
      </p>
      <LoadingDots color={C.red} />
      <button className="btn-white" style={{ marginTop: 24 }} onClick={onRefresh}>
        🔄 Check if they're done
      </button>
    </div>
  );
}

// ─── SCREEN: GUESS ───────────────────────────────────────────────────────────
function GuessScreen({ playerName, aboutName, isBlue, questions, onDone }) {
  const [guesses, setGuesses] = useState(Array(questions.length).fill(""));
  const [current, setCurrent] = useState(0);
  const [key, setKey] = useState(0);

  const color = isBlue ? C.blue : C.red;
  const darkColor = isBlue ? C.blueDark : C.redDark;

  const next = () => {
    if (!guesses[current].trim()) return;
    if (current < questions.length - 1) {
      setKey(k => k + 1);
      setCurrent(c => c + 1);
    } else {
      onDone(guesses);
    }
  };

  const pct = ((current + 1) / questions.length) * 100;

  return (
    <div className="slideUp" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 20px", minHeight: "100vh", background: isBlue ? "#F0FAFF" : "#FFF0F0", fontFamily: "'Nunito', sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 20 }}>🔍</span>
        <span style={{ fontFamily: "'Fredoka One'", fontSize: 16, color: darkColor }}>Guess {aboutName}'s answers!</span>
      </div>

      <div className="card" style={{ border: `3px solid ${color}` }}>
        <div style={{ width: "100%", height: 8, background: "#F0F0F0", borderRadius: 4, marginBottom: 8, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${darkColor})`, borderRadius: 4, transition: "width 0.4s ease" }} />
        </div>
        <p style={{ color: C.muted, fontSize: 12, fontWeight: 700, marginBottom: 20, textAlign: "right" }}>
          {current + 1} / {questions.length}
        </p>

        <div key={key} style={{ animation: "slideUp 0.3s ease forwards" }}>
          <p style={{ fontFamily: "'Fredoka One'", fontSize: 20, color: C.text, textAlign: "center", lineHeight: 1.4, marginBottom: 20 }}>
            {questions[current]}
          </p>
          <p style={{ fontSize: 13, color: C.muted, fontWeight: 700, marginBottom: 6 }}>
            WHAT DID {aboutName.toUpperCase()} SAY?
          </p>
          <textarea
            rows={3}
            placeholder={`What do you think ${aboutName} answered?`}
            value={guesses[current]}
            onChange={e => { const g = [...guesses]; g[current] = e.target.value; setGuesses(g); }}
          />
        </div>

        <button
          className={isBlue ? "btn-blue" : "btn-red"}
          style={{ width: "100%", marginTop: 16, opacity: guesses[current].trim() ? 1 : 0.5 }}
          onClick={next}
          disabled={!guesses[current].trim()}
        >
          {current < questions.length - 1 ? "Next →" : "See Results! 🎉"}
        </button>
      </div>
    </div>
  );
}

// ─── SCREEN: RESULTS ────────────────────────────────────────────────────────
function ResultsScreen({ game, playerRole, onPlayAgain }) {
  const [revealed, setRevealed] = useState([]);
  const [aiComment, setAiComment] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const p1 = game.p1Name, p2 = game.p2Name;
  const p1ans = game.p1Answers || [];
  const p2ans = game.p2Answers || [];
  const p1g = game.p1Guesses || [];
  const p2g = game.p2Guesses || [];
  const qs = QUESTIONS;

  // How well p2 guessed p1
  const p2Score = p1ans.filter((a, i) => a.trim().toLowerCase() === p2g[i]?.trim().toLowerCase()).length;
  // How well p1 guessed p2
  const p1Score = p2ans.filter((a, i) => a.trim().toLowerCase() === p1g[i]?.trim().toLowerCase()).length;

  const totalRight = p1Score + p2Score;
  const totalMax = qs.length * 2;
  const pct = Math.round((totalRight / totalMax) * 100);

  const getMessage = () => {
    if (pct === 100) return { emoji: "🏆", text: "PERFECT MATCH! You two are made for each other!" };
    if (pct >= 70) return { emoji: "💕", text: "Wow, you really know each other well!" };
    if (pct >= 40) return { emoji: "😊", text: "Pretty good! You're learning each other." };
    return { emoji: "🌱", text: "So much more to discover about each other!" };
  };

  const msg = getMessage();

  useEffect(() => {
    if (pct >= 60) setShowConfetti(true);
    fetchAiComment();
  }, []);

  const fetchAiComment = async () => {
    setAiLoading(true);
    try {
      const prompt = `${p1} and ${p2} played a "How Well Do You Know Me?" game. Here are some of their answers:\n\n${qs.slice(0, 3).map((q, i) => `Q: ${q}\n${p1} said: "${p1ans[i]}"\n${p2} guessed: "${p2g[i]}"`).join("\n\n")}\n\nOverall match: ${pct}%. Write one SHORT (2-3 sentences), warm, funny, and sweet comment about their connection, like a playful friend would say. Make it personal to their actual answers. Do NOT use bullet points. Keep it under 60 words.`;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      const text = data.content?.find(b => b.type === "text")?.text || "";
      setAiComment(text);
    } catch (e) {
      setAiComment("You two are adorable together! 💕");
    }
    setAiLoading(false);
  };

  const toggle = i => setRevealed(r => r.includes(i) ? r.filter(x => x !== i) : [...r, i]);

  return (
    <div className="slideUp" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 20px 48px", minHeight: "100vh", background: C.bg, fontFamily: "'Nunito', sans-serif" }}>
      {showConfetti && <Confetti />}

      <div className="heartbeat"><JoyConHeart size={100} /></div>

      <h2 style={{ fontFamily: "'Fredoka One'", fontSize: 28, color: C.text, marginTop: 12, textAlign: "center" }}>
        {msg.emoji} Results!
      </h2>

      {/* Score badge */}
      <div style={{ display: "flex", gap: 16, margin: "20px 0", alignItems: "center" }}>
        <div style={{ textAlign: "center", background: C.blueLight, borderRadius: 18, padding: "14px 20px", border: `3px solid ${C.blue}` }}>
          <p style={{ fontFamily: "'Fredoka One'", fontSize: 30, color: C.blueDark }}>{p2Score}/{qs.length}</p>
          <p style={{ fontSize: 12, fontWeight: 700, color: C.blueDark }}>{p2} knew {p1}</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Fredoka One'", fontSize: 40, background: `linear-gradient(135deg, ${C.blue}, ${C.red})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {pct}%
          </div>
          <p style={{ fontSize: 12, fontWeight: 700, color: C.muted }}>MATCH</p>
        </div>
        <div style={{ textAlign: "center", background: C.redLight, borderRadius: 18, padding: "14px 20px", border: `3px solid ${C.red}` }}>
          <p style={{ fontFamily: "'Fredoka One'", fontSize: 30, color: C.redDark }}>{p1Score}/{qs.length}</p>
          <p style={{ fontSize: 12, fontWeight: 700, color: C.redDark }}>{p1} knew {p2}</p>
        </div>
      </div>

      <p style={{ fontWeight: 700, color: C.text, fontSize: 16, textAlign: "center", marginBottom: 16 }}>{msg.text}</p>

      {/* AI comment */}
      <div style={{ background: "white", borderRadius: 20, padding: "16px 20px", maxWidth: 440, width: "100%", border: "3px dashed #FFB3C1", marginBottom: 20, textAlign: "center" }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6 }}>✨ AI LOVE VERDICT</p>
        {aiLoading ? <LoadingDots color={C.red} /> : (
          <p style={{ fontWeight: 600, color: C.text, lineHeight: 1.6, fontSize: 15 }}>{aiComment}</p>
        )}
      </div>

      {/* Question breakdown */}
      <div style={{ width: "100%", maxWidth: 440 }}>
        <p style={{ fontFamily: "'Fredoka One'", fontSize: 16, color: C.text, marginBottom: 10 }}>💬 Answer Breakdown</p>
        {qs.map((q, i) => {
          const p2Right = p1ans[i]?.trim().toLowerCase() === p2g[i]?.trim().toLowerCase();
          const p1Right = p2ans[i]?.trim().toLowerCase() === p1g[i]?.trim().toLowerCase();
          const open = revealed.includes(i);
          return (
            <div key={i} onClick={() => toggle(i)} style={{
              background: "white", borderRadius: 16, marginBottom: 10, overflow: "hidden",
              border: `2px solid ${p1Right && p2Right ? C.correct : p1Right || p2Right ? C.blue : "#E0E0E0"}`,
              cursor: "pointer",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 16px" }}>
                <span>{p2Right ? "✅" : "❌"}</span>
                <span style={{ flex: 1, fontWeight: 700, fontSize: 13, color: C.text }}>{q}</span>
                <span>{p1Right ? "✅" : "❌"}</span>
                <span style={{ color: C.muted, fontSize: 11 }}>{open ? "▲" : "▼"}</span>
              </div>
              {open && (
                <div style={{ padding: "0 16px 14px", animation: "slideUp 0.2s ease", borderTop: "2px solid #F5F5F5" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
                    <div style={{ background: C.blueLight, borderRadius: 10, padding: "8px 10px" }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.blueDark, marginBottom: 2 }}>{p1} said</p>
                      <p style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{p1ans[i]}</p>
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginTop: 4 }}>{p2} guessed: {p2g[i]}</p>
                    </div>
                    <div style={{ background: C.redLight, borderRadius: 10, padding: "8px 10px" }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.redDark, marginBottom: 2 }}>{p2} said</p>
                      <p style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{p2ans[i]}</p>
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginTop: 4 }}>{p1} guessed: {p1g[i]}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 12, width: "100%", maxWidth: 440, marginTop: 8 }}>
        <button className="btn-white" style={{ flex: 1 }} onClick={() => setRevealed(qs.map((_, i) => i))}>Reveal All</button>
        <button className="btn-blue" style={{ flex: 1 }} onClick={onPlayAgain}>Play Again 🔄</button>
      </div>
    </div>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home");
  const [game, setGame] = useState(null);
  const [playerRole, setPlayerRole] = useState(null); // "p1" | "p2"
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState("");

  const isHost = playerRole === "p1";

  const handleHost = async (name) => {
    const code = makeCode();
    const newGame = {
      code,
      p1Name: name,
      p2Name: null,
      state: "lobby",
      p1Answers: null,
      p2Answers: null,
      p1Guesses: null,
      p2Guesses: null,
    };
    await saveGame(code, newGame);
    setGame(newGame);
    setPlayerRole("p1");
    setPlayerName(name);
    setScreen("lobby");
  };

  const handleJoin = async (name, code) => {
    const existing = await loadGame(code);
    if (!existing) { setError("Game not found! Check the code."); return; }
    if (existing.p2Name) { setError("Game already has 2 players!"); return; }
    const updated = { ...existing, p2Name: name };
    await saveGame(code, updated);
    setGame(updated);
    setPlayerRole("p2");
    setPlayerName(name);
    setError("");
    setScreen("lobby");
  };

  const refreshGame = async () => {
    if (!game) return;
    const fresh = await loadGame(game.code);
    if (fresh) setGame(fresh);
  };

  const startAnswering = async () => {
    const fresh = await loadGame(game.code);
    if (fresh) setGame(fresh);
    setScreen("answer");
  };

  const handleAnswersDone = async (answers) => {
    const fresh = await loadGame(game.code);
    if (!fresh) return;
    const update = playerRole === "p1"
      ? { ...fresh, p1Answers: answers }
      : { ...fresh, p2Answers: answers };
    await saveGame(game.code, update);
    setGame(update);
    setScreen("waiting");
  };

  const checkAndProceed = async () => {
    const fresh = await loadGame(game.code);
    if (!fresh) return;
    setGame(fresh);
    const otherDone = playerRole === "p1" ? !!fresh.p2Answers : !!fresh.p1Answers;
    if (otherDone) setScreen("guess");
  };

  const handleGuessesDone = async (guesses) => {
    const fresh = await loadGame(game.code);
    if (!fresh) return;
    const update = playerRole === "p1"
      ? { ...fresh, p1Guesses: guesses }
      : { ...fresh, p2Guesses: guesses };
    await saveGame(game.code, update);
    setGame(update);
    setScreen("waitingResults");
  };

  const checkResults = async () => {
    const fresh = await loadGame(game.code);
    if (!fresh) return;
    setGame(fresh);
    const bothGuessed = !!fresh.p1Guesses && !!fresh.p2Guesses;
    if (bothGuessed) setScreen("results");
  };

  const reset = () => {
    setScreen("home");
    setGame(null);
    setPlayerRole(null);
    setPlayerName("");
  };

  // Poll automatically every 5s when waiting
  useEffect(() => {
    if (screen !== "waiting" && screen !== "waitingResults" && screen !== "lobby") return;
    const iv = setInterval(() => {
      if (screen === "lobby") refreshGame();
      if (screen === "waiting") checkAndProceed();
      if (screen === "waitingResults") checkResults();
    }, 5000);
    return () => clearInterval(iv);
  }, [screen, game]);

  const otherName = game ? (playerRole === "p1" ? game.p2Name : game.p1Name) : "";
  const aboutName = playerRole === "p1" ? (game?.p2Name || "") : (game?.p1Name || "");

  return (
    <>
      <style>{CSS}</style>
      {error && (
        <div style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", background: C.wrong, color: "white", fontFamily: "'Fredoka One'", padding: "10px 22px", borderRadius: 14, zIndex: 9999, animation: "popIn 0.3s ease" }}>
          ⚠️ {error}
          <button onClick={() => setError("")} style={{ marginLeft: 10, background: "none", border: "none", color: "white", cursor: "pointer", fontSize: 16 }}>✕</button>
        </div>
      )}

      {screen === "home" && <HomeScreen onHost={handleHost} onJoin={handleJoin} />}

      {screen === "lobby" && game && (
        <LobbyScreen
          game={game}
          playerName={playerName}
          isHost={isHost}
          onStartAnswering={startAnswering}
          onRefresh={refreshGame}
        />
      )}

      {screen === "answer" && (
        <AnswerScreen
          playerName={playerName}
          isBlue={isHost}
          questions={QUESTIONS}
          onDone={handleAnswersDone}
        />
      )}

      {screen === "waiting" && (
        <WaitingScreen
          playerName={playerName}
          otherName={otherName || "your partner"}
          onRefresh={checkAndProceed}
        />
      )}

      {screen === "guess" && (
        <GuessScreen
          playerName={playerName}
          aboutName={aboutName}
          isBlue={isHost}
          questions={QUESTIONS}
          onDone={handleGuessesDone}
        />
      )}

      {screen === "waitingResults" && (
        <WaitingScreen
          playerName={playerName}
          otherName={otherName || "your partner"}
          onRefresh={checkResults}
        />
      )}

      {screen === "results" && game && (
        <ResultsScreen
          game={game}
          playerRole={playerRole}
          onPlayAgain={reset}
        />
      )}
    </>
  );
}