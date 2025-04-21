import { useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { Card, Icon, useTheme } from "react-native-paper"

export default function StarInput({ stars, setStars }) {

    const selectStar = (starIndex) => {
        setStars(prev => starIndex)
        if (stars === 0) setStars(-1)
    }


    return (
        <View style={{ flexDirection: "row" }}>
            {Array.from({ length: 5 }).map((_, index) => (
                <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => selectStar(index)}>
                    {index <= stars ?
                        <Icon key={index} source={"star"} size={24} color="#FFA50D" />
                        : <Icon key={index} source={"star-outline"} size={24} color="#FFA50D" />
                    }
                </TouchableOpacity>
            ))}
        </View>
    )
}