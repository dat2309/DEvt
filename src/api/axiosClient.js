import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
    baseURL: "http://13.229.146.156:8080/api",
    headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
    paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
    let user = await AsyncStorage.getItem(`user`);
    if (user) {
        user = JSON.parse(user);
        if (user.token) {
            config.headers.Authorization = `${user.token}`;
        }
    }

    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        return error.response.data;
    }
);

export default axiosClient;
