import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { set } from 'react-native-reanimated';


export function HolidayRequest({ navigation }) {
    const [text, setText] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View
                style={StyleSheet.create({
                    flex: 1
                })}
            >
                <StartEndDatePickers
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

    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === 'ios');
        if (dateType === "start") {
            setStartDate(selectedDate);
            prop.setParentStartDate(selectedDate);
        }
        else if (dateType === "end") {
            setEndDate(selectedDate);
            prop.setParentEndDate(selectedDate);
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

    return (
        <View>
            <View style={[styles.row, styles.datePicker]}>
                <View>
                    <View style={styles.standardRow}>
                        <Button onPress={showStartDatePicker} title="Pick Start Date" />
                    </View>
                    <View style={[styles.standardRow, styles.dateDisplay, styles.selfAlignStart]}>
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
                    <View style={styles.standardRow}>
                        <Button onPress={showEndDatePicker} title="Pick End Date" />
                    </View>
                    <View style={[styles.standardRow, styles.dateDisplay, styles.selfAlignEnd]}>                        
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
    scrollContainer: {
        padding: 15,
        flexGrow: 1
    },
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
    standardRow: {
        flexDirection: 'row'
    },
    datePicker: {
        justifyContent: 'space-between'
    },
    dateDisplay: {
        marginTop: 15,
        alignItems: 'center'
    },
    selfAlignStart: {
        alignSelf: 'flex-start'
    },
    selfAlignEnd: {
        alignSelf: 'flex-end'
    },
    cancelButtonLeft: {
        marginRight: 10
    },
    cancelButtonRight: {
        marginLeft: 10
    }
});