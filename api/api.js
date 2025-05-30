import axios from "axios";

export class API {
    static async getIATA() {
        return (
            await axios.get(
                "https://cdn.jsdelivr.net/gh/fawazahmed0/iata-list@main/iata.json", {
                headers: {
                    "Content-Type": "application/json"
                }
            })).data
    }

    static async getAddressFromQuery(query) {
        return (
            await axios.get(
                `https://nominatim.openstreetmap.org/search?q=${query.replaceAll(" ", "+")}&addressdetails=1&namedetails=0&format=jsonv2`, {
                headers: {
                    'User-Agent': 'foobar/1.0',
                    'Accept-Language': 'en;q=0.9, fr;q=0.8, de;q=0.7'
                }
            })).data;
    }
    static async fetchWeatherFromCoords(coords) {
        return (
            await axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&daily=weathercode,temperature_2m_max,sunrise,sunset,windspeed_10m_max&timezone=auto&current_weather=true`
            )
        ).data;
    }
    static async fetchImageFromUnsplash(name) {
        const API_KEY = process.env.EXPO_PUBLIC_UNSPLASH_API_KEY;
        if (!API_KEY) {
            console.warn("Unsplash API key is not defined in environment variables.");
            return null;
        }
        return (
            await axios.get(
                `https://api.unsplash.com/photos/random?query=${name}&topics=holiday&orientation=landscape&client_id=${API_KEY}`,
                {
                    headers: {
                        'Accept-Version': "v1"
                    }
                }
            )).data;
    }
}