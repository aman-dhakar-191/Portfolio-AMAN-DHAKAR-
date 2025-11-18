# Firebase Setup Guide

This guide will walk you through setting up Firebase for your portfolio application.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "portfolio-aman-dhakar")
4. Accept terms and click "Continue"
5. (Optional) Enable Google Analytics
6. Click "Create project"

## Step 2: Set Up Authentication

1. In your Firebase project, click on "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Google" as a sign-in provider:
   - Click on "Google"
   - Toggle "Enable"
   - Add your support email
   - Click "Save"

## Step 3: Set Up Realtime Database

1. In your Firebase project, click on "Realtime Database" in the left sidebar
2. Click "Create Database"
3. Choose your database location (choose closest to your users)
4. Start in "Test mode" for now (we'll update rules later)
5. Click "Enable"

### Update Database Rules

1. Go to the "Rules" tab in Realtime Database
2. Replace the rules with the following:

```json
{
  "rules": {
    "profiles": {
      "$uid": {
        ".read": true,
        ".write": "$uid === auth.uid"
      }
    },
    "projects": {
      "$uid": {
        ".read": true,
        ".write": "$uid === auth.uid"
      }
    },
    "certificates": {
      "$uid": {
        ".read": true,
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

3. Click "Publish"

These rules ensure:
- Anyone can read all data (for public portfolio view)
- Only authenticated users can write to their own data

## Step 4: Get Firebase Configuration

1. Go to Project Settings (click the gear icon next to "Project Overview")
2. Scroll down to "Your apps" section
3. Click the web icon (</>)
4. Register your app with a nickname (e.g., "Portfolio Web App")
5. Don't enable Firebase Hosting yet (we'll do this separately)
6. Click "Register app"
7. Copy the Firebase configuration object

## Step 5: Configure Your Local Environment

1. In your project root, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and fill in your Firebase credentials from the config object:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
   VITE_FIREBASE_PROJECT_ID=your-project
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123
   ```

## Step 6: Test Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:3000`
4. Click "Owner Login" and sign in with your Google account
5. Add your profile information, projects, and certificates
6. Test the public view

## Step 7: Set Up Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init
   ```
   
   - Select "Hosting"
   - Choose your existing Firebase project
   - Use `dist` as your public directory
   - Configure as a single-page app: **Yes**
   - Set up automatic builds with GitHub: **No** (we'll use GitHub Actions)
   - Don't overwrite `dist/index.html`

4. Build your project:
   ```bash
   npm run build
   ```

5. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

Your site will be deployed to `https://your-project.web.app`

## Step 8: Set Up Automated Deployment (Optional)

To enable automatic deployment via GitHub Actions:

1. Generate a Firebase service account key:
   - Go to Firebase Console > Project Settings > Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file securely

2. Add GitHub Secrets:
   - Go to your GitHub repository > Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Add the following secrets:
     - `VITE_FIREBASE_API_KEY`
     - `VITE_FIREBASE_AUTH_DOMAIN`
     - `VITE_FIREBASE_DATABASE_URL`
     - `VITE_FIREBASE_PROJECT_ID`
     - `VITE_FIREBASE_STORAGE_BUCKET`
     - `VITE_FIREBASE_MESSAGING_SENDER_ID`
     - `VITE_FIREBASE_APP_ID`
     - `FIREBASE_SERVICE_ACCOUNT` (paste the entire JSON content from step 1)

3. Push to `main` branch:
   ```bash
   git push origin main
   ```

GitHub Actions will automatically build and deploy your site on every push to the main branch.

## Troubleshooting

### Authentication Issues

- Make sure Google sign-in is enabled in Firebase Console
- Check that the auth domain matches your Firebase configuration
- Verify you're using a supported browser

### Database Permission Denied

- Ensure database rules are properly configured
- Make sure you're signed in when trying to write data
- Check that the user ID matches the authenticated user

### Build Failures

- Ensure all environment variables are set
- Check that Node.js version is 20.x or higher
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`

### Deployment Issues

- Make sure Firebase CLI is installed and you're logged in
- Verify the project ID in firebase.json matches your Firebase project
- Check that the build completed successfully before deploying

## Security Best Practices

1. **Never commit `.env` file to Git** - It's in .gitignore by default
2. **Use environment variables** for all sensitive data
3. **Review database rules** regularly to ensure data security
4. **Enable App Check** (optional) for additional security
5. **Set up billing alerts** to monitor Firebase usage

## Next Steps

After setup:
1. Customize the design to match your personal brand
2. Add more sections (education, skills, testimonials, etc.)
3. Integrate analytics to track visitors
4. Add contact form functionality
5. Consider adding image upload for projects and certificates

## Support

If you encounter issues:
1. Check Firebase Console for error logs
2. Review browser console for JavaScript errors
3. Consult [Firebase Documentation](https://firebase.google.com/docs)
4. Open an issue on GitHub
