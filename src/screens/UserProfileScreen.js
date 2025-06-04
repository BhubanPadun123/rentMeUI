import React from "react";

import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import app from "../../firebaseConfig";
import { Feather } from "@expo/vector-icons";
import CardSmall from "../components/CardSmall";
import { showTopMessage } from "../utils/ErrorHandler";
import { colors } from "../styles/Theme";
import UploadImage from "../components/UploadImage";
import { getUser, updateUser } from "../APIs/userApi";
import { Formik } from "formik";
import InputBar from "../components/InputBar";
import Button from "../components/Button/Button";

export default function UserProfileScreen({ navigation }) {
    const userInfo = {
        id: 0,
        firstName: "First Name",
        lastName: "+Last Name",
        district: "District",
    };
    const [state, setState] = React.useState({
        user: {
            id: "",
            displayName: "",
            email: "",
            emailVerified: false,
            phoneNumber: "",
            createdAt: "",
            photoURL: ""
        },
        userUpdateInfo: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            userType: "",
            state: "",
            district: "",
            pinCode: "",
            town: "",
            localAddress: ""
        },
        loading: false
    })
    React.useEffect(() => {
        const fetchData = async () => {
            getUser().then((res) => {
                const {
                    email,
                    createdAt,
                    emailVerified,
                    phoneNumber,
                    displayName,
                    photoURL
                } = res
                setState((prevState) => ({
                    ...prevState,
                    user: {
                        ...prevState.user,
                        email,
                        createdAt,
                        emailVerified,
                        phoneNumber,
                        displayName,
                        photoURL
                    }
                }))
            }).catch((err) => {
                console.log(err)
            })
        }
        fetchData()
    }, [])
    //sing out user
    function handleSignOut() {
        const auth = getAuth(app);

        signOut(auth)
            .then((res) => {
                showTopMessage("Logout successfull!", "success");
                goToLogin();
            })
            .catch((err) => console.log(err));
    }

    // Navigation
    function goToLogin() {
        navigation.navigate("LoginScreen");
    }

    // Navigation
    function goToBookingHistory() {
        navigation.navigate("BookingHistoryScreen");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header_text}>Update user info</Text>

            <View style={styles.section_container}>

                <View style={styles.user_card}>
                    <View style={styles.title_container}>
                        <Text style={styles.title}>
                            {
                                state.user.displayName && state.user.displayName
                            }
                        </Text>
                        <Text style={styles.desc}>{state.user.email && state.user.email}</Text>
                        <Text style={styles.desc}>{state.user.phoneNumber && state.user.phoneNumber}</Text>
                    </View>
                    <UploadImage
                        photoURL={state.user.photoURL}
                    />
                </View>
                <Formik
                    initialValues={state.userUpdateInfo}
                    onSubmit={() => { }}
                >
                    {
                        ({ values, handleChange, handleSubmit }) => (
                            <KeyboardAvoidingView
                                style={{
                                    flex: 1,
                                    marginTop: 10,
                                    marginHorizontal:10
                                }}
                            >
                                <ScrollView style={{
                                    flex: 1,
                                    marginBottom: 20
                                }}>
                                    <View style={styles.input_container}>
                                        <InputBar
                                            onType={handleChange("firstName")}
                                            value={values.firstName}
                                            placeholder={"Enter First Name"}
                                        />
                                        <InputBar
                                            onType={handleChange("lastName")}
                                            value={values.lastName}
                                            placeholder={"Enter Last Name"}
                                        />
                                        <InputBar
                                            onType={handleChange("phoneNumber")}
                                            value={values.phoneNumber}
                                            placeholder={"Enter Phone Number Name"}
                                        />
                                        <InputBar
                                            onType={handleChange("state")}
                                            value={values.state}
                                            placeholder={"Enter State Name"}
                                        />
                                        <InputBar
                                            onType={handleChange("district")}
                                            value={values.district}
                                            placeholder={"Enter District Name"}
                                        />
                                        <InputBar
                                            onType={handleChange("pinCode")}
                                            value={values.pinCode}
                                            placeholder={"Enter Pin Code"}
                                        />
                                        <InputBar
                                            onType={handleChange("town")}
                                            value={values.town}
                                            placeholder={"Enter Town Name"}
                                        />
                                        <InputBar
                                            onType={handleChange("localAddress")}
                                            value={values.localAddress}
                                            placeholder={"Enter Local Address Details"}
                                        />
                                    </View>
                                    <View style={styles.button_container} >
                                        <Button
                                            text={"Update"}
                                            onPress={handleSubmit}
                                            loading={state.loading}
                                        />
                                    </View>
                                </ScrollView>
                            </KeyboardAvoidingView>
                        )
                    }
                </Formik>

                {/* <CardSmall

                    iconName={"user"}
                    text={"Hesap Bilgilerim"}
                />
                <CardSmall
                    // onSelect={goToBookingHistory}
                    iconName={"list"}
                    text={"Geçmiş Calander"}
                />
                <CardSmall
                    iconName={"message-square"}
                    text={"Geri Bildirim"}
                /> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 48,
    },
    user_card: {
        flexDirection: "row",
        borderRadius: 20,
        marginHorizontal: 24,
        marginBottom: 16,
        backgroundColor: colors.color_white,
        padding: 16
    },
    section_container: {
        flex: 1,
        marginBottom: 16,
    },
    text_container: {
        flex: 1,
    },
    title_container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 16
    },
    title: {
        fontSize: 18,
        color: colors.color_primary
        //fontFamily: "Mulish-Medium",
    },
    desc: {
        fontSize: 14,
        //fontFamily: "Mulish-Light",
        color: colors.color_secondary,
    },
    logout_container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    header_text: {
        marginHorizontal: 24,
        marginVertical: 16,
        fontSize: 30,
        textAlign: 'center',
        color: colors.color_primary
        //fontFamily: "Mulish-Medium",
    },
    logo_container: {
        flex: 1,
        marginVertical: 24,
        alignItems: "center",
    },
    logo_text: {
        fontSize: 34,
        //fontFamily: "Mulish-Medium",
        color: colors.color_light_gray,
    },
    icon: {
        padding: 4,
    },
    text: {
        padding: 8,
        fontSize: 18,
        //fontFamily: "Mulish-Medium",
    },
    input_container: {
        flex: 1,
        marginHorizontal: 10
    },
    button_container: {
        paddingVertical: 8,
    },
    button: {
        paddingVertical: 8,
        flexDirection: "row",
    },
});
