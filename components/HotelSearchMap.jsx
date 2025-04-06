import { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";

const MAPBOX_API_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_API

export default function HotelSearchMap() {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedCoord, setSelectedCoord] = useState(null)
    const { colors } = useTheme();

    // REPLACE WITH OPENSTREETMAP
    const searchHotel = async () => {
        try {
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                "the platinum 2 kuala lumpur" + " hotel"
            )}.json?access_token=${MAPBOX_API_TOKEN}&limit=5`;

            const response = await fetch(url);
            const data = await response.json();
            console.log(data.features);
            setResults(data.features);

        } catch (error) {
            console.log("Could not fetch the api", error)
        }

    }

    useEffect(() => {
        searchHotel();
    }, [])
    return null
}