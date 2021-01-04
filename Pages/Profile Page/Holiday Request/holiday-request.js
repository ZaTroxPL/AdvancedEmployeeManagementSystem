import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { StandardStyles } from '../../../StandardStyles';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { useLinkProps } from '@react-navigation/native';


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

    function setParentTimeOfDay(pickedOption) {
        setTimeOfDay(pickedOption);
        prop.setParentTimeOfDay(pickedOption)
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