<div align="left">

<img src="assets/icon-online.png" width="20%">

# Sol de Luna

</div>

Sol de Luna is a comprehensive travel companion app that helps you organize all your trips in one place. Whether you're planning a weekend getaway or a two weeks international trip, Sol de Luna keeps your flights, hotels, transportation, and important documents organized and easily accessible.

## Features

### ✈️ All-in-One Travel Organization

- Manage multiple destinations, flights, hotels, and transportation
- Store and view important documents (tickets, reservations)
- Search and filter your travel items by name or date

### 🌍 Enhanced Travel Experience

- View hotel locations on maps and get real-time weather information
- Export/import travel data for backup and recovery

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (14.x or later)
- npm or yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/sol-de-luna.git
   cd sol-de-luna
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on a device or emulator**

### Building for Production

See the [Expo Build documentation](https://docs.expo.dev/distribution/building-standalone-apps/) for detailed instructions on creating standalone apps.

## Technology Stack

- Expo
- React Native
- React Navigation
- React Native Paper
- i18next for internationalization
- AsyncStorage for local data persistence
- Various Expo modules (Document Picker, File System, etc.)

## Languages

Sol de Luna currently supports the following languages:

- 🇬🇧 English (Default)
- 🇫🇷 French

The app uses i18next for internationalization, making it easy to add more languages in the future. Language selection can be changed through the app settings.

### Contributing Translations

Language contributions are welcome! To add support for a new language:

1. Copy the `en.js` file in the localization directory
2. Rename it with the new language locale code (e.g., `es.js` for Spanish, `de.js` for German, `jp.js` for Japanese)
3. Translate the text inside the file, keeping the key structure intact
4. Import your new language file in index.js and add it to the locales object:

   ```javascript
   import es from './es'; --> // Import the new language file

   const locales = {
       en: { translation: en },
       fr: { translation: fr },
       es: { translation: es }, --> // Add the new language to locales
   }
   ```

5. Add the language to the `languages` array in LocalizationContext.js:
   ```javascript
   const [languages] = useState([
       { tag: 'en', name: 'English' },
       { tag: 'fr', name: "Français" },
       { tag: 'es', name: "Español" } -->  // Add the new language
   ])
   ```
6. Submit your translation through a pull request

This helps make Sol de Luna accessible to more users around the world!

## Contributing

Contributions are welcome! If you'd like to contribute to Sol de Luna, please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgements

- Weather data provided by [OpenWeatherMap API](https://openweathermap.org/)
- Map data from [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org/ui/search.html)
- Airport data from [Cloudflare Trace API](https://github.com/fawazahmed0/cloudflare-trace-api)
- Icons and design elements from [React Native Paper](https://callstack.github.io/react-native-paper/)

## License

This project is licensed under the MIT License

---

Developed with ☀️ and 🌙 by [Tareqitos](https://github.com/tareqitos)
