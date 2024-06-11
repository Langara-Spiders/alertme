import { Image as ImageGS } from '@gluestack-ui/themed';

const Image = (props) => {
    return (
        <ImageGS
        size={props.size ?? "md"}
        src={props.src}
        alt={props.alt}
        style={props.style ?? imageDefaultStyle}
        />
    )
}

export default Image;

const imageDefaultStyle = {
    borderRadius: 50,
    width: 100,
    height: 100,
    objectFit: 'cover'
}