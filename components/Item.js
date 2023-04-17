import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

const API_URL = "https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images";

const Item = ({ name, description, price, image }) => (
  <View style={styles.rowContainer}>
    <View style={styles.item}>
      <Text style={styles.itemName}>{name}</Text>
      <Text style={styles.itemDescription}>{description}</Text>
      <Text style={styles.itemPrice}>${price}</Text>
    </View>
    <Image
      style={styles.itemImage}
      source={{ uri: `${API_URL}/${(image !== "lemonDessert.jpg") ? image : "lemonDessert 2.jpg"}?raw=true`}}
      defaultSource={require('../assets/placeholder-image.png')}
    />
  </View>
);

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row"
  },

  item: {
    marginBottom: 16
  },

  itemName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4
  },

  itemDescription: {
    fontSize: 14,
    marginBottom: 4,
    color: "#71797E",
    width: Dimensions.get("window").width * 0.6
  },

  itemPrice: {
    fontSize: 16,
    fontWeight: "600"
  },

  itemImage: {
    width: Dimensions.get("window").width * 0.25,
    height: Dimensions.get("window").width * 0.25,
    marginLeft: 8,
    borderRadius: 5,
    marginBottom: 16
  }
});

export default Item;
