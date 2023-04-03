import { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Image } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'expo-image-picker';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import styles from '../styles';

export default function ProfileScreen() {
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [inputValid, setInputValid] = useState(false);
  const [changePressed, setChangePressed] = useState(false);
  const [removePressed, setRemovePressed] = useState(false);
  const [cancelPressed, setCancelPressed] = useState(false);
  const [savePressed, setSavePressed] = useState(false);
  const [logoutPressed, setLogoutPressed] = useState(false);

  useEffect(() => {
    setInputValid(validateInput());
  }, [firstName, lastName, email, phoneNumber]);
  
  const handleChangePressIn = () => {
    setChangePressed(true);
  };
  const handleChangePressOut = () => {
    setChangePressed(false);
    pickImage();
  };
  const handleRemovePressIn = () => {
    setRemovePressed(true);
  };
  const handleRemovePressOut = () => {
    setRemovePressed(false);
    removeImage();
  };
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
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const getInitials = () => {
    let initials = "";

    if (firstName) {
      initials += firstName[0];
    }
    if (lastName) {
      initials += lastName[0];
    }

    return initials;
  };

  const validateInput = () => {
    /*
        Simple Email Validation through regex
        Source: https://stackoverflow.com/a/9204568
    */
    const email_re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    const name_re = /^[a-z ]+$/i;
    const number_re = /^\d+$/;

    let firstNameValid = false;
    let lastNameValid = false;
    let emailValid = false;
    let phoneNumberValid = false;

    firstNameValid = name_re.test(firstName);
    lastNameValid = name_re.test(lastName);
    emailValid = email_re.test(email);
    phoneNumberValid = number_re.test(phoneNumber) && phoneNumber.length === 10;

    return firstNameValid && lastNameValid && emailValid && phoneNumberValid;
  };
  
  return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Account Settings</Text>
          <KeyboardAwareScrollView>
            <View style={styles.rowContainer}>
              {
                image ?
                <Image style={styles.imageContainer} source={{ uri: image }} /> :
                <View style={styles.initialContainer}><Text style={styles.initialText}>{getInitials()}</Text></View>
              }
            <View style={styles.avatarButtonContainer}>
              <Pressable
                style={changePressed ? [styles.vSmallButton, styles.buttonPress] : [styles.vSmallButton, styles.darkButton]}
                onPressIn={handleChangePressIn}
                onPressOut={handleChangePressOut}
              >
                <Text style={[styles.smallButtonText, styles.darkButtonText]}>Change</Text>
              </Pressable>
              <Pressable
                style={removePressed ? [styles.vSmallButton, styles.buttonPress] : [styles.vSmallButton, styles.lightButton]}
                onPressIn={handleRemovePressIn}
                onPressOut={handleRemovePressOut}
              >
                <Text style={removePressed ? [styles.smallButtonText, styles.darkButtonText] : [styles.smallButtonText, styles.lightButtonText]}>Remove</Text>
              </Pressable>
            </View>
            </View>
            <Text style={styles.labelSmall}>First Name</Text>
            <TextInput style={styles.inputField} onChangeText={setFirstName} />
            <Text style={styles.labelSmall}>Last Name</Text>
            <TextInput style={styles.inputField} onChangeText={setLastName} />
            <Text style={styles.labelSmall}>Email</Text>
            <TextInput style={styles.inputField} onChangeText={setEmail} />
            <Text style={styles.labelSmall}>Phone Number</Text>
            <TextInput style={styles.inputField} keyboardType="numeric" onChangeText={setPhoneNumber} />

            <Text>{"\n"}</Text>
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

            <View style={styles.rowContainer}>
              <Pressable
                style={cancelPressed ? [styles.smallButton, styles.buttonPress] : [styles.smallButton, styles.lightButton]}
                onPressIn={handleCancelPressIn}
                onPressOut={handleCancelPressOut}
              >
                <Text style={cancelPressed ? [styles.smallButtonText, styles.darkButtonText] : [styles.smallButtonText, styles.lightButtonText]}>Discard Changes</Text>
              </Pressable>
              <Pressable
                style={!inputValid ? [styles.smallButton, styles.buttonDisabled] : savePressed ? [styles.smallButton, styles.buttonPress] : [styles.smallButton, styles.darkButton]}
                onPressIn={handleSavePressIn}
                onPressOut={handleSavePressOut}
                disabled={!inputValid}
              >
                <Text style={[styles.smallButtonText, styles.darkButtonText]}>Save Changes</Text>
              </Pressable>
            </View>

            <Pressable
              style={logoutPressed ? [styles.button, styles.buttonPress] : [styles.button, styles.logoutButton]}
              onPressIn={handleLogoutPressIn}
              onPressOut={handleLogoutPressOut}
            >
              <Text style={logoutPressed ? [styles.buttonText, styles.darkButtonText] : [styles.buttonText, styles.lightButtonText]}>Log Out</Text>
            </Pressable>
          </KeyboardAwareScrollView>
        </View>
      </View>
  );
}
