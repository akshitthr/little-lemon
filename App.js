import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const StackNavigator = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <StackNavigator.Screen name="Onboarding" component={OnboardingScreen} />
        <StackNavigator.Screen name="Profile" component={ProfileScreen} />
        <StackNavigator.Screen name="Home" component={HomeScreen} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}
