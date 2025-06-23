import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { Formik } from "formik";

import InputBar from "../components/InputBar";
import Button from "../components/Button/Button";
import { showTopMessage } from "../utils/ErrorHandler";
import { userLoginAction, cleanUpLogin } from "../Redux/action/auth";
import { colors } from "../styles/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialFormValues = {
    usermail: "",
    password: "",
};

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }
    async componentDidMount(){
        const currentUser = await AsyncStorage.getItem('currentUser')
        if(currentUser){
            const data = JSON.parse(currentUser)
            if(data && data.hasOwnProperty('_id')){
                this.props.navigation.navigate("UserProfileScreen")
            }
        }
    }
    componentDidUpdate(prevProps) {
        const { loginStatus, loginResponse, loginError } = this.props;

        if (prevProps.loginStatus !== loginStatus) {
            if (loginStatus === "success") {
                showTopMessage("Login successful!", "success");
                this.setState({ loading: false });
                this.goToUserProfile();
            } else if (loginStatus === "started") {
                this.setState({ loading: true });
            } else if (loginStatus === "failed") {
                showTopMessage(
                    typeof loginError === "string" ? loginError : "Error while login",
                    "danger"
                );
                this.setState({ loading: false });
            }
        }
    }

    componentWillUnmount() {
        this.props.cleanUpLogin();
    }

    handleFormSubmit = (formValues) => {
        const data = {
            userEmail: formValues.usermail,
            password: formValues.password,
        };
        this.props.userLoginAction(data);
    };

    goToMemberSignUp = () => {
        this.props.navigation.navigate("SignUpScreen");
    };

    goToUserProfile = () => {
        this.props.navigation.navigate("UserProfileScreen");
    };
    gotToForgetPassword=()=>{
        this.props.navigation.navigate("ForgetPassword")
    }

    render() {
        const { loading } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.text}> HomeKart Login </Text>
                <Formik
                    initialValues={initialFormValues}
                    onSubmit={this.handleFormSubmit}
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
                                <TouchableOpacity style={styles.button} onPress={this.gotToForgetPassword}>
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
                                        onPress={this.goToMemberSignUp}
                                        theme="secondary"
                                    />
                                </View>
                            </View>
                        </>
                    )}
                </Formik>
            </View>
        );
    }
}

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
        textAlign: "center",
        color: colors.color_primary,
    },
    detail: {
        fontSize: 14,
        color: colors.color_gray,
    },
    button_container: {
        paddingVertical: 8,
    },
    button: {
        paddingVertical: 8,
        flexDirection: "row",
    },
    input_container: {
        marginBottom: 24,
    }
});

const mapStateToProps = (state) => ({
    loginStatus: state.auth.loginStatus,
    loginResponse: state.auth.loginResponse,
    loginError: state.auth.loginError,
});

const mapDispatchToProps = {
    userLoginAction,
    cleanUpLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
