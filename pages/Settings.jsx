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

const Settings = ({ navigation }) => {
    const deviceTheme = useColorScheme();
    const { colors } = useTheme()
    const { theme, setTheme } = themeHook();

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

    const SettingsItem = ({ icon, title, onPress, value, type }) => (
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
                <View >
                    <RadioButton.Item style={{ paddingVertical: 0 }} value={value} color={colors.primary} mode="ios" status='unchecked' />
                </View>
            ) : (
                ""
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
                                type="radio"
                                onPress={() => option.id === "system" ? setTheme(deviceTheme) : setTheme(option.id)}
                            />
                        ))}
                    </RadioButton.Group>
                </SettingsCard>

                <SettingsCard title="About">
                    <SettingsItem
                        icon="information-circle-outline"
                        title="App Info"
                        onPress={() => {/* Navigate to app info */ }}
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
        paddingVertical: 5
    },
    settingsItemLeft: {
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
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
    }
});

export default Settings;