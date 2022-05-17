import React, { useState } from "react";
import TestTimer from "./TestTimer.js";
import TestQuestion from "./TestQuestion.js";
import { Button, Text, View, StyleSheet } from "react-native";

const TestWizard = ({ navigation, route }) => {

    const futureTime = new Date().getTime() / 1000 + 1802;

    const getMoviesFromApi = (questions) => {
        fetch('http://5.20.238.159:5271/question/getrandquestions?questionCount=30')
          .then((response) => response.json())
          .then((json) => {
            setQuestions(json);
            return true;
          })
          .catch((error) => {
            console.error(error);
            return false;
          });
      };

    const [questions, setQuestions] = useState([]);
    let currQuestionIndex = 0;

    const changeQuestionIndex = (num) => {
        currQuestionIndex = currQuestionIndex + num;
        return currQuestionIndex;
    }

    React.useEffect(() => {
        getMoviesFromApi();
      }, []);
    
    if (questions.length < 1) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={{flexDirection: 'column', flex: 1}}>
            <TestTimer navigation={navigation} timeUntil={futureTime} />
            <TestQuestion navigation={navigation} questions={questions} page={changeQuestionIndex}/>
        </View>
    );
};

export default TestWizard;