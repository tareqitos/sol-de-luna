import { TouchableOpacity, View } from "react-native"
import Txt from "../txt/Txt"
import { MoveRight, Plane, UploadIcon } from "lucide-react-native"
import { s } from "./FlightCard.style"
import { ConvertDateToString } from "../../services/date-service"
import Collapsible from "react-native-collapsible"
import { useState } from "react"
import CollapseButton from "../collapseButton/CollapseButton"

export default function FlightCard({ data, onPress }) {
    const [isCollapsed, setIsCollapse] = useState(true)

    function handleCollapsible() {
        setIsCollapse(!isCollapsed);
    }

    return (
        <TouchableOpacity onPress={handleCollapsible} style={s.container} activeOpacity={1}>
            <View style={s.icons_container}>
                <View style={s.plane_icon_container}>
                    <Plane
                        color="#90a97b"
                        size={18}
                        style={s.plane_icon} />
                </View>
                <CollapseButton isCollapsed={isCollapsed} />
            </View>

            <View style={s.title_container}>
                <Txt style={s.title}>{data.title}</Txt>
                <Txt style={s.date}>{ConvertDateToString(data.departureDate)}</Txt>
            </View>

            <View style={s.destination_container}>
                <Txt style={s.iata}>{data.departureAirport}</Txt>
                <MoveRight
                    color="#90a97b"
                    size={14}
                    style={s.arrow} />
                <Txt style={s.iata}>{data.arrivalAirport}</Txt>
            </View>

            <Collapsible collapsed={isCollapsed} collapsedHeight={0}>
                <View style={s.add_container}>
                    <Txt style={s.add_title}>Additionnal information</Txt>
                    <Txt style={s.add_infos}>{data.additionnalInformation}</Txt>
                    <TouchableOpacity style={s.upload} onPress={onPress}>
                        <UploadIcon
                            color="#647457"
                            size={14} />
                        <Txt style={{ color: "#647457" }}>Add a file</Txt>
                    </TouchableOpacity>
                </View>
            </Collapsible>
        </TouchableOpacity>

    )
} 