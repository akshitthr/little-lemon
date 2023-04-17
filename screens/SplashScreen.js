import { View, Image } from "react-native";

import { splashScreenStyles, styles } from "./styles";

export default function SplashScreen() {
  return (
    <View style={splashScreenStyles.container}>
      <Image style={splashScreenStyles.logo} source={require('../assets/Logo.png')} />
      <Image style={splashScreenStyles.loadingIcon} source={require('../assets/loading.gif')} />
    </View>
  );
}
