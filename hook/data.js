import { useContext } from "react";
import { DataContext } from "../context/DataContext";

export function useData() {
    const {
        destinations,
        addDestination,
        deleteDestination,
        addItem,
        updateItem,
        deleteItem,
        importData
    } = useContext(DataContext)

    return {
        destinations,
        addDestination,
        deleteDestination,
        addItem,
        updateItem,
        deleteItem,
        importData
    }
}