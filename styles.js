import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Dimensions.get("window").height * 0.05
  },

  headerContainer: {
    marginVertical: 32
  },

  contentContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 32
  },

  formContainer: {
    paddingTop: Dimensions.get("window").height * 0.1
  },

  inputContainer: {
    paddingVertical: 12
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
    backgroundColor: "#33401c",
  },

  buttonPressed: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: "#111509",
  },

  buttonDisabled: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: "#666666",
  },

  buttonText: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default styles;
