import { useContext } from "react";
import { LocalizationContext } from "../context/LocalizationContext";

export function useLocalization() {
    const { languages, selected, setLanguage } = useContext(LocalizationContext)

    return { languages, selected, setLanguage }
}