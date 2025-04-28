import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    View, Text, StyleSheet, TouchableOpacity, Switch, Platform, Alert, useColorScheme
} from 'react-native';
import { RadioButton, useTheme } from 'react-native-paper';
import Txt from '../Utils/Txt';
import { exportDataToJSON, importJSONData } from '../../services/import-export-service';

import DialogPopUp from '../UI/Dialog';
import { useSnackbar } from '../../hook/useSnackbar';
import { useNavigation } from '@react-navigation/native';
import { useData } from '../../hook/data';
import { themeHook } from '../../hook/theme';
import { useSettings } from '../../hook/settings';

const SettingsItem = ({ icon, title, onPress, value, onValueChange, type, rightText }) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity
            style={styles.settingsItem}
            onPress={onPress}
            disabled={type === 'switch'}
        >
            <View style={styles.settingsItemLeft}>
                <Ionicons name={icon} size={22} color={colors.onSurface} style={styles.settingsItemIcon} />
                <Text style={[styles.settingsItemTitle, { color: colors.onSurface }]}>{title}</Text>
            </View>
            {type === 'switch' ? (
                <Switch
                    value={value}
                    onValueChange={onValueChange}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor="#ffffff"
                />
            ) : type === 'radio' ? (
                <RadioButton.Item
                    value={value}
                    color={colors.primary}
                    mode="android"
                    status='unchecked'
                    style={{ height: 0, paddingHorizontal: 0, flex: 1 }}
                />
            ) : (
                <Txt>{rightText}</Txt>
            )}
        </TouchableOpacity>
    )
};

// APP

export const SettingsTemperature = () => {
    const { unit, toggleUnit } = useSettings();

    const [switchOn, setSwitchOn] = useState(false)
    const onToggleSwitch = () => {
        setSwitchOn(!switchOn)
        toggleUnit()
    }

    useEffect(() => {
        if (unit === "F") {
            setSwitchOn(true);
        }
    }, [])

    return (
        <>
            <SettingsItem
                icon="thermometer-outline"
                title="Use Fahrenheit / °F"
                value={switchOn}
                onValueChange={onToggleSwitch}
                type="switch"
            />
        </>
    )
}

// APPEARANCE
export const SettingsTheme = () => {
    const { theme, setTheme } = themeHook();
    const deviceTheme = useColorScheme();

    // Theme options
    const themeOptions = [
        { id: 'light', label: 'Light', icon: 'sunny-outline' },
        { id: 'dark', label: 'Dark', icon: 'moon-outline' },
        { id: 'system', label: 'System', icon: 'phone-portrait-outline' }
    ];


    return (
        <>
            <RadioButton.Group value={theme}>
                {themeOptions.map(option => (
                    <SettingsItem
                        key={option.id}
                        title={option.label}
                        value={option.id}
                        icon={option.icon}
                        type={option.id !== "system" && "radio"}
                        onPress={() => setTheme(option.id === "system" ? deviceTheme : option.id)}
                    />
                ))}
            </RadioButton.Group>
        </>
    )
}

// DATA 

export const SettingsExportData = () => {
    const nav = useNavigation();
    const { setMessage, toggleBar } = useSnackbar();
    const { destinations } = useData()
    const { colors } = useTheme()

    const exportJSON = async () => {
        try {
            const result = await exportDataToJSON([{ destinations }])
            if (result == true) {
                setMessage("Data successfully exported!")
                toggleBar();
            }
        } catch (error) {
            setMessage("Error exporting data")
            toggleBar();
            console.log("Error saving JSON", error)
        }
    }

    return (
        <>
            <SettingsItem
                icon="save-outline"
                title="Create a local backup (JSON)"
                onPress={() => exportJSON()}
                colors={colors}
            />
        </>
    );
};

export const SettingsImportData = ({ dialogVisible, setDialogVisible }) => {
    const nav = useNavigation();
    const { setMessage, toggleBar } = useSnackbar();
    const { importData } = useData()
    const { colors } = useTheme()

    const setImportedJSONData = async () => {
        try {
            setDialogVisible(false)
            const importedData = await importJSONData();
            const data = importedData[0];
            importData(data.destinations)
            setMessage("Data successfully imported!")
            toggleBar();
            nav.goBack()
        } catch (error) {
            setMessage("Error during import")
            toggleBar();
            console.log("Error saving JSON", error)
            nav.goBack()
        }
    }

    const iOSImportJSONData = () => {
        Alert.alert("Warning", "Importing a local backup will overwrite your current data, continue?", [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            },

            {
                text: 'Continue',
                style: "default",
                onPress: () => setImportedJSONData()
            }
        ])
    }

    const dialogContent = <Txt>Importing a local backup will overwrite your current data, continue?</Txt>

    return (
        <>
            <SettingsItem
                icon="download-outline"
                title="Import a local backup (JSON)"
                onPress={() => Platform.OS === "android" ? setDialogVisible(true) : iOSImportJSONData()}
                colors={colors}
            />
            {dialogVisible && (
                <DialogPopUp
                    visible={dialogVisible}
                    onDismiss={() => setDialogVisible(false)}
                    title="Warning"
                    content={dialogContent}
                    cancel={() => setDialogVisible(false)}
                    validate={() => setImportedJSONData()}
                    validateText="Continue"
                />
            )}
        </>
    );
}

// ABOUT

export const SettingsAbout = () => {
    return (
        <>
            <SettingsItem
                icon="information-circle-outline"
                title="App Info"
                onPress={() => {/* Navigate to app info */ }}
                rightText="Sol de Luna"
            />
            <SettingsItem
                icon="code-slash-outline"
                title="Version"
                onPress={() => { }}
                rightText="1.0.0"
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 40,
    },
    card: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,

    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },

    settingsItemLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingsItemIcon: {
        marginRight: 12,
    },
    settingsItemTitle: {
        fontSize: 16,
    },
    radioButton: {
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
    }
});