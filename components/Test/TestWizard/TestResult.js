import React, { useEffect, useState } from "react";
import { MMKVLoader } from "react-native-mmkv-storage";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native";


const TestResult = ({ navigation, route }) => {

    const [questions, setQuestions] = useState([]);

    let questionEdit = route.params.questions;
    let questionCount = questionEdit.length;
    let correctAnswers = questions.correctAnswers != null ? questions.correctAnswers : 0;

    const MMKV = new MMKVLoader().initialize();

    const getCurrentDate= () =>{

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var hours = new Date().getHours(); //To get the Current Hours
        var min = new Date().getMinutes(); //To get the Current Minutes
        var sec = new Date().getSeconds(); //To get the Current Seconds
  
        return year + '-' + month + '-' + date + " " + hours + ':' + min + ':' + sec;
  }

    function getCorrectAnswers() {
        let isAnswerCorrect = true;
        for (let i = 0; i < questionCount; i++) {
            isAnswerCorrect = true;

            for (let a = 0; a < questionEdit[i].answers.length; a++) {
                if (questionEdit[i].answers[a].answeR_CORRECT == 1 && (questionEdit[i].answers[a].selected == 0 || questionEdit[i].answers[a].selected == null))
                    isAnswerCorrect = false;
                if (questionEdit[i].answers[a].answeR_CORRECT == 0 && questionEdit[i].answers[a].selected == 1)
                    isAnswerCorrect = false;
            }

            if (isAnswerCorrect == true) {
                correctAnswers = correctAnswers + 1;
                questionEdit.correctAnswers = correctAnswers;
                questionEdit[i].isAnswerCorrect = true;
            }
            else { questionEdit[i].isAnswerCorrect = false; }
        }
        questions.length == 0 ? setQuestions(questionEdit) : console.log(questions);
        let res = [];

        MMKV.getArray("results", (error, result) => {
            if (error) {
                console.log(error);
                return;
            }

            if (result != null)
                res = result;

            console.log(res); // logs array
        });

        let result = {time: getCurrentDate(), totalQuestions: questionEdit.length, totalCorrectAnswers: correctAnswers, category: questionEdit.category }

        res.push(result);

        MMKV.setArray("results", res, (error, result) => {
            if (error) {
                console.log(error);
                return;
            }

            console.log(result);
        });
    }


    useEffect(() => {
        getCorrectAnswers();
    }, [])



    if (questions.length < 1) {
        return (<View style={styles.viewContainer}>
            <Text style={styles.questionCountText}>Loading results...</Text>
        </View>);
    }
    else {
        return (
            <View style={styles.questionContainer}>
                <View style={styles.viewContainer}>
                    <Text style={styles.questionCountText}>Rezultatas {correctAnswers} iš {questions.length}</Text>
                    <Text style={styles.questionCountText}>Kategorija {questions.category}</Text>
                </View>
                <View style={styles.reviewContainer}>
                    <FlatList
                        data={questions}
                        horizontal={true}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={item.isAnswerCorrect ? styles.questionItemGreen : styles.questionItemRed}>
                                    <Text style={styles.answerText}>{index + 1}</Text>
                                </TouchableOpacity>
                            )
                        }} />
                </View>
                <View style={styles.buttonBottomStyleContainer}>
                    <TouchableOpacity style={styles.bottomQuestionNavigationButton} onPress={() => navigation.navigate('Pagrindinis langas')}>
                        <Text style={styles.textContainer}>Eiti į pagrindinį meniu</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create(
    {
        viewContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#6200EE',

        },
        reviewContainer: {
            flex: 10,
            justifyContent: 'space-between',
            flexDirection: 'row',
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
            justifyContent: 'center',
            flex: 1,
            backgroundColor: '#6200EE',
        },
        buttonBottomStyleContainer: {
            flex: 1,
            flexDirection: 'column',
        },
        questionCountText: {
            margin: 1,
            textAlign: 'center',
            color: 'white',
            fontSize: 18
        },
        answerText: {
            textAlign: "center",
            color: 'white',
            fontSize: 20
        },
        textContainer: {
            margin: 5,
            textAlign: 'center',
            color: 'white',
            fontSize: 18
        },
        questionItemGreen: {
            margin: 5,
            backgroundColor: 'green',
            width: 30,
            height: 30
        },
        questionItemRed: {
            margin: 5,
            backgroundColor: 'red',
            width: 30,
            height: 30
        }
    }
);

export default TestResult;