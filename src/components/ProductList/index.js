import { Box, Text as TextNativeBase } from "native-base";
import React, { useState, useEffect } from "react";
import { FlatList, Image, TouchableOpacity, View, Text } from "react-native";
import categoryApi from "../../api/categoryApi";
import BannerCarousel from "../BannerCarousel";
import CategoryCarousel from "../CategoryCarousel";
import styles from "./styles";

const renderProduct = (product, index, navigation) => {
    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate("Product", {
                    screen: "ProductDetailScreen",
                    params: {
                        product: product,
                    },
                })
            }
            key={index}
            style={styles.card}
        >
            <View style={styles.container}>
                <View style={styles.card_template}>
                    <Image
                        style={styles.card_image}
                        source={{
                            uri: product.image,
                        }}
                    />
                    <View style={styles.text_container}>
                        <Box>
                            <TextNativeBase
                                isTruncated
                                maxW="400"
                                w="80%"
                                style={styles.card_title}
                            >
                                {product.name}
                            </TextNativeBase>
                        </Box>
                        <Box>
                            <TextNativeBase
                                isTruncated
                                maxW="400"
                                w="80%"
                                style={styles.card_price}
                            >
                                Price: {product.price}
                            </TextNativeBase>
                        </Box>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const ProductList = (props) => {
    const [categories, setCategories] = useState();

    const getAllCategory = async () => {
        const res = await categoryApi.getAllCategory();
        if (res) {
            setCategories(res);
        }
    };
    useEffect(() => {
        getAllCategory();
    }, [categories == null]);

    return (
        <FlatList
            style={styles.container}
            numColumns={2}
            data={props.products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) =>
                renderProduct(item, index, props.navigation)
            }
            ListHeaderComponent={<BannerCarousel />}
            ListFooterComponent={
                categories && (
                    <CategoryCarousel
                        categories={categories}
                        navigation={props.navigation}
                    />
                )
            }
        />
    );
};

export default ProductList;
