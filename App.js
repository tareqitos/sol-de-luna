import { View } from 'react-native';
import Home from './pages/home/Home';
import { useFonts } from 'expo-font';
import { useFonts as useRaleway, Raleway_400Regular, Raleway_600SemiBold, Raleway_300Light } from '@expo-google-fonts/raleway';
import { Inter_300Light, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';

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


  return (
    <>
      {
        isRalewayLoaded && isInterLoaded ?
          <Home /> : null
      }
    </>
  );
}
