import React from "react";
import { Text, FlatList } from "react-native";
import { MMKVLoader } from "react-native-mmkv-storage";

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
        <FlatList
        data={res}
        renderItem={({item}) => <Text>{item.totalQuestions}    {item.totalCorrectAnswers}    {(item.totalCorrectAnswers/item.totalQuestions*100)}</Text>} />
    );
};

export default Results;