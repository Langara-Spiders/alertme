import { Text as TextGS } from "@gluestack-ui/themed";
import React from "react";

const Typography = ({
  size = "md",
  color = "$black",
  textAlign = "left",
  variant,
  bold,
  children,
  fontFamily,
  ...props
}) => {
  return (
    <TextGS
      size={size}
      color={color}
      textAlign={textAlign}
      style={{ fontFamily }}
      {...props}
    >
      {children}
    </TextGS>
  );
};

export default Typography;
