import { Ionicons } from "@expo/vector-icons";
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
import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import userApi from "../../../api/userApi";
import { COLORS } from "../../../constant/index";
import userUtils from "../../../utils/userUtils";
import validate from "../../../utils/validate";
import styles from "./ChangePasswordStyle";

const ChangePasswordScreen = (props) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [newPassword, setNewPassword] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();
    const [userName, setUserName] = useState();
    const [submit, isSubmit] = useState(false);

    const toast = useToast();

    const showNotify = (title, status) => {
        toast.show({
            title: title,
            status: status,
            placement: "top",
        });
    };

    const checkPassword = async (password) => {
        isSubmit(true);
        const requestLogin = {
            userName: userName,
            password: password,
        };
        const res = await userApi.postUserLogin(requestLogin);
        console.log(res);
        if (res.token) {
            console.log("===== AUTHENTICATED =====");
            return true;
        } else {
            console.log("===== UNAUTHENTICATED =====");
            return false;
        }
    };

    const handleChangePassword = async () => {
        if (password && newPassword && passwordConfirm) {
            if (password == newPassword) {
                showNotify(
                    "New password is the same with current password",
                    "warning"
                );
                return true;
            }
            if (newPassword !== passwordConfirm) {
                showNotify(
                    "New password and password confirm not match",
                    "error"
                );
                return true;
            }
            const validatePassword = validate.passwordValidate(newPassword);
            if (validatePassword !== true) {
                showNotify(validatePassword, "error");
                return true;
            }
            if (await checkPassword(password)) {
                const requestChangePass = {
                    userName,
                    newPassword,
                    resetPasswordCode: "",
                };
                console.log(requestChangePass);
                const res = await userApi.putChangePassword(requestChangePass);
                console.log(res);
                if (res.code == "ACCEPTED") {
                    isSubmit(false);
                    showNotify(res.message, "success");
                    props.navigation.goBack();
                } else {
                    isSubmit(false);
                    showNotify(res.message, "error");
                }
            } else {
                isSubmit(false);
                showNotify("Current password was wrong", "error");
            }
        } else {
            showNotify("Please fulfill change password form", "error");
        }
    };

    const handleCancel = () => {
        props.navigation.goBack();
    };
    useEffect(async () => {
        const user = await userUtils.getUser();
        setUserName(user.userName);
    }, []);

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <View style={styles.shape_background} />
            <View style={styles.container}>
                <HStack>
                    <Heading size="xl">CHANGE PASSWORD</Heading>
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
                                placeholder="New password"
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
                                onChangeText={(value) => setNewPassword(value)}
                            />
                        </HStack>
                        <HStack>
                            <Input
                                width="xs"
                                height="12"
                                placeholder="Password confirm"
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
                                onChangeText={(value) =>
                                    setPasswordConfirm(value)
                                }
                            />
                        </HStack>
                        <HStack space={5} mt={7} justifyContent="center">
                            <VStack>
                                <ButtonNativeBase
                                    backgroundColor="gray.400"
                                    width={150}
                                    onPress={handleCancel}
                                >
                                    <Text style={styles.login_title}>
                                        Cancel
                                    </Text>
                                </ButtonNativeBase>
                            </VStack>
                            <VStack>
                                <ButtonNativeBase
                                    backgroundColor={COLORS.black}
                                    width={150}
                                    onPress={handleChangePassword}
                                >
                                    {submit ? (
                                        <Spinner color="white" />
                                    ) : (
                                        <Text style={styles.login_title}>
                                            Submit
                                        </Text>
                                    )}
                                </ButtonNativeBase>
                            </VStack>
                        </HStack>
                    </VStack>
                </View>
            </View>
        </View>
    );
};

export default ChangePasswordScreen;
