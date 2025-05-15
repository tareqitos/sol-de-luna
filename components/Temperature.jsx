import { View } from "react-native";
import { API } from "../api/api";
import { useEffect, useState } from "react";
import { Chip, useTheme } from "react-native-paper";
import { useSettings } from "../hook/settings";
import { convertCelciusToFahrenheit, convertFahrenheitToCelcius, getWeatherInterpretation } from "../services/weather-service";

export default function Temperature({ completed, coords }) {
    const [temperature, setTemperature] = useState();
    const [interpretation, setInterpretation] = useState();
    const { unit } = useSettings();
    const { colors, typography } = useTheme()


    const setWeather = async (result) => {
        try {
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

    // clean up API calls
    useEffect(() => {
        if (!completed) {

            let isMounted = true;
            let fetchTimeout;

            const fetchWeather = async () => {
                if (!coords?.latitude) return;

                try {
                    const result = await API.fetchWeatherFromCoords(coords)
                    if (isMounted) setWeather(result)
                } catch (error) {
                    console.log("Error fetching weather", error);
                }
            };

            fetchTimeout = setTimeout(fetchWeather, 50);
            return () => {
                isMounted = false;
                clearTimeout(fetchTimeout);
            }
        }
    }, [coords?.latitude, coords?.longitude, completed]);

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