import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export function HolidayRequest({ navigation }) {
    return(
        <ScrollView style={styles.scrollContainer}>
            <TextInput multiline={true} style={styles.textInput} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 15
    },
    textInput: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        height: 90,
    },    
});