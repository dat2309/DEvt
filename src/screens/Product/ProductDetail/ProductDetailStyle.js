import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constant/index";

const ProductDetailStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "white",
    },
    image: {
        width: SIZES.width - 150,
        height: 300,
        alignItems: "center",
    },
    infomation_box: {
        marginVertical: 20,
        backgroundColor: COLORS.lightGray2,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        width: SIZES.width - 100,
        height: 230,
    },
    product_name: {
        fontWeight: "bold",
        fontSize: 16,
    },
    size_tag: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        width: 30,
        height: 30,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    size_tag_selected: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        width: 30,
        height: 30,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderColor: COLORS.black,
        borderWidth: 1,
    },
    product_price: {
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: 16,
        color: "red",
    },
    quantity_input: {
        backgroundColor: "blue",
    },

    btn_add_cart: {
        backgroundColor: COLORS.lightGray,
        color: COLORS.black,
    },
});
export default ProductDetailStyle;
