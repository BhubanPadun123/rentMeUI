import React, { Component } from "react";
import {
    Keyboard,
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
} from "react-native";
import InputBar from "../components/InputBar";
import Dropdown from "../components/SingleSelect";
import TermsAndConditions from "../components/TermAndCondition";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import app from "../../firebaseConfig";
import { Formik } from "formik";
import ErrorHandler, { showTopMessage } from "../utils/ErrorHandler";
import { colors } from "../styles/Theme";
import { connect } from "react-redux";
import { userRegisterAction, clearUpregisterAction } from "../Redux/action/auth";
import {
    Input,
    Button,
    ListItem,
    Avatar
} from "@rneui/themed"
import Icons from "../utils/Icons"

const initialFormValues = {
    usermail: "",
    password: "",
    cPassword: "",
    userName: "",
    userContactNumber: "",
    userType: "",
};

class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isAggree: false,
            userType:""
        };
    }

    componentDidUpdate(prevProps) {
        const { signupStatus, signupError, dispatch } = this.props;

        if (prevProps.signupStatus !== signupStatus) {
            if (signupStatus === "started") {
                this.setState({ loading: true });
            }
            if (signupStatus === "failed") {
                this.setState({ loading: false });
                showTopMessage(
                    signupError?.message || "Error while signup",
                    "danger"
                );
            }
            if (signupStatus === "success") {
                this.setState({ loading: false });
                showTopMessage("Signup successful!", "success");
                setTimeout(() => {
                    dispatch(clearUpregisterAction());
                    this.goToLogin();
                }, 5000);
            }
        }
    }

    componentWillUnmount() {
        this.props.dispatch(clearUpregisterAction());
    }

    goToLogin = () => {
        this.props.navigation.navigate("LoginScreen");
    };

    handleFormSubmit = (formValues) => {
        const { dispatch } = this.props;
        let userData = {
            userName: formValues.userName,
            userEmail: formValues.usermail,
            userContactNumber: formValues.userContactNumber,
            userType: this.state.userType,
            password: formValues.password,
        };

        let error = false;
        Object.entries(userData).forEach(([key, value]) => {
            if (!value) {
                showTopMessage(`${key} field data is mandatory!`, "info");
                error = true;
            }
        });

        if (error) return;

        if (userData.password !== formValues.cPassword) {
            showTopMessage("Password and confirm password not matching!", "info");
            return;
        }

        userData = {
            ...userData,
            isVerifyed: false,
        };

        dispatch(userRegisterAction(userData));
    };

    renderForm = () => {
        return (
            <Formik
                initialValues={initialFormValues}
                onSubmit={this.handleFormSubmit}
            >
                {({ values, handleChange, handleSubmit }) => (
                    <>
                        <View style={styles.input_container}>
                            <Input
                                placeholder="Enter User Name"
                                value={values.userName}
                                onChangeText={handleChange('userName')}
                            />
                            <Input 
                                placeholder="Enter Phone Number"
                                value={values.userContactNumber}
                                onChangeText={handleChange('userContactNumber')}
                                keyboardType='phone-pad'
                            />
                            <Input 
                               placeholder="Enter User Email"
                               value={values.usermail}
                               onChangeText={handleChange("usermail")}
                            />
                            <Input
                                onChangeText={handleChange("password")}
                                value={values.password}
                                placeholder="Password"
                                isSecure={false}
                            />
                            <Input
                                onChangeText={handleChange("cPassword")}
                                value={values.cPassword}
                                placeholder="Confirm Password"
                                isSecure={false}
                            />
                            <ListItem bottomDivider onPress={()=>{
                                this.setState({
                                    userType:"owner"
                                })
                            }}>
                                <ListItem.CheckBox
                                    iconType="material-community"
                                    checkedIcon="checkbox-marked"
                                    uncheckedIcon="checkbox-blank-outline"
                                    checked={this.state.userType === "owner"}
                                />
                                <ListItem.Content>
                                    <ListItem.Title>Property Owner</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                            <ListItem bottomDivider onPress={()=>{
                                this.setState({
                                    userType:"customer"
                                })
                            }}>
                                <ListItem.CheckBox
                                    iconType="material-community"
                                    checkedIcon="checkbox-marked"
                                    uncheckedIcon="checkbox-blank-outline"
                                    checked={this.state.userType === "customer"}
                                />
                                <ListItem.Content>
                                    <ListItem.Title>Customer</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>

                            <Button
                                title="Signup"
                                onPress={handleSubmit}
                                loading={this.state.loading}
                                size='lg'
                            />
                        </View>
                        <View style={styles.button_container}>
                            {/* <Button
                                title="Signup"
                                onPress={handleSubmit}
                                loading={this.state.loading}
                                size='lg'
                            /> */}
                        </View>
                    </>
                )}
            </Formik>
        );
    };

    render() {
        const { isAggree } = this.state;
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
                            this.renderForm()
                        ) : (
                            <TermsAndConditions
                                onAccept={() => {
                                    this.setState({ isAggree: true });
                                }}
                            />
                        )}
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
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
        textAlign: "center",
        color: colors.color_primary,
    },
    input_container: {
        marginHorizontal: 24,
    },
    button_container: {
        flexDirection: "row",
        margin: 16,
        justifyContent: 'center',
        marginBottom: 50
    },
});

const mapStateToProps = (state) => ({
    signupError: state.auth.signupError,
    signupResponse: state.auth.signupResponse,
    signupStatus: state.auth.signupStatus,
});

export default connect(mapStateToProps)(SignUpScreen);
