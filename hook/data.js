import { useContext } from "react";
import { DataContext } from "../context/DataContext";

export function useData() {
    const { data, setData, deleteData, updateData } = useContext(DataContext)

    return { data, setData, deleteData, updateData }
}