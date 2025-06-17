import React, { useEffect, useState,useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Button from "../components/Button/Button";
import InputBar from "../components/InputBar";
import { getAuth, signInWithEmailAndPassword,sendEmailVerification } from "firebase/auth";
import app from "../../firebaseConfig";
import { Formik } from "formik";
import ErrorHandler, { showTopMessage } from "../utils/ErrorHandler";
import { colors } from "../styles/Theme";
import {useDispatch,useSelector} from "react-redux"
import { userLoginAction,cleanUpLogin } from "../Redux/action/auth";

const initialFormValues = {
    usermail: "",
    password: "",
};


const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const prevData = useRef()
    const [loading, setLoading] = useState(false)
    

    const {
        loginStatus,
        loginResponse,
        loginError
    } = useSelector((state)=>state.auth)

    useEffect(()=>{
        if(loginStatus === "success"){
            showTopMessage("Login successfull!","success");
            setLoading(false)
            goToUserProfile()
        }
        if(loginStatus==="started"){
            setLoading(true)
        }
        if(loginStatus === "failed"){
            showTopMessage(typeof(loginError) === "string" ? loginError  : "Error while login","danger")
            setLoading(false)
        }
        return ()=>{
            dispatch(cleanUpLogin())
        }
    },[loginStatus])
    
    async function handleFormSubmit(formValues) {
        const data = {
            userEmail:formValues.usermail,
            password:formValues.password
        }
        dispatch(userLoginAction(data));

    }

    // Navigation

    function goToMemberSignUp() {
        navigation.navigate("SignUpScreen");
    }

    // Navigation

    function goToUserProfile() {
        navigation.navigate("UserProfileScreen");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}> HomeKart Login </Text>
            <Formik
                initialValues={{ initialFormValues }}
                onSubmit={handleFormSubmit}
            >
                {({ values, handleChange, handleSubmit }) => (
                    <>
                        <View style={styles.input_container}>
                            <InputBar
                                onType={handleChange("usermail")}
                                value={values.usermail}
                                placeholder={"Email Address"}
                            />
                            <InputBar
                                onType={handleChange("password")}
                                value={values.password}
                                placeholder={"Password"}
                                isSecure
                            />
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.detail}>Forget password?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.button_container}>
                            <View style={styles.button}>
                                <Button
                                    text="Login"
                                    onPress={handleSubmit}
                                    loading={loading}
                                />
                            </View>
                            <View style={styles.button}>
                                <Button
                                    text="Signup"
                                    onPress={goToMemberSignUp}
                                    theme="secondary"
                                />
                            </View>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        marginTop: 48,
        paddingHorizontal: 24,
    },
    text: {
        marginVertical: 32,
        fontSize: 30,
        textAlign:'center',
        color:colors.color_primary
        // //fontFamily: "Mulish-Medium",
    },
    detail: {
        fontSize: 14,
        // //fontFamily: "Mulish-Medium",
        color:colors.color_gray
    },
    button_container: {
        paddingVertical: 8,
    },
    button: {
        paddingVertical: 8,
        flexDirection: "row",
    },
});

export default LoginScreen;
