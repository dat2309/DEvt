import { Box, Text as TextNativeBase } from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import productApi from "../../api/productApi";
import styles from "./styles";

const renderProduct = (product, index, navigation) => {
    const calculatePriceDiscount = (price, discount) => {
        const discountPrice = price - (price * discount) / 100;
        return discountPrice;
    };

    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate("ProductDetailScreen", {
                    product: {
                        ...product,
                        price: calculatePriceDiscount(
                            product.price,
                            product.discount
                        ),
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
                    <View style={styles.text_discount_container}>
                        <Box>
                            <TextNativeBase
                                isTruncated
                                maxW="400"
                                w="80%"
                                style={styles.card_title}
                            >
                                {product.discount}%
                            </TextNativeBase>
                        </Box>
                    </View>
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
                                style={styles.card_discount}
                            >
                                Price: {product.price}
                            </TextNativeBase>
                            <TextNativeBase
                                isTruncated
                                maxW="400"
                                w="80%"
                                style={styles.card_price}
                            >
                                Price:{" "}
                                {calculatePriceDiscount(
                                    product.price,
                                    product.discount
                                )}
                            </TextNativeBase>
                        </Box>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const ProductSaleList = (props) => {
    const [products, setProducts] = useState();
    const getProductSale = async () => {
        const res = await productApi.getProductSale();
        if (res) {
            setProducts(res);
        }
    };

    useEffect(() => {
        getProductSale();
    }, [products == null]);
    return (
        <View style={styles.container}>
            <Text
                style={{
                    fontSize: 20,
                    marginBottom: 15,
                }}
            >
                SALE SALE SALE
            </Text>
            {products && (
                <FlatList
                    numColumns={2}
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) =>
                        renderProduct(item, index, props.navigation)
                    }
                />
            )}
        </View>
    );
};

export default ProductSaleList;
