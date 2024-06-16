import { Center } from '@gluestack-ui/themed';
import { Box } from '@gluestack-ui/themed';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import NotificationCard from '../../components/molecules/NotificationsCard';
import { ScrollView } from 'react-native';


const notifications = [
    {
        notification: "You have a new message!",
        timeAgo: "2 minutes ago"
    },
    {
        notification: "Your order has been shipped.",
        timeAgo: "1 hour ago"
    }
];

const Notifications = ({ navigation }) => {
    return (

        <ScrollView>
            {notifications.map((notificationItem, index) => (
                <NotificationCard
                    key={index}
                    notification={notificationItem.notification}
                    timeAgo={notificationItem.timeAgo}
                />
            ))}
        </ScrollView>

    );
}

const styles = StyleSheet.create({})

export default Notifications;
