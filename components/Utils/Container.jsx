import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "../../styles/styles.style";
import { useTheme } from "react-native-paper";

export default function Container({ children, style }) {
    const { colors } = useTheme()
    return (
        <SafeAreaProvider>
            <SafeAreaView style={[s.home.container, style, { backgroundColor: colors.background }]}>
                {children}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}