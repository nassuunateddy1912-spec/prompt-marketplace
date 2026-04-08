import { useState } from "react";

const prompts = [
  { id: 1, title: "Ultra-Realistic Product Photography", category: "Image", price: 29, rating: 4.9, sales: 312, seller: "VisualAI", badge: "Bestseller", description: "Generate studio-quality product shots with perfect lighting, shadows, and backgrounds for any item.", preview: "Shot on white background, 8k, product photography, studio lighting, shadow..." },
  { id: 2, title: "Viral Twitter Thread Generator", category: "Copywriting", price: 19, rating: 4.8, sales: 540, seller: "GrowthHacks", badge: "Hot", description: "Turn any idea into a punchy, engaging Twitter thread that gets shares and followers.", preview: "Write a viral Twitter thread about [TOPIC]. Hook: make it controversial..." },
  { id: 3, title: "SaaS Landing Page Copy", category: "Copywriting", price: 39, rating: 5.0, sales: 198, seller: "ConvertCopy", badge: "Top Rated", description: "Complete landing page copy with headline, subheadline, features, social proof, and CTA.", preview: "You are a world-class SaaS copywriter. Write a full landing page for..." },
  { id: 4, title: "AI Character Creator (RPG)", category: "Gaming", price: 14, rating: 4.7, sales: 890, seller: "QuestForge", badge: "Popular", description: "Build deeply detailed RPG characters with backstory, stats, personality and voice.", preview: "Create an RPG character with the following traits: [NAME], [CLASS], [RACE]..." },
  { id: 5, title: "CEO Email Cold Outreach", category: "Business", price: 49, rating: 4.9, sales: 127, seller: "SalesAI", badge: "Premium", description: "Hyper-personalized cold emails targeting C-suite executives that actually get replies.", preview: "Write a cold email to a CEO of a [INDUSTRY] company. Subject line must..." },
  { id: 6, title: "Midjourney Style Transfer Pack", category: "Image", price: 24, rating: 4.6, sales: 443, seller: "StyleLab", badge: "New", description: "10 cinematic style modifiers to instantly transform any image into a movie scene.", preview: "--style cinematic, anamorphic lens, film grain, golden hour, shot on ARRI..." },
];

