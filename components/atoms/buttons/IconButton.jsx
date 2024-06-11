import {
    Button as ButtonGS,
    ButtonIcon as ButtonIconGS,
    ButtonText
} from '@gluestack-ui/themed';

const IconButton = (props) => {

    return (
        <ButtonGS
            size={size ?? 'md'}
            variant={variant ?? 'solid'}
            action={action ?? 'primary'}
            isDisabled={isDisabled ?? false}
            isFocusVisible={isFocusVisible ?? false}
            style={style ?? buttonDefaultStyle}
        >
            {icon && typeof icon === 'string' && <ButtonIconGS as={Image} source={icon} style={{ width: 24, height: 24, marginRight: 8 }} />}
            {icon && React.isValidElement(icon) && <ButtonIconGS as={icon.type} {...icon.props} style={{ marginRight: 8 }} />}
            <ButtonText>{children}</ButtonText>
        </ButtonGS>
    );
}

export default IconButton;

const buttonDefaultStyle = {
    borderRadius: 50,
    bg: 'theme.colors.pink100'
};
