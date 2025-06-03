import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import Txt from "../Utils/Txt";

export default function CardRouteCity({ departure, stop, arrival }) {
    const { colors, typography } = useTheme()

    const DepartureCity = () => {
        return <Txt style={[typography.h5, styles.text]}>{departure.city}</Txt>
    }

    const StopCity = () => {
        return <Txt style={[typography.h5, styles.text]}>{stop.city}</Txt>
    }

    const ArrivalCity = () => {
        return <Txt style={[typography.h5, styles.text]}>{arrival.city}</Txt>
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
    text: {
        lineHeight: 20,
    }
})