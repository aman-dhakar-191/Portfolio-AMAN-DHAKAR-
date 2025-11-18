# Quick Start Guide

Get your portfolio up and running in minutes!

## Prerequisites

- Node.js 20.x or higher installed
- A Google account for authentication
- 15 minutes of your time

## Step 1: Install Dependencies (1 minute)

```bash
npm install
```

## Step 2: Firebase Setup (5 minutes)

### Create Firebase Project

1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name it (e.g., "my-portfolio")
4. Disable Google Analytics (optional)
5. Click "Create project"

### Enable Authentication

1. Click "Authentication" → "Get started"
2. Click "Google" → Enable → Save

### Enable Database

1. Click "Realtime Database" → "Create Database"
2. Choose location → Start in test mode → Enable

### Get Credentials

1. Click gear icon → "Project Settings"
2. Scroll to "Your apps" → Click web icon (</>)
3. Register app → Copy the config values

## Step 3: Configure Environment (2 minutes)

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and paste your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=AIza...
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
   VITE_FIREBASE_PROJECT_ID=your-project
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123...
   VITE_FIREBASE_APP_ID=1:123...
   ```

## Step 4: Run the App (1 minute)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 5: Add Your Content (5 minutes)

1. Click "Owner Login"
2. Sign in with Google
3. Fill in your profile information
4. Add your projects
5. Add your certificates
6. Click "View Public Portfolio" to see the result!

## Step 6: Deploy (Optional, 5 minutes)

### Quick Deploy

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

Your site will be live at `https://your-project.web.app`

## What You Get

✅ **Public Portfolio Page**
- Your profile with photo, title, and bio
- Projects showcase with technologies and links
- Certificates with issuer and dates
- Professional, responsive design

✅ **Owner Dashboard**
- Easy-to-use management interface
- Add/edit/delete projects and certificates
- Update profile information
- Real-time updates

✅ **Secure Authentication**
- Google OAuth login
- Your data is protected
- Only you can edit your portfolio

## Next Steps

- Customize colors in CSS files
- Add your own branding
- Deploy to production
- Share your portfolio link!

## Need Help?

- 📖 Read the full [README.md](README.md)
- 🔧 Check [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for detailed Firebase configuration
- 🐛 Found a bug? Open an issue on GitHub

## Tips

💡 **Pro Tip**: Take screenshots of your projects and host them on Firebase Storage, then link them in your project descriptions.

💡 **Pro Tip**: Use the public URL format `https://your-app.web.app/portfolio/YOUR_USER_ID` to share your portfolio.

💡 **Pro Tip**: Set up the GitHub Actions workflow for automatic deployment on every push to main.

---

**Congratulations!** 🎉 You now have a professional portfolio website!
