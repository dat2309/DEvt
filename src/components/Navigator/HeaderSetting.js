import { debounce } from "lodash";
import { Box, Input, Popover } from "native-base";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../../constant/index";

const headerSetting = (props) => {
    let header;

    const handleSearchInput = (input) => {
        props.navigation.navigate("Product", {
            screen: "ProductListScreen",
            params: {
                textSearch: input,
            },
        });
    };

    const resetTextSearch = () => {
        props.navigation.navigate("Product", {
            screen: "ProductListScreen",
            params: {
                textSearch: "",
            },
        });
    };

    const handleSearch = debounce(handleSearchInput, 500);

    return (header = {
        title: "DEVT STORE",
        headerTitleAlign: "center",
        headerTintColor: COLORS.lightGray,
        headerTitleStyle: {
            ...FONTS.navTitle,
        },

        headerLeft: () => (
            <TouchableOpacity
                style={{ marginLeft: SIZES.padding }}
                onPress={() => props.navigation.toggleDrawer()}
            >
                <Image
                    source={icons.menu}
                    resizeMode="contain"
                    style={{
                        width: 25,
                        height: 25,
                    }}
                />
            </TouchableOpacity>
        ),
        headerRight: () => (
            <Box>
                <Popover
                    // onClose={resetTextSearch}
                    placement="bottom right"
                    trigger={(triggerProps) => {
                        return (
                            <TouchableOpacity
                                {...triggerProps}
                                style={{ marginRight: SIZES.padding }}
                            >
                                <Image
                                    source={icons.search}
                                    resizeMode="contain"
                                    style={{
                                        width: 30,
                                        height: 30,
                                    }}
                                />
                            </TouchableOpacity>
                        );
                    }}
                >
                    <Popover.Content
                        accessibilityLabel="Delete Customerd"
                        w="56"
                        width={420}
                    >
                        <Popover.Arrow />
                        <Popover.CloseButton />
                        <Popover.Body>
                            <Input
                                onChangeText={handleSearch}
                                placeholder="Enter product name..."
                            />
                        </Popover.Body>
                    </Popover.Content>
                </Popover>
            </Box>
        ),
    });
};
export default headerSetting;