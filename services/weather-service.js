// TEMPERATURE CONVERTER

export const convertCelciusToFahrenheit = (temp) => {
    return (temp * 1.8) + 32;
}

export const convertFahrenheitToCelcius = (temp) => {
    return (temp - 32) * (5 / 9);
}

export const weatherInterpretation = [
    {
        codes: [0],
        label: "Clear sky",
        icon: "weather-sunny"
    },

    {
        codes: [1, 2, 3],
        label: "Partly cloudy",
        icon: "weather-partly-cloudy"
    },

    {
        codes: [45, 48],
        label: "Fog",
        icon: "weather-fog"
    },

    {
        codes: [51, 53, 55, 56, 57],
        label: "Drizzle",
        icon: "weather-partly-rainy",
    },

    {
        codes: [61, 63, 65, 66, 67],
        label: "Rain",
        icon: "weather-rainy"
    },

    {
        codes: [71, 73, 75, 77],
        label: "Snow",
        icon: "weather-snowy"
    },

    {
        codes: [80, 81, 82],
        label: "Heavy rain",
        icon: "weather-pouring"
    },

    {
        codes: [85, 86],
        label: "Heavy snow",
        icon: "weather-snowy-heavy"
    },

    {
        codes: [95, 96, 99],
        label: "Thunderstorm",
        icon: "weather-lightning-rainy"
    }
]

export const getWeatherInterpretation = (code) => {
    return weatherInterpretation.find(interpretation => interpretation.codes.includes(code))
}