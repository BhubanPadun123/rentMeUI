import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, ScrollView, Share, TouchableOpacity,Platform } from "react-native";
import Button from "../components/Button/Button";
import { colors, sizes } from "../styles/Theme";
import userImages from "../utils/UserImageUtils";
import ImageSlider from "../components/ImagesViewer";
import Icons from "../utils/Icons";
import tabsImages from "../utils/TabsImages";
import { formatDate } from "../utils/utils";
import { generateRandomId } from "../utils/RandomId";
import {
    getAuth
} from "firebase/auth"
import app from "../../firebaseConfig";
import { showTopMessage } from "../utils/ErrorHandler";
import { handleBokingApi } from "../APIs/booking";
import { getUserInfo } from "../APIs/userApi";
import ItemList from "../components/ListItems";
import {useDispatch,useSelector} from "react-redux"
import { bookingProductAction,clearBookingAction, createNotificationAction } from "../Redux/action/product";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/Loader";
import { configureNotifications } from "../utils/NotificationService";
import * as Notifications from 'expo-notifications';


export default function ServiceDetailScreen({ route, navigation }) {
    const dispatch = useDispatch()
    const [notification,setNotification] = useState(null)
    const [userInfo,setUserInfo] = useState(null)
    const [channels, setChannels] = useState(null)
    const { item } = route.params;
    const metaData = item && item.hasOwnProperty('metaData') ? JSON.parse(item.metaData) : null
    const images = metaData && metaData.hasOwnProperty('images') ? JSON.parse(metaData.images) : null
    const address = metaData && metaData.hasOwnProperty('addressInfo') ? metaData.addressInfo : null
    const geoLocation = metaData && metaData.hasOwnProperty('geoLocation') ? metaData.geoLocation : null
    const propertyType = item && item.hasOwnProperty('productType') ? item.productType : null
    const total = metaData && metaData.hasOwnProperty('total') ? metaData.total : null
    const createdAt = item && item.hasOwnProperty('postAt') ? item.postAt : ""
    const availableItems = metaData && metaData.hasOwnProperty('availableItems') ? metaData.availableItems : []
    
    
    const {
        bookingProductStatus,
        bookingProductError,
        bookingProductResponse,
        createNotificationError,
        createNotificationResponse,
        createNotificationStatus
    } = useSelector((state)=> state.product)


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
    useEffect(()=>{
        if(bookingProductStatus === "success"){
            
            showTopMessage("Thank you for booking property with us.Your booking is successfully place in booking","success")
            dispatch(createNotificationAction())
            goToBookingScreen()
        }
        if(bookingProductStatus === "started"){

        }
        if(bookingProductStatus === "failed"){
            showTopMessage(typeof(bookingProductError) === "string" ? bookingProductError : "Error while booking the Property,Please Try after sometime","danger")
        }
        return()=>{
            dispatch(clearBookingAction())
        }
    },[bookingProductStatus])

    async function registerForPushNotificationAsync(){
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


    const goToBookingScreen = (item) => {
        navigation.navigate("ServiceBookingScreen", { item });
    };
    const goToPropertyLocation = () => {
        // navigation.navigate("PropertyLocationScreen", { geoLocation: geoLocation, title: item && item.productTitle ? item.productTitle : "Demo Place" })
    }
    const goToLoginScreen = () => {
        navigation.navigate("LoginScreen")
    }

    const handlePlaceOrder = async () => {
        const user = await AsyncStorage.getItem('currentUser')
        let cunstomerInfo = null
        if(user){
            cunstomerInfo = JSON.parse(user)
        }
        if (!cunstomerInfo) {
            showTopMessage("User Does not login!", "info")
            setTimeout(() => {
                goToLoginScreen()
            }, 5000)
            return
        }
        const data = {
            vendorRef: item.vendorRef,
            bookingStatus: "1",
            customerRef: cunstomerInfo._id,
            productRef: item._id,
            bookingDate: JSON.stringify(cunstomerInfo)
        }
        let error = false
        Object.entries(data).map((item) => {
            if (!item[1]) {
                showTopMessage(`${item[0]} is data is missing!`, "info")
                error = true
                return
            }
        })
        if(error) return
        await dispatch(bookingProductAction(data))
    }

    function RenderItem({item,index}){
        return (
            <View style={{
                display:"flex",
                flexDirection:'row',
                gap:8
            }}>
                <Text>{index}.</Text>
                <Text>{typeof(item) === "string" && item}</Text>
            </View>
        )
    }

    return (
        <View style={styles.out_container}>
            <ScrollView style={styles.container}>
                <View style={styles.header_container}>
                    <ImageSlider
                        images={images ? images : []}
                    />
                </View>
                {/* Body */}
                <View style={styles.body_container}>
                    <View style={styles.about_container}>
                        <Text style={styles.about}>{item && item.productTitle && item.productTitle}</Text>
                        {
                            createdAt && (
                                <Text style={[styles.desc, { padding: 6, fontSize: 14, backgroundColor: colors.color_light_gray, textAlign: 'center', borderRadius: 20 }]}>
                                    Posted At : {formatDate(createdAt).toLowerCase()}
                                </Text>
                            )
                        }
                        <Text style={styles.desc}>{metaData && metaData.description && metaData.description}</Text>
                    </View>
                </View>

                <View style={styles.detail_container}>
                    <View style={styles.detail}>
                        {
                            address && (
                                <>
                                    <Image
                                        source={Icons.info}
                                        style={{ height: 24, width: 24 }}
                                    />
                                    {
                                        propertyType && (
                                            <Text style={[styles.text_content, { fontSize: 14,textAlign:'center' }]} >Property For : {propertyType}</Text>
                                        )
                                    }
                                    <Text style={styles.text_content}>{address.state && address.state}</Text>
                                    <Text style={styles.text_content}>{address.district && address.district}</Text>
                                    <Text style={styles.text_content}>{address.localAdd && address.localAdd}</Text>
                                    <Text style={styles.text_content}>{address.town && address.town}</Text>
                                    <TouchableOpacity onPress={goToPropertyLocation} style={{
                                        backgroundColor: colors.color_gray,
                                        marginVertical: 4,
                                        zIndex: 4,
                                        width: "80%",
                                        alignItems: 'center',
                                        padding: 2,
                                        borderRadius: 10
                                    }}>
                                        <Image
                                            source={tabsImages.Map}
                                            style={{
                                                height: 24,
                                                width: 24
                                            }}
                                        />
                                    </TouchableOpacity>
                                </>
                            )
                        }
                    </View>
                    <View style={[styles.detail, { backgroundColor: item.availableStatus ? "pink" : "yellow" }]}>
                        {
                            metaData && (
                                <>
                                    <Image
                                        source={Icons.info}
                                        style={{ height: 24, width: 24 }}
                                    />
                                    <Text style={[styles.text_content, { fontSize: 14 }]}>{item.availableStatus && item.availableStatus ? "Available" : "Not Available"}</Text>
                                    {
                                        item.availableStatus && item.availableStatus ? (
                                            <Text style={[styles.text_content, { padding: 4 }]}>
                                                This property is currently available for booking. Reserve now to secure your stay before it’s gone. Limited slots may apply, so act quickly to confirm.
                                            </Text>
                                        ) : (
                                            <Text style={[styles.text_content, { padding: 4 }]}>
                                                Sorry, this property is currently not available for booking. Please check back later or explore similar listings nearby for your preferred date range and requirements.
                                            </Text>
                                        )
                                    }
                                </>
                            )
                        }
                    </View>
                </View>
                <View style={[styles.detail_container, { flexDirection: 'column', gap: 4 }]}>
                    {
                        availableItems && Array.isArray(availableItems) && availableItems.length > 0  && (
                            <View style={[styles.detail,{width:"90%"}]}>
                                <Image
                                    source={Icons.info}
                                    style={{ height: 24, width: 24 }}
                                />
                                <Text style={[styles.text_content, { fontSize: 12 }]}>Available Aminities</Text>
                                <ItemList 
                                   data={availableItems}
                                   renderItem={RenderItem}
                                />
                            </View>
                        )
                    }
                </View>

                <View style={[styles.detail_container, { flexDirection: 'column', gap: 4 }]}>
                    {
                        total && (
                            <View style={styles.detail}>
                                <Image
                                    source={Icons.info}
                                    style={{ height: 24, width: 24 }}
                                />
                                <Text style={[styles.text_content, { fontSize: 12 }]}>Total Numer Of Posted Property</Text>
                                <Text style={styles.text_content}>{total}</Text>
                                <Text style={[styles.text_content, { fontSize: 12, padding: 4, color: colors.color_secondary }]}>
                                    This represents the total count of all properties you've submitted for rent.
                                </Text>
                                <Text style={[styles.text_content, { fontSize: 12, padding: 4, color: colors.color_secondary }]}>
                                    4 out of {total} properties booked.
                                </Text>
                            </View>
                        )
                    }
                    <View style={styles.detail}>
                        {
                            metaData && (
                                <>
                                    <Image
                                        source={Icons.info}
                                        style={{ height: 24, width: 24 }}
                                    />
                                    <Text style={[styles.text_content, { fontSize: 12 }]}>Deposit Amount</Text>
                                    <Text style={styles.text_content}>Rs-{metaData.deposite && metaData.deposite} Only</Text>

                                    <Text style={[styles.text_content, { padding: 4 }]}>
                                        The full deposit will be refunded at the time of vacating the property, only if a one-month advance notice is provided.
                                    </Text>

                                    <Text style={[styles.text_content, { padding: 4, color: colors.color_secondary }]}>
                                        ** Vacating the property without any prior notice will lead to a complete forfeiture of the deposit amount. **
                                    </Text>

                                    <Text style={[styles.text_content, { padding: 4, color: colors.color_secondary, marginBottom: 2 }]}>
                                        ** If advance notice of one month is not provided, only 50% of the deposit will be refunded upon exit. **
                                    </Text>
                                </>
                            )
                        }
                    </View>
                    <View style={[styles.detail]}>
                        {
                            metaData && (
                                <>
                                    <Image
                                        source={Icons.info}
                                        style={{ height: 24, width: 24 }}
                                    />
                                    <Text style={[styles.text_content, { fontSize: 12, padding: 4 }]}>Monthly Rent</Text>

                                    <Text style={[styles.text_content, { marginHorizontal: 2 }]}>
                                        Rs - {metaData.rent && metaData.rent} only
                                    </Text>

                                    <Text style={styles.text_content}>
                                        Rent calculation will begin immediately upon relocating to the property.
                                    </Text>

                                    <Text style={[styles.text_content, { marginVertical: 4, paddingHorizontal: 4 }]}>
                                        Rent is expected to be paid monthly on the same date as the onboarding date.
                                    </Text>

                                    <Text style={[styles.text_content, { marginVertical: 4, paddingHorizontal: 4 }]}>
                                        A grace period of up to 5 days is allowed each month for rent payment.
                                    </Text>

                                </>
                            )
                        }
                    </View>
                    <View style={[styles.detail]}>
                        <Image
                            source={Icons.info}
                            style={{ height: 24, width: 24 }}
                        />
                        <Text style={[styles.text_content, { fontSize: 12, padding: 4 }]}>Rules & Regulations</Text>

                        <Text style={[styles.text_content, { marginVertical: 2, paddingHorizontal: 4 }]}>
                            All tenants must maintain cleanliness and hygiene within the premises at all times.
                        </Text>

                        <Text style={[styles.text_content, { marginVertical: 2, paddingHorizontal: 4 }]}>
                            Loud music, parties, or any activity causing disturbance to neighbors is strictly prohibited.
                        </Text>

                        <Text style={[styles.text_content, { marginVertical: 2, paddingHorizontal: 4 }]}>
                            Entry of visitors is allowed until 10:00 PM; overnight stays require prior permission.
                        </Text>

                        <Text style={[styles.text_content, { marginVertical: 2, paddingHorizontal: 4 }]}>
                            Consumption of alcohol, drugs, or any illegal activity inside the property is not allowed and will lead to immediate termination.
                        </Text>

                        <Text style={[styles.text_content, { marginVertical: 2, paddingHorizontal: 4 }]}>
                            Any property damage must be reported immediately and will be chargeable if found intentional or due to negligence.
                        </Text>

                        <Text style={[styles.text_content, { marginVertical: 2, paddingHorizontal: 4 }]}>
                            Pets are not allowed unless explicitly approved in the rental agreement.
                        </Text>

                    </View>
                </View>
                <View style={[styles.button_container,{marginBottom:20,justifyContent:'center',paddingBottom:10}]}>
                    {/* <Button
                        text={"Add To cart"}
                        onPress={() => { }}
                    /> */}
                    <Button
                        text={"Booking"}
                        onPress={handlePlaceOrder}
                    />
                </View>
            </ScrollView>
            {
                bookingProductStatus === "started"||
                createNotificationStatus === "started" && (
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
        paddingHorizontal: 1,
        // marginBottom: 120
    },
    share_container: {
        flex: 1,
        marginTop: 48,
        marginHorizontal: 4,
        flexDirection: "row-reverse",
        alignItems: "center",
    },
    header_container: {
        flexDirection: "row",
        backgroundColor: colors.color_white,
        marginVertical: 10,
        padding: 4,
        borderRadius: 20,

    },
    body_container: {
        flexDirection: "row",
        backgroundColor: colors.color_white,
        marginVertical: 12,
        padding: 16,
        borderRadius: 20,
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
    button_container: {
        flexDirection: "row",
        // marginBottom: 10,
        marginHorizontal: 24,
        gap: 2
    },
    title: {
        fontSize: 24,
        //fontFamily: "Mulish-Medium",
    },
    about: {
        fontSize: 20,
        textAlign:'center',
        paddingVertical:2,
        fontWeight:'bold',
        color:colors.color_primary
        //fontFamily: "Mulish-Light",
    },
    desc: {
        fontSize: 14,
        color: colors.color_primary,
        textAlign: 'center'
    },
    detail_container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 24,
        justifyContent: "space-between",
    },
    skills_container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 16,
        flexWrap: "wrap",
    },
    detail: {
        flex: 1,
        alignItems: "center",
        borderRadius: 20,
        marginHorizontal: 12,
        minHeight: sizes.width / 3,
        maxHeight: "auto",
        justifyContent: "center",
        backgroundColor: colors.color_white,
    },
    detail_text: {
        textAlign: "center",
        fontSize: 20,
        //fontFamily: "Mulish-SemiBold",
        color: colors.color_primary,
    },
    chips: {
        alignSelf: "flex-start",
        //fontFamily: "Mulish-Light",
        color: colors.color_white,
    },
    chip_container: {
        borderRadius: 20,
        backgroundColor: colors.color_primary,
        padding: 12,
        margin: 4,
    },
    location: {
        fontSize: 16,
        //fontFamily: "Mulish-Light",
        flex: 1,
        color: colors.color_primary,
        justifyContent: "center",
    },
    text_content: {
        color: colors.color_primary,
        fontSize: 10
    }
});
