import {
  Modal as ModalGS,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ButtonText,
  Text,
  Heading,
} from '@gluestack-ui/themed';
import Button from './buttons/Button';

const CustomModal = ({
  isOpen,
  onClose,
  title,
  bodyText,
  primaryButtonText,
  secondaryButtonText,
  primaryButtonAction,
  secondaryButtonAction,
  size,
  variant,
  action,
  isDisabled,
  style,
  headerStyle,
  bodyStyle,
  footerStyle,
  ...props
}) => {

  console.log('Modal isOpen:', isOpen); 
  return (
    <ModalGS
      isOpen={isOpen}
      onClose={onClose}
      size={size ?? 'md'}
      variant={variant ?? 'solid'}
      action={action ?? 'primary'}
      isDisabled={isDisabled ?? false}
      style={style ?? modalDefaultStyle}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader style={headerStyle}>
          <Heading size="lg">{title}</Heading>
          <ModalCloseButton onPress={onClose}>
            {/* <Icon as={CloseIcon} /> */}
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody style={bodyStyle}>
          <Text>{bodyText}</Text>
        </ModalBody>
        <ModalFooter style={footerStyle}>
          <Button
            variant="outline"
            size="sm"
            action="secondary"
            mr="$3"
            onPress={secondaryButtonAction}
          >
            <ButtonText>{secondaryButtonText}</ButtonText>
          </Button>
          <Button
            size="sm"
            action="positive"
            borderWidth="$0"
            onPress={primaryButtonAction}
          >
            <ButtonText>{primaryButtonText}</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalGS>
  );
};

const modalDefaultStyle = {
    borderRadius: 10,
    bg: 'white',
    padding: 5,
};

export default CustomModal;