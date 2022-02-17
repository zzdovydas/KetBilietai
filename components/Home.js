import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = ({navigation}) => {
    
    return (
        <View style={styles.viewContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Testai')} style={styles.buttonContainer}>
                <Text style={styles.textContainer}>Spręsti testą</Text>
                <Icon name="play" size={65} color="#03DAC5" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Rezultatai', {list: [{id: 1, name: 'hello'}, {id: 2, name: 'world'}]})} style={styles.buttonContainer}>
                <Text style={styles.textContainer}>Peržiūrėti rezultatus</Text>
                <Icon name="sticky-note" size={65} color="#03DAC5" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.textContainer}>Pranešti apie klaidą</Text>
                <Icon name="flag" size={65} color="#03DAC5" />
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

export default Home;