# YouTube Video Listing UI

Deployed link: [Render](https://youtube-video-react.onrender.com/)

A modern, responsive YouTube-style video listing interface built with React, TypeScript, and Tailwind CSS. This project fetches video data from the FreeAPI YouTube Videos API and displays it in a clean, user-friendly grid layout.

![Project Preview](./preview.png)

## 🚀 Features

- ✅ **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- ✅ **TypeScript** - Full type safety throughout the application
- ✅ **Modern UI** - YouTube-inspired design with smooth animations
- ✅ **Data Fetching** - Efficient API calls with React Query
- ✅ **Loading States** - Professional skeleton loaders and spinners
- ✅ **Error Handling** - Graceful error messages and retry functionality
- ✅ **Formatted Data** - Human-readable view counts, dates, and durations
- ✅ **Performance Optimized** - Lazy loading and memoization

## 🛠️ Tech Stack

- **Framework:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Data Fetching:** React Query (TanStack Query)
- **HTTP Client:** Axios
- **Date Formatting:** date-fns
- **Icons:** React Icons

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm, yarn, bun, or deno package manager

## 🔧 Installation

1. **Clone the repository**
```bash
   git clone https://github.com/Ishan-Parnami/Youtube-Video-React.git
   cd youtube-video-ui
```

2. **Install dependencies**
```bash
   npm install
```

3. **Start development server**
```bash
   npm run dev
```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure
```
youtube-video-ui/
├── src/
│   ├── components/
│   │   ├── VideoCard.tsx        # Individual video card component
│   │   ├── VideoGrid.tsx        # Grid container for videos
│   │   ├── Header.tsx           # Application header
│   │   ├── LoadingSpinner.tsx   # Loading state component
│   │   └── ErrorMessage.tsx     # Error state component
│   ├── hooks/
│   │   └── useVideos.ts         # Custom hook for fetching videos
│   ├── services/
│   │   └── api.ts               # API service layer
│   ├── types/
│   │   └── video.types.ts       # TypeScript type definitions
│   ├── utils/
│   │   ├── formatters.ts        # Utility functions for formatting
│   │   └── constants.ts         # Application constants
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles
├── public/                      # Static assets
├── index.html                   # HTML template
├── tailwind.config.js           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
└── package.json                 # Project dependencies
```

## 🎨 Component Overview

### VideoCard
Displays individual video information including:
- Video thumbnail with duration badge
- Video title (truncated to 2 lines)
- Channel avatar and name
- View count and upload date

### VideoGrid
- Responsive grid layout
- Handles loading and error states
- Displays video cards in optimal column layout

### Header
- Application branding
- Sticky navigation bar
- YouTube-style design

## 🔌 API Integration

This project uses the FreeAPI YouTube Videos endpoint:

**Endpoint:** `https://api.freeapi.app/api/v1/public/youtube/videos`

**Response Structure:**
```typescript
{
  success: boolean;
  message: string;
  data: Video[];
}
```

## 🎯 Key Features Implementation

### Responsive Grid
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3-4 columns
- Large screens: 4-5 columns

### Data Formatting
- **Views:** 1,234,567 → 1.2M views
- **Duration:** 185 seconds → 3:05
- **Date:** ISO format → "2 days ago"

### Loading States
- Skeleton loaders for better UX
- Smooth transitions
- Loading spinner for initial load

## 🚀 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run type-check

# Lint code
npm run lint
```

## 🌐 Deployment

This project can be deployed to:

### Vercel
```bash
npm run build
# Deploy dist folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy dist folder to Netlify
```

### Render
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`

## 📸 Screenshots

### Desktop View
![Desktop View](./screenshots/desktop.png)

### Mobile View
![Mobile View](./screenshots/mobile.png)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Development Notes

### TypeScript Best Practices
- All components use proper TypeScript interfaces
- No `any` types used
- Full type safety for API responses

### Performance Optimizations
- React.memo for VideoCard components
- Lazy loading for images
- Efficient re-rendering with React Query caching

### Code Quality
- ESLint configured for React and TypeScript
- Prettier for consistent code formatting
- Modular component architecture

## 🐛 Known Issues

- None at the moment

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ishan Parnami**
- GitHub: [@ishanparnami](https://github.com/Ishan-Parnami)
- LinkedIn: [Ishan Parnami](https://www.linkedin.com/in/ishan-parnami/)
- Blog: [Hashnode](https://hashnode.com/@ishanparnami)

## 🙏 Acknowledgments

- API provided by [FreeAPI](https://freeapi.app)
- Design inspired by YouTube
- Built as part of web development learning journey

---

**Note:** This is a learning project for educational purposes. All video data is fetched from the FreeAPI service.