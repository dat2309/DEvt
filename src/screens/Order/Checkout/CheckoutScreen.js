import { Ionicons } from "@expo/vector-icons";
import {
    Box,
    Button as ButtonNativeBase,
    Divider,
    HStack,
    Icon,
    Text as TextNativeBase,
    useToast,
    VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import orderApi from "../../../api/orderApi";
import userUtils from "../../../utils/userUtils";
import styles from "./CheckoutStyle";

const CheckoutScreen = (props) => {
    const [profile, setProfile] = useState();
    const { cart } = props.route.params;
    const { quantity } = props.route.params;
    const { price } = props.route.params;
    const [shippingDate, setShippingDate] = useState();

    const toast = useToast();

    const showNotify = (title, status) => {
        toast.show({
            title: title,
            status: status,
            placement: "top",
        });
    };

    const getUserProfile = async () => {
        const result = await userUtils.getProfile();
        console.info(result);
        try {
            if (result.addresses.length > 0) {
                setProfile(result);
            } else {
                showNotify(
                    "Please complete profile to order products",
                    "warning"
                );
                props.navigation.navigate("Home", { screen: "ProfileScreen" });
            }
        } catch (error) {
            props.navigation.navigate("CartScreen");
        }
    };

    const calculateShippingDate = () => {
        const today = new Date();
        const date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            (today.getDate() + 5);

        setShippingDate(date);
    };

    const handleBackToCart = () => {
        props.navigation.navigate("CartScreen");
    };

    const handlePayment = async () => {
        const user = await userUtils.getUser();
        if (user && profile) {
            let orderDetails = [];
            cart.forEach((item) => {
                const value = {
                    productId: item.productId,
                    tag: item.tag,
                    quantity: item.quantity,
                };
                orderDetails.push(value);
            });
            const order = {
                paymentMethod: "COD",
                paymentStatus: false,
                customerId: user.id,
                shipAdressId: profile.addresses[0].id,
                orderDetails,
            };
            const res = await orderApi.postOrder(order);
            if (res) {
                await AsyncStorage.removeItem("cart");
                showNotify("Your order submited", "success");
                props.navigation.navigate("CartScreen");
            }
        } else {
            showNotify("Please complete profile to order products", "warning");
            props.navigation.navigate("Home", { screen: "ProfileScreen" });
        }
    };

    useEffect(() => {
        const unsubscribe = props.navigation.addListener("focus", () => {
            getUserProfile();
            calculateShippingDate();
        });
        return unsubscribe;
    }, [props.navigation]);

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <ScrollView
                style={{
                    marginBottom: 100,
                }}
            >
                {profile && (
                    <View
                        style={{
                            padding: 12,
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: "600",
                                fontSize: 18,
                            }}
                        >
                            Shipping Address
                        </Text>
                        <VStack mt={3} space={1}>
                            <Text>{profile.addresses[0].street} Street</Text>
                            <Text>{profile.addresses[0].ward} Ward</Text>
                            <Text>
                                {profile.addresses[0].district} District
                            </Text>
                            <Text>
                                {profile.addresses[0].province} Province
                            </Text>
                        </VStack>

                        <Divider mt={4} bg="gray.300" />
                    </View>
                )}
                {cart &&
                    cart.map((item, index) => {
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
                                            source={{ uri: item.image }}
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
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Text>
                                                        Quantity:{" "}
                                                        {item.quantity}
                                                    </Text>
                                                </HStack>
                                            </VStack>
                                        </Box>
                                        <Box>
                                            <Text
                                                style={{
                                                    fontWeight: "600",
                                                }}
                                            >
                                                Price: {item.price} VND
                                            </Text>
                                        </Box>
                                    </VStack>
                                </HStack>
                            </View>
                        );
                    })}
                <View
                    style={{
                        padding: 12,
                    }}
                >
                    <Divider mb={4} bg="gray.300" />

                    <VStack space={1}>
                        <Text
                            style={{
                                fontWeight: "600",
                                fontSize: 18,
                            }}
                        >
                            Payment method
                        </Text>
                        <Text>Cash On Delivery</Text>
                    </VStack>
                    <Divider mt={5} bg="gray.300" />
                    <VStack mt={4} space={1}>
                        <Text
                            style={{
                                fontWeight: "600",
                                fontSize: 18,
                            }}
                        >
                            Shipping method
                        </Text>
                        <HStack space={1} alignItems="center">
                            <Text>Delivery by GHTK</Text>
                            <Icon
                                as={Ionicons}
                                name="car-outline"
                                color="black"
                                size={5}
                            />
                        </HStack>
                        <Text>Estimated delivery time: {shippingDate}</Text>
                    </VStack>
                    <Divider mt={5} bg="gray.300" />
                    <HStack space={1} mt={5} justifyContent="space-between">
                        <VStack>
                            <Text
                                style={{
                                    fontWeight: "600",
                                    fontSize: 18,
                                }}
                            >
                                Total payment ({quantity} item(s))
                            </Text>
                        </VStack>
                        <VStack>
                            <Text
                                style={{
                                    fontWeight: "600",
                                    fontSize: 20,
                                    color: "red",
                                }}
                            >
                                {price} VND
                            </Text>
                        </VStack>
                    </HStack>
                    <Divider mt={4} bg="gray.300" />
                </View>
            </ScrollView>
            <View style={styles.confirm_template}>
                <HStack justifyContent="space-evenly">
                    <VStack justifyContent="center">
                        <ButtonNativeBase
                            style={styles.button_back}
                            leftIcon={
                                <Icon
                                    as={Ionicons}
                                    name="cart-outline"
                                    color="white"
                                    size={5}
                                />
                            }
                            onPress={handleBackToCart}
                        >
                            <Text style={styles.button_text}>BACK TO CART</Text>
                        </ButtonNativeBase>
                    </VStack>
                    <VStack justifyContent="center">
                        <ButtonNativeBase
                            style={styles.button_confirm}
                            leftIcon={
                                <Icon
                                    as={Ionicons}
                                    name="card-outline"
                                    color="white"
                                    size={5}
                                />
                            }
                            onPress={handlePayment}
                        >
                            <Text style={styles.button_text}>PAYMENT</Text>
                        </ButtonNativeBase>
                    </VStack>
                </HStack>
            </View>
        </View>
    );
};

export default CheckoutScreen;