import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useRef, useState } from "react";
import { Alert, Platform, Vibration } from "react-native";
import { v4 as uuidv4 } from 'uuid';
import { DESTINATION, DIALOGS, MESSAGES } from "../locales/languagesConst";
import { useTranslation } from "react-i18next";

export const DataContext = createContext({
    destinations: [],
})

export function DataProvider({ children }) {

    const [destinations, setDestinations] = useState([])
    const { t } = useTranslation()
    const DESTINATIONS_STORAGE_KEY = "@destinations_data"

    const isFirstLoad = useRef(true); // Ref for initialization status

    const addDestination = (name) => {
        setDestinations(prev => [
            ...prev, {
                id: uuidv4(),
                name,
                flights: [],
                hotels: [],
                transport: []
            }
        ]);
    }

    const renameDestination = (destinationId, newName) => {
        if (!newName || newName.trim().length === 0) {
            console.log("Invalid name for destination:", newName);
            return false;
        }

        setDestinations(prev => prev.map(destination => {
            if (destination.id !== destinationId) return destination;

            return {
                ...destination,
                name: newName
            };
        }));
    }

    const deleteDestination = (destinationId) => {
        if (Platform.OS === "android") {

            if (destinationId) {
                setDestinations(prev => prev.filter(dest => dest.id !== destinationId));
            }
        } else {
            Vibration.vibrate(20)
            Alert.alert(t(DESTINATION.DIALOG_TITLE), t(DESTINATION.DIALOG_CONTENT), [
                {
                    text: t(DIALOGS.CANCEL),
                    style: 'cancel'
                },
                {
                    text: t(DIALOGS.CONFIRM),
                    style: 'destructive',
                    onPress: () => {
                        if (destinationId) {
                            setDestinations(prev => prev.filter(dest => dest.id !== destinationId));
                        }
                    }
                }
            ])
        }
    }

    const addItem = (destinationId, itemType, item) => {
        setDestinations(prev => prev.map(destination => {
            if (destination.id !== destinationId) return destination;
            console.log(item)
            return {
                ...destination,
                [itemType]: [
                    ...destination[itemType], { ...item, id: uuidv4(), documents: [], completed: false, type: itemType }
                ]
            }
        }))
    }

    const updateItem = (destinationId, item) => {
        if (!item || !item.id || !item.type) {
            console.log("Invalid item for update:", item);
            return;
        }

        setDestinations(prev => prev.map(destination => {
            if (destination.id !== destinationId) return destination;

            return {
                ...destination,
                [item.type]: destination[item.type].map(existingItem =>
                    existingItem.id === item.id ? item : existingItem
                )
            };
        }));
    }

    const deleteItem = (destinationId, item) => {
        if (Platform.OS === "android") {
            setDestinations(prev => prev.map(destination => {
                if (destination.id !== destinationId) return destination;

                return {
                    ...destination,
                    [item.type]: destination[item.type].filter(existingItem => existingItem.id !== item.id)
                }
            }))
        } else {
            Vibration.vibrate(20)
            Alert.alert(t(MESSAGES.DELETE_CARD_TITLE), t(MESSAGES.DELETE_CARD_CONTENT), [
                {
                    text: t(DIALOGS.CANCEL),
                    style: 'cancel'
                },
                {
                    text: t(DIALOGS.CONFIRM),
                    style: 'destructive',
                    onPress: () => {
                        setDestinations(prev => prev.map(destination => {
                            if (destination.id !== destinationId) return destination;

                            return {
                                ...destination,
                                [item.type]: destination[item.type].filter(existingItem => existingItem.id !== item.id)
                            }
                        }))
                    }
                }
            ])
        }
    }

    const importData = (newDestinations) => {
        if (Array.isArray(newDestinations)) {
            setDestinations(newDestinations);
        }
    }

    const saveDestinations = async () => {
        try {
            await AsyncStorage.setItem(DESTINATIONS_STORAGE_KEY, JSON.stringify(destinations))
            console.log("SAVED DESTINATIONS: ", destinations)
        } catch (error) {
            console.log("Unable to save destinations to AsyncStorage");
        }
    }

    const loadDestinations = async () => {
        try {
            const storedData = await AsyncStorage.getItem(DESTINATIONS_STORAGE_KEY);
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                if (Array.isArray(parsedData)) {
                    setDestinations(parsedData);
                } else {
                    console.log("Invalid data format: Expected an array.");
                    setDestinations([]);
                }
            } else {
                setDestinations([]);
            }
        } catch (error) {
            console.log("Unable to load destinations from AsyncStorage");
        }
    };

    // Load Data on initial render
    useEffect(() => {
        const clearAsyncStorage = async () => {
            AsyncStorage.clear();
        }
        // clearAsyncStorage();
        loadDestinations();
    }, [])

    // Save data when changes happen
    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
        } else {
            saveDestinations();
        }
    }, [destinations])


    return (
        <DataContext.Provider value={{
            destinations,
            addDestination,
            renameDestination,
            deleteDestination,
            addItem,
            updateItem,
            deleteItem,
            importData
        }}>
            {children}
        </DataContext.Provider>
    )
}