import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StandardStyles } from "../../StandardStyles.js";
import SegmentedControlTab from 'react-native-segmented-control-tab';

export function AdminView({ navigation }) {
    const [name, setName] = useState();
    const [salary, setSalary] = useState();
    const [roles, setRoles] = useState([0]);
    const [totalHolidays, setTotalHolidays] = useState();

    function handleMultipleSelect(index) {        
        if (roles.includes(index)) {
            // Included in the selected array then remove
            setRoles(
                roles.filter((i) => i !== index)
            );
        } else {
            // Not included in the selected array then add
            setRoles([...roles, index]);
        }
    }

    return (
        <ScrollView contentContainerStyle={StandardStyles.scrollContainer}>
            <View style={styles.userInput}>
                <View style={styles.credentials}>
                    <Text style={styles.credentialsInput}>
                        Name:
                    </Text>
                    <TextInput
                        maxLength={50}
                        style={styles.textInput}
                        onChangeText={(text) => {
                            setName(text);
                        }}
                    />
                </View>
                <View style={styles.credentials}>
                    <Text style={styles.credentialsInput}>
                        Salary:
                    </Text>
                    <TextInput
                        keyboardType="numeric"
                        style={styles.textInput}
                        onChangeText={(text) => {
                            setSalary(text);
                        }}
                    />
                </View>
                <View style={styles.credentials}>
                    <Text style={styles.credentialsInput}>
                        Select Roles:
                    </Text>
                    <SegmentedControlTab
                        values={["Employee", "Manager", "Admin"]}
                        multiple
                        selectedIndices={roles}
                        onTabPress={handleMultipleSelect}
                    />
                </View>
                <View style={styles.credentials}>
                    <Text style={styles.credentialsInput}>
                        Total Holidays:
                    </Text>
                    <TextInput
                        keyboardType="numeric"
                        maxLength={2}
                        style={styles.textInput}
                        onChangeText={(text) => {
                            setTotalHolidays(text);
                        }}
                    />
                </View>
                <View style={styles.credentialsButton}>
                    <Button
                        title="Submit"
                        onPress={() => {

                            const _data = { name: name, salary: salary, roles: roles, totalHolidays: totalHolidays };

                            fetch('http://192.168.0.32:3000/api/users/create', {
                                method: 'POST',
                                body: JSON.stringify(_data),
                                headers: { "Content-Type": "application/json; charset=UTF-8", },
                            })
                                .then(response => response.json())
                                .then(data => {
                                    console.log("UserData: ", data);
                                })
                                .catch((error) => {
                                    console.error('Error:', error);
                                });
                        }}
                    />
                </View>
            </View>

        </ScrollView>
    );
}



const styles = StyleSheet.create({
    userInput: {
        marginBottom: 0,
        flex: 1
    },
    credentials: {
        marginBottom: 10
    },
    credentialsInput: {
        fontWeight: 'bold'
    },
    credentialsButton: {
        marginTop: 15
    },
    textInput: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        paddingLeft: 5,
        paddingRight: 5
    }
})