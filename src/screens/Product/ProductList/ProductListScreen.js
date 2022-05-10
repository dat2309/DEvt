import { Ionicons } from "@expo/vector-icons";
import { Box, Icon, Select, Text as TextNativeBase } from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import categoryApi from "../../../api/categoryApi";
import productApi from "../../../api/productApi";
import Pagination from "../../../components/Pagination";
import { COLORS } from "../../../constant/index";
import styles from "./ProductListStyle";

const renderProduct = (product, index, navigation) => {
    return (
        <TouchableOpacity
            key={product.id}
            onPress={() =>
                navigation.navigate("ProductDetailScreen", {
                    product: product,
                })
            }
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

const ProductListScreen = (props) => {
    const [categorySelected, setCategorySelected] = useState();
    const [categories, setCategories] = useState();
    const [products, setProducts] = useState();
    const [totalElement, setTotalElement] = useState();
    const [totalPage, setTotalPage] = useState();
    const [activePage, setActivePage] = useState();

    const getAllCategory = async () => {
        const res = await categoryApi.getAllCategory();
        if (res) {
            setCategories(res);
        }
    };

    const getAllProduct = async () => {
        const res = await productApi.getAllProduct();
        if (res) {
            setProducts(res.content);
            setTotalElement(res.totalElements);
            setTotalPage(res.totalPages);
            setActivePage(res.number + 1);
        }
    };

    const getAllWithPagination = async (pageNumber) => {
        const res = await productApi.getAllWithPagination(pageNumber);
        if (res) {
            setProducts(res.content);
            setActivePage(res.number + 1);
        }
    };

    const getAllProductByCategory = async (category) => {
        const res = await productApi.getProductByCategory(category);
        if (res) {
            setProducts(res.content);
            setTotalElement(res.totalElements);
            setTotalPage(res.totalPages);
            setActivePage(res.number + 1);
        }
    };

    const handleFilterProduct = async (value) => {
        setCategorySelected(value);
        getAllProductByCategory(value);
    };

    const searchProductByName = async () => {
        try {
            const { textSearch } = props.route.params;
            console.debug("Search by product name is: " + textSearch);
            const res = await productApi.searchProductByName(textSearch);
            if (res) {
                setProducts(res.content);
                setTotalElement(res.totalElements);
                setTotalPage(res.totalPages);
                setActivePage(res.number + 1);
            }
        } catch (error) {
            console.log(error);
            getAllProduct();
        }
    };

    useEffect(() => {
        getAllCategory();
        searchProductByName();
    }, [categories == null, products == null, props.route.params]);

    return (
        <View>
            <Select
                shadow={2}
                bg={COLORS.lightGray2}
                selectedValue={categorySelected}
                accessibilityLabel="Choose category"
                placeholder="Choose category"
                height={38}
                onValueChange={(itemValue) => handleFilterProduct(itemValue)}
            >
                {categories &&
                    categories.map((value, index) => {
                        return (
                            <Select.Item
                                key={value.id}
                                shadow={2}
                                label={value.name}
                                value={value.code}
                            />
                        );
                    })}
            </Select>
            {products && (
                <FlatList
                    style={styles.container}
                    numColumns={2}
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) =>
                        renderProduct(item, index, props.navigation)
                    }
                    ListFooterComponent={
                        totalPage > 0 ? (
                            <Pagination
                                totalElement={totalElement}
                                totalPage={totalPage}
                                activePage={activePage}
                                getAllWithPagination={getAllWithPagination}
                            />
                        ) : (
                            <View
                                style={{
                                    marginTop: "60%",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: "600",
                                        fontSize: 14,
                                        color: COLORS.lightGray,
                                    }}
                                >
                                    Sorry, we don't this product
                                </Text>
                                <Icon
                                    as={Ionicons}
                                    name="sad-outline"
                                    size={10}
                                    color={COLORS.lightGray}
                                    mt={5}
                                />
                            </View>
                        )
                    }
                />
            )}
        </View>
    );
};

export default ProductListScreen;