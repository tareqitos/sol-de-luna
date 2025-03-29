import Home from './pages/home/Home';
import { useFonts } from 'expo-font';
import { useFonts as useRaleway, Raleway_400Regular, Raleway_600SemiBold, Raleway_300Light } from '@expo-google-fonts/raleway';
import { Inter_300Light, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { ThemeProvider } from './context/ThemeContext';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddFlight from './pages/home/AddFlight';
import Container from './components/Container';
const Stack = createNativeStackNavigator();

export default function App() {

  const [isRalewayLoaded] = useRaleway({
    "Raleway-300": Raleway_300Light,
    "Raleway-400": Raleway_400Regular,
    "Raleway-600": Raleway_600SemiBold
  })

  const [isInterLoaded] = useFonts({
    "Inter-300": Inter_300Light,
    "inter-400": Inter_400Regular,
    "Inter-600": Inter_600SemiBold,
  })

  const navTheme = {
    ...DefaultTheme,
    colors: {
      background: "transparent"
    }
  }

  return (
    <NavigationContainer theme={navTheme}>
      <ThemeProvider>
        <Container>
          {
            isRalewayLoaded && isInterLoaded ? (
              <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="AddFlight" component={AddFlight} />
              </Stack.Navigator>
            ) : null
          }
        </Container>
      </ThemeProvider >
    </NavigationContainer>
  );
}
