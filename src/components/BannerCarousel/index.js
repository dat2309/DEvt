import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    Animated,
    Dimensions,
    SafeAreaView,
} from "react-native";
import React from "react";
import { images, COLORS } from "../../constant/index";

const HomeCarousel = () => {
    const data = [
        { id: 1, image: images.shirt1 },
        { id: 2, image: images.shirt2 },
        { id: 3, image: images.shirt3 },
    ];

    const scrollX = new Animated.Value(0);

    const width = Dimensions.get("window").width;

    let position = Animated.divide(scrollX, width);

    const renderItemBanner = (item, index) => {
        return (
            <View
                key={index}
                style={{
                    width: width,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Image
                    source={item.image}
                    style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "contain",
                    }}
                />
            </View>
        );
    };

    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <View style={styles.container}>
                <FlatList
                    data={data}
                    horizontal
                    renderItem={({ item, index }) =>
                        renderItemBanner(item, index)
                    }
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={0.8}
                    snapToInterval={width}
                    bounces={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                />
                <View
                    style={{
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 16,
                        // marginTop: 32,
                    }}
                >
                    {data.map((image, index) => {
                        let opacity = position.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [0.2, 1, 0.2],
                            extrapolate: "clamp",
                        });
                        return (
                            <Animated.View
                                key={index}
                                style={{
                                    width: "16%",
                                    height: 2.4,
                                    backgroundColor: COLORS.black,
                                    opacity,
                                    marginHorizontal: 4,
                                    borderRadius: 100,
                                }}
                            ></Animated.View>
                        );
                    })}
                </View>
            </View>
            <Text
                style={{
                    fontSize: 20,
                }}
            >
                NEW ARRIVAL
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 300,
    },
});

export default HomeCarousel;
