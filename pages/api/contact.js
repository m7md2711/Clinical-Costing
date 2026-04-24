import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, facility, email, phone, claims, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Georgia, serif; background: #0D1B1E; color: #F4F8F7; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 0 auto; background: #1C2E32; border-radius: 8px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #00A99D, #007A71); padding: 2rem; text-align: center; }
    .header h1 { color: #fff; font-size: 1.4rem; margin: 0; }
    .header p { color: rgba(255,255,255,0.8); font-size: 0.85rem; margin: 0.3rem 0 0; }
    .body { padding: 2rem; }
    .field { margin-bottom: 1.2rem; border-bottom: 1px solid rgba(0,169,157,0.15); padding-bottom: 1rem; }
    .field label { display: block; font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: #00A99D; margin-bottom: 0.3rem; }
    .field span { font-size: 1rem; color: #F4F8F7; }
    .message-box { background: rgba(0,169,157,0.08); border-left: 3px solid #00A99D; padding: 1rem; border-radius: 4px; color: #F4F8F7; font-size: 0.95rem; line-height: 1.6; }
    .price-tag { display: inline-block; background: #C9A84C; color: #0D1B1E; font-weight: 700; padding: 0.3rem 0.8rem; border-radius: 3px; font-size: 0.85rem; margin-top: 0.5rem; }
    .footer { background: #0D1B1E; padding: 1rem 2rem; text-align: center; font-size: 0.78rem; color: #7A9A98; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>🏥 New Clinical Costing Enquiry</h1>
      <p>Received via amrosaliem.com</p>
    </div>
    <div class="body">
      <div class="field">
        <label>Full Name</label>
        <span>${name}</span>
      </div>
      <div class="field">
        <label>Facility / Organisation</label>
        <span>${facility || '—'}</span>
      </div>
      <div class="field">
        <label>Email Address</label>
        <span><a href="mailto:${email}" style="color:#00A99D;">${email}</a></span>
      </div>
      <div class="field">
        <label>Phone / WhatsApp</label>
        <span>${phone || '—'}</span>
      </div>
      <div class="field">
        <label>Estimated Monthly Claims</label>
        <span>${claims || '—'}</span>
        ${claims ? `<div class="price-tag">Est. Revenue: ${parseInt(claims.replace(/[^0-9]/g,'')) || 0} AED/month</div>` : ''}
      </div>
      <div class="field" style="border-bottom:none;">
        <label>Message</label>
        <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
    <div class="footer">
      Reply directly to this email to respond to ${name} &nbsp;·&nbsp; Amro Saliem Clinical Costing
    </div>
  </div>
</body>
</html>
  `;

  try {
    await transporter.sendMail({
      from: `"Amro Saliem Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER,
      replyTo: email,
      subject: `New Enquiry from ${name} — ${facility || 'Unknown Facility'}`,
      html: htmlBody,
    });

    // Send auto-reply to the client
    await transporter.sendMail({
      from: `"Amro Saliem | Clinical Costing" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Thank you for your enquiry — Amro Saliem',
      html: `
<!DOCTYPE html>
<html>
<head><style>
  body { font-family: Georgia, serif; background: #0D1B1E; color: #F4F8F7; margin: 0; padding: 0; }
  .w { max-width: 560px; margin: 0 auto; background: #1C2E32; border-radius: 8px; overflow: hidden; }
  .h { background: linear-gradient(135deg, #00A99D, #007A71); padding: 2rem; text-align: center; }
  .h h1 { color: #fff; margin: 0; font-size: 1.3rem; }
  .b { padding: 2rem; line-height: 1.7; color: #F4F8F7; }
  .b p { margin-bottom: 1rem; }
  .gold { color: #C9A84C; font-weight: 700; }
  .f { background: #0D1B1E; padding: 1rem 2rem; text-align: center; font-size: 0.78rem; color: #7A9A98; }
</style></head>
<body>
  <div class="w">
    <div class="h"><h1>Thank You, ${name}! 🏥</h1></div>
    <div class="b">
      <p>I've received your enquiry and will get back to you within <strong>24 hours</strong> (usually much sooner).</p>
      <p>As a reminder, my clinical costing service is priced at <span class="gold">1 AED per claim</span> — fully DOH-compliant, covering patient-level cost data, DRG mapping, Shafafiya XML submission, and audit-ready documentation.</p>
      <p>If you need to reach me urgently, feel free to reply to this email or contact me via WhatsApp.</p>
      <p>Looking forward to helping your facility achieve full DOH compliance.</p>
      <p>Warm regards,<br><strong>Amro Saliem</strong><br>Clinical Costing Specialist · Abu Dhabi, UAE</p>
    </div>
    <div class="f">amrosaliem.com &nbsp;·&nbsp; Abu Dhabi, UAE &nbsp;·&nbsp; DOH Clinical Costing</div>
  </div>
</body>
</html>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('SMTP error:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
}
