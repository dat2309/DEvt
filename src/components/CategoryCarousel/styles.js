import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginBottom: 25,
    },
    image: {
        width: 100,
        height: 100,
        alignItems: "center",
    },
    card: {
        alignItems: "center",
        justifyContent: "center",
        paddingStart: 12,
    },
    card_template: {
        width: 160,
        height: 100,
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
        width: 160,
        height: 100,
        borderRadius: 5,
    },
    text_container: {
        position: "absolute",
        width: 160,
        height: 100,
        top: 0,
        padding: 5,
        backgroundColor: "rgba(0,0,0, 0.5)",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    card_title: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    banner: {
        width: 390,
        height: 390,
    },
});

export default styles;
