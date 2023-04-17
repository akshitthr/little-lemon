import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HeaderBackButton() {
	const navigation = useNavigation();

	return (
		<TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
			<Text style={styles.text}>{"←"}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 100,
		backgroundColor: "#33401c",
		width: 40,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 4
	},

	text: {
		fontSize: 24,
		color: "#ffffff",
		fontWeight: "700"
	}
});
