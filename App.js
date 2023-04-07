import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

import HeaderLogo from './components/HeaderLogo';

const StackNavigator = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator
        screenOptions={{
          headerTitle: (props) => <HeaderLogo {...props} />
        }}
      >
        <StackNavigator.Screen name="Onboarding" component={OnboardingScreen} />
        <StackNavigator.Screen name="Home" component={HomeScreen} />
        <StackNavigator.Screen name="Profile" component={ProfileScreen} />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}
