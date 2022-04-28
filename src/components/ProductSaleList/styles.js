import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        alignItems: "center",
    },
    card: {
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
    },
    card_template: {
        width: 180,
        height: 200,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    card_image: {
        width: 180,
        height: 200,
        borderRadius: 10,
    },
    text_container: {
        position: "absolute",
        width: 180,
        height: 70,
        bottom: 0,
        padding: 5,
        backgroundColor: "rgba(0,0,0, 0.3)",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    text_discount_container: {
        position: "absolute",
        width: 45,
        height: 30,
        top: 0,
        padding: 5,
        backgroundColor: "rgba(245,39,39, 0.6)",
        borderTopLeftRadius: 10,
    },
    card_title: {
        color: "white",
    },
    card_discount: {
        color: "white",
        textDecorationLine: "line-through",
    },
    card_price: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default styles;
