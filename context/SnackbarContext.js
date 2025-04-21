import { createContext, useState } from "react"

export const SnackbarContext = createContext({
    message: "",
    visible: false,
})

export function SnackbarProvider({ children }) {
    const [message, setMessage] = useState("")
    const [visible, setVisible] = useState(false)

    const toggleBar = () => {
        setVisible(true);
    }

    const dismissBar = () => {
        setVisible(false)
    }

    return (
        <SnackbarContext.Provider value={{ message, setMessage, visible, toggleBar, dismissBar }}>
            {children}
        </SnackbarContext.Provider>
    )
}