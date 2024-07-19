import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  View,
} from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";

import { useState } from "react";
import { FormattedMessage } from "react-intl";

const NotificationAlertDistance = () => {
  const [value, setValue] = useState(2.3);
  const [sliderWidth, setSliderWidth] = useState(0);

  // Calculate the left position of the current value label based on the value
  const calculateLabelPosition = (sliderWidth, value) => {
    const min = 0;
    const max = 5;
    const thumbWidth = 30;
    const step = (sliderWidth - thumbWidth) / (max - min);
    const position = step * value;

    // Approximate width of the label
    const labelWidth = 50;
    const leftPosition = Math.min(
      Math.max(position, 0),
      sliderWidth - labelWidth
    );

    return leftPosition;
  };

  const labelLeftPosition = calculateLabelPosition(sliderWidth, value);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <FormattedMessage
          id="notification.alert.distance"
          defaultMessage="Notification Alert Distance"
        />
      </Text>
      <View
        style={styles.sliderContainer}
        onLayout={(event) => setSliderWidth(event.nativeEvent.layout.width)}
      >
        <Slider
          defaultValue={2.3}
          size="md"
          orientation="horizontal"
          isDisabled={false}
          minValue={0}
          maxValue={5}
          step={0.1}
          value={value}
          onChange={(val) => setValue(val)}
        >
          <SliderTrack>
            <SliderFilledTrack style={styles.filledTrack} />
          </SliderTrack>
          <SliderThumb style={styles.thumb} />
        </Slider>
        <View
          style={[styles.currentValueContainer, { left: labelLeftPosition }]}
        >
          <Text style={styles.currentValue}>{value.toFixed(1)} km</Text>
        </View>
        <View style={styles.labelsContainer}>
          <Text style={styles.minValue}>0 km</Text>
          <Text style={styles.maxValue}>5 km</Text>
        </View>
      </View>
    </View>
  );
};

export default NotificationAlertDistance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "600",
  },
  sliderContainer: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "#F3F4F4",
    borderRadius: 10,
    paddingTop: 55,
    paddingBottom: 10,
    paddingHorizontal: 10,
    position: "relative",
    width: "100%",
    height: "37%",
  },
  filledTrack: {
    backgroundColor: "#FF6B00",
    height: 4,
  },
  thumb: {
    width: 30,
    height: 30,
    backgroundColor: "#FF6B00",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  currentValueContainer: {
    position: "absolute",
    top: 12,
    alignItems: "center",
  },
  currentValue: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  labelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  minValue: {
    textAlign: "left",
    color: "#AAB0B2",
    fontSize: 16,
  },
  maxValue: {
    textAlign: "right",
    color: "#AAB0B2",
    fontSize: 16,
  },
});
