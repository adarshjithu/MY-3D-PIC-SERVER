"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegistrationHtml = getRegistrationHtml;
function getRegistrationHtml(link) {
    const currentYear = new Date().getFullYear();
    return `
  <!DOCTYPE html>
  <html lang="en" style="margin: 0; padding: 0">
    <head>
      <meta charset="UTF-8" />
      <title>Register with My 3D Pic</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          background-color: #ffffff;
          margin: 40px auto;
          padding: 30px;
          max-width: 600px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
        }
        .header h1 {
          margin: 0;
          color: #4b164c;
        }
        .content {
          font-size: 16px;
          color: #333333;
          line-height: 1.6;
        }
        .btn {
          display: inline-block;
          margin-top: 25px;
          background-color: #4b164c;
          color: white;
          padding: 12px 25px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
          transition: background-color 0.3s ease;
        }
        .btn:hover {
          background-color: #661d69;
        }
        .footer {
          margin-top: 40px;
          text-align: center;
          font-size: 12px;
          color: #777777;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to My 3D Pic 👋</h1>
        </div>
        <div class="content">
          <p>Hello,</p>
          <p>
            Thank you for choosing <strong>My 3D Pic</strong>. We’re excited to have you on board!
          </p>
          <p>
            To complete your registration, please click the button below:
          </p>
          <p style="text-align: center">
            <a href="${link}" class="btn" target="_blank">Complete Registration</a>
          </p>
          <p>
            If you did not request this, please ignore this email.
          </p>
          <p>Warm regards,<br /><strong>The My 3D Pic Team</strong></p>
        </div>
        <div class="footer">
          &copy; ${currentYear} My 3D Pic. All rights reserved.
        </div>
      </div>
    </body>
  </html>
  `;
}
