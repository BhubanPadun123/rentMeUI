import React from "react";

import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import app from "../../firebaseConfig";
import { Feather } from "@expo/vector-icons";
import CardSmall from "../components/CardSmall";
import { showTopMessage } from "../utils/ErrorHandler";
import { colors } from "../styles/Theme";
import UploadImage from "../components/UploadImage";
import { getUser, updateUser, getUserInfo } from "../APIs/userApi";
import { Formik } from "formik";
import InputBar from "../components/InputBar";
import Button from "../components/Button/Button";
import Icons from "../utils/Icons";
import DropdownSelect from "../components/SingleSelect";
import tabsImages from "../utils/TabsImages";

export default function UserProfileScreen({ navigation }) {
    let initialFormValues = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        userType: "",
        state: "",
        district: "",
        pinCode: "",
        town: "",
        localAddress: ""
    }
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
        loading: false,
        isUserInfoAvailable: false
    })
    const fetchUserData = async () => {
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
            fetchUserDataInfo()
        }).catch((err) => {
            showTopMessage('Please Login!', "danger")
            console.log(err)
        })
    }
    React.useEffect(() => {
        fetchUserData()
    }, [])
    //sing out user
    function goToMyBooking() {
        navigation.navigate("ServiceBookingScreen", { item: {} })
    }
    function goToNotification() {
        navigation.navigate("NotificationsScreen")
    }
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
    function goToHome() {
        navigation.navigate("Home");
    }
    function goToAddProperty() {
        navigation.navigate("PropertyRegisterScreen");
    }
    function goToBookingStatusUpdate() {
        navigation.navigate("FeedBackScreen");
    }
    function handleUpdateUser(formValues) {
        const data = {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            displayName: `${formValues.firstName} ${formValues.lastName}`,
            state: formValues.state,
            district: formValues.district,
            pinCode: formValues.pinCode,
            localAddress: formValues.localAddress,
            town: formValues.town,
            userType: formValues.userType,
            photoURL: state.user.photoURL,
            phoneNumber: formValues.phoneNumber
        }
        Object.entries(data).map((item) => {
            if (!item[1]) {
                showTopMessage(`${item[0]} is mandatory*`, "danger")
                return
            }
        })

        updateUser(formValues, "info").then((res) => {
            showTopMessage("User data updated successfully!", "success")
            setTimeout(() => {
                goToHome()
            }, 5000)
            fetchUserDataInfo()
        }).catch((err) => {
            showTopMessage("Error while update the user data!", "danger")
        })
    }

    function fetchUserDataInfo() {
        getUserInfo().then((userData) => {
            setState((prevState) => ({
                ...prevState,
                user: {
                    ...prevState.user,
                    ...userData
                },
                isUserInfoAvailable: true
            }))
            // goToHome()
        }).catch((err) => {
            showTopMessage("Error while fetching user data!", "danger")
        })
    }
    return (
        <View style={styles.container}>
            <View style={{
                marginHorizontal: 20,
                display: 'flex',
                flexDirection: "column",
                alignItems: 'center',
                gap: 8,
                justifyContent: "space-around"
            }}>
                <View style={{
                    display: "flex",
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    width: "100%",
                    alignItems: 'center',
                    gap: 14,
                    backgroundColor: colors.color_light_gray,
                    paddingVertical: 4,
                    paddingRight: 8,
                    borderRadius: 8
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            setState((prevState) => ({
                                ...prevState,
                                isUserInfoAvailable: !prevState.isUserInfoAvailable
                            }))
                        }}
                    >
                        <Image source={Icons.edit} style={{ height: 20, width: 20 }} />
                    </TouchableOpacity>
                    {
                        state.user && state.user.hasOwnProperty('userType') && state.user.userType === "owner" && (
                            <>
                                <TouchableOpacity onPress={goToAddProperty} >
                                    <Image source={Icons.add} style={{ height: 26, width: 26 }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={goToBookingStatusUpdate} >
                                    <Image source={Icons.status} style={{ height: 26, width: 26 }} />
                                </TouchableOpacity>
                            </>
                        )
                    }
                    <TouchableOpacity onPress={goToHome} >
                        <Image source={tabsImages.Home} style={{ height: 26, width: 26 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSignOut} >
                        <Image source={Icons.logout} style={{ height: 26, width: 26 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goToMyBooking} >
                        <Image source={Icons.cart} style={{ height: 26, width: 26 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goToNotification} >
                        <Image source={Icons.notification} style={{ height: 26, width: 26 }} />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        width: "100%",
                        height: 1,
                        backgroundColor: colors.color_primary
                    }}
                />
                <Text style={styles.header_text}>user info</Text>
            </View>

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
                        handleUpdateToDb={(img) => {
                            const data = {
                                displayName: state.user.displayName,
                                phoneNumber: state.user.phoneNumber,
                                photoURL: img
                            }
                            updateUser(data, "profile").then((result) => {
                                showTopMessage("Profile updated successfully!", "success")
                                fetchUserData()
                            }).catch((err) => {
                                showTopMessage(err.message ? err.message : "something went wrong!", "danger")
                            })
                        }}
                        imgUrl={state.user.photoURL}
                    />
                </View>
                {
                    !state.isUserInfoAvailable && (
                        <Formik
                            initialValues={{ initialFormValues }}
                            onSubmit={handleUpdateUser}
                        >
                            {
                                ({ values, handleChange, handleSubmit }) => (
                                    <KeyboardAvoidingView
                                        style={{
                                            flex: 1,
                                            marginTop: 10,
                                            marginHorizontal: 10
                                        }}
                                    >
                                        <ScrollView style={{
                                            flex: 1,
                                            marginBottom: 20
                                        }}>
                                            <View style={styles.input_container}>
                                                <InputBar
                                                    onType={handleChange("firstName")}
                                                    value={values.initialFormValues}
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
                                                <DropdownSelect
                                                    onValueChange={handleChange("userType")}
                                                    options={
                                                        [
                                                            { value: "owner", label: "Property Owner" },
                                                            { value: "renter", label: "Property Renter" }
                                                        ]
                                                    }
                                                    placeholder="Select user type"
                                                    selectedValue={values.userType}
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
                    )
                }
                {
                    state.isUserInfoAvailable && (
                        <ScrollView style={{
                            flex: 1,
                            marginBottom: 20
                        }}>
                            {
                                state.user.state && (
                                    <CardSmall
                                        iconName={"user"}
                                        text={state.user.state}
                                    />
                                )
                            }
                            {
                                state.user.district && (
                                    <CardSmall
                                        iconName={"user"}
                                        text={state.user.district}
                                    />
                                )
                            }
                            {
                                state.user.pinCode && (
                                    <CardSmall
                                        iconName={"user"}
                                        text={state.user.pinCode}
                                    />
                                )
                            }
                            {
                                state.user.town && (
                                    <CardSmall
                                        iconName={"user"}
                                        text={state.user.town}
                                    />
                                )
                            }
                            {
                                state.user.localAddress && (
                                    <CardSmall
                                        iconName={"user"}
                                        text={state.user.localAddress}
                                    />
                                )
                            }
                            {
                                state.user.userType && (
                                    <CardSmall
                                        iconName={"user"}
                                        text={state.user.userType}
                                    />
                                )
                            }
                        </ScrollView>
                    )
                }
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
