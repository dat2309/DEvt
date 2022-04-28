import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../../screens/Home/HomeScreen";
import ActiveScreen from "../../screens/User/ActiveUser/ActiveScreen";
import ForgotPasswordScreen from "../../screens/User/ForgotPassword/ForgotPasswordScreen";
import LoginScreen from "../../screens/User/Login/LoginScreen";
import ProfileScreen from "../../screens/User/Profile/ProfileScreen";
import RecoverPasswordScreen from "../../screens/User/RecoverPassword/RecoverPasswordScreen";
import RegisterScreen from "../../screens/User/Register/RegisterScreen";
import headerSetting from "./HeaderSetting";

const Stack = createStackNavigator();

const UserStack = (props) => {
    const handleClickMenu = () => {
        console.log("click menu");
    };
    const handleClickSearch = () => {
        console.log("click search");
    };

    const handleUserIsLogin = (value) => {
        props.handleUserLogin(value);
    };

    const LoginScreenComponent = (props) => {
        return <LoginScreen handleUserIsLogin={handleUserIsLogin} {...props} />;
    };

    return (
        <Stack.Navigator screenOptions={headerSetting}>
            <Stack.Screen name="LoginScreen" component={LoginScreenComponent} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen
                name="ForgotPasswordScreen"
                component={ForgotPasswordScreen}
            />
            <Stack.Screen
                name="RecoverPasswordScreen"
                component={RecoverPasswordScreen}
            />
            <Stack.Screen name="ActiveScreen" component={ActiveScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        </Stack.Navigator>
    );
};

export default UserStack;
