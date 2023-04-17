import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingBottom: 32
  },

  contentContainer: {
    flex: 1,
    paddingHorizontal: 32
  },

  onboardingFormContainer: {
    paddingTop: Dimensions.get("window").height * 0.1
  },

  inputContainer: {
    paddingVertical: 12
  },

  rowContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },

  avatarButtonContainer: {
    justifyContent: "center"
  },
  
  profileImage: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "white",
    marginBottom: 24,
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").width * 0.5,
  },

  profileInitialsContainer: {
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").width * 0.5,
    borderWidth: 2,
    borderRadius: 50,
    marginBottom: 24,
    backgroundColor: '#40E0D0',
    borderColor: '#40E0D0',
    justifyContent: "center"
  },
  
  heading: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: "bold",
    color: "#33401c",
    marginTop: 24,
    marginBottom: 24
  },

  label: {
    color: "#33401c",
    textAlign: "center",
    fontSize: 24,
    letterSpacing: 0.25,
    fontWeight: "bold"
  },
  
  labelSmall: {
    color: "#666666",
    fontSize: 18,
    letterSpacing: 0.25,
    fontWeight: "bold",
    marginVertical: 6
  },

  inputField: {
    borderWidth: 2,
    borderColor: "#33401c",
    marginVertical: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
    fontSize: 20
  },
  
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 4,
    borderWidth: 1,
  },

  buttonPress: {
    backgroundColor: "#111509",
  },
  
  buttonDisabled: {
    backgroundColor: "#666666",
    borderColor: "#666666",
  },

  smallButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginHorizontal: 6,
    borderRadius: 4,
    borderWidth: 1,
    width: Dimensions.get("window").width * 0.38
  },

  vSmallButton: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 6,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginLeft: 16,
    borderRadius: 4,
    borderWidth: 1,
    width: Dimensions.get("window").width * 0.28
  },

  buttonText: {
    textAlign: "center",
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25
  },

  smallButtonText: {
    textAlign: "center",
    fontSize: 16,
  },
  
  darkButton: {
    backgroundColor: "#33401c",
    borderColor: "#33401c",
  },

  lightButton: {
    borderColor: "#33401c",
  },

  logoutButton: {
    backgroundColor: "#ffea00",
    borderColor: "#33401c"
  },

  darkButtonText: {
    color: "white",
  },

  lightButtonText: {
    color: "#33401c",
  },

  initialsText: {
    fontSize: 96,
    color: "white",
    textAlign: "center"
  },
});

export const homeScreenStyles = StyleSheet.create({
  bannerBackground: {
    backgroundColor: "#33401c",
  },

  bannerContainer: {
    paddingVertical: 24
  },

  bannerTitle: {
    fontSize: 32,
    color: "yellow"
  },

  bannerSubtitle: {
    fontSize: 24,
    color: "white",
    marginBottom: 12
  },

  bannerText: {
    width: Dimensions.get("window").width * 0.4,
    color: "white"
  },

  bannerImage: {
    width: Dimensions.get("window").width * 0.4,
    height: Dimensions.get("window").width * 0.4,
    borderRadius: 10,
    marginHorizontal: 12
  },

  searchBar: {
    borderWidth: 2,
    borderColor: "#E5E4E2",
    marginTop: 16,
    marginHorizontal: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    fontSize: 20,
    backgroundColor: "white"
  },

  orderText: {
    marginHorizontal: 12,
    marginTop: 16,
    fontSize: 20,
    fontWeight: "800"
  },

  menuItems: {
    marginHorizontal: 18,
    flex: 1
  },
});

export const splashScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center"
  },

  logo: {
    width: 256,
    height: 64
  },

  loadingIcon: {
    width: 64,
    height: 64,
    marginTop: 32
  },
});
