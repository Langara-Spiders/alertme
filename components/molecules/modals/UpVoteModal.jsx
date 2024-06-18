import React from 'react';

import { StyleSheet } from 'react-native';
import Button1 from '../../atoms/buttons/Button';
import { Text, View } from '@gluestack-ui/themed';


const UpVoteModal = (props) => {
    return (
        <View style={styles.confirmationCard}>
            <Text style={styles.confirmationText}>👍Confirm Up-vote?</Text>
            <Text style={styles.genuineText}>We trust that your up-vote is genuine and based on the incident you reviewed. Please refrain from misusing this community application.</Text>

            <View style={styles.confirmationButtons}>
                <Button1 style={styles.no}>No</Button1>
                <Button1 style={styles.yes} textStyle={styles.buttonTextBlack}>Confirm</Button1>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    confirmationCard: {
        display: 'flex',
        width: 346,
        padding: 64,
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 10,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -173 }, { translateY: -150 }],
        backgroundColor: '#212121',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    confirmationText: {
        fontSize: 24,
        marginBottom: 10,
        color: '#FFF'
    },
    genuineText: {
        fontSize: 18,
        marginBottom: 10,
        color: '#FFF'

    },
    confirmationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    confirmationButton: {
        flex: 1,
        padding: 10,
        backgroundColor: '#ddd',
        marginRight: 10,
        alignItems: 'center',
    },
    no:{
        borderRadius: 90,
       borderColor: '#FFF',
       backgroundColor: '#212121',
       borderWidth: 1,
       borderColor: "#FFFFFF",

    },
    yes: {
        
        borderRadius: 90,
        backgroundColor: '#FFF',

    },
    buttonTextBlack: {
        color: '#000',
    },
})

export default UpVoteModal;
