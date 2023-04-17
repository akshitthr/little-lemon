import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SplashScreen from './screens/SplashScreen';

import HeaderLogo from './components/HeaderLogo';
import HeaderBackButton from './components/HeaderBackButton';
import HeaderProfileButton from './components/HeaderProfileButton';
import { useEffect, useRef, useState } from 'react';

const StackNavigator = createNativeStackNavigator();

export default function App() {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      getOnboardingData();
      
      mounted.current = true;
    }
  });

  const getOnboardingData = async () => {
    try {
      const data = await AsyncStorage.getItem("@onboarding_complete");
      if (data !== null) {
        setOnboardingComplete(true);
      }
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoaded(true);
    }
  };

  if (!loaded) {
    return <SplashScreen />;
  }
  
  return (
    <NavigationContainer>
      <StackNavigator.Navigator
        initialRouteName={onboardingComplete ? "Home" : "Onboarding"}
        screenOptions={{
          headerTitle: () => <HeaderLogo />,
        }}
      >
        <StackNavigator.Screen name="Onboarding" component={OnboardingScreen} />
        <StackNavigator.Screen name="Home" component={HomeScreen} options={{
          headerBackVisible: false,
          headerRight: () => <HeaderProfileButton />
        }} />
        <StackNavigator.Screen name="Profile" component={ProfileScreen} options={{
          headerLeft: () => <HeaderBackButton />
        }} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}
