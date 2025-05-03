import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, } from 'react-native';
import TitlePage from '../components/Utils/TitlePage';
import Container from '../components/Utils/Container';
import { useTheme } from 'react-native-paper';

import { SettingsAbout, SettingsExportData, SettingsImportData, SettingsLanguages, SettingsTemperature, SettingsTheme, SettingsToggleCardCollapse } from '../components/Settings/SettingsComponents';
import { useTranslation } from 'react-i18next';
import { PAGE_TITLES, SETTINGS } from '../locales/languagesConst';


const Settings = () => {
    const { t } = useTranslation()
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
                <TitlePage title={t(PAGE_TITLES.SETTINGS_TITLE)} />

                <SettingsCard title="App">
                    <SettingsTemperature />
                    <SettingsToggleCardCollapse />
                </SettingsCard>

                <SettingsCard title={t(SETTINGS.APPEARANCE)}>
                    <SettingsTheme />
                    <SettingsLanguages />
                </SettingsCard>

                <SettingsCard title={t(SETTINGS.SAVE_AND_BACKUP)}>
                    <SettingsExportData />
                    <SettingsImportData dialogVisible={dialogVisible} setDialogVisible={setDialogVisible} />
                </SettingsCard>

                <SettingsCard title={t(SETTINGS.ABOUT)}>
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