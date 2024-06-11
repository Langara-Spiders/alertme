import { Switch as SwitchGS } from '@gluestack-ui/themed';
import {useToken} from "@gluestack-ui/themed";



const Switch = (props) => {
    return (
        <SwitchGS
        size={props.size ?? "md"}
        color={props.color ?? "primary"}
        variant={props.variant ?? "solid"}
        action={props.action ?? "primary"}
        isDisabled={props.isDisabled ?? false}
        style={props.style ?? switchDefaultStyle}
        />
    )
}

export default Switch;

const switchDefaultStyle = {
    borderRadius: 50,
    width: 100,
    height: 100,
}