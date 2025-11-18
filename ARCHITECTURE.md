# Application Architecture

This document explains the technical architecture of the Portfolio application.

## Overview

The application follows a modern React architecture with Firebase backend services, implementing a clear separation between presentation, business logic, and data layers.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Public View  │  │    Login     │  │  Dashboard   │      │
│  │   (Guest)    │  │   (Auth)     │  │   (Owner)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                           │                                  │
│                           ▼                                  │
│         ┌─────────────────────────────────────┐             │
│         │        React Router (v7)            │             │
│         │  - Route management                 │             │
│         │  - Protected routes                 │             │
│         │  - Navigation                       │             │
│         └─────────────────────────────────────┘             │
│                           │                                  │
│         ┌─────────────────┴─────────────────┐               │
│         │                                    │               │
│         ▼                                    ▼               │
│  ┌──────────────┐                   ┌──────────────┐        │
│  │    Auth      │                   │    Data      │        │
│  │   Service    │                   │   Service    │        │
│  └──────────────┘                   └──────────────┘        │
│         │                                    │               │
└─────────┼────────────────────────────────────┼───────────────┘
          │                                    │
          │         Firebase Backend           │
          ▼                                    ▼
┌─────────────────┐                 ┌──────────────────┐
│  Authentication │                 │ Realtime Database│
│   - Google OAuth│                 │  - Profiles      │
│   - User mgmt   │                 │  - Projects      │
└─────────────────┘                 │  - Certificates  │
                                    └──────────────────┘
```

## Layer Architecture

### 1. Presentation Layer (Components)

**Purpose**: User interface and interaction

**Components**:
- `Auth.jsx`: Authentication UI with Google sign-in
- `Header.jsx`: Navigation header with user info
- `PublicView.jsx`: Public portfolio display page
- `Dashboard.jsx`: Owner's content management interface

**Responsibilities**:
- Render UI elements
- Handle user interactions
- Display data from services
- Route navigation

**Key Patterns**:
- Functional components with hooks
- State management with useState
- Side effects with useEffect
- Prop drilling for component communication

### 2. Routing Layer (React Router)

**Purpose**: Navigation and route protection

**Routes**:
- `/` - Public portfolio view
- `/portfolio/:userId` - Specific user's portfolio
- `/login` - Authentication page
- `/dashboard` - Owner dashboard (protected)

**Features**:
- Protected routes (redirect if not authenticated)
- Dynamic routing (user-specific portfolios)
- Navigation guards

### 3. Service Layer

**Purpose**: Business logic and external API communication

#### Auth Service (`authService.js`)
```javascript
- signInWithGoogle()    // Google OAuth login
- logOut()              // Sign out current user
- onAuthChange()        // Listen to auth state
```

**Responsibilities**:
- Handle authentication flows
- Manage user sessions
- Provide auth state updates

#### Data Service (`dataService.js`)
```javascript
Profile Operations:
- saveProfile()         // Update user profile
- getProfile()          // Fetch user profile

Project Operations:
- addProject()          // Create new project
- getProjects()         // Fetch all projects
- deleteProject()       // Remove project

Certificate Operations:
- addCertificate()      // Create new certificate
- getCertificates()     // Fetch all certificates
- deleteCertificate()   // Remove certificate

Real-time Subscriptions:
- subscribeToProfile()
- subscribeToProjects()
- subscribeToCertificates()
```

**Responsibilities**:
- CRUD operations
- Data transformation
- Error handling
- Real-time data sync

### 4. Configuration Layer

**Purpose**: Application and service configuration

**Files**:
- `firebase.js`: Firebase SDK initialization
- `vite.config.js`: Build tool configuration
- `.env`: Environment variables

### 5. Backend Layer (Firebase)

**Services Used**:

#### Firebase Authentication
- **Provider**: Google OAuth 2.0
- **Features**: 
  - Social login
  - Session management
  - User profile data

#### Firebase Realtime Database
- **Structure**:
  ```
  /profiles/{userId}
  /projects/{userId}/{projectId}
  /certificates/{userId}/{certificateId}
  ```
- **Security Rules**: User can only write their own data, all data is publicly readable

## Data Flow

### Authentication Flow

```
User clicks "Sign in with Google"
         ↓
Auth Service → signInWithGoogle()
         ↓
Firebase Auth → Google OAuth
         ↓
User grants permission
         ↓
Firebase returns user object
         ↓
App updates auth state
         ↓
