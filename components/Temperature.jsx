import { View } from "react-native";
import { API } from "../api/api";
import { useEffect, useState } from "react";
import { Chip, useTheme } from "react-native-paper";
import { useSettings } from "../hook/settings";
import { convertCelciusToFahrenheit, convertFahrenheitToCelcius, getWeatherInterpretation } from "../services/weather-service";
import Txt from "./Utils/Txt";

export default function Temperature({ coords }) {
    const [temperature, setTemperature] = useState();
    const [interpretation, setInterpretation] = useState();
    const { unit } = useSettings();
    const { colors, typography } = useTheme()


    const showWeather = async () => {
        try {
            const result = await API.fetchWeatherFromCoords(coords)
            let temp = result.current_weather.temperature;

            if (unit === "F") {
                temp = convertCelciusToFahrenheit(temp)
            }

            const getInterpretation = getWeatherInterpretation(result.daily.weathercode[0])
            setInterpretation(getInterpretation)
            setTemperature(temp)
        } catch (error) {
            setTemperature(null)
            console.log("Unable to fetch weather API: ", error)
        }
    }

    const convertTemp = () => {
        if (unit === "F") {
            const newTemp = convertCelciusToFahrenheit(temperature)
            setTemperature(newTemp)
        } else {
            const newTemp = convertFahrenheitToCelcius(temperature)
            setTemperature(newTemp)
        }
    }

    useEffect(() => {
        showWeather();
    }, [])

    useEffect(() => {
        if (unit && temperature !== undefined)
            convertTemp()
    }, [unit])

    return (
        <View>
            {interpretation && temperature && unit &&
                <Chip compact mode="outlined" icon={interpretation.icon} style={{ borderColor: colors.primary }} textStyle={[typography.bodyInter, { color: colors.primary }]}>
                    {`${temperature.toString().split(".")[0]}°${unit}`}
                </Chip>}
        </View>
    )
}