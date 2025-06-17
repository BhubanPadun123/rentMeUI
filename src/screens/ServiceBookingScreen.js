import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    Alert,
    ActivityIndicator,
    Modal,
    Platform
} from "react-native";
import Button from "../components/Button/Button";
import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { colors } from "../styles/Theme";
import { getAuth } from "firebase/auth";
import { getDatabase, push, ref, get, child, update } from "firebase/database";
import { showTopMessage } from "../utils/ErrorHandler";
import TimeSlot from "../components/TimeSlot";
import parseContentData from "../utils/ParseContentData";
import { Ionicons } from "@expo/vector-icons";
import {
    configureNotifications,
    handleNotification,
} from "../utils/NotificationService";
import userImages from "../utils/UserImageUtils";
import Loader from "../components/Loader";
import { getCustomerBookingList } from "../APIs/booking";
import { getProductByIds } from "../APIs/product";
import ImageSlider from "../components/ImagesViewer";
import {
    timeFormate,
    bookingStatus
} from "../utils/utils";
import { paymentGatway } from "../APIs/paymentGateway";
import RazorpayWeb from "../components/Payment";
import { getUserInfo } from "../APIs/userApi";
import { updateBooking } from "../APIs/booking";
import { platformFeeTermAndConfition } from "../utils/utils"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux"
import {
    getVendorProductPlaceBookingAction,
    getOrderStatusAction,
    cleanUpOrderStatusAction,
    createNotificationAction
} from "../Redux/action/product";
import {
    getCustomerOrderListAction,
    paymentAction,
    getPaymentDataAction,
    cleanPaymentData
} from "../Redux/action/customer";
import PopoverModal from "../components/PopOver";
import ItemList from "../components/ListItems";
import * as Notifications from "expo-notifications"
import * as Device from "expo-device"

