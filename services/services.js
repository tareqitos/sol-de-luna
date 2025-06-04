import * as Clipboard from 'expo-clipboard';
import * as Linking from "expo-linking";
import * as Application from 'expo-application';

import { showLocation } from 'react-native-map-link';
import { loadFromStorage, saveToStorage } from './storage';

const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧", "🐦", "🦆", "🦉", "🦇", "🐺", "🐗", "🐴", "🦄", "🐝", "🐛", "🦋", "🐌", "🐞"];
const emojiDestination = ["🌴", "☀️", "🌊", "🏖️", "⛱️", "🍹", "🍉", "🍦", "😎", "🧳", "✈️", "🛳️", "🏔️", "🏕️", "🏞️", "🌋", "🏜️", "🗿", "🗼", "🗽", "🌉", "🎠", "🎡", "🎢", "🎪"];

export const generateRandomEmoji = () => {
    const randomEmoji = Math.floor(Math.random() * emojis.length)
    return emojis[randomEmoji];
}

export const generateDestinationEmoji = () => {
    const randomEmoji = Math.floor(Math.random() * emojiDestination.length)
    return emojiDestination[randomEmoji];
}

export const copyToClipboard = async (ref) => {
    await Clipboard.setStringAsync(ref);
};

export const openPhoneDialer = async (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
}

export const openMapApp = (latitude, longitude, address) => {
    showLocation({
        latitude: latitude,
        longitude: longitude,
        title: address,
        address: !latitude ? address : null
    })
}

export const updates = [
    {
        version: "1.1.0",
        date: "2025-06-04",
        description: [
            "- Improved flight UI",
            "- Added arrival and departure times",
            "- Added stopover information and duration",
            "- Improved UI responsiveness",
            "- Fixed minor bugs.",
            " ",
            "💡 update your existing flight cards to include the new fields",
            " ",
        ].join("\n"),
        message: "Thank you for using the app ❤️"
    },
    {
        version: "1.0.0",
        date: "2025-05-16",
        description: "Initial release with basic features."
    }
]

export const checkAppVersion = async () => {
    const appVersion = Application.nativeApplicationVersion;
    const storedVersion = await loadFromStorage("appVersion");

    if (appVersion !== storedVersion) {
        saveToStorage("appVersion", appVersion);
        console.log("App has been updated to version:", appVersion);
        return true;
    } else {
        console.log("App version is up to date:", appVersion);
        return false;
    }
};