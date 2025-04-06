import Home from './pages/Home';
import { useFonts } from 'expo-font';
import { useFonts as useRaleway, Raleway_400Regular, Raleway_600SemiBold, Raleway_300Light } from '@expo-google-fonts/raleway';
import { Inter_300Light, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { ThemeProvider } from './context/ThemeContext';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { themeHook } from './hook/theme';
import AddFlight from './pages/AddFlight';
import { DataProvider } from './context/DataContext';
import { MD3LightTheme as DefaultTheme, MD3DarkTheme, MD3LightTheme, PaperProvider, useTheme } from 'react-native-paper';
import { lightTheme, darkTheme } from './styles/theme';
import { View } from 'react-native';
import AddHotels from './pages/AddHotel';


const Stack = createNativeStackNavigator();

function AppContent() {
  const { theme } = themeHook();
  const { colors } = useTheme();
  const paperTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <View style={[{ flex: 1 }, { backgroundColor: theme === 'dark' ? "#121212" : "#FDFDFD" }]}>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer>
          <DataProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="AddFlight" component={AddFlight} />
              <Stack.Screen name="AddHotel" component={AddHotels} />
            </Stack.Navigator>
          </DataProvider>
        </NavigationContainer>
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
