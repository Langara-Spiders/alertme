import {
  ButtonText,
  Heading,
  Modal as ModalGS,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import Button from "../../atoms";

const Modal = (props) => {
  return (
    <ModalGS
      isOpen={props.isOpen}
      onClose={props.onClose}
      size={props.size ?? "md"}
      variant={props.variant ?? "solid"}
      action={props.action ?? "primary"}
      isDisabled={props.isDisabled ?? false}
      style={props.style ?? modalDefaultStyle.modal}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader style={props.headerStyle}>
          <Heading size="lg">{props.title}</Heading>
          <ModalCloseButton onPress={props.onClose}>
            {/* <Icon as={CloseIcon} /> */}
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody style={props.bodyStyle}>
          <Text>{props.bodyText}</Text>
        </ModalBody>
        <ModalFooter style={props.footerStyle}>
          <Button
            variant="outline"
            size="sm"
            action="secondary"
            mr="$3"
            onPress={props.secondaryButtonAction}
          >
            <ButtonText>{props.secondaryButtonText}</ButtonText>
          </Button>
          <Button
            size="sm"
            action="positive"
            borderWidth="$0"
            onPress={props.primaryButtonAction}
          >
            <ButtonText>{props.primaryButtonText}</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalGS>
  );
};

export default Modal;

const modalDefaultStyle = StyleSheet.create({
  model: {
    borderRadius: 10,
    bg: "white",
    padding: 5,
  },
});
