import { StyleSheet } from "react-native";


const s = StyleSheet.create({
    addhotel: {
        container: { flex: 1, padding: 10 },
        search: { flexDirection: "row", alignItems: "center", gap: 5 },
        input: { flex: 1 },
        icon_button: { borderRadius: 5 },
        result: {
            padding: 12,
            backgroundColor: '#333',
            marginVertical: 4,
            borderRadius: 6,
        },
    }
})

export { s }