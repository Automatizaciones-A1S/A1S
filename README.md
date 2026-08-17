# A1S Static Site (local)

This folder contains a static copy of the A1S site. To open it in your browser via `http://localhost:8080` you can use Node.js to run a tiny static server.

Quick start (Windows):

1. Open PowerShell or Command Prompt in this folder.
2. Run:

```powershell
npm install --no-audit --no-fund
npm start
```

Or double-click `start-local-server.bat` which will launch the server and open your default browser at `http://localhost:8080`.

If you prefer not to use Node, you can serve files with Python:

```powershell
python -m http.server 8080
```

Open `http://localhost:8080` in your browser.

## SMS verification setup

To send the verification code by SMS, add these variables to `.env` using your Twilio credentials:

```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_FROM=+1234567890
```

Once configured, the PQRS form will send the verification code to the phone number entered by the user.
