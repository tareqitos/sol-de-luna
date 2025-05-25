import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import Txt from "../Utils/Txt";

export default function CardRouteCity({ departure, stop, arrival }) {
    const { colors, typography } = useTheme()

    const DepartureCity = () => {
        return <Txt style={[typography.h5, { lineHeight: 15 }]}>{departure.city}</Txt>
    }

    const StopCity = () => {
        return <Txt style={[typography.h5, { lineHeight: 15 }]}>{stop.city}</Txt>
    }

    const ArrivalCity = () => {
        return <Txt style={[typography.h5, { lineHeight: 15 }]}>{arrival.city}</Txt>
    }
    return (
        <View>
            {departure && <DepartureCity />}
            {stop && <StopCity />}
            {arrival && <ArrivalCity />}
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    }
})