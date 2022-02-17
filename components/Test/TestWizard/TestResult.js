import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native";


const TestResult = ({ navigation, route }) => {

    let questionCount = route.params.questions.length;
    let questions = route.params.questions;
    let correctAnswers = 0;

    function getCorectAnswers() {
        let isAnswerCorrect = true;
        for (let i = 0; i < questionCount; i++) {

            isAnswerCorrect = true;

            for (let a = 0; a < questions[i].answers.length; a++) {
                if (questions[i].answers[a].isAnswer == 1 && (questions[i].answers[a].selected == 0 || questions[i].answers[a].selected == null))
                    isAnswerCorrect = false;
                if (questions[i].answers[a].isAnswer == 0 && questions[i].answers[a].selected == 1)
                    isAnswerCorrect = false;
            }

            if (isAnswerCorrect == true)
                correctAnswers = correctAnswers + 1;

        }
    }

    return (
        <View style={styles.questionContainer} onPress={getCorectAnswers()}>
            <View style={styles.viewContainer}>
                <Text style={styles.questionCountText}>Rezultatas {correctAnswers} iš {questionCount}</Text>
            </View>
            <View style={styles.viewContainer2}>

            </View>
            <View style={styles.buttonBottomStyleContainer}>
                <TouchableOpacity style={styles.bottomQuestionNavigationButton} onPress={() => navigation.navigate('Pagrindinis langas')}>
                    <Text style={styles.textContainer}>Eiti į pagrindinį meniu</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create(
    {
        viewContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#6200EE',

        },
        viewContainer2: {
            flex: 10,
            backgroundColor: '#6200FE'
        },
        questionContainer: {
            flex: 1,
            flexDirection: "column",
            justifyContent: 'flex-start'
        },
        buttonUnselected: {
            backgroundColor: '#0ba6ff',
            paddingVertical: 15,
            marginTop: 5
        },
        buttonSelected: {
            backgroundColor: '#00c06a',
            paddingVertical: 15,
            marginTop: 5
        },
        imageContainer: {
            width: 180,
            height: 180,
        },
        viewContainerQuestionCount: {
            height: 28,
            backgroundColor: '#6200EE',
        },
        bottomQuestionNavigationButton: {
            flex: 1,
            backgroundColor: '#6200EE',
            borderColor: 'black',
            borderWidth: 1
        },
        buttonBottomStyleContainer: {
            flex: 1,
            flexDirection: 'column',
            borderColor: 'black',
            borderWidth: 1
        },
        questionCountText: {
            margin: 1,
            textAlign: 'center',
            color: 'white',
            fontSize: 18
        },
        answerText: {
            marginStart: 20,
            textAlign: "left",
            color: 'white',
            fontSize: 20
        },
        textContainer: {
            margin: 5,
            textAlign: 'center',
            color: 'white',
            fontSize: 18
        }
    }
);

export default TestResult;