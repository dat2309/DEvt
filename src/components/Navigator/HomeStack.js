import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../../screens/Home/HomeScreen";
import ProductDetailScreen from "../../screens/Product/ProductDetail/ProductDetailScreen";
import ProfileScreen from "../../screens/User/Profile/ProfileScreen";
import headerSetting from "./HeaderSetting";

const Stack = createStackNavigator();

const HomeStack = (props) => {
    return (
        <Stack.Navigator
            screenOptions={headerSetting}
            initialRouteName="HomeScreen"
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        </Stack.Navigator>
    );
};

export default HomeStack;
