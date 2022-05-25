import React, { useState, useEffect } from 'react';
import Login from "./Login.js";
import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import auth from '@react-native-firebase/auth';

const Home = ({ navigation }) => {

    const [loggedIn, setloggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState([]);

    const setUser = (user) => {
        setUserInfo(user);
        if (user)
            setloggedIn(true);
    }

    signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            auth().signOut();
            setloggedIn(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.mainContainer}>
            {!loggedIn && <Login setUser={setUser} />}
            {loggedIn &&
                <View>
                    <View style={styles.viewContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Testai')} style={styles.buttonContainer}>
                            <Text style={styles.textContainer}>Spręsti testą</Text>
                            <Icon name="play" size={65} color="#E4F3E5" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Rezultatai', { list: [{ id: 1, name: 'hello' }, { id: 2, name: 'world' }] })} style={styles.buttonContainer}>
                            <Text style={styles.textContainer}>Peržiūrėti rezultatus</Text>
                            <Icon name="sticky-note" size={65} color="#e4f3e5" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text style={styles.textContainer}>Pranešti apie klaidą</Text>
                            <Icon name="flag" size={65} color="#e4f3e5" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.logoutContainer}>
                        <TouchableOpacity onPress={signOut} style={styles.logoutButton}>
                            <Text style={styles.logoutText}>Atsijungti</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create(
    {
        mainContainer: {
            flex: 1,
        },
        logoutContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            backgroundColor: '#e4f3e5',
        },
        viewContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            backgroundColor: '#e4f3e5',
        },
        buttonContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            width: 180,
            height: 180,
            backgroundColor: '#4caf50',
            borderRadius: 12,

        },
        logoutButton: {
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            width: 180,
            height: 40,
            backgroundColor: '#d9534f',
            borderRadius: 12,
        },
        logoutText: {
            margin: 5,
            textAlign: 'center',
            color: 'white',
            fontSize: 16
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