import { View, Text, Image, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import {
    Box,
    HStack,
    VStack,
    Text as TextNativeBase,
    Divider,
    Button,
    Icon,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

import NumberFormat from "react-number-format";
import styles from "./DetailStyle";
import productApi from "../../../api/productApi";
import DiscountPrice from "../../../components/DiscountPrice";

const DetailScreen = (props) => {
    const [orderDetails, setOrderDetails] = useState();
    const [orderObject, setOrderObject] = useState();

    const handleClickBack = () => {
        props.navigation.navigate("OrderHistoryScreen");
    };

    const getDetails = async () => {
        const { order } = props.route.params;
        if (order) {
            setOrderObject(order);
        }
        console.log(order);
        let promiseOrderList = [];
        order.orderDetails.forEach((detail) => {
            promiseOrderList.push(productApi.getProductById(detail.productId));
        });
        let settledOrderList = await Promise.all(promiseOrderList);
        let newOrderDetailList = [];
        order.orderDetails.forEach((detail, index) => {
            let matchedDetails = {
                image: settledOrderList[index].image,
                price: settledOrderList[index].price,
                name: settledOrderList[index].name,
                discount: settledOrderList[index].discount,
            };
            let newDetails = Object.assign(matchedDetails, detail);
            newOrderDetailList.push(newDetails);
        });
        setOrderDetails(newOrderDetailList);
    };

    const calculateDiscountPrice = (price, discount) => {
        if (discount > 0) {
            return price - (price * discount) / 100;
        } else {
            return price;
        }
    };

    useEffect(() => {
        getDetails();
    }, [orderDetails == null]);

    return (
        <ScrollView>
            <HStack
                alignItems="center"
                justifyContent="space-between"
                padding={3}
                background="#6198ae"
            >
                <VStack justifyContent="center">
                    <Icon
                        as={Ionicons}
                        color="white"
                        name="arrow-back-outline"
                        size={7}
                        onPress={handleClickBack}
                    />
                </VStack>
                <VStack>
                    {orderObject && orderObject.status == 0 && (
                        <Text
                            style={{
                                fontWeight: "500",
                                fontSize: 16,
                                color: "white",
                            }}
                        >
                            {" "}
                            { }
                            Order Status: To pay
                        </Text>
                    )}
                    {orderObject && orderObject.status == 1 && (
                        <Text
                            style={{
                                fontWeight: "500",
                                fontSize: 16,
                                color: "white",
                            }}
                        >
                            Order Status: To delivery
                        </Text>
                    )}
                    {orderObject && orderObject.status == 2 && (
                        <Text
                            style={{
                                fontWeight: "500",
                                fontSize: 16,
                                color: "white",
                            }}
                        >
                            Order Status: Completed
                        </Text>
                    )}
                    {orderObject && orderObject.status == -1 && (
                        <Text
                            style={{
                                fontWeight: "500",
                                fontSize: 16,
                                color: "white",
                            }}
                        >
                            Order Status: Cancelled
                        </Text>
                    )}
                </VStack>
                <VStack justifyContent="center">
                    <Icon
                        as={Ionicons}
                        color="white"
                        name="clipboard-outline"
                        size={8}
                    />
                </VStack>
            </HStack>
            <VStack padding={3}>
                <Text
                    style={{
                        fontWeight: "500",
                        fontSize: 18,
                    }}
                >
                    Delivery Infomation
                </Text>
                <Text>Ship by GHTK</Text>
            </VStack>
            <Divider />
            <VStack padding={3}>
                <Text
                    style={{
                        fontWeight: "500",
                        fontSize: 18,
                    }}
                >
                    Receive Address
                </Text>
                <Text>
                    {orderObject && orderObject.shipAdress.street} Street
                </Text>
                <Text>{orderObject && orderObject.shipAdress.ward} Ward</Text>
                <Text>
                    {orderObject && orderObject.shipAdress.district} District
                </Text>
                <Text>
                    {orderObject && orderObject.shipAdress.province} Province
                </Text>
            </VStack>
            <View style={styles.item_template}>
                {orderDetails &&
                    orderDetails.map((detail, index) => {
                        return (
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
                                            uri: detail.image,
                                        }}
                                    />
                                </View>
                                <VStack
                                    space={2}
                                    style={styles.item_infomation}
                                >
                                    <Box>
                                        <TextNativeBase>
                                            {detail.name}
                                        </TextNativeBase>
                                    </Box>
                                    <Box>
                                        <Text>Size: {detail.tag}</Text>
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
                                                    Quantity: {detail.quantity}
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
                                            {detail.discount > 0 ? (
                                                <DiscountPrice
                                                    price={
                                                        detail.price *
                                                        detail.quantity
                                                    }
                                                    discountPrice={
                                                        calculateDiscountPrice(
                                                            detail.price,
                                                            detail.discount
                                                        ) * detail.quantity
                                                    }
                                                />
                                            ) : (
                                                <NumberFormat
                                                    value={
                                                        Number.parseFloat(
                                                            detail.price
                                                        ) *
                                                        Number.parseFloat(
                                                            detail.quantity
                                                        )
                                                    }
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
                                            )}
                                        </Text>
                                    </Box>
                                </VStack>
                            </HStack>
                        );
                    })}
            </View>
            <View
                style={{
                    padding: 10,
                }}
            >
                <Divider />
                <HStack mt={5} mb={5} justifyContent="space-between">
                    <VStack>
                        <Text>Total Price</Text>
                    </VStack>
                    <VStack>
                        <NumberFormat
                            value={orderObject && orderObject.totalPrice}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={" VND"}
                            renderText={(formattedValue) => (
                                <Text>{formattedValue}</Text>
                            )}
                        />
                    </VStack>
                </HStack>
                <Divider />
            </View>
        </ScrollView>
    );
};

export default DetailScreen;