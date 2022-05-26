import {
    Button as ButtonNativeBase,
    FormControl,
    Heading,
    HStack,
    Input,
    Spinner,
    useToast,
    VStack,
} from "native-base";
import React, { useState } from "react";
import { Text, View } from "react-native";
import userApi from "../../../api/userApi";
import { COLORS } from "../../../constant/index";
import styles from "./ActiveStyle";

const ActiveScreen = (props) => {
    const [code, setCode] = useState();
    const { userName } = props.route.params;
    const [submit, isSubmit] = useState(false);

    const toast = useToast();

    const showNotify = (title, status) => {
        toast.show({
            title: title,
            status: status,
            placement: "top",
        });
    };

    const handleSubmitCode = async () => {
        if (code) {
            isSubmit(true);
            const data = {
                userName: userName,
                activeKey: code,
            };
            console.log(data);
            const res = await userApi.submitCode(data);
            if (res) {
                if (res.code === "ACCEPTED") {
                    isSubmit(false);
                    props.navigation.navigate("HomeScreen");
                    showNotify("Register successfully", "success");
                } else {
                    isSubmit(false);
                    showNotify(res.message, "error");
                }
            }
        } else {
            showNotify("Please enter your code", "error");
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
                    <Heading size="xl">SUBMIT CODE</Heading>
                </HStack>
                <View
                    style={{
                        marginTop: 30,
                    }}
                >
                    <FormControl isRequired>
                        <VStack space={4}>
                            <HStack>
                                <Input
                                    width="xs"
                                    height="12"
                                    placeholder="Enter your code..."
                                    onChangeText={(value) => setCode(value)}
                                />
                            </HStack>
                            <HStack mt={7} justifyContent="center">
                                <ButtonNativeBase
                                    backgroundColor={COLORS.black}
                                    width={200}
                                    onPress={handleSubmitCode}
                                    isDisabled={submit}
                                >
                                    {submit ? (
                                        <Spinner color="white" />
                                    ) : (
                                        <Text style={styles.login_title}>
                                            Submit
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
                                            props.navigation.navigate(
                                                "LoginScreen"
                                            )
                                        }
                                    >
                                        Login now
                                    </Text>
                                </VStack>
                            </HStack>
                            <HStack mt={2} justifyContent="center">
                                <View style={styles.shopping_now}>
                                    <Text
                                        style={styles.shopping_now_title}
                                        onPress={() =>
                                            props.navigation.navigate(
                                                "HomeScreen"
                                            )
                                        }
                                    >
                                        CANCEL
                                    </Text>
                                </View>
                            </HStack>
                        </VStack>
                    </FormControl>
                </View>
            </View>
        </View>
    );
};

export default ActiveScreen;
