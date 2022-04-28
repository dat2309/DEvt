import axiosClient from "./axiosClient";
const orderApi = {
    postOrder: (order) => {
        const url = "/order";
        return axiosClient.post(url, order);
    },
};
export default orderApi;
