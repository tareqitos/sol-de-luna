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
}