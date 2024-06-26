import { Image, ScrollView, Text, View } from "@gluestack-ui/themed";
import { StyleSheet, TouchableOpacity } from "react-native";

const CategoriesModal = ({ onSelectCategory }) => {
  const categories = [
    { name: "Hazard", image: require("../../../assets/images/User.png") },
    {
      name: "Heavy Machinery",
      image: require("../../../assets/images/User.png"),
    },
    { name: "Construction", image: require("../../../assets/images/User.png") },
    { name: "Oil", image: require("../../../assets/images/User.png") },
    { name: "Ice on Road", image: require("../../../assets/images/User.png") },
    {
      name: "Electrical Fault",
      image: require("../../../assets/images/User.png"),
    },
    {
      name: "Chemical Spill",
      image: require("../../../assets/images/User.png"),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <View key={index} style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => onSelectCategory(category)}
            >
              <Image
                source={category.image}
                style={styles.image}
                alt="category image"
              />
            </TouchableOpacity>
            <Text style={styles.labelText}>{category.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoriesModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    width: 65, // Fixed width for uniformity
    alignItems: "center",
    marginHorizontal: 10, // Consistent horizontal space
    marginBottom: 20,
    height: "100%",
  },
  button: {
    width: 62,
    height: 62,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  labelText: {
    width: "100%", // Ensure text width matches container width
    fontSize: 10,
    marginTop: 8,
    color: "black",
    textAlign: "center",
    flexWrap: "wrap",
  },
});
