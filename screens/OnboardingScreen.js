import { View, Text, TextInput, Pressable } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './styles';

export default function OnboardingScreen(props) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [buttonPressed, setButtonPressed] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    setInputValid(validateInput());
  }, [firstName, email]);

  const handleButtonPressIn = () => {
    setButtonPressed(true);
  };

  const handleButtonPressOut = () => {
    setButtonPressed(false);

    setFirstName("");
    setEmail("");

    saveUserData({
      firstName: firstName,
      email: email
    });

    setOnboardingComplete();

    props.navigation.navigate("Home");
  };
  
  const validateInput = () => {
    let nameValid = false;
    let emailValid = false;

    /*
        Simple Email Validation through regex
        Source: https://stackoverflow.com/a/9204568
    */
    const name_re = /^[a-z ]+$/i
    const email_re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    nameValid = name_re.test(firstName);
    emailValid = email_re.test(email);

    return nameValid && emailValid;
  };

  const saveUserData = async (userData) => {
    try {
      await AsyncStorage.setItem("@user_data", JSON.stringify(userData));
    } catch (error) {
      console.error(error);
    }
  };

  const setOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem("@onboarding_complete", "true");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Let us get to know you!</Text>
        <KeyboardAwareScrollView style={styles.onboardingFormContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput style={styles.inputField} onChangeText={setFirstName} value={firstName} />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.inputField} onChangeText={setEmail} value={email} autoCapitalize="none" />
          </View>

          <Pressable
            style={!inputValid ? [styles.button, styles.buttonDisabled] : buttonPressed ? [styles.button, styles.buttonPress] : [styles.button, styles.darkButton]}
            onPressIn={handleButtonPressIn}
            onPressOut={handleButtonPressOut}
            disabled={!inputValid}
          >
            <Text style={[styles.buttonText, styles.darkButtonText]}>Next</Text>
          </Pressable>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}
