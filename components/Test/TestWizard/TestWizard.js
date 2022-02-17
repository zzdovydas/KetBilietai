import React, { useState } from "react";
import TestTimer from "./TestTimer.js";
import TestQuestion from "./TestQuestion.js";
import { Button, Text, View, StyleSheet } from "react-native";


const TestWizard = ({ navigation, route }) => {

    const futureTime = new Date().getTime() / 1000 + 1802;

    const setQuestions = [{
        "questionName": 'Ar esate važiavęs automobiliu?', "answers": [{ "answerName": 'taip', isAnswer: 0 },
        { "answerName": 'ne', isAnswer: 1 },
        { "answerName": 'neatsimenu', isAnswer: 0 }],
        "imageUrl": 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Square_dance_sign.svg/1200px-Square_dance_sign.svg.png'
    }, {
        "questionName": 'Ar išgeriate?', "answers": [{ "answerName": 'niekada', isAnswer: 0 },
        { "answerName": 'ne', isAnswer: 1 },
        { "answerName": 'neatsimenu', isAnswer: 0 }],
        "imageUrl": null}];

    const [questionList, setQuestion] = useState(setQuestions);
    let currQuestionIndex = 0;

    const changeQuestionIndex = (num) => {
        currQuestionIndex = currQuestionIndex + num;
        console.log(currQuestionIndex);
        return currQuestionIndex;
    }

    function addQuestion(question) {
        setQuestion(prevItems => [{question}, ...prevItems]);
        console.log(questionList);
        console.log(questionList[0].answers);
        //console.log(questions);
        //console.log(currQuestion);
        //console.log(setQuestions[currQuestion]);
    };
    function setAnswers(index, answerIndex) {
        const questions = [...questionList];
        const question = questions[index];
        //console.log(question);
        console.log(setQuestions[0].answers);
        const answers = [...question.answers];
        //console.log(answers[answerIndex]);
        //console.log(answers[answerIndex].answerName);
        //answers[answerIndex].answerName = "rfergreg";
        //questions.answers = [...answers];
        //setQuestion([...questions]);
    };

    return (
        <View style={{flexDirection: 'column', flex: 1}}>
            <TestTimer navigation={navigation} timeUntil={futureTime} />
            <TestQuestion navigation={navigation} questions={setQuestions} page={changeQuestionIndex}/>
        </View>
    );
};

export default TestWizard;