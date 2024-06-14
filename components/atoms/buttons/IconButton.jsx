import {
    Button as ButtonGS,
    ButtonIcon as ButtonIconGS,
    ButtonText
} from '@gluestack-ui/themed';

const IconButton = (props) => {
    const { children, size, variant, action, isDisabled, isFocusVisible, style, children, icon, color } = props;

    return (
        <ButtonGS
            color={color ?? 'black'}
            size={size ?? 'md'}
            variant={variant ?? 'solid'}
            action={action ?? 'primary'}
            isDisabled={isDisabled ?? false}
            isFocusVisible={isFocusVisible ?? false}
            style={style ?? buttonDefaultStyle}
            icon={icon}
        >
            <ButtonIcon as={icon}></ButtonIcon>
            <ButtonText>{children}</ButtonText>
        </ButtonGS>
    );
}

export default IconButton;

const buttonDefaultStyle = {
    borderRadius: 50,
    bg: 'theme.colors.pink100'
};
