type ContactEmailProps = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function generateContactEmailHTML({
  name,
  email,
  subject,
  message,
}: ContactEmailProps): string {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f5f5f5;
      }
      .wrapper {
        background-color: #f5f5f5;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      .logo-section {
        background-color: #ffffff;
        padding: 20px;
        text-align: center;
        border-bottom: 1px solid #e9ecef;
      }
      .logo-section a {
        display: inline-block;
        text-decoration: none;
      }
      .logo-text {
        font-size: 28px;
        font-weight: 700;
        color: #ffffff;
        letter-spacing: -0.5px;
      }
      .header {
        background-color: #f8f9fa;
        padding: 30px 20px;
        border-bottom: 1px solid #e9ecef;
      }
      .header h1 {
        margin: 0;
        font-size: 22px;
        color: #212529;
        font-weight: 600;
      }
      .subheader {
        font-size: 14px;
        color: #6c757d;
        margin-top: 5px;
      }
      .content {
        padding: 30px 20px;
      }
      .field {
        margin-bottom: 24px;
      }
      .field:last-child {
        margin-bottom: 0;
      }
      .field-label {
        font-weight: 600;
        color: #667eea;
        margin-bottom: 6px;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .field-value {
        color: #212529;
        font-size: 15px;
        line-height: 1.5;
        word-break: break-word;
      }
      .field-value a {
        color: #667eea;
        text-decoration: none;
        font-weight: 500;
      }
      .field-value a:hover {
        text-decoration: underline;
      }
      .message-value {
        white-space: pre-wrap;
        background-color: #f8f9fa;
        padding: 15px;
        border-left: 4px solid #667eea;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        font-size: 14px;
        color: #495057;
      }
      .divider {
        height: 1px;
        background-color: #e9ecef;
        margin: 24px 0;
      }
      .footer {
        background-color: #f8f9fa;
        padding: 20px;
        border-top: 1px solid #e9ecef;
        text-align: center;
        font-size: 12px;
        color: #6c757d;
      }
      .footer-link {
        color: #667eea;
        text-decoration: none;
      }
      .footer-link:hover {
        text-decoration: underline;
      }
      .cta-button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #667eea;
        color: #ffffff;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 500;
        margin-top: 15px;
        transition: background-color 0.3s ease;
      }
      .cta-button:hover {
        background-color: #764ba2;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="container">
        <!-- Logo Section -->
        <div class="logo-section">
          <a href="https://webequate.com" target="_blank" rel="noopener noreferrer">
            <img src="https://portfolio.webequate.com/assets/logo-webequate-light.png" alt="WebEquate Logo" style="max-width: 140px; height: auto; display: block;">
          </a>
        </div>

        <!-- Header -->
        <div class="header">
          <h1>New Contact Form Submission</h1>
          <div class="subheader">From portfolio.webequate.com</div>
        </div>

        <!-- Content -->
        <div class="content">
          <div class="field">
            <div class="field-label">From</div>
            <div class="field-value">${escapeHtml(name)}</div>
          </div>

          <div class="field">
            <div class="field-label">Email Address</div>
            <div class="field-value">
              <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
            </div>
          </div>

          <div class="field">
            <div class="field-label">Subject</div>
            <div class="field-value">${escapeHtml(subject)}</div>
          </div>

          <div class="divider"></div>

          <div class="field">
            <div class="field-label">Message</div>
            <div class="field-value message-value">${escapeHtml(message)}</div>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <p>This message was sent from <a href="https://portfolio.webequate.com" class="footer-link">portfolio.webequate.com</a></p>
          <p style="margin-top: 10px; font-size: 11px;">© 2026 Allen Johnson. All rights reserved.</p>
        </div>
      </div>
    </div>
  </body>
</html>
  `.trim();
}

export function generateContactEmailText({
  name,
  email,
  subject,
  message,
}: ContactEmailProps): string {
  return `
New Contact Form Submission

Website: https://portfolio.webequate.com

Name: ${name}

Email: ${email}

Subject: ${subject}

Message:
${message}
  `.trim();
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
