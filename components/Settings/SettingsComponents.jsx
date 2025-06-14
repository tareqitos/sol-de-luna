import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    View, Text, StyleSheet, TouchableOpacity, Switch, Platform, Alert, useColorScheme,
    Linking
} from 'react-native';
import { Button, RadioButton, useTheme } from 'react-native-paper';
import Txt from '../Utils/Txt';
import { exportDataToJSON, importJSONData } from '../../services/import-export-service';
import * as Application from 'expo-application';

import DialogPopUp from '../UI/Dialog';
import { useSnackbar } from '../../hook/useSnackbar';
import { useNavigation } from '@react-navigation/native';
import { useData } from '../../hook/data';
import { themeHook } from '../../hook/theme';
import { useSettings } from '../../hook/settings';
import { useLocalization } from '../../hook/localization';
import { useTranslation } from 'react-i18next';
import { SETTINGS } from '../../locales/languagesConst';
import ModalCard from '../UI/Modal';

const SettingsItem = ({ icon, title, onPress, onLongPress, value, onValueChange, type, textColor, rightText, style }) => {
    const { colors } = useTheme();
    const { t } = useTranslation();
    return (
        <TouchableOpacity
            style={[styles.settingsItem, style]}
            activeOpacity={0.7}
            onPress={onPress}
            onLongPress={onLongPress}
            disabled={type === 'switch'}
        >
            <View style={styles.settingsItemLeft}>
                <Ionicons name={icon} size={22} color={textColor || colors.onSurface} style={styles.settingsItemIcon} />
                <Text style={[styles.settingsItemTitle, { color: textColor || colors.onSurface }]}>{t(title)}</Text>
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
                title={SETTINGS.USE_FAHRENHEIT}
                value={switchOn}
                onValueChange={onToggleSwitch}
                type="switch"

            />
        </>
    )
}

export const SettingsToggleCardCollapse = () => {
    const { cardsOpen, toggleCardsOpen } = useSettings();

    const [switchOn, setSwitchOn] = useState(false)
    const onToggleSwitch = () => {
        setSwitchOn(!switchOn)
        toggleCardsOpen()
    }

    useEffect(() => {
        if (cardsOpen) {
            setSwitchOn(true);
        }
    }, [])

    return (
        <>
            <SettingsItem
                icon="chevron-expand-outline"
                title={SETTINGS.KEEP_CARDS_OPEN}
                value={!switchOn}
                onValueChange={onToggleSwitch}
                type="switch"
                style={styles.settingsItemNoPadding}
            />
        </>
    )
}

// APPEARANCE
export const SettingsTheme = () => {
    const { theme, setTheme } = themeHook();

    // Theme options
    const themeOptions = [
        { id: 'light', label: SETTINGS.LIGHT, icon: 'sunny-outline' },
        { id: 'dark', label: SETTINGS.DARK, icon: 'moon-outline' },
        { id: 'system', label: SETTINGS.SYSTEM, icon: 'phone-portrait-outline' }
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
                        type="radio"
                        onPress={() => setTheme(option.id)}
                    />
                ))}
            </RadioButton.Group>
        </>
    )
}

export const SettingsLanguages = () => {
    const { colors } = useTheme()
    const { languages, selected, setLanguage } = useLocalization();
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const handleSelectLanguage = (lang) => {
        setLanguage(lang);
        hideModal();
    }

    const modal = (
        <ModalCard visible={visible} onDismiss={hideModal}>
            {languages.map(language => (
                <Button key={language.tag} onPress={() => handleSelectLanguage(language.tag)} style={styles.languageSelection}>{language.name}</Button>
            ))}

        </ModalCard>
    )

    return (
        <>
            <SettingsItem
                icon="language-outline"
                title={SETTINGS.LANGUAGES}
                onPress={() => showModal()}
                rightText={selected.name}
            />
            {visible && modal}
        </>
    )
}


// DATA 

