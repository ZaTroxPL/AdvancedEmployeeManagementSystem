import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from "./Pages/Profile Page/profile-page.js";
import { HolidayRequest } from "./Pages/Profile Page/Holiday Request/holiday-request.js"
import { ReportComplaint } from './Pages/Profile Page/Report Complaint/report-complaint.js';
import { ViewEmployees } from './Pages/View Employees/view-employees.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Holiday Request" component={HolidayRequest} />
        <Stack.Screen name="Report Complaint" component={ReportComplaint} />
        <Stack.Screen name="View Employees" component={ViewEmployees} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.buttons}>
        <Button
          title="View Your Profile"
          onPress={() => {
            navigation.navigate('Profile')
          }}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          title="View Your Employees"
          onPress={() => {
            navigation.navigate('View Employees')
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles=StyleSheet.create({
  container: {
    padding: 10
  },
  buttons: {
    marginBottom: 10,
    marginTop: 10    
  }
})
