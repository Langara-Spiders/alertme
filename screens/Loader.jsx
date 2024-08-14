import * as React from "react";

import { View } from "@gluestack-ui/themed";
import { Image, StyleSheet } from "react-native";

import LoadingGif from "../assets/loading.gif";
import { useStore } from "../store";

const Loader = () => {
  const { palette } = useStore();

  const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: palette.bg1,
    },
    loadingIcon: {
      width: 100,
      height: 100,
    },
    loadingCircle: {
      backgroundColor: palette.loaderBg,
      borderRadius: 100,
    },
  });

  return (
    <View style={styles.loadingContainer}>
      <View style={styles.loadingCircle}>
        <Image
          source={LoadingGif}
          style={styles.loadingIcon}
          alt="loader image"
        />
      </View>
    </View>
  );
};

export default Loader;
