import {
    Input as InputGS,
    InputField
} from '@gluestack-ui/themed';



const Input = (props) => {
    return (
        <InputGS
        size={props.size ?? "md"}
        variant={props.variant ?? "solid"}
        action={props.action ?? "primary"}
        isDisabled={props.isDisabled ?? false}
        style={props.style ?? InputDefaultStyle}>
        <InputField placeholder={props.placeholder ?? "Enter"} style={props.style ?? FieldDefaultStyle}/>  
            {props.children}
        </InputGS>    

    )
}

export default Input;

const InputDefaultStyle = {
    borderRadius: 50,
    border: "2px solid $green900",
}

const FieldDefaultStyle = {
    color: "blue"
}