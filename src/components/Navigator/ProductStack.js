
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProductDetailScreen from "../../screens/Product/ProductDetail/ProductDetailScreen";
import ProductListScreen from "../../screens/Product/ProductList/ProductListScreen";
import headerSetting from "./HeaderSetting";
const Stack = createStackNavigator();

const ProductStack = () => {
    return (
        <Stack.Navigator
            screenOptions={headerSetting}
            initialRouteName="ProductListScreen"
        >
            <Stack.Screen
                name="ProductListScreen"
                component={ProductListScreen}
            />
            <Stack.Screen
                name="ProductDetailScreen"
                component={ProductDetailScreen}
            />
        </Stack.Navigator>
    );
};

export default ProductStack;