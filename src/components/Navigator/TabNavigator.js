import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "native-base";
import React from "react";
import "react-native-gesture-handler";
import { COLORS } from "../../constant/index";
import CartStack from "./CartStack";
import HomeStack from "./HomeStack";
import ProductStack from "./ProductStack";

const Tab = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: COLORS.black,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarLabelStyle: {
                        fontSize: 12,
                    },
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            as={Ionicons}
                            name="home"
                            size={7}
                            color={focused ? COLORS.black : COLORS.lightGray}
                            style={{
                                marginTop: 10,
                            }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Product"
                component={ProductStack}
                options={{
                    tabBarLabelStyle: {
                        fontSize: 12,
                    },
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            as={Ionicons}
                            name="shirt"
                            size={7}
                            color={focused ? COLORS.black : COLORS.lightGray}
                            style={{
                                marginTop: 10,
                            }}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Cart"
                component={CartStack}
                options={{
                    tabBarLabelStyle: {
                        fontSize: 12,
                    },
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            as={Ionicons}
                            name="cart"
                            size={7}
                            color={focused ? COLORS.black : COLORS.lightGray}
                            style={{
                                marginTop: 10,
                            }}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default Tab;