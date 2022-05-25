import React from "react";
import {useEffect} from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const TestType = ({navigation}) => {
    
    return (
        <View style={styles.viewContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Testas', {category: 'A'})} style={styles.buttonContainer}>
                <Text style={styles.textContainer}>A, A1, A2, AM kategorija</Text>
                <Icon name="motorcycle" size={55} color="#03DAC5" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Testas', {category: 'B'})} style={styles.buttonContainer}>
                <Text style={styles.textContainer}>B kategorija</Text>
                <Icon name="car" size={55} color="#03DAC5" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Testas', {category: 'C'})} style={styles.buttonContainer}>
                <Text style={styles.textContainer}>C kategorija</Text>
                <Icon name="truck" size={55} color="#03DAC5" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create(
    {
        viewContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center'
        },
        buttonContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
            width: 180,
            height: 180,
            backgroundColor: '#6200EE',
            borderRadius: 12,
            
        },
        textContainer: {
            margin: 5, 
            textAlign: 'center',
            color: 'white',
            fontSize: 20
        }
    }
);

export default TestType;