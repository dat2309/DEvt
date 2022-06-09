import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";

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

    const handleClickOrderHistory = async () => {
        props.navigation.navigate("OrderHistoryScreen");
    };

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Profile" onPress={handleClickProfile} />
            <DrawerItem label="Logout" onPress={handleClickLogout} />
            <DrawerItem
                label="Order History"
                onPress={handleClickOrderHistory}
            />
        </DrawerContentScrollView>
    );
};

export default DrawerContent;