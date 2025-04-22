import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Switch,
    useColorScheme
} from 'react-native';
import TitlePage from '../components/TitlePage';
import Container from '../components/Container';
import { Icon, RadioButton, useTheme } from 'react-native-paper';
import { themeHook } from '../hook/theme';
import Txt from '../components/Txt';
import { exportDataToJSON, importJSONData } from '../services/import-export-service';
import { useData } from '../hook/data';
import DialogPopUp from '../components/Dialog';
import { validate } from 'uuid';

const Settings = () => {
    const deviceTheme = useColorScheme();
    const { colors } = useTheme()
    const { theme, setTheme } = themeHook();
    const { flights, hotels, transport, importData } = useData()
    const [dialogVisible, setDialogVisible] = useState(false);

    const setImportedJSONData = async () => {
        try {
            setDialogVisible(false)
            const importedData = await importJSONData();
            const data = importedData[0];
            importData(data.flights, data.hotels, data.transport)
        } catch (error) {
            console.log("Error saving JSON")
        }
    }

    // Theme options
    const themeOptions = [
        { id: 'light', label: 'Light', icon: 'sunny-outline' },
        { id: 'dark', label: 'Dark', icon: 'moon-outline' },
        { id: 'system', label: 'System', icon: 'phone-portrait-outline' }
    ];

    const SettingsCard = ({ title, children }) => (
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <Text style={[styles.cardTitle, { color: colors.onSurface }]}>{title}</Text>
            {children}
        </View>
    );

    const SettingsItem = ({ icon, title, onPress, value, type, rightText }) => (
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
                    value={value === title.toLowerCase()}
                    onValueChange={() => onPress(title.toLowerCase())}
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
    );

    return (
        <Container style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TitlePage title={"Settings"} />

                <SettingsCard title="Appearance">
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
                </SettingsCard>

                <SettingsCard title="Save and backup">
                    <SettingsItem
                        icon="save-outline"
                        title="Create a local backup (JSON)"
                        onPress={() => exportDataToJSON([{ flights, hotels, transport }])}
                    />
                    <SettingsItem
                        icon="download-outline"
                        title="Import a local backup (JSON)"
                        onPress={() => setDialogVisible(true)}
                    />
                    {dialogVisible && (
                        <DialogPopUp
                            visible={dialogVisible}
                            onDismiss={() => setDialogVisible(false)}
                            title="Warning"
                            content="Importing a local backup will overwrite your current data, continue?"
                            cancel={() => setDialogVisible(false)}
                            validate={() => setImportedJSONData()}
                            validateText="Confirm"
                        />
                    )}
                </SettingsCard>

                <SettingsCard title="About">
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
                </SettingsCard>
            </ScrollView>
        </Container>
    );
};

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

export default Settings;