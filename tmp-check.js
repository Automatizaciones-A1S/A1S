require('dotenv').config();
const nodemailer = require('nodemailer');
const hosts = ['smtp.office365.com', 'smtp.gmail.com', 'mail.a1scolombia.com'];
const ports = [587, 465];
const secures = [false, true];
(async () => {
  for (const host of hosts) {
    for (const port of ports) {
      for (const secure of secures) {
        const transporter = nodemailer.createTransport({ host, port, secure, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } });
        try {
          await transporter.verify();
          console.log('OK', host, port, secure);
          process.exit(0);
        } catch (err) {
          console.log('ERR', host, port, secure, err.message);
        }
      }
    }
  }
  process.exit(1);
})();
