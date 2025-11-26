const nodemailer = require("nodemailer");

// Netlify Function Handler
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    // Parse the request body
    const { name, email, message } = JSON.parse(event.body);

    // Validate input
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: "Missing required fields",
        }),
      };
    }

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Email to Admin
    await transporter.sendMail({
      from: process.env.REACT_APP_RESEND_FROM_EMAIL,
      to:
        process.env.REACT_APP_RESEND_FROM_EMAIL || "harshal.dev701@gmail.com",
      subject: "New Contact Form Submission",
      html: `
<div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6fb; padding: 0; margin: 0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 650px; margin: 30px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 25px rgba(0,0,0,0.08);">
    
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 35px 25px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">📩 New Contact Form Message</h1>
        <p style="color: rgba(255,255,255,0.85); margin-top: 8px; font-size: 14px;">
          A visitor just submitted your website form
        </p>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 30px;">
        <h3 style="margin: 0 0 20px; font-size: 18px; color: #0f172a;">Contact Details</h3>

        <div style="margin-bottom: 15px;">
          <strong style="color: #374151;">👤 Name:</strong>
          <p style="margin: 5px 0 0; font-size: 15px; color: #1e293b;">${name}</p>
        </div>

        <div style="margin-bottom: 15px;">
          <strong style="color: #374151;">📧 Email:</strong>
          <p style="margin: 5px 0 0; font-size: 15px; color: #1e293b;">${email}</p>
        </div>

        <div style="margin-top: 25px;">
          <strong style="color: #374151;">💬 Message:</strong>
          <div style="margin-top: 10px; background: #f8fafc; padding: 18px; border-left: 4px solid #6366f1; border-radius: 8px; color: #334155; font-size: 15px; line-height: 1.6;">
            ${message}
          </div>
        </div>

        <div style="margin-top: 30px; background: #eef2ff; border: 2px dashed #c7d2fe; border-radius: 10px; padding: 18px; text-align: center;">
          <p style="color: #4338ca; margin: 0; font-size: 14px;">
            You can reply directly to this email to contact the sender.
          </p>
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background: #f1f5f9; padding: 16px; text-align: center; font-size: 13px; color: #64748b;">
        This automated message was generated from your website contact form.
      </td>
    </tr>

  </table>
</div>
`,
    });

    // Email to User
    await transporter.sendMail({
      from: `"Harshal Chaklasiya" <${process.env.REACT_APP_RESEND_FROM_EMAIL}>`,
      to: email,
      subject: `Hi, ${name}! Thank You for Contacting Harshal!`,
      html: `
<div style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.7; color: #0f172a; max-width: 620px; margin: 0 auto; background: #f8fafc; border-radius: 10px; overflow: hidden;">
  <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 35px 25px; text-align: center;">
    <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 600;">
      Thank You for Reaching Out!
    </h1>
    <p style="color: #e0e7ff; margin-top: 10px; font-size: 16px;">
      I've received your message and will get back to you shortly.
    </p>
  </div>

  <div style="padding: 28px 30px; background: #ffffff;">
    <p style="margin-bottom: 18px; color: #334155; font-size: 16px;">Hi 👋,</p>

    <p style="margin-bottom: 20px; color: #334155; font-size: 16px;">
      Thank you for contacting <strong>Harshal Chaklasiya</strong>.  
      I appreciate your time and interest. I've successfully received your message from my portfolio website.
    </p>

    <p style="margin-bottom: 20px; color: #334155; font-size: 16px;">
      If your inquiry is urgent, feel free to reach out directly at:
    </p>

    <div style="margin: 20px 0; background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px; padding: 18px;">
      <p style="margin: 0; color: #1e293b; font-size: 15px; text-align: center;">
        📧 Email: <strong>${process.env.REACT_APP_RESEND_FROM_EMAIL}</strong><br />
        📱 Portfolio: <a href="${process.env.REACT_APP_PORTFOLIO_URL}" target="_blank" style="color: #4f46e5; text-decoration: none;">${process.env.REACT_APP_PORTFOLIO_URL}</a>
      </p>
    </div>

    <p style="margin-top: 25px; color: #334155; font-size: 16px;">
      Thank you once again! Looking forward to connecting with you!
    </p>

    <p style="margin-top: 12px; color: #334155; font-size: 16px; font-weight: 600;">
      — Harshal Chaklasiya
    </p>
  </div>

  <div style="background: #f1f5f9; padding: 15px 20px; text-align: center;">
    <p style="margin: 0; color: #475569; font-size: 13px;">
      This is an automated message sent from Dhruv's Portfolio website.
    </p>
  </div>
</div>
`,
    });

    // Return success response
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("Error sending email:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        success: false,
        error: "Failed to send email",
      }),
    };
  }
};