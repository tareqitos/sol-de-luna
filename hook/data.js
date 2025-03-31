import { useContext } from "react";
import { DataContext } from "../context/DataContext";

export function useData() {
    const { data, setData } = useContext(DataContext)

    return { data, setData }
}