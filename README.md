# BatChit Frontend

Frontend application for BatChit - A real-time chat and video calling application.

## 🚀 Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Stream.io SDK** - Real-time chat and video
- **React Router** - Navigation
- **Tanstack Query** - Data fetching and state management
- **Axios** - HTTP client
- **Zustand** - State management
- **React Hot Toast** - Notifications

## 📋 Prerequisites

- Node.js (v14 or higher)
- Backend API running (see [Backend Repository](https://github.com/deepguchhait1/Backend))

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:7000

# For production, use your deployed backend URL:
# VITE_API_URL=https://your-backend.onrender.com
```

See `.env.example` for a template.

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will open at `http://localhost:5173`

## 🌐 Features

### ✨ Authentication
- User registration and login
- JWT-based authentication
- Profile management
- Avatar upload

### 💬 Real-time Chat
- One-on-one messaging
- Real-time message delivery
- Image sharing
- Typing indicators
- Online/offline status

### 📹 Video & Audio Calls
- One-on-one video calls
- Audio-only calls
- Call history tracking
- Stream.io powered

### 👥 Friends Management
- Send friend requests
- Accept/reject requests
- Friends list
- Notifications

### 🎨 Customization
- Multiple theme options
- Dark/light mode
- Responsive design
- Modern UI

## 📁 Project Structure

```
frontend/
├── public/                # Static assets
│   ├── default-avatar.svg
│   └── vite.svg
├── src/
│   ├── assets/           # Images and icons
│   ├── components/       # Reusable components
│   │   ├── CallButton.jsx
│   │   ├── ChatLoader.jsx
│   │   ├── FriendCard.jsx
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── ...
│   ├── constants/        # App constants
│   ├── hooks/           # Custom React hooks
│   │   ├── useAuthUser.js
│   │   ├── useLogin.js
│   │   └── useLogout.js
│   ├── lib/             # Utilities
│   │   ├── api.js       # API functions
│   │   ├── axios.js     # Axios configuration
│   │   └── utils.js     # Helper functions
│   ├── pages/           # Page components
│   │   ├── ChatPage.jsx
│   │   ├── CallPage.jsx
│   │   ├── Friends.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── ...
│   ├── store/           # State management
│   │   └── useThemeStore.js
│   ├── App.jsx          # Main App component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── .env.example         # Environment variables template
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── vercel.json          # Vercel deployment config
├── vite.config.js       # Vite configuration
└── README.md
```

## 🚀 Deploy to Vercel

### Quick Deploy (Recommended):

1. **Push to GitHub** (already done!)

2. **Go to [Vercel Dashboard](https://vercel.com/)**
   - Sign up/Login with GitHub

3. **Import Project:**
   - Click **"Add New..."** → **"Project"**
   - Select your repository: `deepguchhait1/Frontend`

4. **Configure:**
   ```
   Framework Preset: Vite
   Root Directory: ./
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

5. **Environment Variables:**
   - Add: `VITE_API_URL` = `https://your-backend.onrender.com`

6. **Deploy!** 🎉

### Alternative Platforms:

#### Netlify:
```bash
npm run build
# Drag and drop 'dist' folder to Netlify
```

#### Render (Static Site):
- Connect repo
- Build command: `npm run build`
- Publish directory: `dist`

## 🔗 API Integration

The frontend connects to the backend API through the axios instance configured in [src/lib/axios.js](src/lib/axios.js).

**Development:** `http://localhost:7000/api`  
**Production:** Uses `VITE_API_URL` environment variable

## 🎨 Theming

The app supports multiple themes managed by Zustand. Themes are stored in localStorage and persist across sessions.

Available themes:
- Light/Dark mode
- Custom color schemes
- System preference detection

## 📱 Responsive Design

- Mobile-first approach
- Tablet optimized
- Desktop enhanced
- Works on all screen sizes

## 🐛 Troubleshooting

**Cannot connect to backend:**
- Check if backend is running
- Verify `VITE_API_URL` is set correctly
- Check CORS settings in backend

**Build errors:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear Vite cache: `rm -rf node_modules/.vite`

**Video calls not working:**
- Check Stream.io API keys in backend
- Ensure camera/microphone permissions are granted
- Check browser console for errors

**Images not loading:**
- Verify Cloudinary configuration in backend
- Check network tab for failed requests

## 🔐 Security Notes

- Never commit `.env` file
- Use environment variables for sensitive data
- Backend URL should use HTTPS in production
- Enable CORS only for trusted domains

## 📄 License

MIT

## 👤 Author

Deep Guchhait
- GitHub: [@deepguchhait1](https://github.com/deepguchhait1)
- Frontend: [github.com/deepguchhait1/Frontend](https://github.com/deepguchhait1/Frontend)
- Backend: [github.com/deepguchhait1/Backend](https://github.com/deepguchhait1/Backend)

## 🤝 Related Repositories

- **Backend API:** [github.com/deepguchhait1/Backend](https://github.com/deepguchhait1/Backend)

## 📝 Notes

- Built with Vite for fast development and optimized production builds
- Uses modern React features (hooks, suspense, etc.)
- Styled with Tailwind CSS for rapid UI development
- Stream.io SDK for professional-grade video/chat features
- Optimized for performance and user experience

---

**Happy Chatting! 💬🎥**

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
