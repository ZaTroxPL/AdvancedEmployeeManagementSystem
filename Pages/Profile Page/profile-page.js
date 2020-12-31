import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export function ProfileScreen({ navigation }) {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.heading}>Employee Management System</Text>
            </View>
            <EmployeeDetails />
            <EmployeeInteractions navigation={navigation} />
        </ScrollView>
    );
}

export function EmployeeDetails() {
    const salary = 23000;
    const holidaysLeft = 1;
    const leaveStatus = true;
    const employeeName = "Jakub Panczyszyn";

    return (
        <View>
            <View style={[styles.container, styles.column]}>
                <Text style={styles.valueDisplay}>
                    Name: {employeeName}
                </Text>
                <Text style={styles.valueDisplay}>
                    Salary: £{salary}
                </Text>
                <Text style={styles.valueDisplay}>
                    Leave Status: {leaveStatus ? "On Leave" : "At Work"}
                </Text>
                <Text style={styles.valueDisplay}>
                    Holidays Left: {holidaysLeft} {holidaysLeft > 1 || holidaysLeft < 1 ? "days" : "day"}
                </Text>
            </View>
        </View>
    );
}

export function EmployeeInteractions(props) {
    return (
        <View style={[styles.container, styles.flexWrap, styles.row]}>
            <View style={styles.button}>
                <Button title="Submit Holiday Request"
                    onPress={() => {
                        props.navigation.navigate('Holiday Request')
                    }} />
            </View>
            <View style={styles.button}>
                <Button title="Report Complaint" />
            </View>
            <View style={styles.button}>
                <Button title="I Want to Resign" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 15
    },
    flexWrap: {
        flexWrap: 'wrap'
    },
    row: {
        flexDirection: 'row'
    },
    column: {
        flexDirection: 'column'
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 15,
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    valueDisplay: {
        margin: 15,
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        margin: 15
    }
});