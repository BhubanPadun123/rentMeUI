import React, { useEffect, useState } from "react";
import {Keyboard, View, Text, StyleSheet, ScrollView, KeyboardAvoidingView ,Platform,TouchableWithoutFeedback} from "react-native";
import Button from "../components/Button/Button";
import InputBar from "../components/InputBar";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import app from "../../firebaseConfig";
import { Formik } from "formik";
import ErrorHandler, { showTopMessage } from "../utils/ErrorHandler";
import { colors } from "../styles/Theme";
import TermsAndConditions from "../components/TermAndCondition";
import Dropdown from "../components/SingleSelect"
import {useSelector,useDispatch} from "react-redux"
import { userRegisterAction,clearUpregisterAction } from "../Redux/action/auth";

const initialFormValues = {
    usermail: "",
    password: "",
    cPassword: "",
    userName: "",
    userContactNumber: "",
    userType: "",
};

export default function SignUpScreen({navigation}) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [isAggree, setAggree] = useState(false)

    const {
        signupError,
        signupResponse,
        signupStatus
    } = useSelector((state)=> state.auth)
    console.log(signupError)
    useEffect(()=>{
        if(signupStatus==="started"){
            setLoading(true)
        }
        if(signupStatus==="failed"){
            setLoading(false)
            showTopMessage(signupError.message ? signupError.message : "Error while signup","danger")
        }
        if(signupStatus==="success"){
            setLoading(false)
            showTopMessage("Signup successfull!","success")
            setTimeout(()=>{
                dispatch(clearUpregisterAction())
                goToLogin()
            },5000)
        }
        return ()=>{
            dispatch(clearUpregisterAction())
        }
    },[signupStatus])

    function goToLogin(){
        navigation.navigate("LoginScreen")
    }

    function handleFormSubmit(formValues) {
        let userData = {
            userName:formValues.userName,
            userEmail:formValues.usermail,
            userContactNumber:formValues.userContactNumber,
            userType:formValues.userType,
            password:formValues.password,
        }
        let error = null
        Object.entries(userData).map((item)=>{
            if(!item[1]){
                showTopMessage(`${item[0]} field data is mandatory!`,"info")
                error = true
                return
            }
        })
        if(error) return
        if(userData.password != formValues.cPassword){
            showTopMessage("password and confirm password not matching!","info")
            return
        }
        userData={
            ...userData,
            isVerifyed:false
        }
        dispatch(userRegisterAction(userData))
    }


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={styles.text}>HomeKart Signup</Text>
                    {isAggree ? (
                        <Formik
                            initialValues={initialFormValues} // ✅ fix incorrect use here
                            onSubmit={handleFormSubmit}
                        >
                            {({ values, handleChange, handleSubmit }) => (
                                <>
                                    <View style={styles.input_container}>
                                        <InputBar
                                            onType={handleChange("userName")}
                                            value={values.userName}
                                            placeholder={"User Name"}
                                        />
                                        <InputBar
                                            onType={handleChange("userContactNumber")}
                                            value={values.userContactNumber}
                                            placeholder={"Phone Number"}
                                        />
                                        <InputBar
                                            onType={handleChange("usermail")}
                                            value={values.usermail}
                                            placeholder={"Email address"}
                                        />
                                        <InputBar
                                            onType={handleChange("password")}
                                            value={values.password}
                                            placeholder={"Password"}
                                            isSecure
                                        />
                                        <InputBar
                                            onType={handleChange("cPassword")}
                                            value={values.cPassword}
                                            placeholder={"Confirm Password"}
                                            isSecure
                                        />
                                        <Dropdown
                                            placeholder="Select User Type"
                                            options={[
                                                { value: "owner", label: "Property Owner" },
                                                { value: "customer", label: "Customer" },
                                            ]}
                                            onValueChange={handleChange("userType")}
                                            selectedValue={values.userType}
                                        />
                                    </View>
                                    <View style={styles.button_container}>
                                        <Button
                                            text="Signup"
                                            onPress={handleSubmit}
                                            loading={loading}
                                        />
                                    </View>
                                </>
                            )}
                        </Formik>
                    ) : (
                        <TermsAndConditions
                            onAccept={() => {
                                setAggree(true);
                            }}
                        />
                    )}
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
    },
    text: {
        marginHorizontal: 24,
        marginVertical: 32,
        fontSize: 30,
        textAlign: 'center',
        color: colors.color_primary
        //fontFamily: "Mulish-Medium",
    },
    input_container: {
        marginHorizontal: 24,
    },
    button_container: {
        flexDirection: "row",
        margin: 16,
    },
});
