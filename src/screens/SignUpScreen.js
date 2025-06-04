import React, { useState } from "react";
import { View, Text, StyleSheet ,ScrollView,KeyboardAvoidingView} from "react-native";
import Button from "../components/Button/Button";
import InputBar from "../components/InputBar";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../firebaseConfig";
import { Formik } from "formik";
import ErrorHandler, { showTopMessage } from "../utils/ErrorHandler";
import { colors } from "../styles/Theme";

const initialFormValues = {
    usermail: "",
    password: "",
    passwordre: "",
};

export default function SignUpScreen() {
    const [loading, setLoading] = useState(false);

    function handleFormSubmit(formValues) {
        const auth = getAuth(app);

        setLoading(true);

        if (formValues.password != formValues.passwordre) {
            showTopMessage(
                "Providing password is not same!",
                "warning"
            );
            setLoading(false);
        } else {
            createUserWithEmailAndPassword(
                auth,
                formValues.usermail,
                formValues.password
            )
                .then(
                    (res) => {
                        showTopMessage(" Register successfull!", "success");
                        setLoading(false);
                    }
                    //buradan home screene gitmeli veya go back
                )
                .catch((err) =>{
                    console.log(err)
                    showTopMessage(ErrorHandler(err.code), "danger")
                }
                );

            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            // behavior="padding"
        >
            <ScrollView style={styles.container}>
                <Text style={styles.text}>HomeKart Signup </Text>
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
                                    placeholder={"Email address"}
                                />
                                <InputBar
                                    onType={handleChange("password")}
                                    value={values.password}
                                    placeholder={"Password"}
                                    isSecure
                                />
                                <InputBar
                                    onType={handleChange("passwordre")}
                                    value={values.passwordre}
                                    placeholder={"Confirm Password"}
                                    isSecure
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
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40
    },
    text: {
        marginHorizontal: 24,
        marginVertical: 32,
        fontSize: 30,
        textAlign:'center',
        color:colors.color_primary
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
