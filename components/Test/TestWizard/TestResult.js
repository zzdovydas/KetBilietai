import React, { useEffect, useState } from "react";
import { MMKVLoader } from "react-native-mmkv-storage";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import CheckBox from '@react-native-community/checkbox';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const TestResult = ({ navigation, route }) => {

    const [questions, setQuestions] = useState([]);
    const [questionIndex, setQuestionIndex] = useState(0);

    let questionEdit = route.params.questions;
    let questionCount = questionEdit.length;
    let correctAnswers = questions.correctAnswers != null ? questions.correctAnswers : 0;

    const MMKV = new MMKVLoader().initialize();

    const getCurrentDate = () => {

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
        questionEdit.percentage = (correctAnswers/questionEdit.length)*100; 
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

        let result = { time: getCurrentDate(), totalQuestions: questionEdit.length, totalCorrectAnswers: correctAnswers, category: questionEdit.category }

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
            <View style={[styles.questionContainer, {width: width}]}>
                <View style={[styles.viewContainer, questions.percentage >= 80 ? {backgroundColor: '#77DD76'} : {backgroundColor: '#DE3835'}]}>     
                    <Text style={styles.questionCountText}>{questions.percentage >= 80 ? "Egzaminas išlaikytas" : "Egzaminas neišlaikytas"}</Text>
                    <Text style={styles.questionCountText}>Rezultatas {correctAnswers}/{questions.length}  {questions.percentage.toFixed(2)}%</Text>
                </View>
                
                <View style={styles.viewContainer1}>
                    {questions[questionIndex].questioN_IMG_URL != "" &&
                        <Image style={styles.imageContainer} source={{ uri: questions[questionIndex].questioN_IMG_URL }} />
                    }
                    <Text style={styles.textContainer}>{questions[questionIndex].questioN_NAME}</Text>
                </View>
                <View style={styles.viewContainer2}>
                    <FlatList
                        data={questions[questionIndex].answers}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={[styles.answerItemView, item.answeR_CORRECT ? { backgroundColor: '#77DD76'} : {backgroundColor: '#e71b1b'}]}>
                                    <CheckBox
                                        disabled={true}
                                        value={item.selected == null ? false : item.selected == 0 ? false : true}
                                    />
                                    <Text style={styles.answerText}>{item.answeR_NAME}</Text>
                                </View>
                            )
                        }} />
                </View>
                <View style={styles.reviewContainer}>
                    <FlatList
                        data={questions}
                        //horizontal={true}
                        numColumns={8}
                        contentContainerStyle={{
                            alignItems: 'center'
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={() => setQuestionIndex(index)} style={item.isAnswerCorrect ? styles.questionItemGreen : styles.questionItemRed}>
                                    <Text style={styles.answerItemText}>{index + 1}</Text>
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
        viewContainer1: {
            flex: 13,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#e4f3e5',

        },
        viewContainer2: {
            flex: 11,
            backgroundColor: '#e4f3e5',
        },
        viewContainer: {
            flex: 3,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#4caf50',

        },
        imageContainer: {
            width: 360,
            height: 220,
            backgroundColor: '#e4f3e5',
        },

        reviewContainer: {
            flex: 4,
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: '#e4f3e5'
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
            backgroundColor: '#e4f3e5',
        },
        bottomQuestionNavigationButton: {
            justifyContent: 'center',
            flex: 1,
            backgroundColor: '#e4f3e5',
        },
        buttonBottomStyleContainer: {
            flex: 2,
            flexDirection: 'column',
        },
        questionCountText: {
            margin: 1,
            textAlign: 'center',
            color: '#575b57',
            fontSize: 18
        },
        answerText: {
            color: '#575b57',
            fontSize: 20
        },
        answerItemText: {
            textAlign: 'center',
            color: '#575b57',
            fontSize: 20
        },
        answerItemView: {
            marginTop: 2,
            flexDirection: "row",
            paddingRight: 35
        },
        textContainer: {
            margin: 5,
            textAlign: 'center',
            color: '#575b57',
            fontSize: 18
        },
        questionItemGreen: {
            margin: 2,
            backgroundColor: 'green',
            width: 40,
            justifyContent: 'center',
            height: 40
        },
        questionItemRed: {
            margin: 2,
            backgroundColor: 'red',
            justifyContent: 'center',
            width: 40,
            height: 40,
        }
    }
);

export default TestResult;