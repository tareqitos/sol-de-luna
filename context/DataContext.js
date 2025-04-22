import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useEffect, useRef, useState } from "react"
import { Alert } from "react-native"

// Update the createContext to reflect the separate state structure
export const DataContext = createContext({
    flights: [],
    hotels: [],
    transport: [],
})

export function DataProvider({ children }) {
    // Separate states for each category
    const [flights, setFlights] = useState([])
    const [hotels, setHotels] = useState([])
    const [transport, setTransport] = useState([])

    // Define separate storage keys
    const FLIGHTS_STORAGE_KEY = "@flights_data"
    const HOTELS_STORAGE_KEY = "@hotels_data"
    const TRANSPORT_STORAGE_KEY = "@travels_data"

    // Reference for initialization status
    const isFirstLoad = {
        flights: useRef(true),
        hotels: useRef(true),
        transport: useRef(true)
    }

    const deleteData = (item) => {
        Alert.alert(`Delete ${item.name}`, "Do you want to delete this item?", [
            {
                text: 'Cancel',
                onPress: () => console.log(item),
                style: 'cancel'
            },
            {
                text: 'Delete',
                onPress: () => {
                    // Use the appropriate setter based on item type
                    switch (item.type) {
                        case 'flights':
                            setFlights(prev => prev.filter(flight => flight.id !== item.id));
                            break;
                        case 'hotels':
                            setHotels(prev => prev.filter(hotel => hotel.id !== item.id));
                            break;
                        case 'transport':
                            setTransport(prev => prev.filter(transport => transport.id !== item.id));
                            break;
                    }
                },
            },
        ]);
    }

    const updateData = (item) => {
        if (!item || !item.id || !item.type) {
            console.log("Invalid item for update:", item);
            return;
        }

        // Use the appropriate setter based on item type
        switch (item.type) {
            case 'flights':
                setFlights(prev => prev.map(flight => flight.id === item.id ? item : flight));
                break;
            case 'hotels':
                setHotels(prev => prev.map(hotel => hotel.id === item.id ? item : hotel));
                break;
            case 'transport':
                setTransport(prev => prev.map(transport => transport.id === item.id ? item : transport));
                break;
        }
    };

    const importData = (flights, hotels, transport) => {
        if (flights) setFlights(flights);
        if (hotels) setHotels(hotels);
        if (transport) setTransport(transport);
    }

    // Split the save functions for each data type
    const saveFlights = async () => {
        try {
            await AsyncStorage.setItem(FLIGHTS_STORAGE_KEY, JSON.stringify(flights))
            console.log("SAVED FLIGHTS: ", flights)
        } catch (error) {
            console.log("Unable to save flights to AsyncStorage");
        }
    }

    const saveHotels = async () => {
        try {
            await AsyncStorage.setItem(HOTELS_STORAGE_KEY, JSON.stringify(hotels))
            console.log("SAVED HOTELS: ", hotels)
        } catch (error) {
            console.log("Unable to save hotels to AsyncStorage");
        }
    }

    const saveTransport = async () => {
        try {
            await AsyncStorage.setItem(TRANSPORT_STORAGE_KEY, JSON.stringify(transport))
            console.log("SAVED TRANSPORT: ", transport)
        } catch (error) {
            console.log("Unable to save transport to AsyncStorage");
        }
    }

    // Split loading functions for each data type
    const loadFlights = async () => {
        try {
            const loadedFlights = await AsyncStorage.getItem(FLIGHTS_STORAGE_KEY);
            if (loadedFlights) {
                setFlights(JSON.parse(loadedFlights));
            } else {
                setFlights([]);
            }
        } catch (error) {
            console.log("Unable to load flights from AsyncStorage");
        }
    }

    const loadHotels = async () => {
        try {
            const loadedHotels = await AsyncStorage.getItem(HOTELS_STORAGE_KEY);
            if (loadedHotels) {
                setHotels(JSON.parse(loadedHotels));
            } else {
                setHotels([]);
            }
        } catch (error) {
            console.log("Unable to load hotels from AsyncStorage");
        }
    }

    const loadTransport = async () => {
        try {
            const loadedTransport = await AsyncStorage.getItem(TRANSPORT_STORAGE_KEY);
            if (loadedTransport) {
                setTransport(JSON.parse(loadedTransport));
            } else {
                setTransport([]);
            }
        } catch (error) {
            console.log("Unable to load transport from AsyncStorage");
        }
    }

    // Load all data on initial render
    useEffect(() => {
        const clearAsyncStorage = async () => {
            AsyncStorage.clear();
        }
        // clearAsyncStorage();
        loadFlights();
        loadHotels();
        loadTransport();
    }, []);

    // Separate effects to save each data type independently
    useEffect(() => {
        if (isFirstLoad.flights.current) {
            isFirstLoad.flights.current = false;
        } else {
            saveFlights();
        }
    }, [flights]);

    useEffect(() => {
        if (isFirstLoad.hotels.current) {
            isFirstLoad.hotels.current = false;
        } else {
            saveHotels();
        }
    }, [hotels]);

    useEffect(() => {
        if (isFirstLoad.transport.current) {
            isFirstLoad.transport.current = false;
        } else {
            saveTransport();
        }
    }, [transport]);

    return (
        <DataContext.Provider value={{
            flights,
            hotels,
            transport,
            setFlights,
            setHotels,
            setTransport,
            deleteData,
            updateData,
            importData
        }}>
            {children}
        </DataContext.Provider>
    )
}