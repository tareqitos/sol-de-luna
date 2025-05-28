import { useContext } from "react";
import { DataContext } from "../context/DataContext";

export function useData() {
    const {
        destinations,
        addDestination,
        renameDestination,
        deleteDestination,
        addItem,
        updateItem,
        deleteItem,
        importData,
        deleteAllData
    } = useContext(DataContext)

    return {
        destinations,
        addDestination,
        renameDestination,
        deleteDestination,
        addItem,
        updateItem,
        deleteItem,
        importData,
        deleteAllData
    }
}