export default function ServiceBookingScreen({ route, navigation }) {
    const dispatch = useDispatch()
    const { item } = route.params;
    const scrollViewRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [bookingRef, setBookingRef] = useState([])
    const [product, setProduct] = useState([])
    const [openPayment, setOpenPayment] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const [openStatus, setOpenStatus] = useState(false)
    const [orderList, setOrderList] = useState([])
    const [findBookingCode, setfindBookingCode] = useState(null)
    const [status, setStatus] = useState(null)
    const [itemsInfo, setItemInfo] = useState(null)
    const [notification,setNotification] = useState(null)
    const [channel,setChannels] = useState(null)

    const {
        bookingListStatus,
        bookingListError,
        bookingListResponse,
        orderStatus,
        orderStatusData,
        orderStatusError
    } = useSelector((state) => state.product)
    const {
        customerOrderListError,
        customerOrderListResponse,
        customerOrderListStatus,
        paymentStatus,
        paymentStatusResponse,
        paymentStatusError,

        orderPaymentStatus,
        orderPaymentError,
        orderPaymentResponse
    } = useSelector((state) => state.customer)

    useEffect(()=>{
        if (Platform.OS === 'android') {
            Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
          }
        const listerner = Notifications.addNotificationReceivedListener((notification)=>{
            setNotification(notification)
        })
        const responseListener = Notifications.addNotificationReceivedListener((response)=>{
            console.log(response)
        })

        return()=>{
            listerner.remove()
            responseListener.remove()
        }
    },[])

    async function registerForPushNotificationAsync(){
        if(!Device.isDevice){
            alert("Must use physical device for push Notification")
        }
        var {status} = await Notifications.getPermissionsAsync()
        let finalStatus = status
        if(status && status !== "granted"){
            const {status} = await Notifications.requestPermissionsAsync()
            finalStatus = status
        }
        if(finalStatus !== "granted"){
            alert("Permission not granted!")
            return
        }
        const token = await Notifications.getExpoPushTokenAsync()
        return token.data
    }

    useEffect(() => {
        if (orderStatus === "success") {
            setOpenStatus(true)
            setLoading(false)
        }
        if (customerOrderListStatus === "success") {
            setOrderList(customerOrderListResponse)
            setLoading(false)
        }
    }, [orderStatus, customerOrderListStatus])

    useEffect(() => {
        fetUserInfo()
    }, [])

    useEffect(() => {
        fetchProduct()
    }, [userInfo])
    useEffect(() => {
        if (bookingListStatus === "success") {
            setProduct(bookingListResponse)
            setLoading(false)
        }
    }, [bookingListStatus])
    
    useEffect(()=>{
        if(paymentStatus === "success" && itemsInfo){
            dispatch(getPaymentDataAction(itemsInfo._id))
            fetchProduct()
        }
    },[paymentStatus])

    const fetchProduct = () => {
        if (!userInfo) return;
        dispatch(getVendorProductPlaceBookingAction(userInfo._id))
        dispatch(getCustomerOrderListAction(userInfo._id))
    }

    const fetUserInfo = async () => {
        setLoading(true)
        const user = await AsyncStorage.getItem('currentUser')
        if (user) {
            setUserInfo(JSON.parse(user))
            setLoading(false)
        }
    }


    const goToCompletedScreen = () => {
        navigation.navigate("SearchScreen");
    };

    const goToLoginScreen = () => {
        navigation.navigate("LoginScreen")
    };
    const goToHome = () => {
        navigation.navigate("HomeScreen")
    };

    const handleGetOrderStatus = ({
        findBookingCode,
        status,
        itemsInfo
    }) => {
        setStatus(status)
        setfindBookingCode(findBookingCode)
        setOpenStatus(true)
        setItemInfo(itemsInfo)
        if(findBookingCode === "2" && itemsInfo){
            dispatch(getPaymentDataAction(itemsInfo._id))
        }
    }

    const RenderProducts = ({ itemsInfo, identifier }) => {
        const findProdduct = product.length > 0 ? product.find((i) => i._id === itemsInfo.productRef) : null
        const metaData = findProdduct && findProdduct.hasOwnProperty('metaData') ? JSON.parse(findProdduct.metaData) : null;
        const images = metaData && metaData.hasOwnProperty('images') ? JSON.parse(metaData.images) : []
        const findBookingCode = itemsInfo && itemsInfo.hasOwnProperty('bookingStatus') ? itemsInfo.bookingStatus : null
        const status = findBookingCode && bookingStatus(findBookingCode)
        if(!findProdduct) return null
        return (
            <View style={styles.header_container} key={identifier}>
                <ImageSlider
                    images={images}
                />
                <View>
                    <Text style={[styles.title, { textAlign: "center", color: colors.color_primary }]}>
                        {itemsInfo?.productTitle || "Booking Summary"}
                    </Text>

                    <View
                        style={{
                            width: "100%",
                            height: 1,
                            backgroundColor: colors.color_secondary,
                            marginVertical: 8,
                        }}
                    />
                    <Button
                        text={"Check Status"}
                        onPress={() => handleGetOrderStatus({
                            findBookingCode,
                            status,
                            itemsInfo
                        })}
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.out_container}>
            <ScrollView
                nestedScrollEnabled={true}
                ref={scrollViewRef}
                style={styles.container}
                onContentSizeChange={(contentWidth, contentHeight) => {
                    if (!loading && scrollViewRef.current) {
                        scrollViewRef.current.scrollToEnd({ animated: true });
                    }
                }}
            >
                {
                    orderList && orderList.length > 0 ?
                    orderList.map((item, index) => (
                        <RenderProducts
                            itemsInfo={item}
                            key={index}
                            identifier={`${item._id}+${index}`}
                        />
                    )) : orderList.length === 0 && (
                        <View style={{
                            height:"100%",
                            justifyContent:'center',
                            alignItems:'center',
                            marginTop:50,
                            gap:30
                        }}>
                            <Text style={[styles.about,{color:colors.color_secondary,fontWeight:'bold'}]}>
                                Order Booking List Empty!
                            </Text>
                            <Button
                               text={"Click Hero To Select Property"}
                               onPress={goToHome}
                            />
                        </View>
                    )
                }
            </ScrollView>
            <PopoverModal
                title={"Property Booking Status"}
                visible={openStatus}
                children={
                    <View style={{ maxHeight: 400 }}>
                        <Text style={[styles.subTitle, { textAlign: 'center' }]}>Booking Current Status: {
                            status && status}</Text>
                        {
                            findBookingCode && findBookingCode === "2" && (
                                <>
                                    <Text style={[styles.desc, { color: colors.color_secondary }]}>
                                        To ensure the smooth operation, maintenance, and continuous improvement of our platform, we charge a small platform fee on each booking. This fee helps us cover essential services including:
                                    </Text>
                                    <ItemList
                                        data={
                                            [
                                                "Secure payment processing",
                                                "24/7 customer support",
                                                "Listing verification and moderation",
                                                "Regular platform updates and enhancements",
                                                "Hosting and infrastructure costs"
                                            ]
                                        }
                                        renderItem={({ item, index }) => {
                                            return (
                                                <View style={{
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    gap: 4
                                                }} key={index}>
                                                    <Text style={[styles.desc, { color: colors.color_secondary }]}>{index}.</Text>
                                                    <Text style={[styles.desc, { color: colors.color_secondary }]}>{item}</Text>
                                                </View>
                                            )
                                        }}
                                    />
                                    <Text style={[styles.desc, { color: colors.color_secondary }]}>
                                        Your contribution through this fee helps us create a safe, seamless, and efficient experience for both renters and owners.
                                    </Text>
                                </>
                            )
                        }
                        {
                            findBookingCode && findBookingCode === "2" && (
                                <Button
                                    text={"Pay Now Rs. 100"}
                                    onPress={() => {
                                        setOpenPayment(true)
                                    }}
                                />
                            )
                        }
                    </View>
                }
                onClose={() => {
                    setOpenStatus(false)
                    dispatch(cleanUpOrderStatusAction())
                    setOpenPayment(false)
                }}
            />
            {
                itemsInfo && userInfo && openPayment && (
                    <Modal visible={openPayment} animationType='slide' >
                        <RazorpayWeb
                            amount={10000}
                            onPaymentSuccess={(e) => {
                                const data = {
                                    orderRef: itemsInfo._id,
                                    customerRef: itemsInfo.customerRef,
                                    productRef: itemsInfo.productRef,
                                    paymentId: e.razorpay_payment_id,
                                    paymentStatus: "success",
                                    numberOfAttep: 1
                                }
                                showTopMessage("Payment successfull","success")
                                dispatch(paymentAction(data))
                                setOpenPayment(false)
                                registerForPushNotificationAsync().then((token)=>{
                                    const notificationData={
                                        userRef:itemsInfo.vendorRef,
                                        token:token,
                                        message:"Platform payment done successfully!",
                                        title:"Platform Payment Alert",
                                        redirectLink:""
                                    }
                                    dispatch(createNotificationAction(notificationData))
                                }).catch((err)=>{
                                    console.log("err===>",err)
                                })
                            }}
                            onPaymentFailed={(e) => {
                                setOpenPayment(false)
                                if (e.status === "dismissed") {
                                    showTopMessage(e.message, "info")
                                }
                                if (e.status === "failed") {
                                    showTopMessage(e.description || e.error.description, "danger")
                                }
                            }}
                            customerData={{
                                name: userInfo.userName,
                                email: userInfo.userEmail,
                                phone: userInfo.userContactNumber,
                                productId: itemsInfo.productRef,
                                orderId: itemsInfo._id
                            }}
                        />
                    </Modal>
                )
            }
            {
                (
                    loading ||
                    bookingListStatus === "started" ||
                    customerOrderListStatus === "started"
                    // orderStatus === "started"
                ) && (
                    <Loader />
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    out_container: { flex: 1 },
    container: {
        flexGrow: 1,
        // marginTop: 4,
        paddingHorizontal: 24,
        marginBottom: 20
    },
    header_container: {
        flexDirection: "column",
        backgroundColor: colors.color_white,
        marginTop: 36,
        padding: 16,
        borderRadius: 20,
    },

    calendar_container: {
        padding: 16,
        borderRadius: 20,
        marginBottom: 12,
        justifyContent: "center",
    },

    image_container: {
        marginRight: 16,
        borderRadius: 50,
        overflow: "hidden",
        width: 100,
        height: 100,
    },
    title_container: {
        flex: 1,
    },
    location_container: { flexDirection: "row", paddingVertical: 8 },
    about_container: {
        flex: 1,
        justifyContent: "space-evenly",
    },
    text_container: {
        flex: 1,
        flexDirection: "row",
    },
    time_container: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 16,
        backgroundColor: colors.color_white,
        borderRadius: 20,
        justifyContent: "space-between",
    },
    bottom_container: {
        flex: 1,
        marginBottom: 24,
    },
    button_container: {
        flexDirection: "row",
        marginBottom: 126,
        paddingHorizontal: 24,
    },
    about: {
        fontSize: 20,
        //fontFamily: "Mulish-Light",
    },

    title: {
        fontSize: 24,
        //fontFamily: "Mulish-Medium",
    },
    subTitle: {
        fontSize: 18,
        paddingVertical: 16,
    },
    desc: {
        fontSize: 14,
        //fontFamily: "Mulish-Light",
    },
    location: {
        fontSize: 16,
        //fontFamily: "Mulish-Light",
        flex: 1,
        color: colors.color_primary,
        justifyContent: "center",
    },
});
