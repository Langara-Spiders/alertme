
import { View } from '@gluestack-ui/themed';
import { Text } from '@gluestack-ui/themed';
import { FormattedMessage } from 'react-intl';
import { StyleSheet } from 'react-native';
import { SwitchIconCard } from '../components/molecules';

const AllowPermissions = () => {
    return (
        <View style={styles.content}>
            <Text style={styles.header}>
                <FormattedMessage
                    id="AllowPermissions.heading"
                    defaultMessage="Allow Permissions"
                />
            </Text>
            <Text style={styles.text}>
                <FormattedMessage
                    id="AllowPermissions.message"
                    defaultMessage="To get started we need your permission to configure this app"
                />
            </Text>
            <View>
                <SwitchIconCard type="Location" />
                <SwitchIconCard type="Notification" />
                <SwitchIconCard type="Camera" />
            </View>
        </View>
    );
}


export default AllowPermissions;

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
        addingTop: 5
    }
})
