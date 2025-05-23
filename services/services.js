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