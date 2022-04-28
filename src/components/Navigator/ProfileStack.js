import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import LoginScreen from "../../screens/User/Login/LoginScreen";
import ProfileScreen from "../../screens/User/Profile/ProfileScreen";
import userUtils from "../../utils/userUtils";
import headerSetting from "./HeaderSetting";

const Stack = createStackNavigator();

const ProfileStack = (props) => {
    const [user, setUser] = useState();

    const isLogin = async () => {
        const result = await userUtils.getUser();
        if (result) {
            console.log(result);
            setUser(result);
        }
    };

    const handleUserIsLogin = (value) => {
        props.handleUserLogin(value);
    };

    const LoginScreenComponent = (props) => {
        return <LoginScreen handleUserIsLogin={handleUserIsLogin} {...props} />;
    };

    useEffect(() => {
        isLogin();
    }, [user == null]);

    return (
        <Stack.Navigator screenOptions={headerSetting}>
            {user ? (
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreenComponent}
                />
            ) : (
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            )}
        </Stack.Navigator>
    );
};

export default ProfileStack;
