import { Ionicons } from "@expo/vector-icons";
import { Box, Icon, Select, Text as TextNativeBase } from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import NumberFormat from "react-number-format";
import categoryApi from "../../../api/categoryApi";
import productApi from "../../../api/productApi";
import Pagination from "../../../components/Pagination";
import { COLORS } from "../../../constant/index";
import styles from "./ProductListStyle";

const checkDiscount = (product) => {
    if (product.discount > 0) {
        return product.price - (product.price * product.discount) / 100;
    } else {
        return product.price;
    }
};

const renderProduct = (product, index, navigation) => {
    product = { ...product, price: checkDiscount(product) };
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
                    {product.discount > 0 ? (
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
                    ) : null}

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
                                <NumberFormat
                                    value={product.price}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    suffix={" VND"}
                                    renderText={(formattedValue) => (
                                        <Text style={styles.product_price}>
                                            {formattedValue}
                                        </Text>
                                    )}
                                />
                            </TextNativeBase>
                        </Box>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const priceList = [
    {
        id: 1,
        label: "All Product",
        from: 0,
        to: 1000000,
    },
    {
        id: 2,
        label: "0 - 350,000 VND",
        from: 0,
        to: 350000,
    },
    {
        id: 3,
        label: "350,000 - 500,000 VND",
        from: 350001,
        to: 500000,
    },
    {
        id: 4,
        label: "500,000 - 1,000,000 VND",
        from: 500001,
        to: 1000000,
    },
];

const ProductListScreen = (props) => {
    const [categorySelected, setCategorySelected] = useState();
    const [categories, setCategories] = useState();
    const [products, setProducts] = useState();
    const [totalElement, setTotalElement] = useState();
    const [totalPage, setTotalPage] = useState();
    const [activePage, setActivePage] = useState();
    const [priceSelected, setPriceSelected] = useState();

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

    const getAllProductPrice = async (price) => {
        console.log(price);
        const res = await productApi.getProductByPrice(price);
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

    const handleFilterProductByPrice = async (value) => {
        let temp;
        priceList.forEach((price) => {
            if (price.id == value) {
                temp = {
                    from: price.from,
                    to: price.to,
                };
            }
        });

        console.log(value);
        getAllProductPrice(temp);
        setPriceSelected(value.id);
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
            console.log("Text search not found");
            getAllProduct();
        }
    };

    useEffect(() => {
        getAllCategory();
        searchProductByName();
    }, [categories == null, products == null, props.route.params]);

    return (
        <View
            style={{
                marginBottom: 35,
            }}
        >
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
            <Select
                shadow={2}
                bg={COLORS.lightGray2}
                selectedValue={priceSelected}
                accessibilityLabel="Filter by price"
                placeholder="Filter by price"
                height={38}
                onValueChange={(itemValue) =>
                    handleFilterProductByPrice(itemValue)
                }
            >
                <Select.Item
                    key={1}
                    shadow={2}
                    label={priceList[0].label}
                    value={priceList[0].id}
                />
                <Select.Item
                    key={2}
                    shadow={2}
                    label={priceList[1].label}
                    value={priceList[1].id}
                />
                <Select.Item
                    key={3}
                    shadow={2}
                    label={priceList[2].label}
                    value={priceList[2].id}
                />
                <Select.Item
                    key={4}
                    shadow={2}
                    label={priceList[3].label}
                    value={priceList[3].id}
                />
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