import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";

export function useSettings() {
    const { unit, toggleUnit, cardsOpen, toggleCardsOpen } = useContext(SettingsContext)

    return { unit, toggleUnit, cardsOpen, toggleCardsOpen }
}