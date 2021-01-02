import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import RNDateTimePicker from '@react-native-community/datetimepicker';


export function HolidayRequest({ navigation }) {
    return (
        <ScrollView style={styles.scrollContainer}>
            <StartEndDatePickers />
            <TextInput multiline={true} style={styles.textInput} />
            <View>
                <Button title="Submit" />
            </View>
        </ScrollView>
    );
}

function StartEndDatePickers() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [show, setShow] = useState(false);
    const [dateType, setDateType] = useState(null);

    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === 'ios');
        if (dateType === "start") {
            setStartDate(selectedDate);
        }
        else if (dateType === "end") {
            setEndDate(selectedDate)
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

    return (
        <View>

            <View style={styles.row}>
                <View>
                    <Button onPress={showStartDatePicker} title="Pick Start Date" />
                </View>
                <View>
                    <Button onPress={showEndDatePicker} title="Pick End Date" />
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
            <View style={styles.row}>
                <View>
                    {startDate && (<Text>{startDate?.getDate() + "/" + (startDate?.getMonth() + 1) + "/" + startDate?.getFullYear()}</Text>)}
                </View>
                <View>
                    {endDate && (<Text>{endDate?.getDate() + "/" + (endDate?.getMonth() + 1) + "/" + endDate?.getFullYear()}</Text>)}
                </View>
            </View>
        </View>
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        marginTop: 15,
    },
});