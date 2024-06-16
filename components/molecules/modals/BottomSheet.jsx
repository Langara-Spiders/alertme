import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const BottomSheet = () => {
    return (
        <View style={styles.backdrop}>
            <Text>Karthik</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        flex: 1,
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%'
    }
})

export default BottomSheet;