User redirected to Dashboard
```

### Data Write Flow (Example: Add Project)

```
User fills project form
         ↓
Dashboard component → handleAddProject()
         ↓
Data Service → addProject(userId, projectData)
         ↓
Firebase Realtime Database → push() new project
         ↓
Success callback
         ↓
Component refreshes project list
         ↓
UI updates with new project
```

### Data Read Flow (Public View)

```
User visits portfolio URL
         ↓
PublicView component mounts
         ↓
useEffect triggers data fetch
         ↓
Data Service → getProfile(), getProjects(), getCertificates()
         ↓
Firebase Realtime Database → get() data
         ↓
Data returned to component
         ↓
Component state updated
         ↓
UI renders with data
```

## State Management

### Local State (useState)
- Component-specific UI state
- Form inputs
- Loading states
- Temporary data

### Auth State (Firebase)
- Managed by Firebase Auth
- Propagated via `onAuthStateChanged`
- Stored in App component
- Passed to child components

### Database State
- Fetched on component mount
- Stored in component state
- Can use real-time listeners for live updates
- Refetched after mutations

## Security Architecture

### Frontend Security
1. **Route Protection**: Authenticated routes check user state
2. **Environment Variables**: Sensitive config in .env files
3. **No Hardcoded Secrets**: All credentials from environment

### Backend Security (Firebase Rules)
```json
{
  "rules": {
    "profiles": {
      "$uid": {
        ".read": true,              // Anyone can read
        ".write": "$uid === auth.uid"  // Only owner can write
      }
    }
  }
}
```

### GitHub Actions Security
- Secrets stored in GitHub
- Minimal permissions granted
- Service account authentication

## Performance Optimizations

1. **Code Splitting**: Automatic with Vite
2. **Tree Shaking**: Unused code removed in production
3. **Asset Optimization**: CSS and JS minified
4. **Lazy Loading**: Routes loaded on demand
5. **Firebase Caching**: Data cached by Firebase SDK

## Build & Deployment Architecture

### Development
```
npm run dev → Vite Dev Server → Hot Module Replacement
```

### Production Build
```
npm run build
     ↓
Vite bundler
     ↓
- Transpile JSX → JS
- Bundle modules
- Minify code
- Optimize assets
     ↓
Output to /dist
```

### Deployment
```
GitHub Push to main
     ↓
GitHub Actions triggered
     ↓
1. Checkout code
2. Install dependencies
3. Build project
4. Deploy to Firebase
     ↓
Live on Firebase Hosting
```

## Technology Decisions

| Technology | Why Chosen |
|------------|-----------|
| React 19 | Modern, component-based, large ecosystem |
| Vite | Fast build tool, better DX than CRA |
| Firebase Auth | Easy OAuth integration, managed service |
| Firebase Realtime DB | Real-time sync, serverless, easy setup |
| React Router v7 | Standard routing solution for React |
| GitHub Actions | Free CI/CD, good GitHub integration |

## Scalability Considerations

### Current Limitations
- Single user portfolio (can be extended)
- Client-side rendering only
- No image upload (links only)
- Basic data structure

### Future Enhancements
- Multi-tenant support (multiple portfolio owners)
- Server-side rendering (SSR) with Next.js
- Image upload with Firebase Storage
- Advanced features (blog, contact form, analytics)
- Progressive Web App (PWA) capabilities
- Internationalization (i18n)

## Error Handling

### Service Layer
- Try-catch blocks around async operations
- Consistent error response format
- Console logging for debugging

### Component Layer
- Loading states during async operations
- Error messages to user
- Fallback UI for missing data

### Firebase
- Built-in retry logic
- Offline support
- Error codes for specific issues

## Testing Strategy

### Unit Tests (Future)
- Service layer functions
- Utility functions
- Component logic

### Integration Tests (Future)
- Authentication flow
- CRUD operations
- Route navigation

### E2E Tests (Future)
- User signup and login
- Portfolio management
- Public view rendering

## Monitoring & Analytics

### Recommended Tools
- Firebase Analytics: User behavior
- Firebase Performance: Load times
- Sentry: Error tracking
- Lighthouse: Performance audits

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Review Firebase usage/costs
- Monitor security alerts
- Review and update documentation

### Backup Strategy
- Firebase provides automatic backups
- Database rules versioning
- Git version control for code

---

This architecture provides a solid foundation for a portfolio application while remaining simple enough for easy understanding and maintenance.
