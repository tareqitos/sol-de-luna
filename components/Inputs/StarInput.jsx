import { useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { Card, Icon, useTheme } from "react-native-paper"

export default function StarInput() {
    const [stars, setStars] = useState(-1)
    const { colors } = useTheme()

    const selectStar = (starIndex) => {
        setStars(starIndex)
    }

    return (
        <View style={{ flexDirection: "row" }}>
            {Array.from({ length: 5 }).map((_, index) => (
                <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => selectStar(index)}>
                    {index <= stars ?
                        <Icon key={index} source={"star"} size={24} color={colors.secondary} />
                        : <Icon key={index} source={"star-outline"} size={24} color={colors.secondary} />
                    }
                </TouchableOpacity>
            ))}
        </View>
    )
}