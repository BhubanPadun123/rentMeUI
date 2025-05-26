import {
    View,
    Text,
    Container,
    Center,
    Input,
    Button,
    Stack,
    Pressable,
    Box,
    FormControl,
    VStack,
    Checkbox,
    useToast
} from "native-base";
import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import {
    AntDesign,
    Fontisto,
    Foundation,
    Entypo
} from "@expo/vector-icons"
import {
    validateEmail,
    validateConfirmPassword,
    validateContactNumber,
    validatePassword,
    validateUserName
} from "@/utils/helper";
import { useNavigation,useRoute } from "@react-navigation/native"
import Loader_1 from "./Loader/PrimaryLoader";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/Srore";
import { RootState } from "../Redux/Srore";
import { getUserPrivillages, userRegisteredAction } from "../Redux/actions/user";
import { user } from "../Redux/actionTypes/dataType";
import { useAppContext } from "./AppContex";

const { height, width } = Dimensions.get('screen')

interface stateData {
    passShow: boolean,
    cPassShow: boolean,
    userName: string,
    email: string,
    contactNumber: string,
    password: string,
    cPassword: string,
    userType: string,
    validation: {
        isUserNameValid: boolean,
        isEmailValid: boolean,
        isContactNumberValid: boolean,
        isPasswordValid: boolean,
        isCPasswordValid: boolean
    }
}


