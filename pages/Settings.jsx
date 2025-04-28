import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, } from 'react-native';
import TitlePage from '../components/Utils/TitlePage';
import Container from '../components/Utils/Container';
import { useTheme } from 'react-native-paper';

import { SettingsAbout, SettingsExportData, SettingsImportData, SettingsTemperature, SettingsTheme } from '../components/Settings/SettingsComponents';


const Settings = () => {
    const { colors } = useTheme()
    const [dialogVisible, setDialogVisible] = useState(false);

    const SettingsCard = ({ title, children }) => (
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
            <Text style={[styles.cardTitle, { color: colors.onSurface }]}>{title}</Text>
            {children}
        </View>
    );

    return (
        <Container style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TitlePage title={"Settings"} />

                <SettingsCard title="App">
                    <SettingsTemperature />
                </SettingsCard>

                <SettingsCard title="Appearance">
                    <SettingsTheme />
                </SettingsCard>

                <SettingsCard title="Save and backup">
                    <SettingsExportData />
                    <SettingsImportData dialogVisible={dialogVisible} setDialogVisible={setDialogVisible} />
                </SettingsCard>

                <SettingsCard title="About">
                    <SettingsAbout />
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
});

export default Settings;