import { Ionicons } from "@expo/vector-icons";
import {
    Box,
    Button as ButtonNativeBase,
    HStack,
    Icon,
    Input,
    Text as TextNativeBase,
    useToast,
    VStack,
} from "native-base";
import React, { useState, useEffect } from "react";
import {
    Image,
    ScrollView,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CartUtils from "../../../utils/cartUtils";

import styles from "./ProductDetailStyle";

const ProductDetailScreen = (props) => {
    const { product } = props.route.params;

    const [selectedSize, setSelectedSize] = useState();
    const [quantity, setQuantity] = useState(0);
    const [maxQuantity, setMaxQuantity] = useState(0);

    const toast = useToast();

    const sizes = product.sizes;

    const showNotify = (title, status) => {
        toast.show({
            title: title,
            status: status,
            placement: "top",
        });
    };

    const handleAddToCart = async (product, size, quantity) => {
        if (
            quantity === undefined ||
            selectedSize === undefined ||
            quantity == 0
        ) {
            showNotify(`Please choose size and quantity !`, "error");
            return;
        }
        if (quantity > maxQuantity) {
            showNotify(`Max quantity is ${maxQuantity} !`, "warning");
            return;
        }

        const item = {
            productId: product.id,
            tag: size,
            quantity,
            image: product.image,
            name: product.name,
            price: (Number(product.price) * quantity).toFixed(2),
            maxQuantity,
        };
        const result = CartUtils.addToCart(item);
        if (result) {
            resetState();
            showNotify("Added to your cart", "success");
        }
    };
    const handlePickSize = async (sizeTag) => {
        if (sizeTag === selectedSize) {
            resetState();
        } else {
            setSelectedSize(sizeTag);
            const item = await CartUtils.findItemInCart(product.id, sizeTag);
            if (item !== -1) {
                setMaxQuantity(item.maxQuantity - item.quantity);
            } else {
                sizes.forEach((size) => {
                    if (size.tag === sizeTag) {
                        setMaxQuantity(size.quantity);
                    }
                });
            }
        }
    };
    const handleMinusQty = () => {
        if (selectedSize) {
            if (quantity > 0) {
                setQuantity(Number(quantity) - 1);
            }
        } else showNotify("Please choose a size !", "error");
    };
    const hanleAddQty = async () => {
        if (selectedSize) {
            if (quantity < maxQuantity) {
                setQuantity(Number(quantity) + 1);
            } else showNotify(`Max quantity is ${maxQuantity} !`, "warning");
        } else showNotify("Please choose a size !", "error");
    };

    const handleInputQuantity = (value) => {
        if (selectedSize) {
            setQuantity(Number(value));
        } else showNotify("Please choose a size !", "error");
    };

    const resetState = () => {
        setSelectedSize(undefined);
        setQuantity(0);
        setMaxQuantity(0);
    };
    return (
        <View style={styles.container}>
            <View
                style={{
                    marginVertical: 30,
                }}
            >
                <Icon
                    as={Ionicons}
                    name="arrow-back-outline"
                    size={7}
                    onPress={() => props.navigation.navigate("ProductListScreen")}
                />
                <ScrollView>
                    <View
                        style={{
                            alignItems: "center",
                        }}
                    >
                        <Image
                            style={styles.image}
                            source={{ uri: product.image }}
                        />
                    </View>
                    <View style={styles.infomation_box}>
                        <View
                            style={{
                                padding: 20,
                            }}
                        >
                            <Text style={styles.product_name}>
                                {product.name}
                            </Text>
                            <TextNativeBase isTruncated maxW="400" w="80%">
                                {product.description}
                            </TextNativeBase>
                            <View>
                                {sizes.length > 0 ? (
                                    <HStack>
                                        <VStack>
                                            <Text
                                                style={{
                                                    marginEnd: 10,
                                                    marginTop: 10,
                                                }}
                                            >
                                                Sizes:
                                            </Text>
                                        </VStack>
                                        <HStack space={2}>
                                            {sizes.map((size, index) => {
                                                if (size.quantity > 0) {
                                                    return (
                                                        <TouchableWithoutFeedback
                                                            underlayColor="blue"
                                                            key={index}
                                                            onPress={() =>
                                                                handlePickSize(
                                                                    size.tag
                                                                )
                                                            }
                                                        >
                                                            <Box
                                                                style={
                                                                    selectedSize ===
                                                                        size.tag
                                                                        ? styles.size_tag_selected
                                                                        : styles.size_tag
                                                                }
                                                            >
                                                                {size.tag}
                                                            </Box>
                                                        </TouchableWithoutFeedback>
                                                    );
                                                }
                                            })}
                                        </HStack>
                                    </HStack>
                                ) : (
                                    <HStack
                                        style={{
                                            marginTop: 10,
                                            marginBottom: 5,
                                            alignItems: "center",
                                        }}
                                    >
                                        <Icon
                                            as={Ionicons}
                                            name="alert-circle-outline"
                                            size={5}
                                            color="red.400"
                                        />
                                        <Text
                                            style={{
                                                marginStart: 5,
                                                color: "red",
                                            }}
                                        >
                                            Product current is out of stock
                                        </Text>
                                    </HStack>
                                )}
                            </View>
                            <View>
                                <HStack
                                    style={{
                                        marginTop: 5,
                                        alignItems: "center",
                                    }}
                                >
                                    <VStack
                                        style={{
                                            marginEnd: 10,
                                        }}
                                    >
                                        <Text>Quantity:</Text>
                                    </VStack>
                                    <VStack>
                                        <HStack
                                            space={1}
                                            style={{
                                                alignItems: "center",
                                            }}
                                        >
                                            <Icon
                                                as={Ionicons}
                                                name="remove-circle-outline"
                                                size={5}
                                                onPress={handleMinusQty}
                                            />

                                            <Input
                                                width={35}
                                                height={35}
                                                placeholder="0"
                                                value={
                                                    quantity > 0
                                                        ? quantity + ""
                                                        : ""
                                                }
                                                backgroundColor="white"
                                                keyboardType="numeric"
                                                onChangeText={(value) =>
                                                    handleInputQuantity(value)
                                                }
                                            />
                                            <Icon
                                                as={Ionicons}
                                                name="add-circle-outline"
                                                size={5}
                                                onPress={hanleAddQty}
                                            />
                                        </HStack>
                                    </VStack>
                                </HStack>
                            </View>
                            <View>
                                <HStack
                                    style={{
                                        marginTop: 5,
                                    }}
                                >
                                    <VStack>
                                        <Text
                                            style={{
                                                marginEnd: 10,
                                            }}
                                        >
                                            Price:
                                        </Text>
                                    </VStack>
                                    <VStack>
                                        <Text style={styles.product_price}>
                                            ${product.price}
                                        </Text>
                                    </VStack>
                                </HStack>
                            </View>
                            <View
                                style={{
                                    marginTop: 10,
                                }}
                            >
                                <ButtonNativeBase
                                    style={styles.btn_add_cart}
                                    size="lg"
                                    onPress={() =>
                                        handleAddToCart(
                                            product,
                                            selectedSize,
                                            quantity
                                        )
                                    }
                                >
                                    <Text>Add to cart</Text>
                                </ButtonNativeBase>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default ProductDetailScreen;
