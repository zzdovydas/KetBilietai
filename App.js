import React from 'react';
import Home from "./components/Home.js";
import Results from "./components/Results.js";
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
        />
        <Stack.Screen
          name="Testai"
          component={TestType}
        />
        <Stack.Screen
          name="Testas"
          component={TestWizard}
        />
        <Stack.Screen
          name="Rezultatai"
          component={Results}
        />
        <Stack.Screen
          name="Testo rezultatas"
          component={TestResult}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;