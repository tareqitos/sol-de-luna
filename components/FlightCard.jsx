import { TextInput, TouchableOpacity, View } from "react-native"
import Txt from "./Txt"
import { Calendar, Clock, MoveRight, UploadIcon } from "lucide-react-native"
import { ConvertDateToString, ConvertTimetoString } from "../services/date-service"
import Collapsible from "react-native-collapsible"
import { useCallback, useState } from "react"
import CollapseButton from "./CollapseButton"
import { s } from "../styles/card.style"
import { useTheme } from "../hook/theme"
import { useData } from "../hook/data"

export default function FlightCard({ item, onPress }) {
    const [isCollapsed, setIsCollapse] = useState(true)
    const { data, setData, deleteData } = useData()
    const { colors } = useTheme();

    const handleCollapsible = useCallback(() => {
        setIsCollapse(prev => !prev);
    }, []);


    return (
        <View style={[s.card.container, { backgroundColor: colors.card.background }]}>
            <View style={s.card.icons_container}>
                <CollapseButton isCollapsed={isCollapsed} onPress={handleCollapsible} />
            </View>

            <View style={s.card.title_container}>
                <Txt style={s.card.title}>{item.title}</Txt>
            </View>

            <View style={s.card.time_container}>
                <View style={s.card.date}>
                    <Calendar color={colors.card.time} size={14} />
                    <Txt style={[s.card.date, { color: colors.card.time }]}>{ConvertDateToString(item.departureDate)}</Txt>
                </View>
                <View style={s.card.date}>
                    <Clock color={colors.card.time} size={14} />
                    <Txt style={[s.card.date, { color: colors.card.time }]}>{ConvertTimetoString(item.departureDate)}</Txt>
                </View>
            </View>

            <View style={s.card.destination_container}>
                <Txt style={s.card.iata}>{item.departureAirport}</Txt>
                <MoveRight
                    color={colors.card.icon}
                    size={14}
                    style={s.card.arrow} />
                <Txt style={s.card.iata}>{item.arrivalAirport}</Txt>
            </View>
            <Collapsible collapsed={isCollapsed} collapsedHeight={0} duration={300} renderChildrenCollapsed={true}>
                <View style={s.card.add_container}>
                    <Txt style={s.card.add_title}>Additionnal information</Txt>
                    <TextInput
                        style={s.card.add_infos}>{item.additionnalInformation}</TextInput>
                    <TouchableOpacity style={s.card.upload} onPress={onPress}>
                        <UploadIcon
                            color="#647457"
                            size={14} />
                        <Txt>Add a file</Txt>
                    </TouchableOpacity>
                </View>
            </Collapsible>
        </View>

    )
} 