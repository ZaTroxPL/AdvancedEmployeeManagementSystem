import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { StandardStyles } from '../../StandardStyles';

export function ManagerialView({ nvaigation }) {
    const [Subordinates, setSubordinates] = useState(0);
    const [Complaints, setComplaints] = useState(0);
    const [holidayRequests, setHolidayRequests] = useState(0);

    return (
        <ScrollView contentContainerStyle={StandardStyles.scrollContainer}>
            <View style={[styles.displayContainer, StandardStyles.column]}>
                <View style={styles.displayContainer}>
                    <Text style={styles.heading}>Welcome</Text>
                </View>
                <Text style={styles.valueDisplay}>
                    Number of Subordinates: {Subordinates}
                </Text>
                <Text style={styles.valueDisplay}>
                    Number of Complaints: {Complaints}
                </Text>
                <Text style={styles.valueDisplay}>
                    Pending Holiday Requests: {holidayRequests}
                </Text>
            </View>
            <View style={styles.container}>
                <View style={styles.button}>
                    <Button
                        title="View Subordinates"
                        onPress={() => {
                            props.navigation.navigate('View Subordinates')
                        }}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="View Complaints"
                        onPress={() => {
                            props.navigation.navigate('View Complaints')
                        }}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title="View Holiday Requests"
                        onPress={() => {
                            props.navigation.navigate('View Holiday Requests')
                        }}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    valueDisplay: {
        margin: 15,
        fontSize: 20,
        fontWeight: 'bold'
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 15
    },
    container: {
        alignItems: 'center',
    },
    displayContainer: {
        alignItems: 'center',
        margin: 15
    },
    button: {
        margin: 15
    }
});