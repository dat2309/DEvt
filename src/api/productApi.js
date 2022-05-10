import axiosClient from "./axiosClient";
const productApi = {
    getAllProduct: () => {
        const url = "/product";
        return axiosClient.get(url);
    },

    getProductById: (id) => {
        const url = "/product/" + id;
        return axiosClient.get(url);
    },
    getProductSale: () => {
        const url = "/product/discount";
        return axiosClient.get(url);
    },
    getAllWithPagination: (pageNumber) => {
        const url = "/product?pageNumber=" + pageNumber;
        return axiosClient.get(url);
    },
    getProductByCategory: (category) => {
        const url = "/product?category=" + category;
        return axiosClient.get(url);
    },
    searchProductByName: (name) => {
        const url = "/product?name=" + name;
        return axiosClient.get(url);
    },
    getProductByPrice: (price) => {
        const url = `/product/price?from=${price.from}&to=${price.to}`;
        return axiosClient.get(url);
    },
};
export default productApi;
