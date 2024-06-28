import { Image, ScrollView, Text, View } from "@gluestack-ui/themed";
import { StyleSheet, TouchableOpacity } from "react-native";

const CategoriesModal = (props) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          {props?.categoriesList?.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => props?.onSelectCategory(category)}
            >
              <View
                style={[
                  styles.button,
                  props.selectedCategory?.id === category.id
                    ? styles.highlight
                    : null,
                ]}
              >
                <Image width="24" height="24" source={{ uri: category.icon }} />
                <Text style={styles.labelText}>{category.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoriesModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  button: {
    display: "flex",
    alignItems: "center",
    width: 70,
    height: 62,
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#F3F4F4",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  labelText: {
    width: "100%",
    fontSize: 10,
    marginTop: 8,
    color: "black",
    textAlign: "center",
    flexWrap: "wrap",
  },
  highlight: {
    borderWidth: 2,
    borderColor: "#FF6B00",
  },
});
