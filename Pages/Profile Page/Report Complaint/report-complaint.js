import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { StandardStyles } from '../../../StandardStyles';

export function ReportComplaint({ navigation }) {
    const [text, setText] = useState("");
    const [category, setCategory] = useState();
    const [sendToManager, setSendToManager] = useState();

    return (
        <ScrollView contentContainerStyle={StandardStyles.scrollContainer}>
            <ComplaintCategory setParentCategory={setCategory} setParentSendToManager={setSendToManager} />
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
                        // TODO: Send text, category and send to your manager data to the database
                    }}
                />
            </View>
        </ScrollView>
    );
}

function ComplaintCategory(props) {
    const [category, setCategory] = useState();
    const [sendToManager, setSendToManager] = useState();

    // TODO: Retrieve categories from database
    var categories = ["Harrasment", "Low Pay", "Unpaid Overtime", "Too Much Overtime"]
    var reactOptionSet = [];

    for (var i = 0; i < categories.length; i++) {
        reactOptionSet.push(
            <Picker.Item key={"key-" + categories[i].replace(" ", "-")} label={categories[i]} value={categories[i]} />
        );
    }

    function setParentCategory(category) {
        setCategory(category)
        props.setParentCategory(category);
    }

    function setParentSendToManager(yesNo) {
        setSendToManager(yesNo);
        props.setParentSendToManager(yesNo);
    }

    return (
        <View
            style={StyleSheet.create({
                flex: 1
            })}
        >
            <View style={styles.bottomMargin}>
                <Text style={styles.bottomMargin}>
                    Send to your Manager?
                </Text>
                <SegmentedControlTab
                    values={["Yes", "No"]}
                    selectedIndex={sendToManager}
                    onTabPress={setParentSendToManager}
                />
            </View>
            <View>
                <Text>
                    Pick Category:
                </Text>
                <Picker
                    selectedValue={category}
                    onValueChange={(itemValue, itemIndex) =>
                        setParentCategory(itemValue)
                    }
                >
                    {reactOptionSet}
                </Picker>
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
    bottomMargin: {
        marginBottom: 5
    }
})