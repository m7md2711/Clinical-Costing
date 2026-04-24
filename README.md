# Amro Saliem — Clinical Costing Website
## Vercel Deployment Guide (Step-by-Step)

---

## STEP 1 — Get a Gmail App Password

You need an App Password so the site can send emails through Gmail.

1. Go to **myaccount.google.com**
2. Click **Security** in the left sidebar
3. Enable **2-Step Verification** (if not already on)
4. Go back to **Security → App Passwords**
5. Click **Select app → Other (custom name)** → type "Amro Site" → click **Generate**
6. Copy the 16-character password shown (e.g. `abcd efgh ijkl mnop` — no spaces)

---

## STEP 2 — Push to GitHub

1. Create a free account at **github.com** if you don't have one
2. Create a **New Repository** → name it `amro-saliem-site` → make it **Private**
3. Upload all the files from this folder into the repository
   - Or use Git on your computer:
     ```bash
     git init
     git add .
     git commit -m "Initial site"
     git remote add origin https://github.com/YOUR_USERNAME/amro-saliem-site.git
     git push -u origin main
     ```

---

## STEP 3 — Deploy on Vercel

1. Go to **vercel.com** → Sign up / Log in with your GitHub account
2. Click **"Add New Project"**
3. Select your **amro-saliem-site** repository → Click **Import**
4. Framework will auto-detect as **Next.js** — leave defaults
5. Click **Deploy**

---

## STEP 4 — Add Environment Variables (SMTP)

After first deploy, go to your project in Vercel:

1. Click **Settings** → **Environment Variables**
2. Add these three variables one by one:

| Variable Name       | Value                          |
|---------------------|--------------------------------|
| `SMTP_USER`         | your-gmail@gmail.com           |
| `SMTP_PASS`         | your-16-char-app-password      |
| `CONTACT_RECEIVER`  | amro.saliem@gmail.com          |

3. Click **Save** after each one
4. Go to **Deployments** → click the three dots on the latest deployment → **Redeploy**

---

## STEP 5 — Add a Custom Domain (Optional)

1. In Vercel → your project → **Settings → Domains**
2. Type your domain (e.g. `amrosaliem.com`) → Add
3. Follow the DNS instructions Vercel shows you

---

## How the Contact Form Works

When a visitor fills out the form:
- ✅ They receive an **auto-reply email** confirming their enquiry
- ✅ You receive a **formatted notification email** with:
  - Their name, facility, email, phone
  - Estimated monthly claim volume + estimated revenue for you
  - Their message
- ✅ You can **reply directly** to the email to respond to them

---

## File Structure

```
amro-saliem-site/
├── pages/
│   ├── index.js          ← The full website
│   ├── _app.js           ← Next.js app wrapper
│   └── api/
│       └── contact.js    ← SMTP email handler
├── package.json
├── next.config.js
├── vercel.json
├── .env.local.example    ← Copy this for local testing
└── README.md
```

## Local Testing

```bash
npm install
cp .env.local.example .env.local
# Fill in your real values in .env.local
npm run dev
# Open http://localhost:3000
```
"# Clinical-Costing" 
