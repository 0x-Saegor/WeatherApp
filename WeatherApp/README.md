# WeatherApp 🌤️

A modern React Native weather application built with Expo and powered by a Go backend. This project demonstrates how to create a full-stack mobile app using React Native concepts learned from OpenClassrooms.

## What is this app?

WeatherApp is a simple but elegant weather application that lets users search for current weather conditions in any city around the world. The app features a clean interface with weather information, wind direction compass, and responsive design that works on both light and dark themes.

## Architecture

The app is split into two main parts:

- **Frontend**: React Native app built with Expo Router and TypeScript
- **Backend**: Go API server using the Gin framework that fetches weather data from WeatherAPI.com

This architecture follows modern mobile development practices where the frontend focuses on user experience while the backend handles data processing and external API calls.

## Prerequisites

Before you start, make sure you have these installed on your machine:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **Go** (version 1.20 or higher) - [Download here](https://golang.org/dl/)
- **Expo CLI** - Install with `npm install -g @expo/cli`
- **Expo Go app** on your phone - Available on [App Store](https://apps.apple.com/app/expo-go/id982107779) and [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

## Getting Started

### 1. Setting up the Backend

The backend is a Go server that acts as a proxy to the WeatherAPI service.

```bash
# Navigate to the backend directory
cd backend

# Install Go dependencies
go mod tidy

# Create a .env file for your API key (optional - you can skip this for testing)
echo "WEATHER_API_KEY=your_weatherapi_key_here" > .env

# Start the backend server
go run main.go
```

The server will start on `http://localhost:3000`. You should see a message indicating it's running. The backend provides two endpoints:
- `/online` - Check if the server is running
- `/weather/:city` - Get weather data for a specific city

**Note**: The app includes a fallback weather API key, so you don't need your own key to test it initially.

### 2. Setting up the React Native App

Open a new terminal window and navigate to the WeatherApp directory:

```bash
# Navigate to the React Native app directory
cd WeatherApp

# Install all dependencies
npm install

# Start the Expo development server
npx expo start
```

After running `npx expo start`, you'll see a QR code in your terminal along with several options:

```
› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web
› Press r │ reload app
› Press m │ toggle menu
› Press ? │ show all commands
```

### 3. Running on Your Phone with Expo Go

The easiest way to test your app is using Expo Go:

1. **Install Expo Go** on your phone (links above)
2. **Scan the QR code** displayed in your terminal using:
   - **iPhone**: Use the camera app to scan the code
   - **Android**: Use the Expo Go app to scan the code
3. **Wait for the bundle to load** on your phone

**Important**: For the app to work properly with Expo Go, you need to update the API URL in the code. In `WeatherApp/api/fetchApi.ts`, uncomment the second line:

```typescript
// const API_URL = "http://localhost:3000"; // for local development
const API_URL = "http://YOUR_COMPUTER_IP:3000"; // for Expo Go
```

Replace `YOUR_COMPUTER_IP` with your actual IP address (you can find it in the Expo terminal output).

### 4. Using the App

1. **Enter a city name** in the search field (e.g., "Paris", "New York", "Tokyo")
2. **Tap "Show weather"** to fetch the current weather
3. **View the results** including temperature, conditions, wind speed and direction
4. **Try different cities** to see weather around the world

## Features

- 🔍 **City Search**: Search for weather in any city worldwide
- 🌡️ **Current Weather**: Temperature, conditions, humidity, and more
- 💨 **Wind Information**: Wind speed, direction with visual compass
- 🎨 **Dark/Light Theme**: Automatic theme switching based on system preferences
- 📱 **Responsive Design**: Works perfectly on phones and tablets
- ⚡ **Fast Loading**: Optimized API calls with loading indicators
- 🔄 **Error Handling**: User-friendly error messages and retry options

## Development Workflow

When developing this app, here's the typical workflow:

1. **Make changes** to your React Native code in the `app/` directory
2. **Save the file** - Expo will automatically reload your app
3. **Test on device** using Expo Go or simulators
4. **Check backend logs** in your Go terminal for API calls
5. **Use debugging tools** built into Expo and React Native

### Useful Commands

```bash
# Lint your code
npm run lint

# Clear Expo cache (if you encounter issues)
npx expo start -c

# Build for production (requires Expo account)
npx expo build

# Reset project to start fresh
npm run reset-project
```

## Screenshots

### Main Weather Screen
*Add your first screenshot here*

### Search and Results
*Add your second screenshot here*

## Troubleshooting

### Common Issues and Solutions

**"Backend unreachable" error on Expo Go:**
- Make sure your backend is running (`go run main.go` in the backend directory)
- Update the API_URL in `fetchApi.ts` to use your computer's IP address instead of localhost
- Ensure your phone and computer are on the same WiFi network

**App won't load on phone:**
- Check that both devices are on the same network
- Try restarting the Expo development server with `npx expo start -c`
- Make sure Expo Go is updated to the latest version

**Weather data not loading:**
- Verify the backend server is running on port 3000
- Check the backend terminal for any error messages
- Try with a common city name like "Paris" or "London"

**TypeScript errors:**
- Run `npm run lint` to see all linting issues
- Most warnings about unused variables are harmless during development

### Getting Help

If you encounter issues:

1. Check the terminal outputs for both frontend and backend
2. Look at the Expo documentation: [https://docs.expo.dev/](https://docs.expo.dev/)
3. Review React Native documentation: [https://reactnative.dev/](https://reactnative.dev/)
4. For Go backend issues, check the Gin documentation: [https://gin-gonic.com/](https://gin-gonic.com/)

## What You've Learned

This project demonstrates several key concepts from React Native development:

- **Component Architecture**: Using functional components with hooks
- **State Management**: Managing app state with useState
- **API Integration**: Making HTTP requests and handling responses
- **Navigation**: Using Expo Router for app navigation
- **Styling**: Creating responsive designs with StyleSheet
- **Error Handling**: Graceful error handling and user feedback
- **Development Tools**: Using Expo for rapid development and testing

## Next Steps

Want to extend this app? Here are some ideas:

- Add a 5-day weather forecast
- Implement geolocation to get local weather automatically
- Add weather alerts and notifications
- Create a favorites list for frequently checked cities
- Add weather maps integration
- Implement offline caching for recent searches

Happy coding! 🚀
