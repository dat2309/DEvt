import { Box, Text as TextNativeBase } from "native-base";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { images } from "../../constant/index";
import ProductSaleList from "../ProductSaleList";
import styles from "./styles";

const renderCategoryCard = (item, index) => {
    return (
        <TouchableOpacity key={index} style={styles.card}>
            <View style={styles.container}>
                <View style={styles.card_template}>
                    <Image style={styles.card_image} source={item.image} />
                    <View style={styles.text_container}>
                        <Box>
                            <TextNativeBase
                                isTruncated
                                maxW="400"
                                w="80%"
                                style={styles.card_title}
                            >
                                {item.name}
                            </TextNativeBase>
                        </Box>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const CategoryCarousel = (props) => {
    //================= Hard code for text component=========================

    props.categories[0].image = images.tee;
    props.categories[1].image = images.polo;
    props.categories[2].image = images.shirt;

    //======================================================================

    return (
        <View style={styles.container}>
            <Text
                style={{
                    fontSize: 20,
                    marginBottom: 15,
                }}
            >
                CATEGORIES
            </Text>
            <FlatList
                data={props.categories}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) =>
                    renderCategoryCard(item, index)
                }
                showsHorizontalScrollIndicator={false}
            />
            <ProductSaleList navigation={props.navigation} />

            <Image style={styles.banner} source={images.banner} />
        </View>
    );
};

export default CategoryCarousel;
