import React from 'react';
import { View, Text, TextInput, Pressable } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import BouncyCheckbox from "react-native-bouncy-checkbox";

import styles from '../styles';

export default class ProfileScreen extends React.Component {
  state = {
    isSelected: true
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.heading}>Account Settings</Text>
            <KeyboardAwareScrollView>
              <View style={styles.inputContainer}>
                <TextInput style={styles.inputField}></TextInput>
                <TextInput style={styles.inputField}></TextInput>
                <TextInput style={styles.inputField}></TextInput>
                <TextInput style={styles.inputField}></TextInput>
              </View>
              <BouncyCheckbox
                style={styles.inputContainer}
                text="Order Statuses"
                size={25}
                fillColor="#33401c"
                unfillColor="#FFFFFF"
                innerIconStyle={{ borderWidth: 2 }}
              />
              <BouncyCheckbox
                style={styles.inputContainer}
                text="Password Changes"
                size={25}
                fillColor="#33401c"
                unfillColor="#FFFFFF"
                innerIconStyle={{ borderWidth: 2 }}
              />
              <BouncyCheckbox
                style={styles.inputContainer}
                text="Special Offers"
                size={25}
                fillColor="#33401c"
                unfillColor="#FFFFFF"
                innerIconStyle={{ borderWidth: 2 }}
              />
              <BouncyCheckbox
                style={styles.inputContainer}
                text="Newsletter"
                size={25}
                fillColor="#33401c"
                unfillColor="#FFFFFF"
                innerIconStyle={{ borderWidth: 2 }}
              />
            </KeyboardAwareScrollView>
          </View>
        </View>
    );
  }
}
