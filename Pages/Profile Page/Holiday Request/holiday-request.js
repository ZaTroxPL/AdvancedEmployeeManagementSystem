import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Platform, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { StandardStyles } from '../../../StandardStyles';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { useLinkProps } from '@react-navigation/native';
var moment = require('moment');
moment().format(); 


export function HolidayRequest({ navigation }) {
    const [text, setText] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [timeOfDay, setTimeOfDay] = useState(null)

    return (
        <ScrollView contentContainerStyle={StandardStyles.scrollContainer}>
            <View
                style={StyleSheet.create({
                    flex: 1
                })}
            >
                <StartEndDatePickers
                    setParentTimeOfDay={setTimeOfDay}
                    setParentStartDate={setStartDate}
                    setParentEndDate={setEndDate}
                />
            </View>
            <View
                style={StyleSheet.create({
                    flex: 99
                })}
            >
                <TextInput
                    multiline={true}
                    style={styles.textInput}
                    onChangeText={text => setText(text)}
                />
                <Button
                    title="Submit"
                    onPress={function () {
                        var isError = false;
                        var errorMessage = "";

                        if (endDate == null) {
                            isError = true;
                            errorMessage = "End Date is empty";
                        }
                        else if (startDate == null) {
                            isError = true;
                            errorMessage = "Start Date is empty";
                        }
                        else if (endDate != null && startDate > endDate) {
                            isError = true;
                            errorMessage = "Start Date cannot be after End Date";
                        }
                        else if (startDate != null && endDate < startDate) {
                            isError = true;
                            errorMessage = "End Date cannot be before Start Date";
                        }

                        if (isError) {
                            Alert.alert(
                                "Date Error",
                                errorMessage,
                                [
                                    { text: "OK", onPress: () => console.log("OK Pressed") }
                                ]
                            );
                            return;
                        } 

                        // TODO: Send text, start and end date to the database
                        
                    }}
                />
            </View>
        </ScrollView>
    );
}

function StartEndDatePickers(prop) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [show, setShow] = useState(false);
    const [dateType, setDateType] = useState(null);
    const [timeOfDay, setTimeOfDay] = useState();

    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === 'ios');
        if (dateType === "start") {
            compareTimeOfDay(timeOfDay, selectedDate, endDate);
            if (endDate != null && selectedDate > endDate) {
                Alert.alert(
                    "Start Date Error",
                    "Start Date cannot be after End Date",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }
            else {
                setStartDate(selectedDate);
                prop.setParentStartDate(selectedDate);
            }
        }
        else if (dateType === "end") {
            compareTimeOfDay(timeOfDay, startDate, selectedDate);
            if (startDate != null && selectedDate < startDate) {
                Alert.alert(
                    "End Date Error",
                    "End Date cannot be before Start Date",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }
            else {
                setEndDate(selectedDate);
                prop.setParentEndDate(selectedDate);
            }
        }
    };

    function showStartDatePicker() {
        setShow(true);
        setDateType("start");
    };

    function showEndDatePicker() {
        setShow(true);
        setDateType("end");
    };

    function clearStartDate() {
        setStartDate(null);
        prop.setParentStartDate(null);
    }

    function clearEndDate() {
        setEndDate(null);
        prop.setParentEndDate(null);
    }

    function setParentTimeOfDay(pickedOption) {        
        compareTimeOfDay(pickedOption, startDate, endDate);
        setTimeOfDay(pickedOption);
        prop.setParentTimeOfDay(pickedOption);
    }

    function compareTimeOfDay(pickedTimeOfDay, pickedStartDate, pickedEndDate) {
        if ((pickedTimeOfDay == 0 || pickedTimeOfDay == 1) && (pickedStartDate != null && pickedEndDate != null)) {
            var momentStartDate = moment(pickedStartDate);
            var momentEndDate = moment(pickedEndDate);
            var diffInDays = momentEndDate.diff(momentStartDate, "days");
            if (diffInDays > 0) {
                Alert.alert(
                    "Time of Day Error",
                    "You can only pick 1 day when applying for half a day off",
                    [
                        { text: "Clear End Date", onPress: () => setEndDate(null) },
                        { text: "Clear Start Date", onPress: () => setStartDate(null) },
                        { text: "Change Time of Day", onPress: () => setTimeOfDay(2) }
                    ]
                );
            }
        }
    }

    return (
        <View>
            <View>
                <Text style={styles.marginBottom}>
                    Pick Time of Day:
                </Text>
                <SegmentedControlTab
                    values={["Morning", "Afternoon", "Whole Day"]}
                    selectedIndex={timeOfDay}
                    onTabPress={setParentTimeOfDay}
                />
            </View>
            <View style={[styles.row, styles.datePicker]}>
                <View>
                    <View style={StandardStyles.row}>
                        <Button onPress={showStartDatePicker} title="Pick Start Date" />
                    </View>
                    <View style={[StandardStyles.row, styles.dateDisplay, StandardStyles.selfAlignStart]}>
                        <View style={styles.cancelButtonLeft}>
                            <Button onPress={clearStartDate} title="X" />
                        </View>
                        {startDate && (
                            <Text>
                                {startDate?.getDate() + "/" + (startDate?.getMonth() + 1) + "/" + startDate?.getFullYear()}
                            </Text>
                        )}
                    </View>
                </View>
                <View>
                    <View style={StandardStyles.row}>
                        <Button onPress={showEndDatePicker} title="Pick End Date" />
                    </View>
                    <View style={[StandardStyles.row, styles.dateDisplay, StandardStyles.selfAlignEnd]}>
                        {endDate && (
                            <Text>
                                {endDate?.getDate() + "/" + (endDate?.getMonth() + 1) + "/" + endDate?.getFullYear()}
                            </Text>
                        )}
                        <View style={styles.cancelButtonRight}>
                            <Button onPress={clearEndDate} title="X" />
                        </View>
                    </View>
                </View>
                {show && (
                    <RNDateTimePicker
                        value={new Date()}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'stretch',
        flex: 1
    },
    row: {
        flexDirection: 'row',
        marginBottom: 15,
        marginTop: 15,
    },
    datePicker: {
        justifyContent: 'space-between'
    },
    dateDisplay: {
        marginTop: 15,
        alignItems: 'center'
    },
    cancelButtonLeft: {
        marginRight: 10
    },
    cancelButtonRight: {
        marginLeft: 10
    },
    marginBottom: {
        marginBottom: 5
    }
});