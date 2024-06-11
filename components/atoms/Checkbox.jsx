import { Checkbox as CheckboxGS ,
    CheckboxIndicator,
    CheckboxIcon,
    CheckboxLabel,
} from '@gluestack-ui/themed';


const Checkbox = (props) => {
    return (
        <CheckboxGS
        size={props.size ?? "md"}
        variant={props.variant ?? "solid"}
        action={props.action ?? "primary"}
        isDisabled={props.isDisabled ?? false}
        style={props.style ?? checkboxDefaultStyle}
        >

        <CheckboxIndicator>
            <CheckboxIcon as={props.icon} />
        </CheckboxIndicator>
        <CheckboxLabel>{props.title ?? "Label"}</CheckboxLabel>

        </CheckboxGS>
    )
}

export default Checkbox;

const checkboxDefaultStyle = {
    borderRadius: 50,
}