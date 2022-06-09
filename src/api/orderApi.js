import axiosClient from "./axiosClient";
const orderApi = {
    postOrder: (order) => {
        const url = "/order";
        return axiosClient.post(url, order);
    },
    getOrderByCustomerId: (status, customerId) => {
        const url = `/order?status=${status}&customerId=${customerId}`;
        return axiosClient.get(url);
    },
};
export default orderApi;