import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import React, { useState } from "react";
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
import { COLORS } from "../../../constant/index";
import validate from "../../../utils/validate";
import userApi from "../../../api/userApi";
import styles from "./RegisterStyle";

const RegisterScreen = (props) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [rePassword, setRePassword] = useState();
    const [submit, isSubmit] = useState(false);

    const toast = useToast();

    const showNotify = (title, status) => {
        toast.show({
            title: title,
            status: status,
            placement: "top",
        });
    };

    const handleRegister = async () => {
        if (password && userName && email && rePassword) {
            isSubmit(true);
            const validateUsername = validate.usernameValidate(userName);
            if (validateUsername !== true) {
                showNotify(validateUsername, "error");
                isSubmit(false);
                return true;
            }

            const validatePassword = validate.passwordValidate(password);
            if (validatePassword !== true) {
                showNotify(validatePassword, "error");
                isSubmit(false);
                return true;
            }

            const validateEmail = validate.emailValidate(email);
            if (validateEmail !== true) {
                showNotify(validateEmail, "error");
                isSubmit(false);
                return true;
            }
            if (rePassword !== password) {
                showNotify("Password not match!", "error");
            } else {
                const user = {
                    userName: userName,
                    password: password,
                    email: email,
                };
                const res = await userApi.postUserRegister(user);
                if (res) {
                    if (res.code === "CREATED") {
                        isSubmit(false);

                        props.navigation.navigate("ActiveScreen", {
                            userName: userName,
                        });
                        showNotify(`Active code sent to ${email}`, "success");
                    } else {
                        isSubmit(false);
                        showNotify(res.message, "error");
                    }
                }
            }
        } else {
            showNotify("Please fulfill form", "warning");
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
                    <Heading size="xl">REGISTER</Heading>
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
                                placeholder="Email"
                                InputRightElement={
                                    <Icon
                                        mr={3}
                                        as={Ionicons}
                                        name="mail-outline"
                                        size={5}
                                    />
                                }
                                onChangeText={(value) => setEmail(value)}
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
                        <HStack>
                            <Input
                                width="xs"
                                height="12"
                                placeholder="Re-password"
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
                                onChangeText={(value) => setRePassword(value)}
                            />
                        </HStack>
                        <HStack mt={7} justifyContent="center">
                            <ButtonNativeBase
                                backgroundColor={COLORS.black}
                                width={200}
                                onPress={handleRegister}
                                isDisabled={submit}
                            >
                                {submit ? (
                                    <Spinner color="white" />
                                ) : (
                                    <Text style={styles.login_title}>
                                        Register
                                    </Text>
                                )}
                            </ButtonNativeBase>
                        </HStack>
                        <HStack mt={2} justifyContent="center">
                            <VStack>
                                <Text>Already account? </Text>
                            </VStack>
                            <VStack>
                                <Text
                                    style={{
                                        fontWeight: "600",
                                    }}
                                    onPress={() =>
                                        props.navigation.navigate("LoginScreen")
                                    }
                                >
                                    Login now
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

export default RegisterScreen;
