import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { connect } from "react-redux";
import { Formik } from "formik";

import InputBar from "../components/InputBar";
import { showTopMessage } from "../utils/ErrorHandler";
import { userLoginAction, cleanUpLogin } from "../Redux/action/auth";
import { colors } from "../styles/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    Button,
    Input
} from "@rneui/themed"
import tabsImages from "../utils/TabsImages";
import {
    Fontisto,
    Feather
} from "@expo/vector-icons"

const initialFormValues = {
    usermail: "",
    password: "",
};

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            hidePassword: true,
            captchCode: generateCaptcha(),
            enteredCaptchCode: ""
        };
    }
    async componentDidMount() {
        const currentUser = await AsyncStorage.getItem('currentUser')
        if (currentUser) {
            const data = JSON.parse(currentUser)
            if (data && data.hasOwnProperty('_id')) {
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

    handleFormSubmit = (formValues) => {
        console.log(formValues)
        if (!formValues.usermail || !formValues.password) {
            alert("Please fill the user email and password")
            return
        }
        if (this.state.captchCode !== this.state.enteredCaptchCode) {
            showTopMessage("Entered Captcha is not same!", "info")
            return
        }
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
        this.props.navigation.navigate("Home");
    };
    gotToForgetPassword = () => {
        this.props.navigation.navigate("ForgetPassword")
    }

    render() {
        const { loading } = this.state;

        return (
            <KeyboardAvoidingView
                style={{ flex: 1,paddingHorizontal:20 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, marginTop: 50,paddingBottom:100 }}
                    keyboardShouldPersistTaps="handled"
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 2
                    }}>
                        <Image
                            source={tabsImages.icon}
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 100,
                                borderWidth: 1,
                                borderColor: 'pink'
                            }}
                        />
                    </View>
                    <Text style={styles.text}> HomeKart Login/Signup </Text>
                    <Formik
                        initialValues={initialFormValues}
                        onSubmit={this.handleFormSubmit}
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <>
                                <View style={styles.input_container}>
                                    <Input
                                        onChangeText={handleChange("usermail")}
                                        value={values.usermail}
                                        placeholder={"Email Address"}
                                        rightIcon={<Fontisto name="email" size={24} color="black" />}
                                    />
                                    <Input
                                        onChangeText={handleChange("password")}
                                        value={values.password}
                                        placeholder={"Password"}
                                        secureTextEntry={this.state.hidePassword ? true : false}
                                        rightIcon={
                                            <TouchableOpacity onPress={() => {
                                                this.setState({
                                                    hidePassword: !this.state.hidePassword
                                                })
                                            }}>
                                                {
                                                    this.state.hidePassword ? (
                                                        <Feather name="eye-off" size={24} color="black" />
                                                    ) : (
                                                        <Feather name="eye" size={24} color="black" />
                                                    )
                                                }
                                            </TouchableOpacity>
                                        }
                                    />
                                    <TouchableOpacity style={styles.button} onPress={this.gotToForgetPassword}>
                                        <Text style={styles.detail}>Forget password?</Text>
                                    </TouchableOpacity>
                                    <View style={{
                                        height: 30,
                                        backgroundColor: colors.color_gray,
                                        borderRadius: 10
                                    }}>
                                        <Text style={{
                                            textAlign: 'center',
                                            fontSize: 20,
                                            color: 'white',
                                            fontWeight: 'bold',
                                            letterSpacing: 20
                                        }}>{this.state.captchCode}</Text>
                                    </View>
                                    <View style={{
                                        justifyContent: 'flex-end',
                                        alignItems: 'center'
                                    }}>
                                        <TouchableOpacity onPress={() => {
                                            const newCode = generateCaptcha()
                                            this.setState({
                                                captchCode: newCode
                                            })
                                        }}>
                                            <Feather name="refresh-cw" size={24} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text>Enter Captcha*</Text>
                                        <Input
                                            placeholder="Enter Captcha*"
                                            value={this.state.enteredCaptchCode}
                                            onChangeText={(e) => this.setState({
                                                enteredCaptchCode: e
                                            })}
                                        />
                                    </View>
                                </View>
                                <View style={styles.button_container}>
                                    <Button
                                        title="Login"
                                        onPress={handleSubmit}
                                        loading={loading}
                                        size='lg'
                                    />
                                    <View style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: 4,
                                        marginBottom: 40,
                                        marginTop: 10
                                    }}>
                                        <Text>New User ?</Text>
                                        <TouchableOpacity onPress={this.goToMemberSignUp}>
                                            <Text style={{
                                                color: colors.color_primary,
                                                borderBottomColor: colors.color_secondary,
                                                borderBottomWidth: 1
                                            }}>Register</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* <Button
                                        title="Signup"
                                        onPress={this.goToMemberSignUp}
                                        type='outline'
                                        size='lg'
                                    /> */}
                                </View>
                            </>
                        )}
                    </Formik>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        marginTop: 48,
        paddingHorizontal: 24,
        backgroundColor: colors.color_light_gray,
    },
    text: {
        fontSize: 24,
        textAlign: "center",
        color: colors.color_primary,
    },
    detail: {
        fontSize: 14,
        color: colors.color_primary,
        textAlign: 'right',
        width: "100%"
    },
    button_container: {
        paddingVertical: 8,
        gap: 4
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


function generateCaptcha(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let captcha = '';
    for (let i = 0; i < length; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
}