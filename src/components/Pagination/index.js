import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Box, HStack, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../../constant/index";

const Pagination = (props) => {
    const [activePage, setActivePage] = useState(1);

    let pageIndex = [];
    for (let i = 1; i <= props.totalPage; i++) {
        pageIndex.push(i);
    }

    const handleNextPage = async () => {
        await props.getAllWithPagination(activePage);
        setActivePage(activePage + 1);
    };

    const handlePrevPage = async () => {
        await props.getAllWithPagination(activePage - 2);
        setActivePage(activePage - 1);
    };

    const handlePickPage = async (page) => {
        await props.getAllWithPagination(page);
        setActivePage(page + 1);
    };

    return (
        <View
            style={{
                flex: 1,
                marginBottom: 50,
                alignItems: "center",
            }}
        >
            <HStack space={2}>
                <Box>
                    <Icon
                        as={Ionicons}
                        name="chevron-back-outline"
                        color={
                            activePage == 1 ? COLORS.lightGray : COLORS.black
                        }
                        onPress={activePage == 1 ? null : handlePrevPage}
                    />
                </Box>
                {pageIndex.map((value, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={
                                value == activePage
                                    ? null
                                    : () => handlePickPage(index)
                            }
                        >
                            <Box
                                style={
                                    value == activePage
                                        ? styles.active_page
                                        : styles.inactive_page
                                }
                            >
                                <Text
                                    style={{
                                        color: "white",
                                    }}
                                >
                                    {value}
                                </Text>
                            </Box>
                        </TouchableOpacity>
                    );
                })}
                <Box>
                    <Icon
                        as={Ionicons}
                        name="chevron-forward-outline"
                        color={
                            activePage == props.totalPage
                                ? COLORS.lightGray
                                : COLORS.black
                        }
                        onPress={
                            activePage == props.totalPage
                                ? null
                                : handleNextPage
                        }
                        disabled
                    />
                </Box>
            </HStack>
        </View>
    );
};
const styles = StyleSheet.create({
    active_page: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.black,
        width: 30,
        height: 30,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    inactive_page: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.lightGray,
        width: 30,
        height: 30,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
});
export default Pagination;
