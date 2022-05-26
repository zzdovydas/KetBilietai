import React, { useState, useEffect } from 'react';
import { MMKVLoader } from "react-native-mmkv-storage";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Dimensions } from 'react-native';


const Report = ({ navigation, route }) => {

const { height } = Dimensions.get('window');

const MMKV = new MMKVLoader().initialize();

const [reportText, setReportText] = useState('');

const postReport = (text) => {
    let res;
    MMKV.getArray("user", (error, result) => {
    if (error) {
        console.log(error);
        return;
    }
    if (result != null)
        res = result;

    console.log(res + "     " + text); // logs array
});
    // fetch('http://5.20.238.159:5271/report/storereport', {
    //     method: 'POST',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         gmail: res.email,
    //         message: text
    //     })
    // });
};

    return (
        <View style={[styles.mainContainer, { height: height }]}>
            <View style={styles.reportContainer}>
                <View style={styles.introContainer}>
                    <View style={styles.tabContainer}></View>
                    <View style={styles.headerTextContainer}></View>
                    <Text style={styles.headerText}>Pranešti apie klaidą</Text></View>
                <View style={styles.reportTextContainer}>
                    <View style={styles.itemContainer}>
                        <TextInput style={styles.inputContainer} onChangeText={newText => setReportText(newText)}  defaultValue={reportText} placeholder="Rašykite pastebėjimus" multiline underlineColorAndroid="#e4f3e5"></TextInput>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button style = {styles.submitButton} color="white" onPress={() => postReport(reportText)}>Pranešti</Button>
                    </View>
                </View>
            </View>
            <View style={styles.buttonBottomStyleContainer}>
                <TouchableOpacity style={styles.bottomQuestionNavigationButton} onPress={() => navigation.navigate('Pagrindinis langas')}>
                    <Text style={styles.textContainer}>Eiti į pagrindinį meniu</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        mainContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#e4f3e5',

        },
        tabContainer: {
            height: 10,
            backgroundColor: '#4caf50',
            width: '100%',
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,

        },
        reportTextContainer: {
            flex: 8,
            width: '100%',
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
        inputContainer: {
            flex: 7,
            paddingLeft: 8,
            backgroundColor: 'white',
            color: '#575b57',
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
        reportContainer: {
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
        },
        buttonContainer: {
            alignItems: 'flex-end',
        },
        submitButton: {
            backgroundColor: '#4caf50',
            marginEnd: 20,
        }
    }
);

export default Report;