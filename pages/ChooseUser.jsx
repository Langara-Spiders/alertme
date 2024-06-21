import { StyleSheet } from 'react-native';
import { View, Text, AvatarImage, Heading, HStack } from '@gluestack-ui/themed';
import { FormattedMessage } from 'react-intl';
import { Avatar } from '@gluestack-ui/themed';
import { VStack } from '@gluestack-ui/themed';

const ChooseUser = () => {
    return (
        <View style={styles.content}>
            <Text style={styles.header}>
                <FormattedMessage
                    id="ChooseUser.help"
                    defaultMessage="Help us to know you better!"
                />
            </Text>
            <Text style={styles.text}>
                <FormattedMessage
                    id="ChooseUser.begin"
                    defaultMessage="Please select the user type to begin with"
                />
            </Text>
            <View style={styles.card}>
                <HStack style={styles.hStack} space="md">
                    <Avatar>
                        <AvatarImage
                            source={{
                                uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                            }}
                            alt="Avatar Image"
                        />
                    </Avatar>
                    <VStack style={styles.vStack}>
                        <Heading size="sm" style={styles.heading}>I’m Civilian</Heading>
                        <Text size="sm" style={styles.text}>Community civilians can select this option to proceed further</Text>
                    </VStack>
                </HStack>
            </View>
            <View style={styles.card}>
                <HStack space="md">
                    <Avatar>
                        <AvatarImage
                            source={{
                                uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                            }}
                            alt="Avatar Image" />
                    </Avatar>
                    <VStack style={styles.vStack}>
                        <Heading size="sm" style={styles.heading}>Construction Worker</Heading>
                        <Text size="sm" style={styles.text}>Construction employees can select this option to proceed further</Text>
                    </VStack>
                </HStack>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFF',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        marginBottom: 20,
    },
    card: {
        display: 'flex',
        width: 328,
        padding: 20,
        backgroundColor: '#F3F4F4',
        borderRadius: 8,
        marginBottom: 10,
    },
    hStack: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    vStack: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 10,
    },
    heading: {
        paddingBottom: 5,
    },
    text: {
        paddingTop: 5,
    },
})

export default ChooseUser;
