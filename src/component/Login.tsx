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
    VStack
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
import { useNavigation } from "@react-navigation/native"
import { UserLoginAction } from "../Redux/actions/user";
import { useSelector, useDispatch } from "react-redux";
import { RootState, } from "../Redux/Reducer";
import { userLoginType } from "../Redux/actionTypes/dataType";
import { AppDispatch } from "../Redux/Srore";
import Loader_1 from "./Loader/PrimaryLoader";


const { height, width } = Dimensions.get('screen')

interface stateData {
    passShow: boolean,
    cPassShow: boolean,
    userName: string,
    email: string,
    contactNumber: string,
    password: string,
    cPassword: string,
    validation: {
        isUserNameValid: boolean,
        isEmailValid: boolean,
        isContactNumberValid: boolean,
        isPasswordValid: boolean,
        isCPasswordValid: boolean
    }
}


export default function Login() {
    const navigation = useNavigation();
    const dispatch = useDispatch<AppDispatch>()
    const [state, setState] = React.useState<stateData>({
        passShow: false,
        cPassShow: false,
        userName: "",
        email: "",
        contactNumber: "",
        cPassword: "",
        password: "",
        validation: {
            isUserNameValid: true,
            isEmailValid: true,
            isContactNumberValid: true,
            isPasswordValid: true,
            isCPasswordValid: true
        }
    })

    const {
        status,
        data,
        error
    } = useSelector((state: RootState) => state.user.login)
    React.useEffect(()=>{
        const handleRedirect=()=>{
            if(status==="success"){
                navigation.goBack()
            }
        }
        handleRedirect()
    },[status,error,data])
    const handleLogin = () => {
        const data: userLoginType = {
            userEmail: state.email,
            password: state.password
        }
        dispatch(UserLoginAction(data))
    }
    return (
        <View
          height={height}
          justifyContent={'center'}
        >
            <Box safeArea p="4" w="100%" maxW="500" py="8">
                <Stack space={4} w="75%" maxW="300px" mx="auto" position={"relative"} >
                    <FormControl isInvalid={!state.validation.isEmailValid} position={'relative'}>
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
                    <FormControl isInvalid={!state.validation.isPasswordValid} position={'relative'}>
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
                    <Button onPress={handleLogin}>LOGIN</Button>
                    <Pressable onPress={() => navigation.navigate("reset_password" as never)}>
                        <Text style={styles.forgetPassword}>Forget password ?</Text>
                    </Pressable>
                </Stack>
            </Box>
            {
                status === "started" && <Loader_1 />
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
    forgetPassword: {
        color: "white",
        textAlign: 'center',
        marginTop: 4,
        letterSpacing: 1.5,
        fontSize: 20
    }
})