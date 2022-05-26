import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    Box,
    Button as ButtonNativeBase,
    HStack,
    Icon,
    IconButton,
    Text as TextNativeBase,
    useToast,
    VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import NumberFormat from "react-number-format";
import { COLORS } from "../../../constant/index";
import CartUtils from "../../../utils/cartUtils";
import styles from "./CartStyle";

const CartScreen = (props) => {
    const [cart, setCart] = useState();
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);

    const getCartInStorage = async () => {
        let items = await AsyncStorage.getItem("cart");
        if (items) {
            items = JSON.parse(items);
            let productData = [];
            items.forEach((element) => {
                if (element !== null) {
                    productData.push(element);
                }
            });
            setCart(productData);
            const result = await CartUtils.calculateTotal();
            if (result) {
                setQuantity(result.totalQuantity);
                setPrice(result.totalPrice);
            }
        } else {
            setCart([]);
        }
    };

    const toast = useToast();

    const showNotify = (title, status) => {
        toast.show({
            title: title,
            status: status,
            placement: "top",
        });
    };

    const handleMinusQty = async (item) => {
        if (quantity > 0) {
            const result = await CartUtils.minusQuantity(item);
            if (result) {
                getCartInStorage();
            }
        }
    };
    const hanleAddQty = async (item) => {
        if (item.quantity < item.maxQuantity) {
            const result = await CartUtils.addQuantity(item);
            if (result) {
                getCartInStorage();
            }
        } else showNotify(`Max quantity is ${item.maxQuantity} !`, "warning");
    };

    const handleRemoveFromCart = async (id) => {
        const result = await CartUtils.removeFromCart(id);
        if (result) {
            getCartInStorage();
        }
    };

    const handleInputQuantity = async (value, index) => {
        if (value && value > 0) {
            const result = await CartUtils.updateQuantity(value, index);
            if (result) {
                getCartInStorage();
            } else {
                showNotify("Failed", "error");
            }
        }
        if (value && value == 0) {
            const result = await CartUtils.removeFromCart(
                cart[index].productId
            );
            if (result) {
                getCartInStorage();
            }
        }
    };

    const handleCheckout = async () => {
        let user = await AsyncStorage.getItem("user");
        if (user) {
            user = JSON.parse(user);
            props.navigation.navigate("CheckoutScreen", {
                cart: cart,
                quantity: quantity,
                price: price,
            });
        } else {
            showNotify("Please login before checkout cart", "warning");
            props.navigation.navigate("Login", { screen: "LoginScreen" });
        }
    };

    useEffect(() => {
        const unsubscribe = props.navigation.addListener("focus", () => {
            getCartInStorage();
        });
        return unsubscribe;
    }, [props.navigation]);

    return (
        <View style={styles.container}>
            {cart && cart.length > 0 ? (
                <View style={styles.container}>
                    <ScrollView style={styles.scroll_view}>
                        {cart.map((item, index) => {
                            return (
                                <View
                                    key={item.productId + item.tag}
                                    style={styles.item_template}
                                >
                                    <HStack
                                        space={3}
                                        style={{
                                            marginTop: 5,
                                        }}
                                    >
                                        <View
                                            style={{
                                                marginHorizontal: 10,
                                            }}
                                        >
                                            <Image
                                                style={styles.item_image}
                                                source={{
                                                    uri: item.image,
                                                }}
                                            />
                                        </View>
                                        <VStack
                                            space={2}
                                            style={styles.item_infomation}
                                        >
                                            <Box>
                                                <TextNativeBase>
                                                    {item.name}
                                                </TextNativeBase>
                                            </Box>
                                            <Box>
                                                <Text>Size: {item.tag}</Text>
                                            </Box>
                                            <Box>
                                                <VStack>
                                                    <HStack
                                                        space={1}
                                                        style={{
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <Icon
                                                            as={Ionicons}
                                                            name="remove-circle-outline"
                                                            size={5}
                                                            onPress={() =>
                                                                handleMinusQty(
                                                                    item
                                                                )
                                                            }
                                                        />

                                                        <TextInput
                                                            width={18}
                                                            height={35}
                                                            placeholder="0"
                                                            defaultValue={
                                                                item.quantity +
                                                                ""
                                                            }
                                                            backgroundColor="white"
                                                            keyboardType="numeric"
                                                            onChangeText={(
                                                                value
                                                            ) =>
                                                                handleInputQuantity(
                                                                    value,
                                                                    index
                                                                )
                                                            }
                                                        />
                                                        <Icon
                                                            as={Ionicons}
                                                            name="add-circle-outline"
                                                            size={5}
                                                            onPress={() =>
                                                                hanleAddQty(
                                                                    item
                                                                )
                                                            }
                                                        />
                                                    </HStack>
                                                </VStack>
                                            </Box>
                                            <Box>
                                                <Text
                                                    style={{
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    <NumberFormat
                                                        value={item.price}
                                                        displayType={"text"}
                                                        thousandSeparator={true}
                                                        suffix={" VND"}
                                                        renderText={(
                                                            formattedValue
                                                        ) => (
                                                            <Text>
                                                                {formattedValue}
                                                            </Text>
                                                        )}
                                                    />
                                                </Text>
                                            </Box>
                                        </VStack>
                                        <View style={styles.button_remove}>
                                            <IconButton
                                                icon={
                                                    <Icon
                                                        as={Ionicons}
                                                        name="trash-outline"
                                                        size={5}
                                                        color="red.500"
                                                    />
                                                }
                                                onPress={() =>
                                                    handleRemoveFromCart(
                                                        item.productId
                                                    )
                                                }
                                            />
                                        </View>
                                    </HStack>
                                </View>
                            );
                        })}
                    </ScrollView>

                    <View style={styles.checkout_template}>
                        <HStack justifyContent="space-between">
                            <VStack space={2}>
                                <HStack>
                                    <Text style={styles.checkout_quantity}>
                                        Total price for {quantity} item(s)
                                    </Text>
                                </HStack>
                                <HStack>
                                    <Text style={styles.checkout_price}>
                                        <NumberFormat
                                            value={price}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            suffix={" VND"}
                                            renderText={(formattedValue) => (
                                                <Text>{formattedValue}</Text>
                                            )}
                                        />
                                    </Text>
                                </HStack>
                            </VStack>
                            <VStack justifyContent="center">
                                <ButtonNativeBase
                                    style={styles.button_checkout}
                                    onPress={handleCheckout}
                                >
                                    <Text style={styles.buy_now}>BUY NOW</Text>
                                </ButtonNativeBase>
                            </VStack>
                        </HStack>
                    </View>
                </View>
            ) : (
                <View
                    style={{
                        alignItems: "center",
                        position: "absolute",
                        bottom: "50%",
                        left: "28%",
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "600",
                            fontSize: 18,
                            color: COLORS.lightGray,
                        }}
                    >
                        YOUR CART IS EMPTY
                    </Text>
                    <Icon
                        as={Ionicons}
                        name="trash-bin-outline"
                        size={12}
                        color={COLORS.lightGray}
                    />
                </View>
            )}
        </View>
    );
};

export default CartScreen;