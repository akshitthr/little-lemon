import { TouchableOpacity, View, Image, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRef, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HeaderProfileButton() {
  const [profileImage, setProfileImage] = useState();
  const [initials, setInitials] = useState();

  const navigation = useNavigation();

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      getProfileImage();
      
      mounted.current = true;
    }
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getProfileImage();
    });

    return unsubscribe;
  }, [navigation]);

  const getProfileImage = async () => {
    try {
      const userData = await AsyncStorage.getItem("@user_data");
      if (userData !== null) {
        const jsonData = JSON.parse(userData);

        setProfileImage(jsonData.image);

        setInitials(getInitials(jsonData.firstName, jsonData.lastName));
      }
    } catch (error) {
      console.error(error);
    }
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

  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Profile")}>
      {profileImage ? (
        <Image style={styles.image} source={{ uri: profileImage }} />
      ) : (
        <View style={styles.initialsContainer}>
          <Text style={styles.text}>{initials}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
	image: {
		borderRadius: 100,
		width: 40,
		height: 40,
		marginBottom: 4
	},

	initialsContainer: {
		borderRadius: 100,
		width: 40,
		height: 40,
		marginBottom: 4,
    backgroundColor: "#40E0D0",
    justifyContent: "center",
    alignItems: "center"
	},

	text: {
		fontSize: 20,
		color: "#ffffff",
		fontWeight: "700"
	}
});
