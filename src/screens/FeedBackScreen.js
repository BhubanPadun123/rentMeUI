import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, Image, SafeAreaView } from "react-native";
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

const { height, width } = Dimensions.get('window')

export default function FeedBackScreen({ navigation }) {
    const [user, setUser] = React.useState(null)
    const [loading, setLoading] = useState(true)
    const [orderRef, setOrderRef] = useState([])
    const [product, setProduct] = useState([])
    const [customer, setCustomer] = useState([])
    const [status, setStatus] = useState(null)

    function fetchUserData() {
        getUser().then((res) => {
            setUser(res)
            if (res.uid) {
                getVendorProducts(res.uid).then((result) => {
                    setOrderRef(result)
                    if (result && result.length > 0 && Array.isArray(result)) {
                        const productIds = []
                        const customerIds = []
                        result.map((item) => {
                            productIds.push(item.productRef)
                            customerIds.push(item.customerRef)
                        })
                        if (productIds.length > 0) {
                            getProductByIds(productIds).then((pro) => {
                                setProduct(pro)
                                setLoading(false)
                            }).catch((err) => {
                                console.log(err)
                                showTopMessage("Not able to fetch the product list.please refresh the app", "info")
                                setLoading(false)
                            })
                        }
                        // if(customerIds.length > 0){
                        //     setLoading(true)
                        //     getUserListForProductOrder(customerIds).then((result)=>{
                        //         console.log(result)
                        //         setCustomer(result)
                        //         setLoading(false)
                        //     }).catch((error)=>{
                        //         console.log(error)
                        //         showTopMessage("Not able to fetch the customer list.please refresh the app","info")
                        //         setLoading(false)
                        //     })
                        // }
                    }
                }).catch((err) => {
                    showTopMessage("Not able to fetch the product list.please refresh the app", "info")
                    setLoading(false)
                })
            }
        }).catch((err) => {
            showTopMessage("User does not login yet!", "info")
            setLoading(false)
            gotToLogin()
        })
    }

    function gotToLogin() {
        navigation.navigate("LoginScreen")
    }
    React.useEffect(() => {
        fetchUserData()
    }, [])
    const updateStatus = async (orderId, productRef) => {
        const findAllOrder = await orderRef.filter((item) => item.productRef === productRef)
        const statusCode = []
        findAllOrder && findAllOrder.length > 0 && findAllOrder.map((i) => statusCode.push(i.bookingStatus))
        if (statusCode.includes(status) && status == "2") {
            showTopMessage("You are already confirmed order for other customer in this property", "info")
            return
        }
        setLoading(true)
        updateBooking(orderId, status).then((res) => {
            showTopMessage(res.message, "success")
            fetchUserData()
        }).catch((err) => {
            setLoading(false)
            showTopMessage(err.message ? err.message : "Error while update the order status", "danger")
        })
    }
    const RenderProduct = ({ item }) => {
        const metaData = item && item.hasOwnProperty('metaData') ? JSON.parse(item.metaData) : null
        const images = metaData && metaData.hasOwnProperty('images') ? JSON.parse(metaData.images) : []
        const id = item && item.hasOwnProperty('id') ? item.id : null
        const findCustomer = orderRef && orderRef.length > 0 && orderRef.find((item) => item.productRef === id)
        const customerInfo = findCustomer && findCustomer.hasOwnProperty('customer') ? JSON.parse(findCustomer.customer) : null
        const orderStatus = findCustomer && findCustomer.bookingStatus ? findCustomer.bookingStatus : null
        const currentStaus = orderStatus ? bookingStatus(orderStatus) : null
        return (
            <View key={customerInfo.orderRef + generateRandomId()} style={{
                width: sizes.width - 20,
                borderRadius: 10,
                borderColor: colors.color_primary,
                borderWidth: 2,
                overflow: 'hidden',
                marginVertical: 8
            }}>
                <ImageSlider
                    images={images}
                />
                <Text style={{
                    color: colors.color_primary,
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>{item.title}</Text>
                <View
                    style={{
                        width: "100%",
                        height: 1,
                        backgroundColor: colors.color_secondary
                    }}
                />
                <Text style={{
                    textAlign: 'center',
                    fontSize: 16,
                    color: colors.color_secondary,
                    backgroundColor: colors.color_light_gray,
                    marginHorizontal: 4,
                    borderRadius: 4
                }}>Current Order status:{currentStaus}</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 12,
                        color: colors.color_secondary
                    }}>Customer Info</Text>
                    <Image
                        source={Icons.info}
                        style={{
                            height: 20,
                            width: 20
                        }}
                    />
                </View>
                <View style={[styles.textContainer]}>
                    <Text style={[styles.text]}>Customer Name : {customerInfo.hasOwnProperty('firstName') && customerInfo.hasOwnProperty('lastName') && `${customerInfo.firstName} ${customerInfo.lastName}`}</Text>
                    <Text style={[styles.text]}>Phone Number : {customerInfo.hasOwnProperty('phoneNumber') && customerInfo.phoneNumber}</Text>
                    <Text style={styles.text} >Address Details : {
                        customerInfo.hasOwnProperty('state') &&
                        customerInfo.hasOwnProperty('district') &&
                        customerInfo.hasOwnProperty('town') &&
                        customerInfo.hasOwnProperty('pinCode') &&
                        customerInfo.hasOwnProperty('localAddress') &&
                        `${customerInfo.state},${customerInfo.district},${customerInfo.pinCode},${customerInfo.town},${customerInfo.localAddress}`
                    }</Text>
                </View>
                {
                    orderStatus != "4" && (
                        <View style={styles.textContainer}>
                            <DropdownSelect
                                options={[
                                    { value: '2', label: "Booking Confirm" },
                                    { value: '3', label: "Booking Denial" }
                                ]}
                                placeholder="Select Option"
                                selectedValue={status}
                                onValueChange={(e) => {
                                    setStatus(e)
                                }}
                            />
                            <Button
                                text={"Update"}
                                onPress={() => {
                                    if (!id) return
                                    updateStatus(findCustomer.orderId, id)
                                }}
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
                product && product.length > 0 &&
                <FlatList
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={sizes.width}
                    decelerationRate={'normal'}
                    data={product}
                    keyExtractor={(catagory) => catagory.id + generateRandomId()}
                    renderItem={RenderProduct}
                />
            }

            {
                loading && (
                    <Loader />
                )
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:100,
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
