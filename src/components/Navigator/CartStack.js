import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CartScreen from "../../screens/Order/Cart/CartScreen";
import CheckoutScreen from "../../screens/Order/Checkout/CheckoutScreen";
import LoginScreen from "../../screens/User/Login/LoginScreen";
import headerSetting from "./HeaderSetting";

const Stack = createStackNavigator();

const CartStack = () => {
    return (
        <Stack.Navigator
            screenOptions={headerSetting}
            initialRouteName="CartScreen">
            <Stack.Screen name="CartScreen" component={CartScreen} />
            <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        </Stack.Navigator>
    );
};

export default CartStack;
