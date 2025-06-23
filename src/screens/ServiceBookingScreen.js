// Converted ServiceBookingScreen into Class Component
import React, { Component, createRef } from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    Alert,
    ActivityIndicator,
    Modal,
    Platform,
    FlatList,
    TouchableOpacity
} from "react-native";
import { colors } from "../styles/Theme";
import { showTopMessage } from "../utils/ErrorHandler";
import Loader from "../components/Loader";
import ImageSlider from "../components/ImagesViewer";
import {
    timeFormate,
    bookingStatus
} from "../utils/utils";
import RazorpayWeb from "../components/Payment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
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
import {
    MaterialIcons
} from "@expo/vector-icons"
import {
    Tab,
    PricingCard,
    Card,
    Button
} from "@rneui/themed"

class ServiceBookingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            bookingRef: [],
            product: [],
            openPayment: false,
            userInfo: null,
            openStatus: false,
            orderList: [],
            findBookingCode: null,
            status: null,
            itemsInfo: null,
            notification: null,
            channel: null,
            filterCode: 2,
            openFilter: false
        };
        this.scrollViewRef = createRef();
    }

    componentDidMount() {
        this.fetUserInfo();
    }
    componentWillUnmount() {
        this.setState({
            loading: true,
            bookingRef: [],
            product: [],
            openPayment: false,
            userInfo: null,
            openStatus: false,
            orderList: [],
            findBookingCode: null,
            status: null,
            itemsInfo: null,
            notification: null,
            channel: null,
            filterCode: 0,
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {
            productListResponse,
            productListStatus,
            productListError
        } = this.props.product
        if (productListStatus === "success") {
            this.setState({
                loading: false,
                product: productListResponse
            });
        }
    }
    componentDidUpdate(prevProps) {
        const { product, customer } = this.props;

        if (customer.customerOrderListStatus === "success" && prevProps.customer.customerOrderListStatus !== "success") {
            this.setState({ orderList: customer.customerOrderListResponse, loading: false });
        }

        if (
            customer.paymentStatus === "success" &&
            this.state.itemsInfo &&
            prevProps.customer.paymentStatus !== "success"
        ) {
            this.props.getPaymentDataAction(this.state.itemsInfo._id);
            this.fetchProduct();
        }
    }

    fetchProduct = () => {
        if (!this.state.userInfo) return;
        this.props.getVendorProductPlaceBookingAction(this.state.userInfo._id);
        this.props.getCustomerOrderListAction(this.state.userInfo._id);
    }

    fetUserInfo = async () => {
        this.setState({ loading: true });
        const user = await AsyncStorage.getItem("currentUser");
        if (user) {
            this.setState({
                userInfo: JSON.parse(user),
                loading: false
            }, () => {
                this.fetchProduct();
            });
        }
    }

    handleGetOrderStatus = ({ findBookingCode, status, itemsInfo }) => {
        this.setState({ findBookingCode, status, itemsInfo, openStatus: true });
        if (findBookingCode === "2" && itemsInfo) {
            this.props.getPaymentDataAction(itemsInfo._id);
        }
    }

    goToCompletedScreen = () => this.props.navigation.navigate("SearchScreen");
    goToLoginScreen = () => this.props.navigation.navigate("LoginScreen");
    goToHome = () => this.props.navigation.navigate("HomeScreen");

    render() {
        const { orderList, product, loading, openStatus, status, findBookingCode, itemsInfo, openPayment, userInfo } = this.state;

        const RenderProducts = ({ item, index }) => {
            const findProdduct = this.state.product.length > 0 ? this.state.product.find((i) => i._id === item.productRef) : null;
            const metaData = findProdduct && findProdduct.hasOwnProperty('metaData') ? JSON.parse(findProdduct.metaData) : null;
            const images = metaData && metaData.hasOwnProperty('images') ? JSON.parse(metaData.images) : [];
            const findBookingCode = item?.bookingStatus
            const status = findBookingCode && bookingStatus(findBookingCode);
            if (!findProdduct || (findBookingCode != this.state.filterCode && this.state.filterCode > 0)) return null;
            
            if (findBookingCode == 2) {
                return (
                    <PricingCard
                        color={colors.color_secondary}
                        title={findProdduct?.productTitle || "Booking Summary"}
                        price="₹99"
                        info={[ 
                            '1) We charge a small platform fee of ₹99 to help us maintain the quality and reliability of our service.', 
                            '2) This fee contributes to secure payment handling, fraud prevention, and transaction verification processes.', 
                            '3) It helps us continuously improve app performance, add new features, and provide a seamless experience.',
                            '4) It supports backend infrastructure, customer support, and platform maintenance.',
                            '5) The ₹99 fee is charged only once per booking or transaction — no hidden costs or recurring charges.',
                            '6) Your contribution allows us to keep the app clean and ad-free for a better user experience.'
                        ]}
                        button={{ title: ' GET STARTED', icon: 'flight-takeoff' }}
                        infoStyle={{
                            fontSize:10,
                            textAlign:'left'
                        }}
                        titleStyle={{
                            fontSize:14,
                            fontWeight:'bold'
                        }}
                        onButtonPress={()=> {
                            this.setState({
                                itemsInfo:item,
                                openPayment:true
                            })
                        }}
                    />
                )
            }else{
                return (
                    <Card  key={index}>
                        <ImageSlider images={images} />
                        <Card.Title>{findProdduct?.productTitle || "Booking Summary"}</Card.Title>
                        <Card.Divider/>
                        <Card.FeaturedSubtitle style={{flexDirection:'column',gap:2,width:"100%"}}>
                            <Card.Title style={{textAlign:'center',fontSize:10,color:colors.color_secondary}}>{`Booking Status (${status})`},</Card.Title>
                            <Card.Title style={{textAlign:'center',fontSize:10,color:colors.color_primary}}>{`Booking Date:${item.createdAt}`}</Card.Title>
                        </Card.FeaturedSubtitle>
                    </Card>
                );
            }
        };

        return (
            <View style={styles.out_container}>
                <View style={{
                    height: 50,
                    backgroundColor: colors.color_light_gray,
                    marginHorizontal: 0,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                }}>
                    <Tab
                        value={this.state.filterCode}
                        onChange={(e) => this.setState({ filterCode: e })}
                        variant="primary"
                        indicatorStyle={{
                            padding: 0,
                            margin: 0,
                        }}
                    >
                        <Tab.Item
                            title={"All"}
                            titleStyle={{
                                fontSize: 8,
                                padding: 0,
                                margin: 0,
                            }}
                            dense={true}
                        />
                        <Tab.Item
                            title={"Pending"}
                            titleStyle={{
                                fontSize: 8,
                                padding: 0,
                                margin: 0,
                            }}
                            dense={true}
                        />
                        <Tab.Item
                            title={"Confirmed"}
                            titleStyle={{
                                fontSize: 8,
                                padding: 0,
                                margin: 0
                            }}
                            dense={true}
                        />
                        <Tab.Item
                            title={"Rejected"}
                            titleStyle={{
                                fontSize: 8,
                                padding: 0,
                                margin: 0
                            }}
                            dense={true}
                        />
                        <Tab.Item
                            title={"Approved"}
                            titleStyle={{
                                fontSize: 8,
                                padding: 0,
                                margin: 0
                            }}
                            dense={true}
                        />
                    </Tab>
                </View>
                {
                    this.state.orderList.length > 0 ? (
                        <FlatList
                            data={this.state.orderList}
                            keyExtractor={(item) => item._id}
                            renderItem={RenderProducts}
                        />
                    ) : (
                        <View style={{ height: "100%", justifyContent: 'center', alignItems: 'center', marginTop: 50, gap: 30 }}>
                            <Text style={[styles.about, { color: colors.color_secondary, fontWeight: 'bold' }]}> Order Booking List Empty! </Text>
                            <Button onPress={this.goToHome} >Click Here To Select Property</Button>
                        </View>
                    )
                }

                <PopoverModal
                    title={"Property Booking Status"}
                    visible={openStatus}
                    children={<View style={{ maxHeight: 400 }}><Text>{status}</Text></View>}
                    onClose={() => {
                        this.setState({ openStatus: false, openPayment: false });
                        this.props.cleanUpOrderStatusAction();
                    }}
                />

                {itemsInfo && userInfo && openPayment && (
                    <Modal visible={openPayment} animationType='slide'>
                        <RazorpayWeb
                            amount={9900}
                            onPaymentSuccess={(e) => {
                                const data = {
                                    orderRef: itemsInfo._id,
                                    customerRef: itemsInfo.customerRef,
                                    productRef: itemsInfo.productRef,
                                    paymentId: e.razorpay_payment_id,
                                    paymentStatus: "success",
                                    numberOfAttep: 1
                                };
                                this.props.paymentAction(data);
                                setTimeout(() => {
                                    showTopMessage("Payment successful", "success");
                                    this.setState({ openPayment: false });
                                }, 1000);
                            }}
                            onPaymentFailed={(e) => {
                                this.setState({ openPayment: false });
                                showTopMessage(e.message || e.description, "danger");
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
                )}

                {loading && (
                    <Loader />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    out_container: { flex: 1 },
    container: { flexGrow: 1 },
    header_container: {
        flexDirection: "column",
        backgroundColor: colors.color_white,
        marginTop: 36,
        padding: 16,
        borderRadius: 20,
    },
    about: { fontSize: 20 },
    title: { fontSize: 24 },
});

const mapStateToProps = (state) => ({
    product: state.product,
    customer: state.customer
});

const mapDispatchToProps = {
    getVendorProductPlaceBookingAction,
    getOrderStatusAction,
    cleanUpOrderStatusAction,
    createNotificationAction,
    getCustomerOrderListAction,
    paymentAction,
    getPaymentDataAction,
    cleanPaymentData
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceBookingScreen);
