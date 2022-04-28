import { StyleSheet } from "react-native";
import { COLORS } from "../../../constant/index";

const LoginStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 150,
        marginBottom: 50,
        alignItems: "center",
        padding: 20,
        backgroundColor: "white",
        marginLeft: 20,
        marginRight: 20,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    shape_background: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: 500,
        borderLeftWidth: 150,
        borderTopWidth: 700,
        borderLeftColor: COLORS.lightGray,
        borderRightColor: "transparent",
        borderTopColor: COLORS.lightGray,
        transform: [{ rotate: "90deg" }],
        position: "absolute",
        top: 0,
        marginTop: -25,
    },
    login_title: {
        color: "white",
        fontWeight: "600",
        fontSize: 16,
    },
    shopping_now: {
        marginBottom: 200,
        justifyContent: "center",
        alignItems: "center",
    },
    shopping_now_title: {
        fontWeight: "600",
        fontSize: 18,
    },
});

export default LoginStyle;
