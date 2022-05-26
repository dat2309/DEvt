import AsyncStorage from "@react-native-async-storage/async-storage";

const getCartInStorage = async () => {
    let itemArr = await AsyncStorage.getItem("cart");
    itemArr = JSON.parse(itemArr);
    return itemArr;
};

const CartUtils = {
    getTotalItem: async () => {
        const itemArr = await getCartInStorage();
        let array = [];
        if (itemArr) {
            itemArr.forEach((element) => {
                if (element !== null) {
                    array.push(element);
                }
            });
        }
        return array;
    },
    addToCart: async (item) => {
        const itemArr = await getCartInStorage();
        let array;
        if (itemArr) {
            array = itemArr;

            let tmp = array.findIndex(
                (value) =>
                    value.tag === item.tag && value.productId === item.productId
            );
            if (tmp !== -1) {
                array[tmp].quantity =
                    Number(array[tmp].quantity) + Number(item.quantity);
                array[tmp].price =
                    Number(array[tmp].price) + Number(item.price);
            } else {
                array.push(item);
            }
        } else {
            array = [];
            array.push(item);
        }

        await AsyncStorage.setItem("cart", JSON.stringify(array));
        return true;
    },

    removeFromCart: async (id) => {
        const itemArr = await getCartInStorage();
        let array;
        if (itemArr) {
            array = itemArr;
            array.forEach((value, index) => {
                if (value.productId === id) {
                    array.splice(index, 1);
                }
            });
        }
        await AsyncStorage.setItem("cart", JSON.stringify(array));
        return true;
    },

    calculateTotal: async () => {
        const itemArr = await getCartInStorage();
        let array;
        let totalQuantity = 0;
        let totalPrice = 0;
        if (itemArr) {
            array = itemArr;
            array.forEach((value) => {
                totalQuantity = Number(value.quantity) + Number(totalQuantity);
                totalPrice = Number(value.price) + Number(totalPrice);
            });
        }
        const result = {
            totalQuantity,
            totalPrice,
        };
        return result;
    },

    addQuantity: async (item) => {
        const itemArr = await getCartInStorage();
        let array;
        if (itemArr) {
            array = itemArr;

            let tmp = array.findIndex(
                (value) =>
                    value.tag === item.tag && value.productId === item.productId
            );
            if (tmp !== -1) {
                array[tmp].quantity = Number(array[tmp].quantity) + 1;
                array[tmp].price = Number(
                    Number(array[tmp].price) +
                        Number(item.price) / Number(item.quantity)
                );
                await AsyncStorage.setItem("cart", JSON.stringify(array));
                return true;
            }
        }
    },

    minusQuantity: async (item) => {
        const itemArr = await getCartInStorage();
        let array;
        if (itemArr) {
            array = itemArr;
            let tmp = array.findIndex(
                (value) =>
                    value.tag === item.tag && value.productId === item.productId
            );
            if (tmp !== -1) {
                array[tmp].quantity = array[tmp].quantity - 1;
                array[tmp].price = Number(
                    array[tmp].price - item.price / item.quantity
                );
                if (array[tmp].quantity < 1) {
                    const result = await CartUtils.removeFromCart(
                        array[tmp].productId
                    );
                    if (result) {
                        return true;
                    }
                }
                await AsyncStorage.setItem("cart", JSON.stringify(array));
                return true;
            }
        }
        return false;
    },
    findItemInCart: async (id, size) => {
        const itemArr = await getCartInStorage();
        let array;
        if (itemArr) {
            array = itemArr;
            let tmp = array.findIndex(
                (value) => value.productId === id && value.tag === size
            );
            if (tmp !== -1) {
                return array[tmp];
            }
            return -1;
        }
        return -1;
    },

    updateQuantity: async (quantity, index) => {
        const itemArr = await getCartInStorage();
        let array;
        if (itemArr) {
            array = itemArr;
            if (quantity <= array[index].maxQuantity) {
                const quantityInCart = array[index].quantity;
                const priceInCart = array[index].price / quantityInCart;
                array[index].quantity = quantity;
                array[index].price = priceInCart * quantity;
                await AsyncStorage.setItem("cart", JSON.stringify(array));
                return true;
            } else {
                return false;
            }
        }
        return false;
    },
};

export default CartUtils;