export default function Signup() {
    const navigation = useNavigation();
    const dispacth = useDispatch<AppDispatch>()
    const toast = useToast()
    const routeName = useRoute().name
    const {updateRouteName} = useAppContext()
    updateRouteName(routeName)
    const [state, setState] = React.useState<stateData>({
        passShow: false,
        cPassShow: false,
        userName: "",
        email: "",
        contactNumber: "",
        cPassword: "",
        password: "",
        userType: "",
        validation: {
            isUserNameValid: true,
            isEmailValid: true,
            isContactNumberValid: true,
            isPasswordValid: true,
            isCPasswordValid: true
        }
    })

    const {
        privillages,
        register
    } = useSelector((state: RootState) => state.user)
    console.log(register)

    const fetchProvillages = async () => {
        await dispacth(getUserPrivillages())
    }
    const handleRegister = () => {
        const userData: user = {
            userContactNumber: state.contactNumber,
            userEmail: state.email,
            userName: state.userName,
            userType: state.userType,
            isVerifyed: false,
            password: state.password
        }
        Object.entries(userData).map(([key, val]) => {
            if (!val) {
                toast.show({
                    description: `${key} value is missing!`
                })
                return
            }
        })
        dispacth(userRegisteredAction(userData))
    }
    React.useEffect(() => {
        fetchProvillages()
    }, [])

    if (privillages.status === 'failed') {
        return (
            <View
                minHeight={height}
                justifyContent={'center'}
                alignItems={"center"}
            >
                <Text
                    color={"white"}
                    fontSize={20}
                >
                    Something went wrong
                </Text>
            </View>
        )
    }

    return (
        <View
            minHeight={height}
            justifyContent={'center'}
            alignItems={"center"}
        >
            <Stack space={4} w="75%" maxW="300px" mx="auto">
                <FormControl isInvalid={!state.validation.isUserNameValid}>
                    <FormControl.Label>User Name *</FormControl.Label>
                    <Input
                        size="lg"
                        // placeholder="User Name *"
                        InputLeftElement={<AntDesign style={{ padding: 2 }} name="user" size={24} color="gray" />}
                        color={'white'}
                        value={state.userName}
                        onChangeText={(e) => {
                            let isValidUserName = validateUserName(e)
                            setState((prevState) => ({
                                ...prevState,
                                userName: e.toUpperCase(),
                                validation: {
                                    ...prevState.validation,
                                    isUserNameValid: isValidUserName
                                }
                            }))
                        }}
                    />
                    <FormControl.ErrorMessage leftIcon={<AntDesign name="warning" size={24} color="red" />}>
                        User Name should be atlease 6 char!!.
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={!state.validation.isEmailValid}>
                    <FormControl.Label>User Email *</FormControl.Label>
                    <Input
                        size="lg"
                        // placeholder="User Email *"
                        InputLeftElement={<Fontisto style={{ padding: 2 }} name="email" size={24} color="gray" />}
                        color={'white'}
                        value={state.email}
                        onChangeText={(e) => {
                            let isValidUserName = validateEmail(e)
                            setState((prevState) => ({
                                ...prevState,
                                email: e,
                                validation: {
                                    ...prevState.validation,
                                    isEmailValid: isValidUserName
                                }
                            }))
                        }}
                    />
                    <FormControl.ErrorMessage leftIcon={<AntDesign name="warning" size={24} color="red" />}>
                        Email address not valid!!.
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={!state.validation.isContactNumberValid}>
                    <FormControl.Label>User Contact Number *</FormControl.Label>
                    <Input
                        size="lg"
                        // placeholder="User Contact Number *"
                        InputLeftElement={<Foundation style={{ padding: 2 }} name="telephone" size={24} color="gray" />}
                        color={'white'}
                        value={state.contactNumber}
                        onChangeText={(e) => {
                            let isValidUserName = validateContactNumber(e)
                            setState((prevState) => ({
                                ...prevState,
                                contactNumber: e,
                                validation: {
                                    ...prevState.validation,
                                    isContactNumberValid: isValidUserName
                                }
                            }))
                        }}
                    />
                    <FormControl.ErrorMessage leftIcon={<AntDesign name="warning" size={24} color="red" />}>
                        Please provide valid contact number!!!.
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={!state.validation.isPasswordValid}>
                    <FormControl.Label>Password *</FormControl.Label>
                    <Input
                        size="lg"
                        // placeholder="Password *"
                        InputRightElement={
                            <Pressable onPress={() => setState((prevState) => ({ ...prevState, passShow: !state.passShow }))}>
                                {
                                    state.passShow ? <AntDesign style={{ padding: 2 }} name="eye" size={24} color="gray" /> : <Entypo style={{ padding: 2 }} name="eye-with-line" size={24} color="gray" />
                                }
                            </Pressable>
                        }
                        type={state.passShow ? "text" : 'password'}
                        color={'white'}
                        value={state.password}
                        onChangeText={(e) => {
                            let isValidUserName = validatePassword(e)
                            console.log(isValidUserName)
                            setState((prevState) => ({
                                ...prevState,
                                password: e,
                                validation: {
                                    ...prevState.validation,
                                    isPasswordValid: isValidUserName ? false : true
                                }
                            }))
                        }}
                    />
                    <FormControl.ErrorMessage leftIcon={<AntDesign name="warning" size={24} color="red" />}>
                        {validatePassword(state.password)}
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={!state.validation.isCPasswordValid}>
                    <FormControl.Label>Confirm Password *</FormControl.Label>
                    <Input
                        size="lg"
                        // placeholder="Confirm Password *"
                        InputRightElement={
                            <Pressable onPress={() => setState((prevState) => ({ ...prevState, cPassShow: !state.cPassShow }))}>
                                {
                                    state.cPassShow ? <AntDesign style={{ padding: 2 }} name="eye" size={24} color="gray" /> : <Entypo style={{ padding: 2 }} name="eye-with-line" size={24} color="gray" />
                                }
                            </Pressable>
                        }
                        type={state.cPassShow ? 'text' : 'password'}
                        color={'white'}
                        value={state.cPassword}
                        onChangeText={(e) => {
                            let isValidUserName = validateConfirmPassword(state.password, e)
                            setState((prevState) => ({
                                ...prevState,
                                cPassword: e,
                                validation: {
                                    ...prevState.validation,
                                    isCPasswordValid: isValidUserName ? false : true
                                }
                            }))
                        }}
                    />
                    <FormControl.ErrorMessage leftIcon={<AntDesign name="warning" size={24} color="red" />}>
                        {validateConfirmPassword(state.password, state.cPassword)}
                    </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired>
                    <FormControl.Label>
                        Select User Type
                    </FormControl.Label>
                    <VStack>
                        <Checkbox.Group
                            value={[state.userType]}
                            onChange={(e) => {
                                let val = Array.isArray(e) && e.filter(i => i && i !== state.userType)
                                if (val && val.length)
                                    setState((prevState) => ({ ...prevState, userType: val[0] }))
                            }}
                        >
                            <Checkbox value="vendor">
                                <Text
                                    color={"white"}
                                    fontSize={16}
                                >
                                    Property Owner
                                </Text>
                            </Checkbox>
                            <Checkbox value="customer">
                                <Text
                                    color={"white"}
                                    fontSize={16}
                                >
                                    Customer
                                </Text>
                            </Checkbox>
                        </Checkbox.Group>
                    </VStack>
                </FormControl>
                <Button onPress={handleRegister}>Register</Button>
                <Button
                    onPress={() => {
                        navigation.navigate('Login' as never)
                    }}
                >
                    <Text
                        color={"white"}
                        textAlign={'center'}
                        fontSize={18}
                    >
                        Already have account ?
                    </Text>
                </Button>
            </Stack>;
            {
                (
                    privillages.status === "started" ||
                    register.status === "started"
                ) && (
                    <Loader_1 />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    textWrapper: {
        width: width - 100,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        height: 'auto'
    },
})