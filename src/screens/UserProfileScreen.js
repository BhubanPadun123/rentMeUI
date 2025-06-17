import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableWithoutFeedback, Keyboard, Platform, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import app from "../../firebaseConfig";
import { Feather } from "@expo/vector-icons";
import CardSmall from "../components/CardSmall";
import { showTopMessage } from "../utils/ErrorHandler";
import { colors, sizes } from "../styles/Theme";
import UploadImage from "../components/UploadImage";
import { getUser, updateUser, getUserInfo } from "../APIs/userApi";
import { Formik } from "formik";
import InputBar from "../components/InputBar";
import Button from "../components/Button/Button";
import Icons from "../utils/Icons";
import DropdownSelect from "../components/SingleSelect";
import tabsImages from "../utils/TabsImages";
import { updateUserMetaDataAction, cleanupUpdate } from "../Redux/action/auth";
import { useDispatch, useSelector } from "react-redux"
import ImageButton from "../components/Button/ProfileButton";
import { getNotificationAction } from "../Redux/action/product";
import * as Notifications from 'expo-notifications';

export default function UserProfileScreen({ navigation }) {
    const dispatch = useDispatch()
    let initialFormValues = {
        state: "",
        district: "",
        pinCode: "",
        town: "",
        localAddress: "",
        workingProfissional: ""
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
        metaData: {},
        loading: false,
        isUserInfoAvailable: false,
        toggleProfile: false,
        userMetaData: {}
    })

    const {
        metaDataResponse,
        metaDataStatus,
        metaDataError,
    } = useSelector((state) => state.auth);

    const {
        getNotificationError,
        getNotificationResponse,
        getNotificationStatus
    } = useSelector((state)=> state.product)

    useEffect(()=>{
        const handleShowNotification=()=>{
            if(getNotificationStatus === "success" && getNotificationResponse && Array.isArray(getNotificationResponse) && getNotificationResponse.length > 0){
                getNotificationResponse.map((item)=>{
                    const data={
                        title:item.title,
                        message:item.message,
                    }
                    showNotification(data);
                })
            }
        }
        handleShowNotification();
    },[getNotificationStatus])

    async function showNotification(data){
        await Notifications.scheduleNotificationAsync({
            content:{
                title:data.title,
                body:data.message,
                sound:'default'
            },
            trigger:{
                type:Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds:5
            }
        })
    }


    useEffect(() => {
        if (metaDataStatus === "success") {
            showTopMessage("Data updated successfully", "success")
            if (metaDataResponse && metaDataResponse.hasOwnProperty("metaData")) {
                const metaData = JSON.parse(metaDataResponse.metaData)
                setState((prevState) => ({
                    ...prevState,
                    metaData: metaData,
                    loading: false,
                    isUserInfoAvailable: true
                }))
            }
        }
        if (metaDataStatus === "failed") {
            showTopMessage(metaDataError.message ? metaDataError.message : "Error while update the data", "danger")
            setState((prevState) => ({
                ...prevState,
                loading: false
            }))
        }
        if (metaDataStatus === "started") {
            setState((prevState) => ({
                ...prevState,
                loading: true
            }))
        }
    }, [metaDataStatus])


    const fetchUserData = async () => {
        const userInfo = await AsyncStorage.getItem("currentUser")
        const metaData = await AsyncStorage.getItem("userMetaData")
        console.log(typeof metaData)
        if (userInfo) {
            const userData = JSON.parse(userInfo)
            dispatch(getNotificationAction(userData._id));
            setState((prevState) => ({
                ...prevState,
                user: {
                    ...prevState.user,
                    ...JSON.parse(userInfo)
                },
                metaData: metaData ? JSON.parse(metaData) : null,
                isUserInfoAvailable: metaData ? true : false,
                userMetaData: metaData && JSON.parse(metaData).hasOwnProperty('metaData') ? JSON.parse(JSON.parse(metaData).metaData) : null
            }))
        }
    }
    React.useEffect(() => {
        fetchUserData()
        return () => {
            dispatch(cleanupUpdate())
        }
    }, [])
    //sing out user
    function goToMyBooking() {
        navigation.navigate("ServiceBookingScreen", { item: {} })
    }
    function goToNotification() {
        navigation.navigate("NotificationsScreen")
    }
    function goToEditStock() {
        navigation.navigate("UpdateProductStock")
    }
    function goToRecord() {
        navigation.navigate('Record')
    }
    async function handleSignOut() {
        await AsyncStorage.removeItem('currentUser')
        await AsyncStorage.removeItem('userMetaData')
        await AsyncStorage.removeItem('userToken')
        await AsyncStorage.removeItem('refreshToken')
        goToLogin()
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
            state: formValues.state,
            district: formValues.district,
            pinCode: formValues.pinCode,
            localAddress: formValues.localAddress,
            town: formValues.town,
            photoURL: state.user.photoURL,
        }
        let isError = null
        Object.entries(data).map((item) => {
            if (!item[1]) {
                showTopMessage(`${item[0]} is mandatory*`, "danger")
                isError = true
                return
            }
        })
        if (isError) return
        dispatch(updateUserMetaDataAction(data, state.user._id))
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
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: 'center',
                    gap: 14,
                    backgroundColor: colors.color_light_gray,
                    paddingVertical: 4,
                    paddingRight: 8,
                    borderRadius: 8
                }}>
                    <Text style={[state.toggleProfile, { padding: 4, fontSize: 20, color: colors.color_secondary, fontWeight: 'bold' }]}>Welcome To HomeKert</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setState((prevState) => ({
                                ...prevState,
                                toggleProfile: !prevState.toggleProfile
                            }))
                        }}
                    >
                        <Image source={Icons.edit} style={{ height: 20, width: 20 }} />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        width: "100%",
                        height: 1,
                        backgroundColor: colors.color_primary
                    }}
                />
            </View>
            {
                !state.toggleProfile && (
                    <View style={styles.section_container}>
                        <View style={styles.row}>
                            {
                                state.user && state.user.hasOwnProperty('userType') && (state.user.userType === "owner" || state.user.userType === "supper_admin") && (
                                    <>
                                        <ImageButton
                                            title={"Register Property"}
                                            imageSource={Icons.add}
                                            onPress={goToAddProperty}
                                        />
                                        <ImageButton
                                            title={"Update Booking Status"}
                                            imageSource={Icons.status}
                                            onPress={goToBookingStatusUpdate}
                                        />
                                    </>
                                )
                            }
                        </View>
                        <View style={styles.row}>
                            <ImageButton
                                title={"Home"}
                                imageSource={tabsImages.Home}
                                onPress={goToHome}
                            />
                            <ImageButton
                                title={"Logout"}
                                imageSource={Icons.logout}
                                onPress={goToLogin}
                            />
                        </View>
                        <View style={styles.row}>
                            <ImageButton
                                title={"My Booking"}
                                imageSource={Icons.cart}
                                onPress={goToMyBooking}
                            />
                            <ImageButton
                                title={"Notification"}
                                imageSource={Icons.notification}
                                onPress={goToNotification}
                                renderChild={
                                    <Text style={{
                                        color:"red",
                                        textAlign:"left",
                                        fontSize:20,
                                        fontWeight:'bold',
                                        // borderWidth:1,
                                        // backgroundColor:colors.color_light_gray,
                                        // padding:4,
                                        // borderRadius:20,
                                        position:"absolute",
                                        zIndex:20
                                    }}>
                                        {
                                            getNotificationStatus === "success" && getNotificationResponse ? getNotificationResponse.length : null
                                        }
                                    </Text>
                                }
                            />
                        </View>
                        {
                            state.user && state.user.hasOwnProperty('userType') && (state.user.userType === "owner" || state.user.userType === "supper_admin") && (
                                <View style={styles.row}>
                                    <ImageButton
                                        title={"Edit Stocks"}
                                        imageSource={Icons.stock}
                                        onPress={goToEditStock}
                                    />
                                    <ImageButton
                                        title={"Stock Record's"}
                                        imageSource={Icons.stockReport}
                                        onPress={goToRecord}
                                    />
                                </View>
                            )
                        }
                        {
                            state.user && state.user.hasOwnProperty('userType') && (state.user.userType === "supper_admin") && (
                                <View style={styles.row}>
                                    <ImageButton
                                        title={"Booking Record's"}
                                        imageSource={Icons.stockReport}
                                        onPress={goToRecord}
                                    />
                                    <ImageButton
                                        title={"Earning Record's"}
                                        imageSource={Icons.saleRepost}
                                        onPress={goToNotification}
                                    />
                                </View>
                            )
                        }
                    </View>
                )
            }
            <View style={styles.user_card}>
                <View style={styles.title_container}>
                    <Text style={styles.title}>
                        {
                            state.user.displayName && state.user.displayName
                        }
                    </Text>
                    <Text style={styles.desc}>{state.user.userEmail && state.user.userEmail}</Text>
                    <Text style={styles.desc}>{state.user.userContactNumber && state.user.userContactNumber}</Text>
                </View>
                <UploadImage
                    photoURL={state.userMetaData && state.userMetaData.photoURL && state.userMetaData.photoURL}
                    handleUpdateToDb={(img) => {
                        setState((prevState) => ({
                            ...prevState,
                            user: { ...prevState.user, photoURL: img }
                        }))
                    }}
                    imgUrl={state.userMetaData && state.userMetaData.photoURL && state.userMetaData.photoURL}
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
                                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                                    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
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
                                            <DropdownSelect
                                                placeholder="Select working profissional"
                                                options={
                                                    [
                                                        { value: "student", label: "Student" },
                                                        { value: "working", label: "Working Profissional" },
                                                        { value: "business", label: "Business Person" }
                                                    ]
                                                }
                                                onValueChange={handleChange("workingProfissional")}
                                                selectedValue={values.workingProfissional}

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
                )
            }
            {
                state.toggleProfile && state.isUserInfoAvailable && state.userMetaData && (
                    <ScrollView style={{
                        flex: 1,
                        marginBottom: 20
                    }}>
                        {
                            state.userMetaData && state.userMetaData.state && (
                                <CardSmall
                                    iconName={"user"}
                                    text={state.userMetaData.state}
                                />
                            )
                        }
                        {
                            state.userMetaData.district && state.userMetaData.district && (
                                <CardSmall
                                    iconName={"user"}
                                    text={state.userMetaData.district}
                                />
                            )
                        }
                        {
                            state.userMetaData.pinCode && state.userMetaData.pinCode && (
                                <CardSmall
                                    iconName={"user"}
                                    text={state.userMetaData.pinCode}
                                />
                            )
                        }
                        {
                            state.userMetaData.town && state.userMetaData.town && (
                                <CardSmall
                                    iconName={"user"}
                                    text={state.userMetaData.town}
                                />
                            )
                        }
                        {
                            state.userMetaData.localAddress && state.userMetaData.localAddress && (
                                <CardSmall
                                    iconName={"user"}
                                    text={state.userMetaData.localAddress}
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "center",
        paddingHorizontal: 16,
        paddingTop: 20,
        alignItems: 'center',
        height: sizes.height
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        gap: 8
    }
});
