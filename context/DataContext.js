import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useEffect, useRef, useState } from "react"
import { Alert } from "react-native"

export const DataContext = createContext({
    data: [],
})

export function DataProvider({ children }) {
    const [data, setData] = useState({
        flights: [],
        hotels: [],
        transport: []
    })

    const DATA_STORAGE_KEY = "@app_data"
    const isFirstRender = useRef(true)
    const isLoadUpdate = useRef(false)

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
                    setData(prevData => {
                        const newData = { ...prevData };
                        // Remove the item from the appropriate array based on its type
                        switch (item.type) {
                            case 'flights':
                                newData.flights = newData.flights.filter(flight => flight.id !== item.id);
                                break;
                            case 'hotels':
                                newData.hotels = newData.hotels.filter(hotel => hotel.id !== item.id);
                                break;
                            case 'transport':
                                newData.transport = newData.transport.filter(transport => transport.id !== item.id);
                                break;
                        }
                        return newData;
                    });
                },
            },
        ]);
    }

    const updateData = (item) => {
        if (!item || !item.id || !item.type) {
            console.log("Invalid item for update:", item);
            return;
        }

        setData(prevData => {
            const newData = { ...prevData };

            // Update the item in the appropriate array based on its type
            switch (item.type) {
                case 'flights':
                    newData.flights = newData.flights.map(flight =>
                        flight.id === item.id ? item : flight
                    );
                    break;
                case 'hotels':
                    newData.hotels = newData.hotels.map(hotel =>
                        hotel.id === item.id ? item : hotel
                    );
                    break;
                case 'transport':
                    newData.transport = newData.transport.map(transport =>
                        transport.id === item.id ? item : transport
                    );
                    break;
            }

            return newData;
        });
    };

    const saveData = async () => {
        try {
            await AsyncStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data))
            // console.log("SAVED: ", data)
        } catch (error) {
            console.log("Unable to save data to AsyncStorage");
        }
    }

    const loadData = async () => {
        try {
            const loadedData = await AsyncStorage.getItem(DATA_STORAGE_KEY);
            if (loadedData) {
                const parsedData = JSON.parse(loadedData)
                isLoadUpdate.current = true;
                setData(parsedData)
                console.log("LOADED: ", parsedData)
            } else {
                setData({ flights: [], hotels: [], transport: [] })
            }
        } catch (error) {
            console.log("Unable to load data to AsyncStorage");
        }
    }

    // const clearAll = async () => {
    //     try {
    //         await AsyncStorage.clear()
    //     } catch (e) {
    //         // clear error
    //     }

    //     console.log('Done.')
    // }

    useEffect(() => {
        // clearAll();
        loadData();
    }, []);

    useEffect(() => {
        if (isLoadUpdate.current) {
            isLoadUpdate.current = false;
        } else {
            if (!isFirstRender.current) {
                saveData();
            } else {
                isFirstRender.current = false;
            }
        }
    }, [data]);



    return (
        <DataContext.Provider value={{ data, setData, deleteData, updateData }}>
            {children}
        </DataContext.Provider>
    )
}