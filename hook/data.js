import { useContext } from "react";
import { DataContext } from "../context/DataContext";

export function useData() {
    const { flights,
        hotels,
        transport,
        setFlights,
        setHotels,
        setTransport,
        deleteData,
        updateData,
        importData } = useContext(DataContext)

    return {
        flights,
        hotels,
        transport,
        setFlights,
        setHotels,
        setTransport,
        deleteData,
        updateData,
        importData
    }
}