import React from "react";
import {useEffect} from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const TestType = ({navigation}) => {
    
    return (
        <View style={styles.viewContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Testas', {questionCount: 35, category: 'A'})} style={styles.buttonContainer}>
                <Text style={styles.textContainer}>A, A1, A2, AM kategorija</Text>
                <Icon name="motorcycle" size={55} color="#e4f3e5" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Testas', {questionCount: 30, category: 'B'})} style={styles.buttonContainer}>
                <Text style={styles.textContainer}>B kategorija</Text>
                <Icon name="car" size={55} color="#e4f3e5" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Testas', {questionCount: 40, category: 'C'})} style={styles.buttonContainer}>
                <Text style={styles.textContainer}>C kategorija</Text>
                <Icon name="truck" size={55} color="#e4f3e5" />
            </TouchableOpacity>
            <View style={styles.buttonBottomStyleContainer}>
                <TouchableOpacity style={styles.bottomQuestionNavigationButton} onPress={() => navigation.navigate('Pagrindinis langas')}>
                    <Text style={styles.navigationTextContainer}>Eiti į pagrindinį meniu</Text>
                </TouchableOpacity>
            </View>
        </View>    
    );
};

const styles = StyleSheet.create(
    {
        viewContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            backgroundColor: '#e4f3e5',
        },
        buttonContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
            width: 180,
            height: 180,
            backgroundColor: '#4caf50',
            borderRadius: 12,
            
        },
        textContainer: {
            margin: 5, 
            textAlign: 'center',
            color: 'white',
            fontSize: 20
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
        navigationTextContainer: {
            margin: 0,
            color: '#575b57',
            fontSize: 18,
        }
    }
);

export default TestType;