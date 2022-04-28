import axiosClient from "./axiosClient";
const userApi = {
    postUserLogin: (data) => {
        const url = "/user/authentication";
        return axiosClient.post(url, data);
    },
    getUserProfile: (id) => {
        const url = `/user/${id}/profile`;
        return axiosClient.get(url);
    },

    postUserRegister: (user) => {
        const url = "/user";
        return axiosClient.post(url, user);
    },
    submitCode: (data) => {
        const url = "/user/activation";
        return axiosClient.post(url, data);
    },
    postUserProfile: (id, profile) => {
        const url = `/user/${id}/profile`;
        return axiosClient.post(url, profile);
    },
    postUserAddress: (id, address) => {
        const url = `/user/${id}/profile/address`;
        return axiosClient.post(url, address);
    },
    getTokenResetPassword: (userName) => {
        const url = `/user/recovery?userName=${userName}`;
        return axiosClient.get(url);
    },
    postResetPassword: (data) => {
        const url = "/user/password";
        return axiosClient.patch(url, data);
    },
};
export default userApi;
