import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { MMKVLoader } from "react-native-mmkv-storage";
import { ProgressBar, Colors } from 'react-native-paper';


const Results = ({ navigation, route }) => {
    console.log(JSON.stringify(route.params.list));

    const MMKV = new MMKVLoader().initialize();

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

    return (
        <View style={styles.mainContainer}>
            <View style={styles.resultsContainer}>
                <View style={styles.introContainer}>
                    <View style={styles.tabContainer}></View>
                    <View style={styles.headerTextContainer}></View>
                    <Text style={styles.headerText}>Rezultatai</Text></View>
                <View style={styles.listContainer}>
                    <FlatList
                        data={res}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <View style={styles.itemText}>
                                    <Text style={styles.textContainer}>Kategorija {item.category}</Text>
                                    <Text style={styles.textContainer}>{item.time}</Text>
                                </View>
                                <View style={styles.itemResult}>
                                    <Text style={styles.textContainer}>{item.totalCorrectAnswers}/{item.totalQuestions}</Text>
                                    <ProgressBar style={styles.progressBar} progress={item.totalCorrectAnswers/item.totalQuestions} color={((item.totalCorrectAnswers/item.totalQuestions)>=0.8) ? Colors.green600 : Colors.red600} />
                                </View>
                            </View>
                        )} />
                </View>
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
        mainContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#e4f3e5',

        },
        progressBar: {
            width: 70,
            height: 10,
            borderRadius: 3,
        },
        tabContainer: {
            height: 10,
            backgroundColor: '#4caf50',
            width: '100%',
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,

        },
        listContainer: {
            flex: 8,
        },
        itemContainer: {
            marginHorizontal: 20,
            marginTop: 20,
            borderRadius: 10,
            padding: 15,
            backgroundColor: 'white',
            alignItems: 'flex-start',
            borderWidth: 1,
            borderColor: '#dadce0',
            flexDirection: 'row',
        },
        itemText: {
            flex: 7,
            paddingLeft: 8,
            color: '#575b57',
        },
        itemResult: {
            flex: 3,
            alignItems: 'center',
        },
        headerText: {
            paddingStart: 22,
            marginTop: 8,
            fontSize: 26,
            color: '#575b57',
        },
        introContainer: {
            flex: 1,
            marginHorizontal: 20,
            marginTop: 20,
            borderRadius: 10,
            backgroundColor: 'white',
            alignItems: 'flex-start',
            borderWidth: 1,
            borderColor: '#dadce0',
        },
        resultsContainer: {
            flex: 10,
            width: '100%',
        },
        bottomQuestionNavigationButton: {
            justifyContent: 'center',
            flex: 1,
            backgroundColor: '#e4f3e5',
        },
        buttonBottomStyleContainer: {
            flex: 1,
            flexDirection: 'column',
        },
        textContainer: {
            margin: 0,
            color: '#575b57',
            fontSize: 18,
        }
    }
);

export default Results;