const categories = ["All", "Image", "Copywriting", "Business", "Gaming"];
const badgeColors = {
  Bestseller: "#f59e0b",
  Hot: "#ef4444",
  "Top Rated": "#8b5cf6",
  Popular: "#3b82f6",
  Premium: "#10b981",
  New: "#6366f1",
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [toast, setToast] = useState(null);

  const filtered = prompts.filter(p =>
    (activeCategory === "All" || p.category === activeCategory) &&
    (p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
  );

  const addToCart = (prompt) => {
    if (!cart.find(c => c.id === prompt.id)) {
      setCart([...cart, prompt]);
      showToast(`"${prompt.title}" added to cart!`);
    } else {
      showToast("Already in your cart.");
    }
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const total = cart.reduce((s, p) => s + p.price, 0);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      color: "#f0f0f5",
    }}>
      {/* Ambient background */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        background: "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(99,102,241,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(16,185,129,0.08) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      {/* Nav */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 32px", height: 64,
        background: "rgba(10,10,15,0.85)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(20px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #6366f1, #10b981)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16,
          }}>⚡</div>
          <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.5px" }}>PromptVault</span>
          <span style={{
            background: "rgba(99,102,241,0.2)", color: "#818cf8",
            fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20,
            border: "1px solid rgba(99,102,241,0.3)", textTransform: "uppercase", letterSpacing: "0.05em",
          }}>Beta</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            color: "#d1d5db", padding: "8px 18px", borderRadius: 8, cursor: "pointer",
            fontFamily: "inherit", fontSize: 13, fontWeight: 600,
          }}>Sell Prompts</button>
          <button
            onClick={() => setShowCart(true)}
            style={{
              position: "relative",
              background: "linear-gradient(135deg, #6366f1, #4f46e5)",
              border: "none", color: "#fff",
              padding: "8px 18px", borderRadius: 8, cursor: "pointer",
              fontFamily: "inherit", fontSize: 13, fontWeight: 700,
              display: "flex", alignItems: "center", gap: 7,
            }}>
            🛒 Cart
            {cart.length > 0 && (
              <span style={{
                background: "#ef4444", color: "#fff",
                borderRadius: "50%", width: 18, height: 18,
                fontSize: 10, fontWeight: 800,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{cart.length}</span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        position: "relative", zIndex: 1,
        textAlign: "center", padding: "72px 24px 48px",
      }}>
        <div style={{
          display: "inline-block", background: "rgba(99,102,241,0.15)",
          border: "1px solid rgba(99,102,241,0.3)", borderRadius: 20,
          padding: "5px 14px", fontSize: 12, color: "#818cf8",
          fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
          marginBottom: 20,
        }}>🔥 2,400+ Prompts · New drops weekly</div>
        <h1 style={{
          fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900,
          letterSpacing: "-2px", lineHeight: 1.05, margin: "0 0 16px",
          background: "linear-gradient(135deg, #f0f0f5 0%, #818cf8 50%, #10b981 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          The Marketplace for<br />Premium AI Prompts
        </h1>
        <p style={{ color: "#9ca3af", fontSize: 18, maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.6 }}>
          Buy and sell high-converting prompts for ChatGPT, Midjourney, Claude & more. Instant delivery.
        </p>
        <div style={{
          display: "flex", maxWidth: 480, margin: "0 auto",
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 12, overflow: "hidden", backdropFilter: "blur(10px)",
        }}>
          <span style={{ padding: "0 16px", color: "#6b7280", fontSize: 18 }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search prompts..."
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              color: "#f0f0f5", fontSize: 15, padding: "14px 0",
              fontFamily: "inherit",
            }}
          />
        </div>
      </div>

      {/* Stats */}
      <div style={{
        position: "relative", zIndex: 1,
        display: "flex", justifyContent: "center", gap: 40,
        padding: "0 24px 52px", flexWrap: "wrap",
      }}>
        {[["12,400+", "Prompts Sold"], ["3,200+", "Happy Buyers"], ["$2.1M+", "Creator Earnings"]].map(([val, label]) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#f0f0f5", letterSpacing: "-1px" }}>{val}</div>
            <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 500, marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div style={{
        position: "relative", zIndex: 1,
        display: "flex", gap: 10, padding: "0 32px 32px",
        overflowX: "auto", justifyContent: "center",
      }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{
            padding: "8px 20px", borderRadius: 999, cursor: "pointer",
            fontFamily: "inherit", fontSize: 13, fontWeight: 700,
            whiteSpace: "nowrap", transition: "all 0.15s",
            background: activeCategory === cat ? "linear-gradient(135deg, #6366f1, #4f46e5)" : "rgba(255,255,255,0.05)",
            color: activeCategory === cat ? "#fff" : "#9ca3af",
            border: activeCategory === cat ? "none" : "1px solid rgba(255,255,255,0.09)",
          }}>{cat}</button>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        position: "relative", zIndex: 1,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 20, padding: "0 32px 80px", maxWidth: 1200, margin: "0 auto",
      }}>
        {filtered.map(p => (
          <div key={p.id}
            onClick={() => setSelectedPrompt(p)}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16, padding: 24, cursor: "pointer",
              transition: "all 0.2s", position: "relative", overflow: "hidden",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Badge */}
            <span style={{
              position: "absolute", top: 16, right: 16,
              background: badgeColors[p.badge] + "22",
              color: badgeColors[p.badge],
              border: `1px solid ${badgeColors[p.badge]}44`,
              fontSize: 10, fontWeight: 800, padding: "3px 9px", borderRadius: 20,
              textTransform: "uppercase", letterSpacing: "0.06em",
            }}>{p.badge}</span>

            <div style={{
              display: "inline-block", background: "rgba(99,102,241,0.12)",
              color: "#818cf8", fontSize: 11, fontWeight: 700,
              padding: "3px 10px", borderRadius: 6, marginBottom: 14,
              textTransform: "uppercase", letterSpacing: "0.05em",
            }}>{p.category}</div>

            <h3 style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 800, lineHeight: 1.3, paddingRight: 60 }}>{p.title}</h3>
            <p style={{ margin: "0 0 16px", color: "#9ca3af", fontSize: 13, lineHeight: 1.6 }}>{p.description}</p>

            {/* Preview */}
            <div style={{
              background: "rgba(0,0,0,0.3)", borderRadius: 8, padding: "10px 14px",
              marginBottom: 18, fontFamily: "monospace", fontSize: 11,
              color: "#6b7280", lineHeight: 1.5, border: "1px solid rgba(255,255,255,0.06)",
            }}>
              {p.preview}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#f0f0f5" }}>${p.price}</div>
                <div style={{ fontSize: 11, color: "#6b7280", marginTop: 1 }}>
                  ⭐ {p.rating} · {p.sales} sales · by {p.seller}
                </div>
              </div>
              <button
                onClick={e => { e.stopPropagation(); addToCart(p); }}
                style={{
                  background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                  color: "#fff", border: "none", borderRadius: 10,
                  padding: "10px 18px", cursor: "pointer",
                  fontFamily: "inherit", fontSize: 13, fontWeight: 700,
                  transition: "opacity 0.15s",
                }}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Prompt Modal */}
      {selectedPrompt && (
        <div
          onClick={() => setSelectedPrompt(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
          }}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#12121a", border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 20, padding: 36, maxWidth: 540, width: "100%",
            }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <span style={{
                background: "rgba(99,102,241,0.12)", color: "#818cf8",
                fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6,
                textTransform: "uppercase",
              }}>{selectedPrompt.category}</span>
              <button onClick={() => setSelectedPrompt(null)} style={{
                background: "none", border: "none", color: "#6b7280",
                fontSize: 22, cursor: "pointer", lineHeight: 1,
              }}>×</button>
            </div>
            <h2 style={{ margin: "0 0 10px", fontSize: 24, fontWeight: 900, lineHeight: 1.2 }}>{selectedPrompt.title}</h2>
            <p style={{ color: "#9ca3af", marginBottom: 20, lineHeight: 1.6 }}>{selectedPrompt.description}</p>
            <div style={{
              background: "rgba(0,0,0,0.4)", borderRadius: 10, padding: 16,
              fontFamily: "monospace", fontSize: 12, color: "#818cf8",
              lineHeight: 1.7, marginBottom: 24, border: "1px solid rgba(99,102,241,0.2)",
            }}>
              🔒 Full prompt unlocked after purchase<br />
              <span style={{ color: "#6b7280" }}>Preview: {selectedPrompt.preview}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 900 }}>${selectedPrompt.price}</div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>⭐ {selectedPrompt.rating} · {selectedPrompt.sales} sales</div>
              </div>
              <button
                onClick={() => { addToCart(selectedPrompt); setSelectedPrompt(null); }}
                style={{
                  background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                  color: "#fff", border: "none", borderRadius: 12,
                  padding: "14px 28px", cursor: "pointer",
                  fontFamily: "inherit", fontSize: 15, fontWeight: 800,
                }}>
                Buy Now — ${selectedPrompt.price}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div
          onClick={() => setShowCart(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 300,
            background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)",
          }}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: "absolute", right: 0, top: 0, bottom: 0,
              width: 360, background: "#12121a",
              borderLeft: "1px solid rgba(255,255,255,0.1)",
              padding: 28, display: "flex", flexDirection: "column",
            }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
              <h2 style={{ margin: 0, fontWeight: 900, fontSize: 20 }}>Your Cart ({cart.length})</h2>
              <button onClick={() => setShowCart(false)} style={{
                background: "none", border: "none", color: "#6b7280", fontSize: 22, cursor: "pointer",
              }}>×</button>
            </div>
            {cart.length === 0 ? (
              <div style={{ color: "#6b7280", textAlign: "center", marginTop: 60, fontSize: 15 }}>Your cart is empty.<br />Add some prompts!</div>
            ) : (
              <>
                <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
                  {cart.map(item => (
                    <div key={item.id} style={{
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 12, padding: 16,
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                    }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{item.title}</div>
                        <div style={{ color: "#6b7280", fontSize: 12 }}>{item.category}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontWeight: 800, fontSize: 16 }}>${item.price}</span>
                        <button onClick={() => setCart(cart.filter(c => c.id !== item.id))} style={{
                          background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)",
                          color: "#ef4444", borderRadius: 6, width: 26, height: 26,
                          cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center",
                        }}>×</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20, marginTop: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                    <span style={{ color: "#9ca3af" }}>Total</span>
                    <span style={{ fontWeight: 900, fontSize: 22 }}>${total}</span>
                  </div>
                  <button style={{
                    width: "100%", background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                    color: "#fff", border: "none", borderRadius: 12,
                    padding: "16px", cursor: "pointer",
                    fontFamily: "inherit", fontSize: 16, fontWeight: 800,
                  }}>Checkout — ${total}</button>
                  <p style={{ textAlign: "center", color: "#6b7280", fontSize: 12, marginTop: 12 }}>
                    🔒 Secure checkout · Instant delivery
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)",
          background: "#1e1e2e", border: "1px solid rgba(99,102,241,0.4)",
          color: "#f0f0f5", padding: "12px 24px", borderRadius: 12,
          fontSize: 14, fontWeight: 600, zIndex: 999,
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          animation: "fadeIn 0.2s ease",
        }}>✅ {toast}</div>
      )}
    </div>
  );
}
