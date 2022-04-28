import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import productApi from "../../api/productApi";
import ProductList from "../../components/ProductList/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { images } from "../../constant/index";

const HomeScreen = ({ navigation }) => {
    const [products, setProducts] = useState();

    const getAllProduct = async () => {
        const res = await productApi.getAllProduct();
        if (res) {
            setProducts(res.content);
        }
    };

    useEffect(() => {
        getAllProduct();
    }, [products == null]);

    return (
        <View style={styles.container}>
            {products && (
                <ProductList navigation={navigation} products={products} />
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    new_arrival: {
        fontSize: 20,
    },
});

export default HomeScreen;
