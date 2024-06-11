import {
  Button as ButtonGS,
  ButtonText,
} from "@gluestack-ui/themed";


const Button = (props) => {
  return (
    <ButtonGS
      size={props.size ?? "md"}
      variant={props.variant ?? "solid"}
      action={props.action ?? "primary"}
      isDisabled={props.isDisabled ?? false}
      style={props.style ?? buttonDefaultStyle}>
      <ButtonText>{props.children}</ButtonText>
    </ButtonGS>
  )
}

export default Button;

const buttonDefaultStyle = {
  borderRadius: 50,
}
