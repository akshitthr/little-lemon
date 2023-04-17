import { View, Text, TextInput, Pressable, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'expo-image-picker';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useRef, useEffect, useState } from 'react';

import SplashScreen from "./SplashScreen";

import { styles } from './styles';

export default function ProfileScreen(props) {
  const [loaded, setLoaded] = useState(false);
  
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [initials, setInitials] = useState("");

  const [orderCheckbox, setOrderCheckbox] = useState(true);
  const [passwordCheckbox, setPasswordCheckbox] = useState(true);
  const [offersCheckbox, setOffersCheckbox] = useState(true);
  const [newsletterCheckbox, setNewsletterCheckbox] = useState(true);

  const [inputValid, setInputValid] = useState(false);
  const [changePressed, setChangePressed] = useState(false);
  const [removePressed, setRemovePressed] = useState(false);
  const [cancelPressed, setCancelPressed] = useState(false);
  const [savePressed, setSavePressed] = useState(false);
  const [logoutPressed, setLogoutPressed] = useState(false);

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      getUserData();

      mounted.current = true;
    }
  });

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

    getUserData();
  };
  const handleSavePressIn = () => {
    setSavePressed(true);
  };
  const handleSavePressOut = () => {
    setSavePressed(false);
    
    const userData = {
      image: image,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      orderCheckbox: orderCheckbox,
      passwordCheckbox: passwordCheckbox,
      offersCheckbox: offersCheckbox,
      newsletterCheckbox: newsletterCheckbox
    };

    saveUserData(userData);
  };
  const handleLogoutPressIn = () => {
    setLogoutPressed(true);
  };
  const handleLogoutPressOut = () => {
    setLogoutPressed(false);
    setLoaded(false);

    setTimeout(() => {
      clearAllData();

      props.navigation.reset({
        index: 0,
        routes: [{ name: "Onboarding" }],
      });
    }, 500);
  };
  const handleOrderCheckboxPress = () => {
    setOrderCheckbox(!orderCheckbox);
  };
  const handlePasswordCheckboxPress = () => {
    setPasswordCheckbox(!passwordCheckbox);
  };
  const handleOffersCheckboxPress = () => {
    setOffersCheckbox(!offersCheckbox);
  };
  const handleNewsletterCheckboxPress = () => {
    setNewsletterCheckbox(!newsletterCheckbox);
  };

  const getUserData = async () => {
    try {
      setLoaded(false);

      const userData = await AsyncStorage.getItem("@user_data");
      if (userData !== null) {
        const jsonData = JSON.parse(userData);

        setImage(jsonData.image);
        setFirstName(jsonData.firstName);
        setLastName(jsonData.lastName);
        setEmail(jsonData.email);
        setPhoneNumber(jsonData.phoneNumber);
        setInitials(getInitials(jsonData.firstName, jsonData.lastName));

        setOrderCheckbox(jsonData.orderCheckbox);
        setPasswordCheckbox(jsonData.passwordCheckbox);
        setOffersCheckbox(jsonData.offersCheckbox);
        setNewsletterCheckbox(jsonData.newsletterCheckbox);
      }
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoaded(true);
    }
  };

  const saveUserData = async (userData) => {
    try {
      await AsyncStorage.setItem("@user_data", JSON.stringify(userData));
    } catch (error) {
      console.error(error);
    }
  };

  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();

      setImage(null);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");

      setOrderCheckbox(false);
      setPasswordCheckbox(false);
      setOffersCheckbox(false);
      setNewsletterCheckbox(false);
    } catch (error) {
      console.error(error);
    }
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

  const getInitials = (firstName, lastName) => {
    let str = "";

    if (firstName !== undefined) {
      str += firstName[0];
    }
    if (lastName !== undefined) {
      str += lastName[0];
    }

    return str.toUpperCase();
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

  if (!loaded) {
    return <SplashScreen />
  }
  
  return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Account Settings</Text>
          <KeyboardAwareScrollView>
            <View style={styles.rowContainer}>
              {image ? (
                <Image style={styles.profileImage} source={{ uri: image }} />
              ) : (
                  <View style={styles.profileInitialsContainer}><Text style={styles.initialsText}>{initials}</Text></View>
              )}
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
            <TextInput style={styles.inputField} onChangeText={setFirstName} value={firstName} />
            <Text style={styles.labelSmall}>Last Name</Text>
            <TextInput style={styles.inputField} onChangeText={setLastName} value={lastName} />
            <Text style={styles.labelSmall}>Email</Text>
            <TextInput style={styles.inputField} onChangeText={setEmail} value={email} autoCapitalize={"none"} />
            <Text style={styles.labelSmall}>Phone Number</Text>
            <TextInput style={styles.inputField} keyboardType="numeric" onChangeText={setPhoneNumber} value={phoneNumber} />

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
              isChecked={orderCheckbox}
              onPress={handleOrderCheckboxPress}
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
              isChecked={passwordCheckbox}
              onPress={handlePasswordCheckboxPress}
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
              isChecked={offersCheckbox}
              onPress={handleOffersCheckboxPress}
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
              isChecked={newsletterCheckbox}
              onPress={handleNewsletterCheckboxPress}
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
