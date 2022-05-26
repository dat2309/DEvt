import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    Button as ButtonNativeBase,
    Heading,
    HStack,
    Icon,
    Input,
    Spinner,
    useToast,
    VStack,
} from "native-base";
import React, { useState } from "react";
import { Text, View } from "react-native";
import userApi from "../../../api/userApi";
import { COLORS } from "../../../constant/index";
import validate from "../../../utils/validate";
import styles from "./LoginStyle";

const LoginScreen = (props) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [submit, isSubmit] = useState(false);

    const toast = useToast();

    const showNotify = (title, status) => {
        toast.show({
            title: title,
            status: status,
            placement: "top",
        });
    };

    const handleLogin = async () => {
        if (userName && password) {
            isSubmit(true);
            const req = {
                userName: userName,
                password: password,
            };

            const validateUsername = validate.usernameValidate(req.userName);
            if (validateUsername !== true) {
                showNotify(validateUsername, "error");
                return true;
            }

            const validatePassword = validate.passwordValidate(req.password);
            if (validatePassword !== true) {
                showNotify(validatePassword, "error");
                return true;
            }

            const res = await userApi.postUserLogin(req);
            if (res) {
                if (res.message === undefined) {
                    await AsyncStorage.setItem("user", JSON.stringify(res));
                    isSubmit(false);
                    props.handleUserIsLogin(true);
                    const profile = await userApi.getUserProfile(res.id);
                    await AsyncStorage.setItem(
                        "profile",
                        JSON.stringify(profile)
                    );
                    showNotify("Login success", "success");
                } else {
                    isSubmit(false);
                    showNotify(res.message, "error");
                }
            }
        } else {
            showNotify("Please input username and password", "warning");
        }
    };

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <View style={styles.shape_background} />
            <View style={styles.container}>
                <HStack>
                    <Heading size="xl">LOGIN</Heading>
                </HStack>
                <View
                    style={{
                        marginTop: 30,
                    }}
                >
                    <VStack space={4}>
                        <HStack>
                            <Input
                                width="xs"
                                height="12"
                                placeholder="Username"
                                InputRightElement={
                                    <Icon
                                        mr={3}
                                        as={Ionicons}
                                        name="person-outline"
                                        size={5}
                                    />
                                }
                                onChangeText={(value) => setUserName(value)}
                            />
                        </HStack>
                        <HStack>
                            <Input
                                width="xs"
                                height="12"
                                placeholder="Password"
                                type={passwordVisible ? "text" : "password"}
                                InputRightElement={
                                    passwordVisible ? (
                                        <Icon
                                            mr={3}
                                            as={Ionicons}
                                            name="eye-off-outline"
                                            size={5}
                                            onPress={() =>
                                                setPasswordVisible(false)
                                            }
                                        />
                                    ) : (
                                        <Icon
                                            mr={3}
                                            as={Ionicons}
                                            name="eye-outline"
                                            size={5}
                                            onPress={() =>
                                                setPasswordVisible(true)
                                            }
                                        />
                                    )
                                }
                                onChangeText={(value) => setPassword(value)}
                            />
                        </HStack>
                        <HStack justifyContent="flex-end">
                            <Text
                                onPress={() =>
                                    props.navigation.navigate(
                                        "ForgotPasswordScreen"
                                    )
                                }
                            >
                                Forgot password?
                            </Text>
                        </HStack>
                        <HStack mt={7} justifyContent="center">
                            <ButtonNativeBase
                                backgroundColor={COLORS.black}
                                width={200}
                                onPress={handleLogin}
                                isDisabled={submit}
                            >
                                {submit ? (
                                    <Spinner color="white" />
                                ) : (
                                    <Text style={styles.login_title}>
                                        Login
                                    </Text>
                                )}
                            </ButtonNativeBase>
                        </HStack>
                        <HStack mt={2} justifyContent="center">
                            <VStack>
                                <Text>Don't have a account? </Text>
                            </VStack>
                            <VStack>
                                <Text
                                    style={{
                                        fontWeight: "600",
                                    }}
                                    onPress={() =>
                                        props.navigation.navigate(
                                            "RegisterScreen"
                                        )
                                    }
                                >
                                    Register now
                                </Text>
                            </VStack>
                        </HStack>
                    </VStack>
                </View>
                <View style={styles.shopping_now}>
                    <Text
                        style={styles.shopping_now_title}
                        onPress={() => props.navigation.navigate("HomeScreen")}
                    >
                        SHOPPING NOW
                    </Text>
                </View>
            </View>

        </View>
    );
};

export default LoginScreen;
