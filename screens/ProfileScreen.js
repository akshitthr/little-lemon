import { useState } from 'react';
import { View, Text, TextInput, Pressable } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import BouncyCheckbox from "react-native-bouncy-checkbox";

import styles from '../styles';

export default function ProfileScreen() {
  const [cancelPressed, setCancelPressed] = useState(false);
  const [savePressed, setSavePressed] = useState(false);
  const [logoutPressed, setLogoutPressed] = useState(false);

  const handleCancelPressIn = () => {
    setCancelPressed(true);
  };
  const handleCancelPressOut = () => {
    setCancelPressed(false);
  };
  const handleSavePressIn = () => {
    setSavePressed(true);
  };
  const handleSavePressOut = () => {
    setSavePressed(false);
  };
  const handleLogoutPressIn = () => {
    setLogoutPressed(true);
  };
  const handleLogoutPressOut = () => {
    setLogoutPressed(false);
  };

  return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Account Settings</Text>
          <KeyboardAwareScrollView>
            <Text style={styles.labelSmall}>First Name</Text>
            <TextInput style={styles.inputField} />
            <Text style={styles.labelSmall}>Last Name</Text>
            <TextInput style={styles.inputField} />
            <Text style={styles.labelSmall}>Email</Text>
            <TextInput style={styles.inputField} />
            <Text style={styles.labelSmall}>Phone Number</Text>
            <TextInput style={styles.inputField} keyboardType="numeric" />
            <Text style={styles.labelSmall}>Email Notifications</Text>
            <BouncyCheckbox
              style={styles.inputContainer}
              textStyle={{
                textDecorationLine: "none",
              }}
              text="Order Statuses"
              size={25}
              fillColor="#33401c"
              unfillColor="#FFFFFF"
              innerIconStyle={{ borderWidth: 2 }}
            />
            <BouncyCheckbox
              style={styles.inputContainer}
              textStyle={{
                textDecorationLine: "none",
              }}
              text="Password Changes"
              size={25}
              fillColor="#33401c"
              unfillColor="#FFFFFF"
              innerIconStyle={{ borderWidth: 2 }}
            />
            <BouncyCheckbox
              style={styles.inputContainer}
              textStyle={{
                textDecorationLine: "none",
              }}
              text="Special Offers"
              size={25}
              fillColor="#33401c"
              unfillColor="#FFFFFF"
              innerIconStyle={{ borderWidth: 2 }}
            />
            <BouncyCheckbox
              style={styles.inputContainer}
              textStyle={{
                textDecorationLine: "none",
              }}
              text="Newsletter"
              size={25}
              fillColor="#33401c"
              unfillColor="#FFFFFF"
              innerIconStyle={{ borderWidth: 2 }}
            />

            <Pressable
              style={cancelPressed ? styles.buttonPressed : styles.button}
              onPressIn={handleCancelPressIn}
              onPressOut={handleCancelPressOut}
            >
              <Text style={styles.buttonText}>Discard Changes</Text>
            </Pressable>
            <Pressable
              style={savePressed ? styles.buttonPressed : styles.button}
              onPressIn={handleSavePressIn}
              onPressOut={handleSavePressOut}
            >
              <Text style={styles.buttonText}>Save Changes</Text>
            </Pressable>
            <Pressable
              style={logoutPressed ? styles.buttonPressed : styles.button}
              onPressIn={handleLogoutPressIn}
              onPressOut={handleLogoutPressOut}
            >
              <Text style={styles.buttonText}>Log Out</Text>
            </Pressable>
          </KeyboardAwareScrollView>
        </View>
      </View>
  );
}
