const nodemailer = require('nodemailer')

// Build transporter once
let transporter = null
function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
  }
  return transporter
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// POST /api/contact
exports.sendMessage = async (req, res) => {
  const { name, email, subject, message } = req.body

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' })
  }
  if (message.length > 2000) {
    return res.status(400).json({ error: 'Message too long (max 2000 chars).' })
  }

  const safeName    = escapeHtml(name)
  const safeEmail   = escapeHtml(email)
  const safeSubject = escapeHtml(subject || 'Portfolio Contact')
  const safeMessage = escapeHtml(message)

  const htmlBody = `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; background: #0a0a0f; color: #e8e8f0; border-radius: 12px; overflow: hidden; border: 1px solid #2a2a3a;">
      <div style="background: linear-gradient(135deg, #7c3aed, #06b6d4); padding: 24px 32px;">
        <h2 style="margin: 0; color: #fff; font-size: 20px;">📬 New Portfolio Message</h2>
      </div>
      <div style="padding: 32px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #7070a0; font-size: 13px; width: 80px;">From</td>
            <td style="padding: 8px 0; font-weight: 600;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #7070a0; font-size: 13px;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #06b6d4;">${safeEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #7070a0; font-size: 13px;">Subject</td>
            <td style="padding: 8px 0;">${safeSubject}</td>
          </tr>
        </table>
        <div style="margin-top: 24px; padding: 20px; background: #111118; border-radius: 8px; border: 1px solid #2a2a3a;">
          <p style="margin: 0; line-height: 1.7; white-space: pre-wrap;">${safeMessage}</p>
        </div>
        <p style="margin-top: 24px; color: #7070a0; font-size: 12px;">
          Sent via your portfolio contact form · ${new Date().toLocaleString()}
        </p>
      </div>
    </div>
  `

  try {
    const mailer = getTransporter()
    await mailer.sendMail({
      from: `"${safeName} via Portfolio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `[Portfolio] ${safeSubject}`,
      html: htmlBody,
    })
    res.json({ success: true, message: 'Message sent successfully!' })
  } catch (err) {
    console.error('Email error:', err.message)
    res.status(500).json({ error: 'Failed to send email. Please try again later.' })
  }
}
