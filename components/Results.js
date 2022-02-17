import React from "react";
import { Text, FlatList } from "react-native";

const Results = ({ navigation, route }) => {
    console.log(JSON.stringify(route.params.list));

    return (
        <FlatList
        data={route.params.list}
        renderItem={({item}) => <Text>This is {item.name}'s profile</Text>} />
    );
};

export default Results;