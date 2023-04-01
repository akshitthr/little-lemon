import React from "react";
import { View, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Text, TextInput, Pressable } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from '../styles';

export default class OnboardingScreen extends React.Component {
  state = {
    firstName: '',
    email: '',
    buttonPressed: false,
    inputValid: false
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.firstName !== prevState.firstName || this.state.email !== prevState.email) {
      this.setState({
        inputValid: false
      })

      if (this.validateInput()) {
        this.setState({
            inputValid: true
        })
      }
    }
  }

  handleNameChange = (firstName) => {
    this.setState({firstName})
  }

  handleEmailChange = (email) => {
    this.setState({email})
  }

  handleButtonPressIn = () => {
    this.setState({
      buttonPressed: true
    })
  }

  handleButtonPressOut = () => {
    this.setState({
      buttonPressed: false
    })
    this.props.navigation.navigate("Profile")
  }
  
  validateInput = () => {
    let nameValid = false;
    let emailValid = false;

    /*
        Simple Email Validation through regex
        Source: https://stackoverflow.com/a/9204568
    */
    const name_re = /^[a-z ]+$/i
    const email_re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    nameValid = name_re.test(this.state.firstName);
    emailValid = email_re.test(this.state.email);

    return nameValid && emailValid;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Let us get to know you!</Text>
          <KeyboardAwareScrollView style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>First Name</Text>
              <TextInput style={styles.inputField} onChangeText={this.handleNameChange} value={this.state.firstName} />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput style={styles.inputField} onChangeText={this.handleEmailChange} value={this.state.email} />
            </View>

            <Pressable
              style={!this.state.inputValid ? styles.buttonDisabled : this.state.buttonPressed ? styles.buttonPressed : styles.button}
              // onPress={this.props.navigation.navigate("Profile")}
              onPressIn={this.handleButtonPressIn}
              onPressOut={this.handleButtonPressOut}
              disabled={!this.state.inputValid}
            >
            <Text style={styles.buttonText}>Next</Text>
            </Pressable>
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }
}
