import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from '../styles';

export default function OnboardingScreen(props) {
  const [firstName, setFirstName] = useState();
  const [email, setEmail] = useState();
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
    props.navigation.navigate("Profile")
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

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Let us get to know you!</Text>
        <KeyboardAwareScrollView style={styles.onboardingFormContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput style={styles.inputField} onChangeText={setFirstName} />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.inputField} onChangeText={setEmail} />
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
