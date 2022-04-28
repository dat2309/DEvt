import AsyncStorage from "@react-native-async-storage/async-storage";

const userUtils = {
    getProfile: async () => {
        let profile = await AsyncStorage.getItem("profile");
        if (profile) {
            profile = JSON.parse(profile);
            return profile;
        }
    },
    getUser: async () => {
        let user = await AsyncStorage.getItem("user");
        if (user) {
            user = JSON.parse(user);
            return user;
        }
    },
};

export default userUtils;
