import React from 'react';
import Home from "./components/Home.js";
import Results from "./components/Results.js";
import Report from "./components/Report.js";
import TestType from "./components/Test/TestType.js";
import { NavigationContainer } from '@react-navigation/native';
import TestWizard from "./components/Test/TestWizard/TestWizard.js";
import TestResult from "./components/Test/TestWizard/TestResult.js";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Pagrindinis langas"
          component={Home}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Testai"
          component={TestType}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Testas"
          component={TestWizard}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Rezultatai"
          component={Results}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Testo rezultatas"
          component={TestResult}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Pranesimai"
          component={Report}
          options={{headerShown:false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;