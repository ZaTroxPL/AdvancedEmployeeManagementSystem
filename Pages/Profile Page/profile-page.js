import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StandardStyles } from "../../StandardStyles.js";

export function ProfileScreen({ navigation }) {
    const [employeeName, setEmployeeName] = useState("");


    return (
        <ScrollView contentContainerStyle={StandardStyles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.heading}>Welcome {employeeName}</Text>
            </View>
            <EmployeeDetails setParentEmployeeName={setEmployeeName} />
            <EmployeeInteractions navigation={navigation} />
        </ScrollView>
    );
}

function EmployeeDetails(props) {
    const [salary, setSalary] = useState(23000);
    const [holidaysLeft, setHoligdaysLeft] = useState(1);
    const [leaveStatus, setLeaveStatus] = useState(true);
    const [employeeName, setEmployeeName] = useState("Jakub Panczyszyn");

    function setParentEmployeeName(name) {
        props.setParentEmployeeName(employeeName);
    }    

    return (
        <View>
            <View style={[styles.container, StandardStyles.column]}>
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

function EmployeeInteractions(props) {
    return (
        <View style={[styles.container, styles.flexWrap, StandardStyles.row]}>
            <View style={styles.button}>
                <Button title="Submit Holiday Request"
                    onPress={() => {
                        props.navigation.navigate('Holiday Request')
                    }}
                />
            </View>
            <View style={styles.button}>
                <Button title="Report Complaint"
                    onPress={() => {
                        props.navigation.navigate('Report Complaint')
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    flexWrap: {
        flexWrap: 'wrap'
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