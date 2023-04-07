import { Image, StyleSheet } from 'react-native';

export default function HeaderLogo() {
  return (
    <Image
      style={styles.headerImage}
      source={require("../assets/Logo.png")}
    />
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: 185,
    height: 40
  }
});
