# WeatherApp 🌤️

A beautiful weather application built with React Native and Expo, featuring a Go backend. This project was created as part of learning React Native development with OpenClassrooms.

The app allows users to search for weather information in different cities around the world, displaying current conditions, temperature, humidity, wind data, and more in a clean, modern interface.

## 🎯 What this app does

- **Search weather by city**: Just type in any city name and get real-time weather data
- **Detailed weather info**: Temperature, humidity, wind speed and direction, visibility, and more
- **Beautiful UI**: Clean, modern interface with weather icons and smooth animations
- **Cross-platform**: Runs on iOS, Android, and web thanks to React Native and Expo
- **Real-time data**: Powered by WeatherAPI for accurate, up-to-date information

## 📱 Screenshots

<img src="https://github.com/user-attachments/assets/c763a858-8709-4f64-a350-219cdaa98950" width="300" />
<img src="https://github.com/user-attachments/assets/f7ae8727-78fb-4a11-b4a3-0dc468c999f3" width="300" />
<img src="https://github.com/user-attachments/assets/7e925bea-0280-447e-aa72-69768678f843" width="300" />



## 🚀 Getting Started

This project has two main parts that need to be running:

1. **Backend** (Go server) - handles API calls to WeatherAPI, in the future I might add verification for recent retrieved data
2. **Frontend** (React Native app) - the mobile interface

### Prerequisites

Before you start, make sure you have these installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn**
- **Go** (version 1.19 or higher)
- **Expo CLI** (install with `npm install -g @expo/cli`)
- A **WeatherAPI key** (free at [weatherapi.com](https://weatherapi.com))

### 🔧 Backend Setup

The backend is a simple Go server that acts as a proxy to the WeatherAPI service.

1. **Navigate to the backend directory**:

   ```bash
   cd backend
   ```

2. **Install Go dependencies**:

   ```bash
   go mod tidy
   ```

3. **Create environment file**:
   Create a `.env` file in the backend directory:

   ```bash
   touch .env
   ```

   Add your WeatherAPI key:

   ```
   WEATHER_API_KEY=your_weather_api_key_here
   ```

   > **Getting a WeatherAPI key**: Visit [weatherapi.com](https://weatherapi.com), sign up for free, and copy your API key.

4. **Start the backend server**:
   ```bash
   go run main.go
   ```

The server will start on `http://localhost:3000`. You should see a message indicating it's running.

### 📱 Frontend Setup

The frontend is built with React Native using Expo for easy development.

1. **Navigate to the WeatherApp directory**:

   ```bash
   cd WeatherApp
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the Expo development server**:
   ```bash
   npx expo start
   ```

## 📲 Using Expo Go

Expo Go is the easiest way to test your app on a real device during development.

### On your phone:

1. **Download Expo Go**:

   - **iOS**: Download from the App Store
   - **Android**: Download from Google Play Store

2. **Connect to the same network**: Make sure your phone and computer are on the same WiFi network

3. **Scan the QR code**:
   - When you run `npx expo start`, you'll see a QR code in your terminal
   - Open Expo Go and scan the QR code
   - The app will load directly on your phone!

### Alternative testing options:

- **iOS Simulator**: Press `i` in the terminal where Expo is running
- **Android Emulator**: Press `a` in the terminal (requires Android Studio)
- **Web browser**: Press `w` to open in your browser

## 🛠️ How it works

### Frontend (React Native + Expo)

The React Native app is structured using Expo Router for navigation:

- **`app/(tabs)/index.tsx`**: Main screen with weather search and display
- **`api/fetchApi.ts`**: Handles communication with the backend
- **`components/`**: Reusable UI components like input fields, buttons, and weather displays

When you search for a city, the app sends a request to the local backend server (running on `localhost:3000`), which then fetches data from WeatherAPI and returns it in a clean format. The backend handles the API key securely so it's never exposed in the mobile app.

### Backend (Go + Gin)

The Go backend is simple but effective:

- **`main.go`**: Contains the server setup and API endpoints
- **`/online`**: Health check endpoint to verify the backend is running
- **`/weather/:city`**: Fetches weather data for a specific city

The backend acts as a proxy to WeatherAPI, handling the API key securely and formatting responses for the frontend.

## 🔧 Project Structure

```
WeatherApp/
├── WeatherApp/          # React Native frontend
│   ├── app/            # Screen components (Expo Router)
│   ├── components/     # Reusable UI components
│   ├── api/           # API communication logic
│   └── package.json   # Frontend dependencies
├── backend/           # Go backend server
│   ├── main.go       # Server implementation
│   ├── .env          # Environment variables (you create this)
│   └── go.mod        # Go dependencies
└── README.md         # This file
```

## 🐛 Troubleshooting

### Backend issues:

- **"Backend unreachable"**: Make sure the Go server is running on port 3000
- **No weather data**: Check that your WeatherAPI key is correct in the `.env` file
- **Port already in use**: Stop any other services using port 3000

### Frontend issues:

- **Metro won't start**: Try clearing the cache with `npx expo start --clear`
- **App won't load on phone**: Ensure you're on the same WiFi network
- **Build errors**: Delete `node_modules` and run `npm install` again

### Expo Go issues:

- **QR code won't scan**: Make sure Expo Go is up to date
- **App crashes on phone**: Check the terminal for error messages
- **Slow loading**: This is normal the first time, subsequent loads will be faster
- **"Backend unreachable" on real device**: When testing on a real phone with Expo Go, you might need to update the API URL in `WeatherApp/api/fetchApi.ts` to use your computer's IP address instead of `localhost`

## 💡 What I learned

This project demonstrates several key React Native concepts:

- Setting up a full-stack mobile app
- Using Expo for rapid development
- API integration and state management
- Creating responsive, beautiful UIs
- Working with external services (WeatherAPI)
- Cross-platform development principles
