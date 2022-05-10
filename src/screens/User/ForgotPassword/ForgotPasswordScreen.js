import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import styles from "./ForgotPasswordStyle";

const ForgotPasswordScreen = (props) => {
    const [userName, setUserName] = useState();

    const toast = useToast();

    const showNotify = (title, status) => {
        toast.show({
            title: title,
            status: status,
            placement: "top",
        });
    };

    const handleSubmitUsername = async () => {
        if (userName === null || typeof (userName) === 'undefined' || !userName.trim())
            showNotify("UserName not null!", "error");
        else {
            const res = await userApi.getTokenResetPassword(userName);
            if (res.code == "CREATED") {
                showNotify("Reset code sent to your email", "success");
                props.navigation.navigate("RecoverPasswordScreen", { userName });
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
                                placeholder="Enter your username"
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

                        <HStack mt={7} justifyContent="center">
                            <ButtonNativeBase
                                backgroundColor={COLORS.black}
                                width={200}
                                onPress={handleSubmitUsername}
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
                <Text></Text>
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

export default ForgotPasswordScreen;
