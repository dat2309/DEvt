import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    Button as ButtonNativeBase,
    HStack,
    Icon,
    Input,
    useToast,
    VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import userApi from "../../../api/userApi";
import userUtils from "../../../utils/userUtils";
import styles from "./ProfileStyle";

const ProfileScreen = (props) => {
    const [userName, setUserName] = useState();
    const [profile, setProfile] = useState();
    const [userId, setUserId] = useState();
    const [email, setEmail] = useState();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [gender, setGender] = useState();

    const [street, setStreet] = useState();
    const [province, setProvince] = useState();
    const [ward, setWard] = useState();
    const [district, setDistrict] = useState();

    const toast = useToast();
    const [show, setShow] = useState(false)
    const showNotify = (title, status) => {
        toast.show({
            title: title,
            status: status,
            placement: "top",
        });
    };

    const getUserInStorage = async () => {
        const result = await userUtils.getUser();
        if (result) {
            setUserName(result.userName);
            setEmail(result.email);
            setUserId(result.id);
            const res = await userApi.getUserProfile(result.id);
            console.log(res);
            if (res.addresses.length > 0) {
                setProfile(res);
            } else {
                const temp = {
                    addresses: [],
                    firstName: "",
                    lastName: "",
                    phone: "",
                    gender: "",
                };
                setProfile(temp);
            }
        }
    };

    const checkProfileForm = () => {
        console.debug("==== Begin validate profile ====");
        if (firstName && lastName && phoneNumber && gender) {
            const profile = {
                firstName,
                lastName,
                phone: phoneNumber,
                gender,
            };
            return profile;
        } else {
            showNotify("Please fulfill the profile form", "warning");
            return false;
        }
    };

    const checkAddressForm = () => {
        console.debug("==== Begin validate address ====");
        if (street && province && ward && district) {
            const address = {
                street,
                province,
                ward,
                district,
            };
            return address;
        } else {
            showNotify("Please fulfill the address form", "warning");
            return false;
        }
    };

    const saveProfileToStorage = async () => {
        const res = await userApi.getUserProfile(userId);
        console.info(res);
        if (res) {
            await AsyncStorage.setItem("profile", JSON.stringify(res));
        }
    };

    const handleSubmit = async () => {
        console.info("===== Submit Profile =====");
        const checkAddress = checkAddressForm();
        const checkProfile = checkProfileForm();
        if (checkProfile && checkAddress) {
            const resProfile = await userApi.postUserProfile(
                userId,
                checkProfile
            );
            console.info(resProfile);
            if (resProfile) {
                const resAddress = await userApi.postUserAddress(
                    userId,
                    checkAddress
                );
                console.info(resAddress);
                if (resAddress) {
                    await saveProfileToStorage();
                    showNotify("Update profile successed", "success");
                    props.navigation.navigate("CartScreen");
                }
            }
        }
        console.info("==== End submit ====");
    };

    const handleCancel = () => {
        props.navigation.goBack();
    };

    useEffect(() => {
        getUserInStorage();
    }, [userName == null, profile == null]);
    return (
        <View
            style={{
                flex: 1,
                marginTop: 10,
            }}
        >
            <View
                style={{
                    backgroundColor: "white",
                    padding: 12,
                    marginBottom: 12,
                }}
            >
                {userName && (
                    <HStack
                        space={2}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <VStack>
                            <Text>Username</Text>
                        </VStack>
                        <VStack>
                            <Input
                                textAlign="right"
                                width="64"
                                height="10"
                                defaultValue={userName}
                                isDisabled
                            />
                        </VStack>
                    </HStack>
                )}

                <HStack
                    space={2}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <VStack>
                        <Text>Email</Text>
                    </VStack>
                    <VStack>
                        <Input
                            textAlign="right"
                            width="64"
                            height="10"
                            defaultValue={email}
                            isDisabled
                        />
                    </VStack>
                </HStack>
                <TouchableOpacity>
                    <HStack
                        space={2}
                        alignItems="center"
                        justifyContent="space-between"
                        mt={2}
                    >
                        <VStack>
                            <Text>Change password</Text>
                        </VStack>
                        <VStack>
                            <Icon
                                as={Ionicons}
                                name="chevron-forward-outline"
                            />
                        </VStack>
                    </HStack>
                </TouchableOpacity>
            </View>
            {profile && (
                <View
                    style={{
                        backgroundColor: "white",
                        padding: 12,
                        marginBottom: 12,
                    }}
                >
                    <HStack
                        space={2}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <VStack>
                            <Text>First name</Text>
                        </VStack>
                        <VStack>
                            <Input
                                textAlign="right"
                                width="64"
                                height="10"
                                placeholder="Input your first name"
                                defaultValue={
                                    profile.firstName == null
                                        ? ""
                                        : profile.firstName
                                }
                                onChangeText={(value) => setFirstName(value)}
                            />
                        </VStack>
                    </HStack>
                    <HStack
                        space={2}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <VStack>
                            <Text>Last name</Text>
                        </VStack>
                        <VStack>
                            <Input
                                textAlign="right"
                                width="64"
                                height="10"
                                placeholder="Input your last name"
                                defaultValue={
                                    profile.lastName == null
                                        ? ""
                                        : profile.lastName
                                }
                                onChangeText={(value) => setLastName(value)}
                            />
                        </VStack>
                    </HStack>
                    <HStack
                        space={2}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <VStack>
                            <Text>Phone number</Text>
                        </VStack>
                        <VStack>
                            <Input
                                textAlign="right"
                                width="64"
                                height="10"
                                placeholder="Input your phone number"
                                defaultValue={
                                    profile.phone == null ? "" : profile.phone
                                }
                                isDisabled={
                                    profile.phone == null ? true : false
                                }
                                onChangeText={(value) => setPhoneNumber(value)}
                            />
                        </VStack>
                    </HStack>
                    <HStack
                        space={2}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <VStack>
                            <Text>Gender</Text>
                        </VStack>
                        <VStack>
                            <Input
                                textAlign="right"
                                width="64"
                                height="10"
                                placeholder="Input your gender"
                                defaultValue={
                                    profile.gender == null ? "" : profile.gender
                                }
                                onChangeText={(value) => setGender(value)}
                            />
                        </VStack>
                    </HStack>
                </View>
            )}
            {profile && (
                <View
                    style={{
                        backgroundColor: "white",
                        padding: 12,
                    }}
                >
                    <HStack
                        space={2}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <VStack>
                            <Text>Street</Text>
                        </VStack>
                        <VStack>
                            <Input
                                textAlign="right"
                                width="64"
                                height="10"
                                placeholder="Input your street"
                                defaultValue={
                                    profile.addresses.length < 1
                                        ? ""
                                        : profile.addresses[0].street
                                }
                                onChangeText={(value) => setStreet(value)}
                            />
                        </VStack>
                    </HStack>
                    <HStack
                        space={2}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <VStack>
                            <Text>Province</Text>
                        </VStack>
                        <VStack>
                            <Input
                                textAlign="right"
                                width="64"
                                height="10"
                                placeholder="Input your province"
                                defaultValue={
                                    profile.addresses.length < 1
                                        ? ""
                                        : profile.addresses[0].province
                                }
                                onChangeText={(value) => setProvince(value)}
                            />
                        </VStack>
                    </HStack>
                    <HStack
                        space={2}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <VStack>
                            <Text>Ward</Text>
                        </VStack>
                        <VStack>
                            <Input
                                textAlign="right"
                                width="64"
                                height="10"
                                placeholder="Input your ward"
                                defaultValue={
                                    profile.addresses.length < 1
                                        ? ""
                                        : profile.addresses[0].ward
                                }
                                onChangeText={(value) => setWard(value)}
                            />
                        </VStack>
                    </HStack>
                    <HStack
                        space={2}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <VStack>
                            <Text>District</Text>
                        </VStack>
                        <VStack>
                            <Input
                                textAlign="right"
                                width="64"
                                height="10"
                                placeholder="Input your district"
                                defaultValue={
                                    profile.addresses.length < 1
                                        ? ""
                                        : profile.addresses[0].district
                                }
                                onChangeText={(value) => setDistrict(value)}
                            />
                        </VStack>
                    </HStack>
                    <Text></Text>
                    <ButtonNativeBase onPress={() => setShow(true)}>Update</ButtonNativeBase>
                </View>
            )}

            {show ?
                <View style={styles.confirm_template}>
                    <HStack justifyContent="space-evenly">
                        <VStack justifyContent="center">
                            <ButtonNativeBase
                                style={styles.button_back}
                                leftIcon={
                                    <Icon
                                        as={Ionicons}
                                        name="close-outline"
                                        color="white"
                                        size={5}
                                    />
                                }
                                onPress={handleCancel}
                            >
                                <Text style={styles.button_text}>CANCEL</Text>
                            </ButtonNativeBase>
                        </VStack>
                        <VStack justifyContent="center">
                            <ButtonNativeBase
                                onPress={handleSubmit}

                                style={styles.button_confirm}
                                leftIcon={
                                    <Icon
                                        as={Ionicons}
                                        name="checkmark-outline"
                                        color="white"
                                        size={5}
                                    />
                                }
                            >
                                <Text style={styles.button_text}>SUBMIT</Text>
                            </ButtonNativeBase>
                        </VStack>
                    </HStack>
                </View>
                : null}
        </View>
    );
};

export default ProfileScreen;