import { Appearance, View } from 'react-native';
import { useFonts } from 'expo-font';
import { useFonts as useRaleway, Raleway_300Light, Raleway_400Regular, Raleway_600SemiBold } from '@expo-google-fonts/raleway';
import { Inter_300Light, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MD3LightTheme as DefaultTheme, MD3DarkTheme, PaperProvider, useTheme } from 'react-native-paper';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import { SnackbarProvider } from './context/SnackbarContext';
import { DocumentProvider } from './context/DocumentContext';
import { themeHook } from './hook/theme';
import { lightTheme, darkTheme } from './styles/theme';
import Home from './pages/Home';
import AddFlight from './pages/AddFlight';
import AddHotels from './pages/AddHotel';
import AddTransport from './pages/AddTransport';
import Settings from './pages/Settings';
import { StatusBar } from 'expo-status-bar';
import Destination from './pages/Destination';
import SnackbarMessage from './components/UI/Snackbar';
import { SettingsProvider } from './context/SettingsContext';
import { LocalizationProvider } from './context/LocalizationContext';
import { initializeNotifications } from './services/notifications';
import { UpdateModal } from './components/UpdateModal';
import { checkAppVersion, updates } from './services/services';
import * as Application from 'expo-application';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();
initializeNotifications();

function AppContent() {
  const { theme } = themeHook();
  const systemTheme = Appearance.getColorScheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  let paperTheme = currentTheme === 'dark' ? darkTheme : lightTheme;

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    const checkVersion = async () => {
      const needsUpdate = await checkAppVersion();
      setShowUpdateModal(needsUpdate);
    };

    checkVersion();
  }, []);

  return (
    <View style={[{ flex: 1 }, { backgroundColor: currentTheme === 'dark' ? "#121212" : "#FDFDFD" }]}>
      <PaperProvider theme={paperTheme}>
        {showUpdateModal && <UpdateModal />}
        <LocalizationProvider>
          <NavigationContainer>
            <SettingsProvider>
              <StatusBar style={currentTheme === 'dark' ? 'light' : 'dark'} />
              <DataProvider>
                <SnackbarProvider>
                  <DocumentProvider>
                    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Destination'>
                      <Stack.Screen name="Destination" component={Destination} />
                      <Stack.Screen name="Home" component={Home} />
                      <Stack.Screen name="AddFlight" component={AddFlight} />
                      <Stack.Screen name="AddHotel" component={AddHotels} />
                      <Stack.Screen name="AddTransport" component={AddTransport} />
                      <Stack.Screen name="Settings" component={Settings} />
                    </Stack.Navigator>
                  </DocumentProvider>
                  <SnackbarMessage />
                </SnackbarProvider>
              </DataProvider>
            </SettingsProvider>
          </NavigationContainer>
        </LocalizationProvider>
      </PaperProvider>
    </View>
  );
}

export default function App() {

  const [isRalewayLoaded] = useRaleway({
    "Raleway-Light": Raleway_300Light,
    "Raleway-Regular": Raleway_400Regular,
    "Raleway-SemiBold": Raleway_600SemiBold
  });

  const [isInterLoaded] = useFonts({
    "Inter-Light": Inter_300Light,
    "inter-Regular": Inter_400Regular,
    "Inter-SemiBold": Inter_600SemiBold,
  });

  return (
    <ThemeProvider>
      {isRalewayLoaded && isInterLoaded ? <AppContent /> : null}
    </ThemeProvider>
  );
}
