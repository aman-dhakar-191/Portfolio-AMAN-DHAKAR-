# Portfolio-AMAN-DHAKAR-

A modern portfolio web application built with React, Firebase Authentication, and Firebase Realtime Database. This application allows owners to manage their portfolio content (profile, projects, certificates) while providing a public view for visitors.

## Features

### Public View
- View portfolio owner's profile information
- Browse projects with technologies and links
- View certificates and credentials
- Clean, responsive design

### Owner Dashboard (Authenticated)
- Google OAuth authentication
- Manage profile information (name, title, bio, contact details)
- Add, view, and delete projects
- Add, view, and delete certificates
- Real-time data synchronization with Firebase

## Tech Stack

- **Frontend**: React 19 with Vite
- **Routing**: React Router DOM v7
- **Authentication**: Firebase Authentication (Google OAuth)
- **Database**: Firebase Realtime Database
- **Styling**: CSS3 with modern design
- **Deployment**: Firebase Hosting
- **CI/CD**: GitHub Actions

## Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Firebase account
- Firebase CLI (for deployment)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/aman-dhakar-191/Portfolio-AMAN-DHAKAR-.git
cd Portfolio-AMAN-DHAKAR-
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new Firebase project
3. Enable **Authentication** and add Google as a sign-in provider
4. Enable **Realtime Database** and set up rules:

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

5. Go to Project Settings > General and copy your Firebase config

### 4. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Fill in your Firebase credentials in the `.env` file:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 5. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 6. Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Deployment

### Manual Deployment to Firebase

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase (if not already done):
```bash
firebase init
```
- Select "Hosting"
- Choose your Firebase project
- Set public directory to `dist`
- Configure as single-page app: Yes
- Don't overwrite index.html

4. Build and deploy:
```bash
npm run build
firebase deploy
```

### Automated Deployment with GitHub Actions

The repository includes a GitHub Actions workflow for automatic deployment to Firebase Hosting.

#### Setup GitHub Secrets

Add the following secrets to your GitHub repository (Settings > Secrets and variables > Actions):

1. Firebase credentials:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_DATABASE_URL`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

2. Firebase service account:
   - `FIREBASE_SERVICE_ACCOUNT`: Get this from Firebase Console > Project Settings > Service Accounts > Generate New Private Key

The workflow will automatically:
- Build the project on every push to `main`
- Deploy to Firebase Hosting on successful build

## Usage

### For Visitors (Public View)

1. Navigate to the deployed URL or `http://localhost:3000`
2. View the portfolio owner's information, projects, and certificates

### For Owner (Authenticated User)

1. Click "Owner Login" button
2. Sign in with your Google account
3. After authentication, you'll be redirected to the dashboard
4. Use the tabs to:
   - **Profile**: Update your personal information
   - **Projects**: Add, view, or delete projects
   - **Certificates**: Add, view, or delete certificates
5. Click "View Public Portfolio" to see how your portfolio looks to visitors

## Project Structure

```
Portfolio-AMAN-DHAKAR-/
├── .github/
│   └── workflows/
│       └── firebase-deploy.yml    # GitHub Actions workflow
├── public/                        # Public static assets
├── src/
│   ├── components/               # React components
│   │   ├── Auth.jsx             # Authentication component
│   │   ├── Auth.css
│   │   ├── Header.jsx           # Header component
│   │   └── Header.css
│   ├── pages/                   # Page components
│   │   ├── Dashboard.jsx        # Owner dashboard
│   │   ├── Dashboard.css
│   │   ├── PublicView.jsx       # Public portfolio view
│   │   └── PublicView.css
│   ├── services/                # Service layer
│   │   ├── authService.js       # Authentication services
│   │   └── dataService.js       # Database services
│   ├── config/
│   │   └── firebase.js          # Firebase configuration
│   ├── App.jsx                  # Main App component
│   ├── App.css
│   ├── main.jsx                 # App entry point
│   └── index.css
├── .env.example                 # Environment variables template
├── .gitignore
├── firebase.json                # Firebase hosting config
├── index.html                   # HTML template
├── package.json
├── README.md
└── vite.config.js              # Vite configuration
```

## Database Structure

```
portfolio-db/
├── profiles/
│   └── {userId}/
│       ├── name
│       ├── email
│       ├── photoURL
│       ├── title
│       ├── bio
│       ├── phone
│       └── location
├── projects/
│   └── {userId}/
│       └── {projectId}/
│           ├── id
│           ├── title
│           ├── description
│           ├── technologies
│           ├── link
│           └── createdAt
└── certificates/
    └── {userId}/
        └── {certificateId}/
            ├── id
            ├── title
            ├── issuer
            ├── date
            ├── link
            └── createdAt
```

## Security

- Authentication is required for all write operations
- Firebase security rules ensure users can only modify their own data
- All data is read-accessible to support public portfolio viewing
- Environment variables keep Firebase credentials secure

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC

## Support

For issues and questions, please open an issue on GitHub.
