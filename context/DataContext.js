import { createContext, useEffect, useState } from "react"

export const DataContext = createContext({
    data: [],
})

export function DataProvider({ children }) {
    const [data, setData] = useState(
        {
            flights: [{ "id": "f36b6f65-fd78-4d93-99f6-b63f55b6e3f7", "title": "Kuala Lumpur ", "category": "flights", "additionnalInformation": "Pour t'es centré ?", "arrivalAirport": "KUL", "departureAirport": "BRU", "departureDate": "2025-06-07T21:47:00", }],
            hotels: [],
            transport: []
        })

    // console.log("***", data)


    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    )
}