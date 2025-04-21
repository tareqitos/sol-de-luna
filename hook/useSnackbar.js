import { useContext } from "react";
import { SnackbarContext } from "../context/SnackbarContext";

export function useSnackbar() {
    const { message, setMessage, visible, toggleBar, dismissBar } = useContext(SnackbarContext)

    return { message, setMessage, visible, toggleBar, dismissBar }
}