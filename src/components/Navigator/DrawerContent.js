import { View, Text } from "react-native";
import React from "react";
import { Button } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from "@react-navigation/drawer";

const DrawerContent = (props) => {
    const handleClickLogout = async () => {
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("profile");
        props.setLoginVisible(false);
        props.navigation.navigate("HomeScreen");
    };

    const handleClickProfile = async () => {
        props.navigation.navigate("ProfileScreen");
    };

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Profile" onPress={handleClickProfile} />
            <DrawerItem label="Logout" onPress={handleClickLogout} />
        </DrawerContentScrollView>
    );
};

export default DrawerContent;