export const SettingsExportData = () => {
    const { setMessage, toggleBar } = useSnackbar();
    const { destinations } = useData()
    const { colors } = useTheme()
    const { t } = useTranslation();

    const exportJSON = async () => {
        try {
            const result = await exportDataToJSON(destinations)
            if (result == true) {
                setMessage(t(SETTINGS.CREATE_BACKUP_MESSAGE))
                toggleBar();
            }
        } catch (error) {
            setMessage(t(SETTINGS.CREATE_BACKUP_ERROR))
            toggleBar();
            console.log("Error saving JSON", error)
        }
    }

    return (
        <>
            <SettingsItem
                icon="save-outline"
                title={SETTINGS.CREATE_BACKUP}
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
    const { t } = useTranslation();

    const hideDialog = () => {
        setDialogVisible({ import: false });
    }

    const setImportedJSONData = async () => {
        try {
            setDialogVisible({ ...dialogVisible, import: false });
            const importedData = await importJSONData();
            const data = importedData;
            importData(data)
            setMessage(t(SETTINGS.IMPORT_BACKUP_MESSAGE))
            toggleBar();
            nav.navigate("Destination")
        } catch (error) {
            setMessage(t(SETTINGS.IMPORT_BACKUP_ERROR))
            toggleBar();
            console.log("Error saving JSON", error)
            nav.navigate("Destination")
        }
    }

    const iOSImportJSONData = () => {
        Alert.alert(t(SETTINGS.IMPORT_BACKUP_ALERT_TITLE), t(SETTINGS.IMPORT_BACKUP_ALERT_CONTENT), [
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

    const dialogContent = <Txt>{t(SETTINGS.IMPORT_BACKUP_ALERT_CONTENT)}</Txt>

    return (
        <>
            <SettingsItem
                icon="download-outline"
                title={SETTINGS.IMPORT_BACKUP}
                onPress={() => Platform.OS === "android" ? setDialogVisible({ ...dialogVisible, import: true }) : iOSImportJSONData()}
                colors={colors}
            />
            {dialogVisible && (
                <DialogPopUp
                    visible={dialogVisible}
                    onDismiss={hideDialog}
                    title={t(SETTINGS.IMPORT_BACKUP_ALERT_TITLE)}
                    content={dialogContent}
                    cancel={hideDialog}
                    validate={() => setImportedJSONData()}
                />
            )}
        </>
    );
}

export const SettingsDeleteData = ({ dialogVisible, setDialogVisible }) => {
    const nav = useNavigation();
    const { colors } = useTheme();
    const { setMessage, toggleBar } = useSnackbar();
    const { deleteAllData } = useData();
    const { t } = useTranslation();

    const hideDialog = () => {
        setDialogVisible({ ...dialogVisible, import: false });
    }

    const handleDeleteData = () => {
        setDialogVisible({ ...dialogVisible, delete: false });
        deleteAllData();
        nav.navigate("Destination");
        setMessage(t(SETTINGS.DELETE_DATA_SUCCESS));
        toggleBar();
    };

    const dialogContent = <Txt>{t(SETTINGS.DELETE_DATA_CONTENT)}</Txt>;

    return (
        <>
            <SettingsItem
                icon="trash-outline"
                title={t(SETTINGS.DELETE_DATA)}
                onLongPress={() => setDialogVisible({ ...dialogVisible, delete: true })}
                textColor={colors.error}
            />
            {dialogVisible && (
                <DialogPopUp
                    visible={dialogVisible}
                    onDismiss={hideDialog}
                    title={t(SETTINGS.DELETE_DATA_TITLE)}
                    content={dialogContent}
                    cancel={hideDialog}
                    validate={() => handleDeleteData()}
                />
            )}
        </>
    );
};

// ABOUT

export const SettingsAbout = () => {

    const URL = 'https://github.com/tareqitos/'

    return (
        <>
            <SettingsItem
                icon="logo-github"
                title="Source code"
                onPress={() => { Linking.openURL(URL).catch(err => console.error("Cannot open link", err)) }}
                rightText="Github"
            />
            <SettingsItem
                icon="information-circle-outline"
                title="App Info"
                rightText="Sol de Luna"
            />
            <SettingsItem
                icon="code-slash-outline"
                title="Version"
                rightText={Application.nativeApplicationVersion || "1.1.0"}
            />
            <SettingsItem
                icon="heart-outline"
                title="Developed by Tareqitos"
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

    settingsItemNoPadding: {
        paddingVertical: 0,
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
    },

    langugageModal: {
        justifyContent: "center",
        alignItems: "center",
    },

    languageSelection: {
        marginHorizontal: 50,
    },
});