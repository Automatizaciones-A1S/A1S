require('dotenv').config();

const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const querystring = require('querystring');
const nodemailer = require('nodemailer');

const ROOT = path.resolve(__dirname);
const PORT = Number(process.env.PORT) || 8080;
const HOST = process.env.HOST || '0.0.0.0';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.jsx': 'text/jsx; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ogv': 'video/ogg'
};

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'accelerometer=(), autoplay=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https: data:; img-src 'self' data: https: blob:; font-src 'self' data: https:; connect-src 'self' https: wss:; media-src 'self' data: https:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self';"
};

function withSecurityHeaders(headers = {}) {
  return { ...SECURITY_HEADERS, ...headers };
}

const SMTP_HOST = (process.env.SMTP_HOST || 'smtp.gmail.com').trim();
const SMTP_SERVICE = (process.env.SMTP_SERVICE || 'gmail').trim();
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_SECURE = String(process.env.SMTP_SECURE || 'false') === 'true';
const transporter = (SMTP_SERVICE || SMTP_HOST) && process.env.SMTP_USER && process.env.SMTP_PASS
  ? nodemailer.createTransport({
      service: SMTP_SERVICE,
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      requireTLS: true,
      debug: String(process.env.SMTP_DEBUG || 'false') === 'true'
    })
  : null;

async function sendMail(message) {
  if (!transporter) return { ok: false, reason: 'SMTP_NOT_CONFIGURED' };
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER || 'automatizaciones@a1scolombia.com',
      ...message
    });
    return { ok: true, messageId: info.messageId, accepted: info.accepted || [], rejected: info.rejected || [] };
  } catch (error) {
    return { ok: false, reason: error.message, code: error.code || null };
  }
}

async function sendSms(message) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;
  if (!accountSid || !authToken || !from) return { ok: false, reason: 'SMS_NOT_CONFIGURED' };
  const postData = querystring.stringify({
    To: message.to,
    From: from,
    Body: message.body || message.text || ''
  });
  return new Promise(function (resolve) {
    const options = {
      hostname: 'api.twilio.com',
      port: 443,
      path: '/2010-04-01/Accounts/' + accountSid + '/Messages.json',
      method: 'POST',
      auth: accountSid + ':' + authToken,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    const req = https.request(options, function (res) {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', function (chunk) { data += chunk; });
      res.on('end', function () {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ ok: true, response: data });
        } else {
          resolve({ ok: false, reason: data || ('HTTP_' + res.statusCode) });
        }
      });
    });
    req.on('error', function (error) {
      resolve({ ok: false, reason: error.message });
    });
    req.write(postData);
    req.end();
  });
}

async function sendMessage(message) {
  if (message && (message.channel === 'sms' || message.sms === true || message.type === 'sms')) {
    return sendSms(message);
  }
  return sendMail(message);
}

if (transporter) {
  transporter.verify().then(function () {
    console.log('SMTP ready for email delivery.');
  }).catch(function (error) {
    console.error('SMTP verification failed:', error.message);
  });
}

function createRequestHandler() {
  return async (req, res) => {
    try {
      const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
      const requestPath = decodeURIComponent(requestUrl.pathname || '/');
      const safePath = path.normalize(requestPath).replace(/^\.+([/\\])/, '');
      let filePath = path.join(ROOT, safePath);

      if (filePath.endsWith(path.sep)) {
        filePath = path.join(filePath, 'index.html');
      }

      const stat = await fs.stat(filePath);
      if (stat.isDirectory()) {
        filePath = path.join(filePath, 'index.html');
        await fs.access(filePath);
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      const body = await fs.readFile(filePath);

      res.writeHead(200, withSecurityHeaders({ 'Content-Type': contentType }));
      res.end(body);
    } catch (error) {
      if (req.url.startsWith('/api/pqrs/send')) {
        try {
          const chunks = [];
          for await (const chunk of req) chunks.push(chunk);
          const payload = JSON.parse(Buffer.concat(chunks).toString('utf8'));
          const result = await sendMessage(payload);
          res.writeHead(result.ok ? 200 : 500, withSecurityHeaders({ 'Content-Type': 'application/json; charset=utf-8' }));
          res.end(JSON.stringify({
            ok: result.ok,
            reason: result.reason,
            messageId: result.messageId,
            payload: payload
          }));
          return;
        } catch (parseError) {
          res.writeHead(400, withSecurityHeaders({ 'Content-Type': 'application/json; charset=utf-8' }));
          res.end(JSON.stringify({ ok: false, reason: 'INVALID_PAYLOAD' }));
          return;
        }
      }

      res.writeHead(404, withSecurityHeaders({ 'Content-Type': 'text/plain; charset=utf-8' }));
      res.end('404 Not Found');
    }
  };
}

function createServer() {
  const server = http.createServer(createRequestHandler());
  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Close the existing process or change PORT.`);
      process.exit(1);
    }
    throw error;
  });
  return server;
}

async function startServer() {
  const server = createServer();
  await new Promise((resolve) => server.listen(PORT, HOST, resolve));
  console.log(`Static server running at http://127.0.0.1:${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser.`);
  console.log('Press Ctrl+C to stop.');
  return server;
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = { createServer, createRequestHandler };
