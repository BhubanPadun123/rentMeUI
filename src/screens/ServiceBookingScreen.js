import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    Alert,
    ActivityIndicator,
    Modal
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
import {platformFeeTermAndConfition} from "../utils/utils"

export default function ServiceBookingScreen({ route, navigation }) {
    const { item } = route.params;
    const serviceId = item.id;
    const scrollViewRef = useRef(null);
    var userData = {}

    const [loading, setLoading] = useState(true);
    const [bookingRef, setBookingRef] = useState([])
    const [product, setProduct] = useState([])
    const [openPayment, setOpenPayment] = useState(false)
    const [userInfo,setUserInfo] = useState(null)

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        const fetchCustomerBookingData = async () => {
            if (!user) return
            setLoading(true)
            getCustomerBookingList(user.uid).then((res) => {
                if (Array.isArray(res) && res.length > 0) {
                    console.log(res)
                    const ids = []
                    res.map((item) => {
                        if (item.productRef) {
                            !ids.includes(item.productRef) && ids.push(item.productRef)
                        }
                    })
                    if (ids.length > 0) {
                        getProductByIds(ids).then((result) => {
                            setTimeout(() => {
                                setLoading(false)
                                setBookingRef(res)
                                setProduct(result)
                            }, 5000)
                        }).catch((error) => {
                            console.log(error)
                            showTopMessage("Error while fetching the user booking list", "danger")
                            setTimeout(() => {
                                setLoading(false)
                            }, 5000)
                        })
                    }
                }
            }).catch((err) => {
                console.log(err)
                showTopMessage("Error while fetching the user booking list", "danger")
                setTimeout(() => {
                    setLoading(false)
                }, 5000)
            })
        }
        fetchCustomerBookingData()
        fetUserInfo()
    }, [])

    const fetUserInfo=()=>{
        setLoading(true)
        getUserInfo().then((res)=>{
            console.log(res)
            setUserInfo(res)
            setLoading(false)
        }).catch((err)=>{
            console.log(err)
            setLoading(false)
            setUserInfo(null)
        })
    }


    const goToCompletedScreen = () => {
        navigation.navigate("SearchScreen");
    };

    const goToLoginScreen = () => {
        navigation.navigate("LoginScreen");
    };

    const RenderProducts = ({ itemsInfo,identifier }) => {
        const metaData = itemsInfo && itemsInfo.hasOwnProperty('metaData') ? JSON.parse(itemsInfo.metaData) : null;
        const images = metaData && metaData.hasOwnProperty('images') ? JSON.parse(metaData.images) : []
        const findBookingCode = itemsInfo && itemsInfo.id && bookingRef.length > 0 && bookingRef.find((item) => item.productRef === itemsInfo.id)
        const status = findBookingCode && bookingStatus(findBookingCode.bookingStatus)
        return (
            <View style={styles.header_container} key={identifier}>
                <ImageSlider
                    images={images}
                />
                <View>
                    <Text style={[styles.title, { textAlign: "center", color: colors.color_primary }]}>
                        {itemsInfo?.title || "Booking Summary"}
                    </Text>

                    <View
                        style={{
                            width: "100%",
                            height: 1,
                            backgroundColor: colors.color_secondary,
                            marginVertical: 8,
                        }}
                    />
                    <Text style={[styles.desc, { color: colors.color_secondary }]}>
                        Current Status: <Text style={{ fontWeight: 'bold' }}>{status}</Text>
                    </Text>

                    {
                        findBookingCode && findBookingCode.bookingStatus === "2" && (
                            <>
                                <Text style={[styles.desc, { color: colors.color_secondary, marginVertical: 8 }]}>
                                    To confirm your booking, please proceed with the payment.
                                </Text>
                                <Text style={[styles.desc,{color:colors.color_secondary,fontSize:18,fontWeight:'bold'}]}>Term & Condition</Text>
                                <Text style={[styles.calendar_container,{color:colors.color_secondary}]}>{platformFeeTermAndConfition}</Text>
                                <Button
                                    text={"Pay Now Rs:100"}
                                    onPress={() => {
                                        if(!userInfo || !user) return
                                        const userData = {
                                            name:userInfo.firstName+" "+userInfo.lastName,
                                            email:user.email,
                                            profileUrl:user.photoURL,
                                            phone:userInfo.phoneNumber,
                                            productId:itemsInfo.id,
                                            orderId:findBookingCode.orderId
                                        }
                                        setOpenPayment(true)
                                        setUserInfo(userData)
                                    }}
                                />
                            </>
                        )
                    }
                </View>
                <Modal visible={openPayment} animationType='slide' >
                    <RazorpayWeb
                        amount={10000}
                        onPaymentSuccess={(e) => {
                            const orderId = findBookingCode.orderId
                            const status = "4"
                            updateBooking(orderId,status,e.razorpay_payment_id).then((res)=>{
                                setOpenPayment(false),
                                showTopMessage("Payment Completed successfully!","success")
                            })
                        }}
                        onPaymentFailed={(e)=>{
                            setOpenPayment(false)
                            if(e.status === "dismissed"){
                                showTopMessage(e.message,"info")
                            }
                            if(e.status === "failed"){
                                showTopMessage(e.description,"danger")
                            }
                        }}
                        customerData={userInfo}
                    />
                </Modal>
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
                    product && product.length > 0 &&
                    product.map((item, index) => (
                        <RenderProducts
                            itemsInfo={item}
                            key={index}
                            identifier = {`${item.title}+${index}`}
                        />
                    ))
                }
            </ScrollView>
            {
                loading && (
                    <Loader />
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    out_container: { flex: 1,marginBottom:100 },
    container: {
        flexGrow: 1,
        marginTop: 48,
        paddingHorizontal: 24,
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
