import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./HistoryStyle";
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
import { COLORS } from "../../../constant/index";

import NumberFormat from "react-number-format";
import userUtils from "../../../utils/userUtils";
import orderApi from "../../../api/orderApi";
import productApi from "../../../api/productApi";
import DiscountPrice from "../../../components/DiscountPrice";

const HistoryScreen = (props) => {
    const [orderList, setOrderList] = useState();
    const [selectedStatus, setSelectedStatus] = useState();

    const handleClickViewDetail = (order) => {
        props.navigation.navigate("OrderDetailScreen", { order: order });
    };

    const handleClickBack = () => {
        props.navigation.navigate("HomeScreen");
    };

    const getOrderByCustomerId = async (status) => {
        setSelectedStatus(status);
        const user = await userUtils.getUser();
        const orderList = await orderApi.getOrderByCustomerId(status, user.id);

        if (orderList) {
            let promiseOrderDetails = [];
            orderList.content.forEach((order) => {
                promiseOrderDetails.push(
                    productApi.getProductById(order.orderDetails[0].productId)
                );
            });
            let settledOrderdetais = await Promise.all(promiseOrderDetails);
            orderList.content.forEach((order, index) => {
                let matchedOrderDetails = {
                    image: settledOrderdetais[index].image,
                    price: settledOrderdetais[index].price,
                    name: settledOrderdetais[index].name,
                    discount: settledOrderdetais[index].discount,
                };
                let firstProduct = order.orderDetails[0];
                let newOrder = Object.assign(matchedOrderDetails, firstProduct);
                order.orderDetails[0] = newOrder;
            });
            setOrderList(orderList.content);
            console.log(orderList.content);
        }
    };

    const calculateDiscountPrice = (price, discount) => {
        if (discount > 0) {
            return price - (price * discount) / 100;
        } else {
            return price;
        }
    };

    const handleClickCancel = () => {
        getOrderByCustomerId(-1);
    };

    const handleClickUnconfirm = () => {
        getOrderByCustomerId(0);
    };

    const handleClickDelivering = () => {
        getOrderByCustomerId(1);
    };

    const handleClickSuccess = () => {
        getOrderByCustomerId(2);
    };

    useEffect(() => {
        getOrderByCustomerId(0);
    }, [orderList == null]);

    return (
        <View>
            <View
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10,
                    marginBottom: 10,
                }}
            >
                <HStack>

                    <Icon
                        as={Ionicons}
                        color="black"
                        name="arrow-back-outline"
                        size={7}
                        style={{
                            position: "absolute",
                            left: -130,
                        }}
                        onPress={handleClickBack}
                    />


                    <Text
                        style={{
                            fontWeight: "600",
                            fontSize: 20,
                        }}
                    >
                        Order History
                    </Text>
                </HStack>
            </View>
            <View>
                <HStack mt={3} mb={3} justifyContent="space-evenly">
                    <VStack alignItems="center">
                        <Icon
                            as={Ionicons}
                            color={
                                selectedStatus === 0
                                    ? COLORS.black
                                    : COLORS.lightGray
                            }
                            name="albums-outline"
                            size={7}
                            onPress={handleClickUnconfirm}
                        />
                        <Text
                            style={{
                                color:
                                    selectedStatus === 0
                                        ? COLORS.black
                                        : COLORS.lightGray,
                            }}
                        >
                            To confirm
                        </Text>
                    </VStack>
                    <VStack alignItems="center">
                        <Icon
                            as={Ionicons}
                            color={
                                selectedStatus === 1
                                    ? COLORS.black
                                    : COLORS.lightGray
                            }
                            name="airplane-outline"
                            size={7}
                            onPress={handleClickDelivering}
                        />
                        <Text
                            style={{
                                color:
                                    selectedStatus === 1
                                        ? COLORS.black
                                        : COLORS.lightGray,
                            }}
                        >
                            To delivery
                        </Text>
                    </VStack>
                    <VStack alignItems="center">
                        <Icon
                            as={Ionicons}
                            color={
                                selectedStatus === 2
                                    ? COLORS.black
                                    : COLORS.lightGray
                            }
                            name="checkmark-done-outline"
                            size={7}
                            onPress={handleClickSuccess}
                        />
                        <Text
                            style={{
                                color:
                                    selectedStatus === 2
                                        ? COLORS.black
                                        : COLORS.lightGray,
                            }}
                        >
                            Completed
                        </Text>
                    </VStack>
                    <VStack alignItems="center">
                        <Icon
                            as={Ionicons}
                            color={
                                selectedStatus === -1
                                    ? COLORS.black
                                    : COLORS.lightGray
                            }
                            name="close-outline"
                            size={7}
                            onPress={handleClickCancel}
                        />
                        <Text
                            style={{
                                color:
                                    selectedStatus === -1
                                        ? COLORS.black
                                        : COLORS.lightGray,
                            }}
                        >
                            Cancelled
                        </Text>
                    </VStack>
                </HStack>
            </View>
            <ScrollView
                style={{
                    marginBottom: 100,
                }}
            >
                <View>
                    {orderList &&
                        orderList.length !== 0 &&
                        orderList.map((order, index) => {
                            return (
                                <View style={styles.item_template}>
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
                                                    uri: order.orderDetails[0]
                                                        .image,
                                                }}
                                            />
                                        </View>
                                        <VStack
                                            space={2}
                                            style={styles.item_infomation}
                                        >
                                            <Box>
                                                <TextNativeBase>
                                                    {order.orderDetails[0].name}
                                                </TextNativeBase>
                                            </Box>
                                            <Box>
                                                <Text>
                                                    Size:{" "}
                                                    {order.orderDetails[0].tag}
                                                </Text>
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
                                                        <Text>
                                                            Quantity:{" "}
                                                            {
                                                                order
                                                                    .orderDetails[0]
                                                                    .quantity
                                                            }
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
                                                    {order.orderDetails[0]
                                                        .discount > 0 ? (
                                                        <DiscountPrice
                                                            discountPrice={
                                                                calculateDiscountPrice(
                                                                    order
                                                                        .orderDetails[0]
                                                                        .price,
                                                                    order
                                                                        .orderDetails[0]
                                                                        .discount
                                                                ) *
                                                                order
                                                                    .orderDetails[0]
                                                                    .quantity
                                                            }
                                                            price={
                                                                order
                                                                    .orderDetails[0]
                                                                    .price *
                                                                order
                                                                    .orderDetails[0]
                                                                    .quantity
                                                            }
                                                        />
                                                    ) : (
                                                        <NumberFormat
                                                            value={
                                                                order
                                                                    .orderDetails[0]
                                                                    .price *
                                                                order
                                                                    .orderDetails[0]
                                                                    .quantity
                                                            }
                                                            displayType={"text"}
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            suffix={" VND"}
                                                            renderText={(
                                                                formattedValue
                                                            ) => (
                                                                <Text>
                                                                    {
                                                                        formattedValue
                                                                    }
                                                                </Text>
                                                            )}
                                                        />
                                                    )}
                                                </Text>
                                            </Box>
                                        </VStack>
                                    </HStack>
                                    <View
                                        style={{
                                            padding: 10,
                                        }}
                                    >
                                        <Divider />
                                        <HStack
                                            mt={4}
                                            mb={2}
                                            justifyContent="space-between"
                                        >
                                            <VStack>
                                                <Text>Total items</Text>
                                            </VStack>
                                            <VStack>
                                                <Text>
                                                    {order.totalQuantity}
                                                </Text>
                                            </VStack>
                                        </HStack>
                                        <HStack
                                            mb={3}
                                            justifyContent="space-between"
                                        >
                                            <VStack>
                                                <Text>Total Price</Text>
                                            </VStack>
                                            <VStack>
                                                <NumberFormat
                                                    value={order.totalPrice}
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
                                            </VStack>
                                        </HStack>
                                        <Button
                                            onPress={() =>
                                                handleClickViewDetail(order)
                                            }
                                            bgColor="black"
                                            mt={2}
                                        >
                                            View Detail
                                        </Button>
                                    </View>
                                </View>
                            );
                        })}
                    {orderList && orderList.length === 0 && (
                        <View
                            style={{
                                marginTop: 50,
                            }}
                        >
                            <VStack alignItems="center" justifyContent="center">
                                <Icon
                                    as={Ionicons}
                                    color="#ABAFB8"
                                    name="trash-bin-outline"
                                    size={10}
                                />
                                <Text style={{ color: "#ABAFB8" }}>
                                    No orders yet
                                </Text>
                            </VStack>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default HistoryScreen;