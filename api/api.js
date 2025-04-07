import axios from "axios";

export class API {
    static async fetchAddressFromQuery(query) {
        return (
            await axios.get(
                `https://nominatim.openstreetmap.org/search?q=${query.replaceAll(" ", "+")}&addressdetails=1&format=json`
            )
        ).data;
    }
}