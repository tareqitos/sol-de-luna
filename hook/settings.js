import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

export function useSettings() {
    const { unit, toggleUnit } = useContext(SettingsContext)

    return { unit, toggleUnit }
}