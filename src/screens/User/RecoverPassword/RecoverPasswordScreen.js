import { Ionicons } from "@expo/vector-icons";
import {
    Button as ButtonNativeBase,
    Heading,
    HStack,
    Icon,
    Input,
    useToast,
    VStack,
} from "native-base";
import React, { useState } from "react";
import { Text, View } from "react-native";
import userApi from "../../../api/userApi";
import { COLORS } from "../../../constant/index";
import styles from "./RecoverPasswordStyle";

const RecoverPasswordScreen = (props) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [rePassword, setRePassword] = useState();
    const [password, setPassword] = useState();
    const [code, setCode] = useState();

    const { userName } = props.route.params;

    const toast = useToast();

    const showNotify = (title, status) => {
        toast.show({
            title: title,
            status: status,
            placement: "top",
        });
    };

    const handleResetPassword = async () => {
        if (password == rePassword) {
            const data = {
                userName,
                newPassword: password,
                resetPasswordCode: code,
            };
            console.log(data);
            const res = await userApi.postResetPassword(data);
            if (res.code == "ACCEPTED") {
                showNotify("Password changed, please login", "success");
                props.navigation.navigate("LoginScreen");
            } else {
                showNotify(res.message, "error");
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
                    <Heading size="xl">RESET PASSWORD</Heading>
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
                        <HStack>
                            <Input
                                width="xs"
                                height="12"
                                placeholder="Reset code"
                                InputRightElement={
                                    <Icon
                                        mr={3}
                                        as={Ionicons}
                                        name="sync-outline"
                                        size={5}
                                    />
                                }
                                onChangeText={(value) => setCode(value)}
                            />
                        </HStack>
                        <HStack mt={7} justifyContent="center">
                            <ButtonNativeBase
                                backgroundColor={COLORS.black}
                                width={200}
                                onPress={handleResetPassword}
                            >
                                <Text style={styles.login_title}>Submit</Text>
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

export default RecoverPasswordScreen;
