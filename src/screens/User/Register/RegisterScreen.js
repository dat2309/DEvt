import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import React, { useState } from "react";
import {
    Button as ButtonNativeBase,
    Heading,
    HStack,
    Icon,
    Input,
    useToast,
    VStack,
} from "native-base";
import { COLORS } from "../../../constant/index";
import styles from "./RegisterStyle";
import userApi from "../../../api/userApi";

const RegisterScreen = (props) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [userName, setUserName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [rePassword, setRePassword] = useState(null);

    const toast = useToast();

    const showNotify = (title, status) => {
        toast.show({
            title: title,
            status: status,
            placement: "top",
        });
    };

    const handleRegister = async () => {
        if (userName === null)
            showNotify("UserName not null!", "error");
        else if (email === null)
            showNotify("Email not null!", "error");
        else if (password === null)
            showNotify("Password not null!", "error");

        else if (rePassword !== password) {
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
                    props.navigation.navigate("ActiveScreen", {
                        userName: userName,
                    });
                    showNotify(`Active code sent to ${email}`, "success");
                } else {
                    showNotify(res.message, "error");
                }
            }
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
                            >
                                <Text style={styles.login_title}>Register</Text>
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
    );
};

export default RegisterScreen;