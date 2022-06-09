import { StyleSheet } from "react-native";
import { COLORS } from "../../../constant/index";

const HistoryStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll_view: {
        flex: 1,
        marginBottom: 100,
    },
    item_template: {
        backgroundColor: "white",
        marginVertical: 5,
    },
    item_image: {
        width: 100,
        height: 120,
    },
    item_infomation: {
        flex: 1,
        paddingVertical: 10,
    },
    button_remove: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginEnd: 20,
    },
    confirm_template: {
        position: "absolute",
        bottom: 0,
        backgroundColor: COLORS.lightGray3,
        width: "100%",
        padding: 20,
    },
    checkout_quantity: {
        fontWeight: "500",
        fontSize: 18,
    },
    checkout_price: {
        fontSize: 24,
        fontWeight: "bold",
    },
    button_confirm: {
        width: 170,
        height: 50,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        backgroundColor: COLORS.black,
    },
    button_back: {
        width: 170,
        height: 50,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        backgroundColor: COLORS.lightGray4,
    },
    button_text: {
        color: "white",
        fontWeight: "600",
    },
});

export default HistoryStyle;
