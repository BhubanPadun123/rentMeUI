import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, Image, SafeAreaView, Platform } from "react-native";
import InputBar from "../components/InputBar";
import { colors, sizes } from "../styles/Theme";
import Loader from "../components/Loader";
import { getUser, getUserListForProductOrder } from "../APIs/userApi";
import { showTopMessage } from "../utils/ErrorHandler";
import { getVendorProducts, updateBooking } from "../APIs/booking";
import { getProductByIds } from "../APIs/product";
import { ScrollView } from "react-native-gesture-handler";
import ImageSlider from "../components/ImagesViewer";
import Icons from "../utils/Icons";
import DropdownSelect from "../components/SingleSelect";
import Button from "../components/Button/Button";
import { bookingStatus } from "../utils/utils"
import { generateRandomId } from "../utils/RandomId";
import { useSelector, useDispatch } from "react-redux";
import {
    getVendorProductPlaceBookingAction,
    getVendorOrderListAction,
    updateOrderStatusAction,
    cleanUpOrderStatusAction,
    getSingleProductAction,
    clearSingleProductClear,
    clearUpdateOrderStatus,
    createNotificationAction
} from "../Redux/action/product";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PopoverModal from "../components/PopOver";
import * as Notifications from "expo-notifications"
import * as Device from "expo-device"

const { height, width } = Dimensions.get('window')

