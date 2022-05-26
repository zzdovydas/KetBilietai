import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from "react-native";

const TestTimer = ({ navigation, timeUntil }) => {

    const [timeStr, setTimeStr] = useState("");

    const secondsToHms = (d) => {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
    
        var hDisplay = h > 0 ? h + (h == 1 ? " valanda, " : " valandos, ") : "";
        var mDisplay = m > 0 ? m + (m != 1 ? " minutės " : " minutė ") : "";
        var sDisplay = s > 0 ? s + (s != 1 ? " sekundės " : " sekundė ") : "";
        return hDisplay + mDisplay + sDisplay; 
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const timeLeft = timeUntil - new Date().getTime()/1000;

            if (timeLeft <= 0) {
                clearInterval(interval);
                navigation.navigate('Pagrindinis langas');
                console.log('passed');
            }
            else {
                console.log(timeStr);
                setTimeStr(secondsToHms(timeLeft));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timeStr]);

    return (
        <View style={styles.viewContainer}>
            <Text style={styles.textContainer}>Liko laiko: {timeStr}</Text>
        </View>
    );
};

const styles = StyleSheet.create(
    {
        viewContainer: {
            flex: 1,
            height: 28,
            backgroundColor: '#4caf50',
        },
        textContainer: {
            margin: 1,
            textAlign: 'center',
            color: '#575b57',
            fontSize: 18
        },
    }
);

export default TestTimer;