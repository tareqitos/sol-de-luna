import { MD3Colors, MD3LightTheme, Searchbar, useTheme } from "react-native-paper";

export default function SearchCard({ search }) {

    const { colors } = useTheme()
    return (
        <Searchbar
            placeholder="Search..."
            mode="bar"
            style={{ backgroundColor: colors.surface }}
            value={search}
            onChangeText={search}
        />
    )
}