export default function FeedBackScreen({ navigation }) {
    const dispatch = useDispatch()
    const [user, setUser] = React.useState(null)
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState([])
    const [openPopOver, setPopover] = useState(false)
    const [orderList, setOrderList] = useState([])
    const [selectedProduct, setSelectProduct] = useState(null)
    const [status, setStatus] = useState(null)
    const [tempStatus, setTempStatus] = useState("")
    const [selectPId, setSelectedPId] = useState(null)
    const [notification, setNotification] = useState(null)
    const [channel, setChannels] = useState(null)

    const {
        bookingListStatus,
        bookingListResponse,
        bookingListError,
        orderListError,
        orderListData,
        orderListStatus,
        updateOrderStatus,
        updateOrderStatusResponse,
        updateOrderStatusError,

        singleProductError,
        singleProductResponse,
        singleProductStatus,

        feedBackBookingStatus,
        feedBackBookingError,
        feedBackBookingResponse

    } = useSelector((state) => state.product)

    useEffect(() => {
        if (Platform.OS === 'android') {
            Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
        }
        const listerner = Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification)
        })
        const responseListener = Notifications.addNotificationReceivedListener((response) => {
            console.log(response)
        })

        return () => {
            listerner.remove()
            responseListener.remove()
        }
    }, [])

    async function registerForPushNotificationAsync() {
        if (!Device.isDevice) {
            alert("Must use physical device for push Notification")
        }
        var { status } = await Notifications.getPermissionsAsync()
        let finalStatus = status
        if (status && status !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync()
            finalStatus = status
        }
        if (finalStatus !== "granted") {
            alert("Permission not granted!")
            return
        }
        const token = await Notifications.getExpoPushTokenAsync()
        return token.data
    }

    useEffect(() => {
        if (bookingListStatus === "started" || orderListStatus === "started") {
            setLoading(true)
        }
        if (bookingListStatus === "success") {
            setProduct(bookingListResponse)
            setTimeout(() => {
                setLoading(false)
            }, 5000)
        }
        if (orderListStatus === "success") {
            setOrderList(orderListData)
            setTimeout(() => {
                setLoading(false)
            }, 5000)
        }
        if (feedBackBookingStatus === "started") {
            setLoading(true)
        }
        if (feedBackBookingStatus === "success") {
            showTopMessage("Status updated successfully!", "success")
            dispatch(cleanUpOrderStatusAction())
            setTimeout(() => {
                setLoading(false)
                setPopover(false)
            }, 5000)
        }
    }, [
        bookingListStatus,
        orderListStatus,
        feedBackBookingStatus
    ])
    useEffect(() => {
        if (updateOrderStatus === "success") {
            showTopMessage(updateOrderStatusResponse.message ? updateOrderStatusResponse.message : "Status updated successfully!", "success")
            setLoading(false)
        }
        if (updateOrderStatus === "started") {
            setLoading(true)
            fetchUserData()
        }
    }, [updateOrderStatus])

    async function fetchUserData() {
        const data = await AsyncStorage.getItem('currentUser')
        if (data) {
            const userInfo = JSON.parse(data)
            setUser(userInfo)
            await dispatch(getVendorProductPlaceBookingAction(userInfo._id))
            await dispatch(getVendorOrderListAction(userInfo._id))
        } else {
            gotToLogin()
        }
    }

    function gotToLogin() {
        navigation.navigate("LoginScreen")
    }
    React.useEffect(() => {
        fetchUserData()
    }, [])
    const updateStatus = async () => {
        if (!status || !selectedProduct || !selectPId) return
        if (singleProductStatus === "success" && singleProductResponse) {
            if (singleProductResponse.hasOwnProperty('total')) {
                const findOrder = orderList && orderList.find((i) => i._id === selectedProduct)
                if (!findOrder) {
                    showTopMessage("Error while selecting the property!,Property does not exist with us", "info")
                    return
                }
                const total = Number(singleProductResponse.total)
                if (total > 0 && findOrder.hasOwnProperty('bookingStatus') && findOrder.bookingStatus === "1") {
                    const metaData = {
                        ...singleProductResponse,
                        total: total - 1
                    }
                    dispatch(updateOrderStatusAction(selectedProduct, status, selectPId, JSON.stringify(metaData)))
                    registerForPushNotificationAsync().then((token) => {
                        const notificationData = {
                            userRef: findOrder.vendorRef,
                            token: token,
                            message: "Booking confirm by property owner",
                            title: "Booking confirmation alert",
                            redirectLink: "ServiceBookingScreen"
                        }
                        dispatch(createNotificationAction(notificationData))
                    }).catch((err) => {
                        console.log("err===>", err)
                    })
                } else {
                    const metaData = {
                        ...singleProductResponse,
                        total: 0
                    }
                    dispatch(updateOrderStatusAction(selectedProduct, "3", selectPId, JSON.stringify(metaData)))
                    registerForPushNotificationAsync().then((token) => {
                        const notificationData = {
                            userRef: findOrder.vendorRef,
                            token: token,
                            message: "Booking rejected by property owner",
                            title: "Booking Rejection Alert",
                            redirectLink: "ServiceBookingScreen"
                        }
                        dispatch(createNotificationAction(notificationData))
                    }).catch((err) => {
                        console.log("err===>", err)
                    })
                }
            }
        } else {
            showTopMessage("Error while update", "danger")
        }
    }
    const onSelectProdct = (orderId, productId) => {
        setSelectProduct(orderId)
        setPopover(true)
        if (productId) {
            dispatch(getSingleProductAction(productId))
            setSelectedPId(productId)
        }
    }
    const RenderProduct = ({ item }) => {
        const productRef = item && item.hasOwnProperty('productRef') ? item.productRef : null
        const customer = item && item.hasOwnProperty('bookingDate') ? JSON.parse(item.bookingDate) : null
        const findProduct = product && product.length > 0 && product.find(i => i._id === productRef)
        const metaData = findProduct && findProduct.hasOwnProperty('metaData') ? JSON.parse(findProduct.metaData) : null
        const images = metaData && metaData.hasOwnProperty('images') ? JSON.parse(metaData.images) : []
        const bookingStatusCode = item && item.hasOwnProperty('bookingStatus') ? item.bookingStatus : null
        const customerMetaData = customer && customer.hasOwnProperty('metaData') ? JSON.parse(customer.metaData) : null
        const status = bookingStatus(bookingStatusCode)
        if (!findProduct) return null
        return (
            <View key={generateRandomId()} style={{
                // width: "100%",
                borderRadius: 10,
                borderColor: colors.color_primary,
                borderWidth: 2,
                overflow: 'hidden',
                marginLeft: 8,
                marginRight: 8,
                marginVertical: 4,
                justifyContent: 'center'
            }}>
                <ImageSlider
                    images={images}
                />
                <Text style={{
                    color: colors.color_primary,
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>{findProduct.productTitle}</Text>
                {
                    status && (
                        <Text style={{
                            color: colors.color_primary,
                            fontSize: 18,
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>Current Status: {status}</Text>
                    )
                }
                <View
                    style={{
                        height: 1,
                        width: "100%",
                        backgroundColor: colors.color_secondary
                    }}
                />
                {
                    customer && (
                        <View style={{
                            backgroundColor: colors.color_light_gray,
                            paddingHorizontal: 4
                        }}>
                            <Text style={[styles.text, { fontSize: 18, textAlign: 'left' }]}>Customer Bio-Data</Text>
                            <Text style={[styles.text, { textAlign: 'left' }]}>Name:- {customer.userName && customer.userName}</Text>
                            <Text style={[styles.text, { textAlign: 'left' }]}>Phone Number:- {customer.userContactNumber && customer.userContactNumber}</Text>
                            <Text style={[styles.text, { textAlign: 'left' }]}>Email Address:- {customer.userEmail && customer.userEmail}</Text>
                            {
                                customerMetaData && (
                                    <Text style={[styles.text, { textAlign: 'left' }]}>
                                        Customer Address:- {
                                            customerMetaData.district && customerMetaData.localAddress && customerMetaData.pinCode && customerMetaData.state && customerMetaData.town ?
                                                `${customerMetaData.state},${customerMetaData.district},${customerMetaData.pinCode},${customerMetaData.town},${customerMetaData.localAddress}` : null
                                        }
                                    </Text>
                                )
                            }
                        </View>
                    )
                }
                {
                    bookingStatusCode && bookingStatusCode === "1" && (
                        <View style={{
                            width: "80%",
                            padding: 8,
                            marginLeft: 30
                        }}>
                            <Button
                                text={"Update Status"}
                                onPress={() => onSelectProdct(item._id, findProduct._id)}
                            />
                        </View>
                    )
                }
            </View>
        )

    }
    return (
        <SafeAreaView style={styles.container}>
            {
                product && product.length > 0 && (
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 20,
                        backgroundColor: colors.color_secondary,
                        fontWeight: 'bold',
                        paddingVertical: 20,
                        color: colors.color_white
                    }}>Make Sure,Please Confirm only one customer for each property!</Text>
                )
            }
            {
                product && product.length > 0 ? (
                    <FlatList
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        // snapToInterval={sizes.width}
                        decelerationRate={'normal'}
                        data={orderList}
                        keyExtractor={(catagory) => catagory._id + generateRandomId()}
                        renderItem={RenderProduct}
                    />
                ) : (
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 50
                    }}>
                        <Text style={[styles.header_text, { textAlign: 'center', color: colors.color_secondary, fontWeight: 'bold' }]}>
                            No One is booking your property yet!
                        </Text>
                    </View>
                )
            }
            <PopoverModal
                visible={openPopOver}
                title={"Order Status Update"}
                children={
                    <View style={{
                        maxHeight: 140,
                        justifyContent: 'center',
                        // alignItems:'center'
                    }}>
                        <DropdownSelect
                            options={
                                [
                                    { value: "2", label: "Confirm" },
                                    { value: '3', label: "Denial" }
                                ]
                            }
                            placeholder="Select the confirmation status"
                            onValueChange={(e) => {
                                setStatus(e)
                                if (e === "3") {
                                    setTempStatus("Denial")
                                } else {
                                    setTempStatus("Confirm")
                                }
                            }}
                            selectedValue={status}
                        />
                        <Button
                            text={"UPDATE"}
                            onPress={updateStatus}
                        />
                    </View>
                }
                onClose={() => {
                    setPopover(false)
                    setSelectProduct(null)
                    setStatus("")
                    dispatch(cleanUpOrderStatusAction())
                    fetchUserData()
                }}
            />
            {
                (
                    loading
                ) && (
                    <Loader />
                )
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header_text: {
        marginHorizontal: 24,
        marginVertical: 32,
        fontSize: 30,
    },
    text: {
        flex: 1,
        fontSize: 10,
        color: colors.color_secondary
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 8,
        paddingBottom: 8
    }
});
