import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';

const TestQuestion = ({ navigation, questions, page }) => {

    const [refresh, setRefresh] = useState(0);
    let questionIndex = page(0);

    function toggleAnswers(index) {

        questions[questionIndex].answers[index].selected == 1 ? questions[questionIndex].answers[index].selected = 0 : questions[questionIndex].answers[index].selected = 1;
        console.log("lalalala");
        setRefresh(refresh + 1);
    }

    console.log(questions[questionIndex])

    function setPage(num) {
        if (questionIndex > 0 && questionIndex < (questions.length - 1)) {
            page(num);
            setRefresh(refresh + 1);
        }
        else if ((questionIndex <= 0 && num >= 0) || (questionIndex >= (questions.length - 1) && num <= 0)) {
            page(num);
            setRefresh(refresh + 1);
        }
        else if (questionIndex >= (questions.length - 1) && num > 0) {
            navigation.replace('Testo rezultatas', { questions });
        }
        else {
        }
    }

    return (
        <View style={styles.questionContainer}>
            <View style={styles.viewContainerQuestionCount}>
                <Text style={styles.questionCountText}>{(questionIndex + 1)}/{questions.length}</Text>
            </View>
            <View style={styles.viewContainer}>
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
                            <View style={styles.answerItemView}>
                                <CheckBox
                                    disabled={false}
                                    value={item.selected == null ? false : item.selected == 0 ? false : true}
                                    onValueChange={() => toggleAnswers(index)}
                                />
                                <Text style={styles.answerText}>{item.answeR_NAME}</Text>
                            </View>
                        )
                    }} />
            </View>
            <View style={styles.buttonBottomStyleContainer}>
                {questionIndex != 0 &&
                    <TouchableOpacity style={styles.bottomQuestionNavigationButton} onPress={() => setPage(-1)}>
                        <Text>Praeitas klausimas</Text>
                        <Icon name="arrow-left" size={35} />
                    </TouchableOpacity>
                }
                {questionIndex != 0 &&
                    <TouchableOpacity style={styles.bottomQuestionNavigationMiddleButton} onPress={() => navigation.navigate('Pagrindinis langas')}>
                        <Text>Nutraukti</Text>
                        <Icon name="close" size={35} />
                    </TouchableOpacity>
                }
                {questionIndex != (questions.length - 1) &&
                    <TouchableOpacity style={styles.bottomQuestionNavigationRightButton} onPress={() => setPage(1)}>
                        <Text>Kitas klausimas</Text>
                        <Icon name="arrow-right" size={35} />
                    </TouchableOpacity>
                }
                {questionIndex == (questions.length - 1) &&
                    <TouchableOpacity style={styles.bottomQuestionNavigationRightButton} onPress={() => setPage(1)}>
                        <Text>Baigti testą</Text>
                        <Icon name="check" size={35} className="fa-spin" />
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create(
    {
        viewContainer: {
            flex: 5,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#e4f3e5',

        },
        viewContainer2: {
            flex: 3,
            backgroundColor: '#e4f3e5',
        },
        buttonUnselected: {
            backgroundColor: '#e4f3e5',
            paddingVertical: 15,
            marginTop: 5
        },
        buttonSelected: {
            backgroundColor: '#4caf50',
            paddingVertical: 15,
            marginTop: 5
        },
        imageContainer: {
            width: 360,
            height: 220,
            backgroundColor: '#e4f3e5',
        },
        questionContainer: {
            flex: 18,
            flexDirection: "column",
            justifyContent: 'flex-start',
            color: '#575b57',
        },
        answerItemView: {
            marginTop: 20,
            flexDirection: "row",
        },
        viewContainerQuestionCount: {
            height: 28,
            backgroundColor: '#4caf50',
        },
        bottomQuestionNavigationButton: {
            paddingTop: 5,
            paddingStart: 15,
            flex: 1,
            backgroundColor: '#e4f3e5'
        },
        bottomQuestionNavigationMiddleButton: {
            paddingTop: 5,
            flex: 1,
            alignItems: 'center',
            backgroundColor: '#e4f3e5'
        },
        bottomQuestionNavigationRightButton: {
            paddingTop: 5,
            paddingEnd: 15,
            flex: 1,
            alignItems: 'flex-end',
            backgroundColor: '#e4f3e5'
        },
        buttonBottomStyleContainer: {
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
            height: 280,
            backgroundColor: '#e4f3e5'
        },
        questionCountText: {
            textAlign: 'center',
            color: '#575b57',
            fontSize: 18
        },
        answerText: {
            marginStart: 10,
            textAlign: "left",
            color: '#575b57',
            fontSize: 20,
            paddingRight: 35,
        },
        textContainer: {
            margin: 5,
            textAlign: 'center',
            color: '#575b57',
            fontSize: 20
        }
    }
);

export default TestQuestion;