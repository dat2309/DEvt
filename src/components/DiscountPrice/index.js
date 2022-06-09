import { View, Text } from "react-native";
import React from "react";
import NumberFormat from "react-number-format";
import { HStack } from "native-base";

const DiscountPrice = (props) => {
    return (
        <View>
            <HStack space={2}>
                <NumberFormat
                    value={props.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" VND"}
                    renderText={(formattedValue) => (
                        <Text
                            style={{
                                textDecorationLine: "line-through",
                                color: "gray",
                            }}
                        >
                            {formattedValue}
                        </Text>
                    )}
                />
                <NumberFormat
                    value={props.discountPrice}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" VND"}
                    renderText={(formattedValue) => (
                        <Text
                            style={{
                                fontWeight: "600",
                            }}
                        >
                            {formattedValue}
                        </Text>
                    )}
                />
            </HStack>
        </View>
    );
};

export default DiscountPrice;
