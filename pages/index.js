import { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    facility: "",
    email: "",
    phone: "",
    claims: "",
    license: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setForm({
          name: "",
          facility: "",
          email: "",
          phone: "",
          claims: "",
          license: "",
          message: "",
        });
      } else {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <>
      <Head>
        <title>Amr Selim | Clinical Costing Expert - Abu Dhabi UAE</title>
        <meta
          name="description"
          content="DOH-compliant clinical costing for Abu Dhabi healthcare facilities. Just 1 AED per claim."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <style>{`
        :root { --teal:#00A99D;--teal-dk:#007A71;--gold:#C9A84C;--dark:#0D1B1E;--mid:#1C2E32;--light:#F4F8F7;--muted:#7A9A98;--white:#FFFFFF; }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{font-family:'DM Sans',sans-serif;background:var(--dark);color:var(--light);overflow-x:hidden}
        nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;justify-content:space-between;align-items:center;padding:1.1rem 6%;background:rgba(13,27,30,0.9);backdrop-filter:blur(14px);border-bottom:1px solid rgba(0,169,157,0.15)}
        .nav-logo{font-family:'Playfair Display',serif;font-size:1.15rem;color:var(--gold);letter-spacing:0.04em}
        .nav-links{display:flex;gap:2rem;list-style:none}
        .nav-links a{text-decoration:none;color:var(--muted);font-size:0.85rem;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;transition:color 0.25s}
        .nav-links a:hover{color:var(--teal)}
        .nav-cta{background:var(--teal)!important;color:var(--white)!important;padding:0.45rem 1.2rem!important;border-radius:4px}
        .hero{min-height:100vh;display:grid;place-items:center;padding:10rem 6% 6rem;position:relative;overflow:hidden}
        .hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 70% 50%,rgba(0,169,157,0.12) 0%,transparent 70%),radial-gradient(ellipse 40% 40% at 20% 80%,rgba(201,168,76,0.08) 0%,transparent 60%),var(--dark)}
        .hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(0,169,157,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,169,157,0.05) 1px,transparent 1px);background-size:60px 60px}
        .hero-inner{position:relative;z-index:2;max-width:860px;margin:0 auto;text-align:center}
        .hero-tag{display:inline-block;font-size:0.76rem;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:var(--teal);border:1px solid rgba(0,169,157,0.4);padding:0.35rem 1rem;border-radius:2px;margin-bottom:2rem}
        .hero h1{font-family:'Playfair Display',serif;font-size:clamp(2.8rem,6vw,5rem);font-weight:900;line-height:1.08;color:var(--white);margin-bottom:1.4rem}
        .hero h1 em{font-style:italic;color:var(--gold)}
        .hero-sub{font-size:1.05rem;color:var(--muted);line-height:1.7;max-width:600px;margin:0 auto 2.5rem}
        .hero-price-block{display:inline-flex;align-items:center;gap:1.2rem;background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.35);padding:1rem 2rem;border-radius:6px;margin-bottom:2.5rem}
        .price-num{font-family:'Playfair Display',serif;font-size:2.6rem;font-weight:900;color:var(--gold);line-height:1}
        .price-label{text-align:left;line-height:1.3;font-size:0.86rem;color:var(--muted)}
        .price-label strong{display:block;color:var(--white);font-size:0.98rem}
        .hero-btns{display:flex;justify-content:center;gap:1rem;flex-wrap:wrap}
        .btn-primary{background:var(--teal);color:var(--white);padding:0.85rem 2.1rem;border-radius:4px;text-decoration:none;font-weight:600;font-size:0.95rem;transition:background 0.25s,transform 0.2s;display:inline-flex;align-items:center;gap:0.5rem;border:none;cursor:pointer}
        .btn-primary:hover:not(:disabled){background:var(--teal-dk);transform:translateY(-2px)}
        .btn-primary:disabled{opacity:0.7;cursor:not-allowed}
        .btn-ghost{background:transparent;color:var(--light);padding:0.85rem 2.1rem;border-radius:4px;text-decoration:none;font-weight:500;font-size:0.95rem;border:1px solid rgba(255,255,255,0.2);transition:border-color 0.25s,color 0.25s}
        .btn-ghost:hover{border-color:var(--teal);color:var(--teal)}
        .badge-strip{background:var(--mid);border-top:1px solid rgba(0,169,157,0.1);border-bottom:1px solid rgba(0,169,157,0.1);padding:1.5rem 6%;display:flex;justify-content:center;gap:3rem;flex-wrap:wrap}
        .badge-item{display:flex;align-items:center;gap:0.6rem;font-size:0.84rem;color:var(--muted);font-weight:500}
        .dot{width:8px;height:8px;border-radius:50%;background:var(--teal);flex-shrink:0}
        section{padding:6rem 6%}
        .section-label{font-size:0.73rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--teal);margin-bottom:0.7rem}
        .section-title{font-family:'Playfair Display',serif;font-size:clamp(1.9rem,4vw,2.8rem);font-weight:700;color:var(--white);line-height:1.15;margin-bottom:1.1rem}
        .section-sub{font-size:1rem;color:var(--muted);line-height:1.7;max-width:540px}
        .inner{max-width:1100px;margin:0 auto}
        .why{background:var(--dark)}
        .why-grid{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;margin-top:3.5rem}
        .why-cards{display:flex;flex-direction:column;gap:1.2rem}
        .why-card{background:var(--mid);border:1px solid rgba(0,169,157,0.12);border-left:3px solid var(--teal);padding:1.4rem 1.6rem;border-radius:6px;transition:border-color 0.25s,transform 0.25s}
        .why-card:hover{border-color:var(--gold);transform:translateX(4px)}
        .why-card h4{font-family:'Playfair Display',serif;font-size:1rem;color:var(--white);margin-bottom:0.4rem}
        .why-card p{font-size:0.86rem;color:var(--muted);line-height:1.65}
        .why-stat-box{background:linear-gradient(135deg,rgba(0,169,157,0.08),rgba(201,168,76,0.06));border:1px solid rgba(0,169,157,0.2);border-radius:12px;padding:3rem 2.5rem;text-align:center}
        .big-stat{font-family:'Playfair Display',serif;font-size:4.5rem;font-weight:900;color:var(--gold);line-height:1;display:block}
        .stat-caption{color:var(--muted);font-size:0.88rem;margin-top:0.5rem;display:block}
        .divider{width:40px;height:2px;background:var(--teal);margin:1.4rem auto}
        .services{background:var(--mid)}
        .services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.4rem;margin-top:3rem}
        .svc-card{background:var(--dark);border:1px solid rgba(0,169,157,0.1);border-radius:8px;padding:1.8rem;transition:border-color 0.25s,transform 0.25s;position:relative;overflow:hidden}
        .svc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--teal),var(--gold));opacity:0;transition:opacity 0.3s}
        .svc-card:hover{border-color:rgba(0,169,157,0.3);transform:translateY(-4px)}
        .svc-card:hover::before{opacity:1}
        .svc-icon{font-size:1.8rem;margin-bottom:0.9rem;display:block}
        .svc-card h3{font-family:'Playfair Display',serif;font-size:1.05rem;color:var(--white);margin-bottom:0.5rem}
        .svc-card p{font-size:0.85rem;color:var(--muted);line-height:1.65}
        .pricing{background:var(--dark)}
        .pricing-inner{max-width:780px;margin:0 auto;text-align:center}
        .pricing-card{background:linear-gradient(135deg,var(--mid),rgba(0,169,157,0.05));border:1px solid rgba(201,168,76,0.3);border-radius:12px;padding:3.5rem 3rem;margin-top:3rem;position:relative;overflow:hidden}
        .ribbon{position:absolute;top:1.2rem;right:-2.5rem;background:var(--gold);color:var(--dark);font-size:0.68rem;font-weight:700;letter-spacing:0.08em;padding:0.3rem 3.5rem;transform:rotate(45deg);white-space:nowrap}
        .price-amount{font-family:'Playfair Display',serif;font-size:5.5rem;font-weight:900;color:var(--gold);line-height:1}
        .price-per{font-size:1rem;color:var(--muted);margin-top:0.3rem}
        .price-features{list-style:none;margin:2rem 0;text-align:left;display:inline-block}
        .price-features li{font-size:0.93rem;color:var(--light);padding:0.45rem 0;display:flex;align-items:center;gap:0.8rem}
        .price-features li::before{content:'checkmark';content:'✓';color:var(--teal);font-weight:700;flex-shrink:0}
        .pricing-note{font-size:0.8rem;color:var(--muted);margin-top:1.4rem;line-height:1.6}
        .process{background:var(--mid)}
        .steps{display:flex;flex-direction:column;gap:0;margin-top:3rem}
        .step{display:grid;grid-template-columns:56px 1fr;gap:1.5rem;position:relative;padding-bottom:2.2rem}
        .step:not(:last-child)::after{content:'';position:absolute;left:27px;top:56px;bottom:0;width:2px;background:linear-gradient(to bottom,var(--teal),transparent)}
        .step-num{width:56px;height:56px;border-radius:50%;background:rgba(0,169,157,0.12);border:2px solid var(--teal);display:grid;place-items:center;font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:700;color:var(--teal);flex-shrink:0}
        .step-body{padding-top:0.8rem}
        .step-body h4{font-family:'Playfair Display',serif;font-size:1rem;color:var(--white);margin-bottom:0.35rem}
        .step-body p{font-size:0.86rem;color:var(--muted);line-height:1.65}
        .about{background:var(--dark)}
        .about-inner{max-width:820px;margin:0 auto}
        .about-box{background:var(--mid);border:1px solid rgba(0,169,157,0.15);border-radius:12px;padding:3rem}
        .about-box p{font-size:0.95rem;color:var(--muted);line-height:1.8;margin-bottom:1rem}
        .about-tags{display:flex;flex-wrap:wrap;gap:0.6rem;margin-top:1.5rem}
        .tag{font-size:0.76rem;font-weight:600;letter-spacing:0.06em;border:1px solid rgba(0,169,157,0.35);color:var(--teal);padding:0.3rem 0.8rem;border-radius:3px}
        .contact-section{background:var(--mid)}
        .contact-inner{max-width:700px;margin:0 auto}
        .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.2rem;margin-top:2.5rem}
        .form-group{display:flex;flex-direction:column;gap:0.45rem}
        .form-group.full{grid-column:1 / -1}
        .form-group label{font-size:0.75rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--teal)}
        .form-group input,.form-group select,.form-group textarea{background:var(--dark);border:1px solid rgba(0,169,157,0.2);border-radius:5px;padding:0.75rem 1rem;color:var(--light);font-family:'DM Sans',sans-serif;font-size:0.93rem;transition:border-color 0.25s;outline:none;width:100%}
        .form-group input:focus,.form-group select:focus,.form-group textarea:focus{border-color:var(--teal)}
        .form-group select option{background:var(--dark)}
        .form-group textarea{resize:vertical;min-height:130px}
        .form-submit{margin-top:1.5rem;width:100%;font-size:1rem;padding:1rem;justify-content:center}
        .success-msg{background:rgba(0,169,157,0.12);border:1px solid var(--teal);border-radius:8px;padding:1.5rem;text-align:center;margin-top:1.5rem}
        .success-msg h3{font-family:'Playfair Display',serif;color:var(--teal);margin-bottom:0.5rem}
        .success-msg p{color:var(--muted);font-size:0.9rem}
        .error-msg{background:rgba(220,53,69,0.1);border:1px solid rgba(220,53,69,0.4);border-radius:8px;padding:1rem;text-align:center;margin-top:1rem;color:#ff8080;font-size:0.88rem}
        .whatsapp-float{position:fixed;bottom:2rem;right:2rem;z-index:999;background:#25D366;color:white;width:58px;height:58px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.7rem;text-decoration:none;box-shadow:0 4px 20px rgba(37,211,102,0.4);transition:transform 0.25s,box-shadow 0.25s}
        .whatsapp-float:hover{transform:scale(1.1);box-shadow:0 6px 28px rgba(37,211,102,0.55)}
        footer{background:var(--dark);border-top:1px solid rgba(255,255,255,0.06);padding:2rem 6%;text-align:center;font-size:0.8rem;color:var(--muted)}
        @media(max-width:768px){
          nav{padding:1rem 4%}
          .nav-links{display:none}
          section{padding:4rem 5%}
          .why-grid{grid-template-columns:1fr;gap:2rem}
          .services-grid{grid-template-columns:1fr}
          .form-grid{grid-template-columns:1fr}
          .form-group.full{grid-column:1}
          .hero{padding:8rem 5% 4rem}
          .pricing-card{padding:2.5rem 1.5rem}
          .ribbon{display:none}
          .badge-strip{gap:1rem}
        }
      `}</style>

      <a
        href="https://wa.me/971502392790"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        title="Chat on WhatsApp"
      >
        💬
      </a>

      <nav>
        <div className="nav-logo">Amr Selim</div>
        <ul className="nav-links">
          <li>
            <a href="#why">Why Me</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#pricing">Pricing</a>
          </li>
          <li>
            <a href="#process">Process</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact" className="nav-cta">
              Get Started
            </a>
          </li>
        </ul>
      </nav>

      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-inner">
          <span className="hero-tag">
            🏥 DOH-Compliant Clinical Costing · Abu Dhabi UAE
          </span>
          <h1>
            Clinical Costing Made
            <br />
            <em>Simple & Affordable</em>
          </h1>
          <p className="hero-sub">
            Full DOH-compliant patient-level clinical costing for hospitals,
            clinics, and medical centers in Abu Dhabi — delivered with
            precision, transparency, and the most competitive pricing in the
            UAE.
          </p>
          <div className="hero-price-block">
            <div className="price-num">
              1<span style={{ fontSize: "1.3rem" }}>AED</span>
            </div>
            <div className="price-label">
              <strong>Per Claim / Encounter</strong>
              The most affordable clinical costing service in the UAE
            </div>
          </div>
          <div className="hero-btns">
            <a href="#contact" className="btn-primary">
              📩 Get a Free Consultation
            </a>
            <a
              href="https://wa.me/971502392790"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              💬 WhatsApp Me
            </a>
          </div>
        </div>
      </section>

      <div className="badge-strip">
        {[
          "DOH Abu Dhabi Compliant",
          "DRG / Activity-Based Costing",
          "Shafafiya-Ready Submissions",
          "All Facility Types & Sizes",
          "1 AED Per Claim",
        ].map((b) => (
          <div className="badge-item" key={b}>
            <span className="dot" />
            {b}
          </div>
        ))}
      </div>

      <section className="why" id="why">
        <div className="inner">
          <div className="section-label">Why Choose Amr Selim</div>
          <h2 className="section-title">
            Your Compliance Partner,
            <br />
            Not Just a Vendor
          </h2>
          <div className="why-grid">
            <div className="why-cards">
              {[
                [
                  "🏆 UAE Market Expertise",
                  "Deep knowledge of DOH regulations, Abu Dhabi Clinical Costing Standards (Nov 2024), and Shafafiya submission requirements — built specifically for the UAE healthcare ecosystem.",
                ],
                [
                  "💰 Unbeatable Price — 1 AED/Claim",
                  "While competitors charge thousands per engagement, I offer per-claim pricing at just 1 AED — making compliance accessible for clinics of every size, from single-specialty to large hospitals.",
                ],
                [
                  "📊 DRG & ABF Alignment",
                  "Proper DRG mapping is critical under Abu Dhabi's value-based funding model. I structure your cost data to accurately reflect each encounter and ensure your reimbursements are never undervalued.",
                ],
                [
                  "✅ Support Until Accepted",
                  "I stay with you through every validation cycle. If the DOH flags an issue, I resolve it — no extra fees. You get a fully accepted, audit-ready submission, guaranteed.",
                ],
              ].map(([title, desc]) => (
                <div className="why-card" key={title}>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
            <div className="why-stat-box">
              <span className="big-stat">100%</span>
              <span className="stat-caption">
                DOH Submission Compliance Required
              </span>
              <div className="divider" />
              <p>
                Under the Abu Dhabi Clinical Costing Road Map 2025,{" "}
                <strong>all healthcare facilities</strong> providing direct
                patient care must submit standardized, patient-level cost data —
                regardless of size.
              </p>
              <br />
              <p style={{ color: "var(--teal)", fontWeight: 600 }}>
                I make sure you are never caught unprepared.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="inner">
          <div className="section-label">Services</div>
          <h2 className="section-title">
            Everything You Need
            <br />
            for DOH Compliance
          </h2>
          <p className="section-sub">
            End-to-end clinical costing support — from data collection to final
            submission and beyond.
          </p>
          <div className="services-grid">
            {[
              [
                "🗂️",
                "Patient-Level Cost Data Collection",
                "Capture and organize granular financial and clinical data per encounter — direct costs (medications, physician time) and indirect costs (overhead, admin) — structured per DOH ledger standards.",
              ],
              [
                "📐",
                "Activity-Based & DRG Costing",
                "Apply the right costing methodology for your facility. Accurate DRG mapping ensures your cost-to-tariff variance is visible and your service lines are properly funded.",
              ],
              [
                "📤",
                "DOH XML Submission Preparation",
                "Generate fully formatted, Shafafiya-validated XML files that pass DOH technical validations on the first attempt — eliminating costly re-submissions.",
              ],
              [
                "📈",
                "Cost & Profitability Reporting",
                "Understand your true service-line economics. Identify cost drivers, compare expected vs. actual costs per procedure, and discover where you are losing money under DRG billing.",
              ],
              [
                "🔍",
                "Audit-Ready Documentation",
                "Maintain a complete, traceable audit trail for all submitted cost data. Should the DOH audit your facility, you will have clean, organized records ready to present instantly.",
              ],
              [
                "🤝",
                "Ongoing Compliance Support",
                "As DOH standards evolve, I keep your process aligned. Annual resubmissions, updates to clinical costing guidelines, and new regulatory requirements — I handle it all.",
              ],
            ].map(([icon, title, desc]) => (
              <div className="svc-card" key={title}>
                <span className="svc-icon">{icon}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing" id="pricing">
        <div className="pricing-inner">
          <div className="section-label">Transparent Pricing</div>
          <h2 className="section-title">Simple. Honest. Affordable.</h2>
          <p
            className="section-sub"
            style={{ margin: "0 auto", textAlign: "center" }}
          >
            No complex packages. No hidden fees. Just the most competitive
            clinical costing rate in the UAE.
          </p>
          <div className="pricing-card">
            <div className="ribbon">UAE Most Affordable</div>
            <div className="price-amount">
              1{" "}
              <span style={{ fontSize: "2.2rem", color: "var(--muted)" }}>
                AED
              </span>
            </div>
            <div className="price-per">Per Claim / Patient Encounter</div>
            <ul className="price-features">
              {[
                "Full patient-level cost data processing",
                "DRG mapping & activity-based cost allocation",
                "DOH-compliant XML file generation",
                "Shafafiya validation & error correction",
                "Audit-ready documentation package",
                "Submission support until fully accepted",
                "Ongoing communication & status updates",
                "No minimum claim volume required",
              ].map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a
              href="#contact"
              className="btn-primary"
              style={{ display: "inline-flex", marginTop: "1rem" }}
            >
              📩 Start Your Submission Today
            </a>
            <p className="pricing-note">
              Volume discounts available for facilities submitting 50,000+
              claims/year.
              <br />
              Free initial consultation — no commitment required.
            </p>
          </div>
        </div>
      </section>

      <section className="process" id="process">
        <div className="inner" style={{ maxWidth: 900 }}>
          <div className="section-label">How It Works</div>
          <h2 className="section-title">
            From Raw Data to
            <br />
            Accepted Submission
          </h2>
          <p className="section-sub">
            A clear, structured process designed to minimize disruption to your
            team.
          </p>
          <div className="steps">
            {[
              [
                "Free Consultation & Scoping",
                "We discuss your facility type, claim volume, existing data systems (EMR/HIS/ERP), and timeline. I assess your data quality and outline exactly what is needed for your DOH submission.",
              ],
              [
                "Data Collection & Mapping",
                "I work with your finance and clinical teams to extract and structure the required financial, clinical, and operational data — mapping direct costs, indirect costs, and cost drivers per encounter.",
              ],
              [
                "Costing Engine & DRG Calculation",
                "Applying Abu Dhabi Clinical Costing Standards, I calculate patient-level costs using activity-based and DRG costing models — producing accurate, granular outputs for every encounter.",
              ],
              [
                "Validation & XML Generation",
                "I run all Shafafiya validation checks and generate DOH-compliant XML files. Any technical errors are corrected before submission — ensuring a clean first submission.",
              ],
              [
                "Submission & Acceptance",
                "I submit to the DOH portal and monitor the process until full acceptance is confirmed. You receive complete audit-ready documentation and a submission report.",
              ],
            ].map(([title, desc], i) => (
              <div className="step" key={title}>
                <div className="step-num">{i + 1}</div>
                <div className="step-body">
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-inner">
          <div className="section-label">About Me</div>
          <h2 className="section-title">
            Amr Selim
            <br />
            Clinical Costing Specialist
          </h2>
          <div className="about-box">
            <p>
              I am a qualified accountant based in Abu Dhabi with specialized
              expertise in healthcare finance and DOH clinical costing
              compliance. My background spans financial analysis, healthcare
              billing systems, and regulatory reporting across the UAE
              healthcare sector.
            </p>
            <p>
              With the rollout of the Abu Dhabi Clinical Costing Road Map 2025
              mandating patient-level cost data from all direct-care facilities,
              I saw a clear gap: most providers were either unaware of the
              requirements or could not afford the high fees charged by large
              consulting firms.
            </p>
            <p>
              I built my practice to change that — offering the same quality of
              DOH-compliant clinical costing at{" "}
              <strong style={{ color: "var(--gold)" }}>
                just 1 AED per claim
              </strong>
              , making compliance achievable for every facility from a small
              dental clinic to a multi-specialty medical center.
            </p>
            <div className="about-tags">
              {[
                "DOH Clinical Costing Standard 2024",
                "DRG / IR-DRG Mapping",
                "Activity-Based Costing",
                "Shafafiya Portal",
                "Healthcare Finance",
                "XML Submission",
                "Abu Dhabi UAE",
              ].map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-inner">
          <div className="section-label">Get In Touch</div>
          <h2 className="section-title">Request a Free Consultation</h2>
          <p className="section-sub">
            Fill in your details below and I will get back to you within 24
            hours with a tailored quote for your facility.
          </p>
          {status === "success" ? (
            <div className="success-msg">
              <h3>Enquiry Received!</h3>
              <p>
                Thank you! I will be in touch within 24 hours. Check your inbox
                — a confirmation email is on its way.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Dr. Ahmed Al Mansouri"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="facility">Facility / Organisation</label>
                  <input
                    id="facility"
                    name="facility"
                    type="text"
                    placeholder="Al Noor Hospital"
                    value={form.facility}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ahmed@clinic.ae"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone / WhatsApp</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+971 50 000 0000"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="license">Facility License Number</label>
                  <input
                    id="license"
                    name="license"
                    type="text"
                    placeholder="e.g. MF-123456"
                    value={form.license}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="claims">Estimated Monthly Claims</label>
                  <select
                    id="claims"
                    name="claims"
                    value={form.claims}
                    onChange={handleChange}
                  >
                    <option value="">Select volume...</option>
                    <option value="Under 1,000">Under 1,000 claims</option>
                    <option value="1,000 - 5,000">1,000 - 5,000 claims</option>
                    <option value="5,000 - 20,000">
                      5,000 - 20,000 claims
                    </option>
                    <option value="20,000 - 50,000">
                      20,000 - 50,000 claims
                    </option>
                    <option value="50,000+">50,000+ claims</option>
                  </select>
                </div>
                <div className="form-group full">
                  <label htmlFor="message">Message / Questions *</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your facility, your current costing setup, and any specific challenges you are facing with DOH submission..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              {status === "error" && (
                <div className="error-msg">⚠️ {errorMsg}</div>
              )}
              <button
                type="submit"
                className="btn-primary form-submit"
                disabled={status === "loading"}
              >
                {status === "loading"
                  ? "⏳ Sending..."
                  : "📩 Send My Enquiry — Free Consultation"}
              </button>
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "var(--muted)",
                  textAlign: "center",
                  marginTop: "1rem",
                }}
              >
                No spam. No commitment. I typically respond within a few hours.
              </p>
            </form>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              flexWrap: "wrap",
              marginTop: "2.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                fontSize: "0.87rem",
                color: "var(--muted)",
              }}
            >
              <span>📍</span>
              <span>Abu Dhabi, UAE</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                fontSize: "0.87rem",
                color: "var(--muted)",
              }}
            >
              <span>💬</span>
              <a
                href="https://wa.me/971502392790"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--teal)",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                WhatsApp: +971 50 239 2790
              </a>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                fontSize: "0.87rem",
                color: "var(--muted)",
              }}
            >
              <span>🕐</span>
              <span>Sun–Thu, 8am–6pm</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                fontSize: "0.87rem",
                color: "var(--muted)",
              }}
            >
              <span>✉️</span>
              <span>Free Initial Consultation</span>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p
          style={{
            fontFamily: "Playfair Display,serif",
            fontSize: "1rem",
            color: "var(--white)",
            marginBottom: "0.4rem",
          }}
        >
          Amr Selim — Clinical Costing Specialist
        </p>
        <p>
          Abu Dhabi, United Arab Emirates · DOH-Compliant Clinical Costing · 1
          AED Per Claim
        </p>
      </footer>
    </>
  );
}
