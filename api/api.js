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
}