import * as Clipboard from 'expo-clipboard';
import * as Linking from "expo-linking";
import { showLocation } from 'react-native-map-link';

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