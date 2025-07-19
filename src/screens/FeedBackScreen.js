import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    SafeAreaView,
    Platform
} from "react-native";
import InputBar from "../components/InputBar";
import { colors, sizes } from "../styles/Theme";
import Loader from "../components/Loader";
import { showTopMessage } from "../utils/ErrorHandler";
import {
    getVendorProductPlaceBookingAction,
    getVendorOrderListAction,
    updateOrderStatusAction,
    cleanUpOrderStatusAction,
    getSingleProductAction,
    createNotificationAction
} from "../Redux/action/product";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PopoverModal from "../components/PopOver";
import DropdownSelect from "../components/SingleSelect";
import ImageSlider from "../components/ImagesViewer";
import { bookingStatus } from "../utils/utils";
import { generateRandomId } from "../utils/RandomId";
import * as Notifications from "expo-notifications";
import { connect } from "react-redux";

const { height, width } = Dimensions.get("window");
import {
    Card,
    Tab,
    ListItem,
    Button
} from "@rneui/themed"

class FeedBackScreen extends Component {
    state = {
        user: null,
        loading: true,
        product: [],
        orderList: [],
        openPopOver: false,
        selectedProduct: null,
        tempStatus: "",
        status: null,
        selectPId: null,
        notification: null,
        channels: null,
        filterCode: 1,
        productId: null,
        confirmCode:null,
        confirmStatus:""
    };

    componentDidMount() {
        this.initNotifications();
        this.fetchUserData();
    }
    componentDidUpdate(nextProps) {
        if (this.props.orderListStatus === "success" && this.props.orderListStatus != nextProps.orderListStatus) {
            this.setState({
                orderList: this.props.orderListData,
                loading: false
            })
        }
        if (this.props.bookingListStatus === "success" && this.props.bookingListStatus != nextProps.bookingListStatus) {
            this.setState({
                product: this.props.bookingListResponse,
                loading: false
            })
        }
        if (this.props.feedBackBookingStatus === "started" && this.props.feedBackBookingStatus != nextProps.feedBackBookingStatus) {
            this.setState({
                loading: true
            })
        }
        if (this.props.feedBackBookingStatus === "success" && this.props.feedBackBookingStatus != nextProps.feedBackBookingStatus) {
            showTopMessage("Status updated successfully!", "success");
            this.props.cleanUpOrderStatusAction();
            this.fetchUserData()
            setTimeout(() => this.setState({ loading: false, openPopOver: false }), 5000);
        }
        if(this.props.singleProductStatus === "started" && this.props.singleProductStatus != nextProps.singleProductStatus){
            this.setState({
                loading:true
            })
        }
        if(this.props.singleProductStatus === "success" && this.props.singleProductStatus != nextProps.singleProductStatus){
            this.setState({
                loading:false
            })
        }
    }

    componentWillUnmount() {
        this.notificationListener && this.notificationListener.remove();
        this.notificationResponseListener && this.notificationResponseListener.remove();
        this.setState({
            orderList: [],
            product: [],
            loading: true,
        })
    }

    initNotifications = () => {
        if (Platform.OS === "android") {
            Notifications.getNotificationChannelsAsync().then((channels) =>
                this.setState({ channels: channels ?? [] })
            );
        }
        this.notificationListener = Notifications.addNotificationReceivedListener((n) =>
            this.setState({ notification: n })
        );
        this.notificationResponseListener = Notifications.addNotificationResponseReceivedListener((_) => {
            // handle response if needed
        });
    };

    fetchUserData = async () => {
        const data = await AsyncStorage.getItem("currentUser");
        if (data) {
            const user = JSON.parse(data);
            await this.props.getVendorProductPlaceBookingAction(user._id);
            await this.props.getVendorOrderListAction(user._id);
        } else {
            this.props.navigation.navigate("Profile", {
                screen: "LoginScreen"
            });
        }
    };

    registerForPushNotificationAsync = async () => {
        let { status } = await Notifications.getPermissionsAsync();
        if (status !== "granted") {
            const { status: newStatus } = await Notifications.requestPermissionsAsync();
            status = newStatus;
        }
        if (status !== "granted") {
            alert("Permission not granted!");
            return;
        }
        const token = await Notifications.getExpoPushTokenAsync();
        return token.data;
    };

    onSelectProduct = (orderId, productId) => {
        this.setState({ selectedProduct: orderId, openPopOver: true });
        if (productId) {
            this.props.getSingleProductAction(productId);
            this.setState({ selectPId: productId });
        }
    };

    updateStatus = async () => {
        const { selectedProduct, confirmCode, selectPId, orderList } = this.state;
        const { singleProductStatus, singleProductResponse } = this.props;

        if (!confirmCode || !selectedProduct || !selectPId) return;

        if (singleProductStatus === "success" && singleProductResponse?.total !== undefined) {
            const findOrder = orderList.find((i) => i._id === selectedProduct);
            if (!findOrder) {
                showTopMessage("Property does not exist with us", "info");
                return;
            }

            const total = Number(singleProductResponse.total);
            const newTotal = total > 0 && findOrder.bookingStatus === "1" ? total - 1 : 0;
            const metaData = { ...singleProductResponse, total: newTotal };

            await this.props.updateOrderStatusAction(
                selectedProduct,
                confirmCode === "3" ? "3" : confirmCode,
                selectPId,
                JSON.stringify(metaData)
            );

            if (confirmCode === "2") {
                this.registerForPushNotificationAsync()
                    .then((token) => {
                        this.props.createNotificationAction({
                            userRef: findOrder.vendorRef,
                            token,
                            message: "Booking confirmed by property owner",
                            title: "Booking confirmation alert",
                            redirectLink: "ServiceBookingScreen",
                        });
                    })
                    .catch(console.error);
            }
            this.setState({
                loading: true
            })
        } else {
            showTopMessage("Error while updating", "danger");
        }
    };

    renderProduct = ({ item }) => {
        const { product, orderList } = this.state;
        const productId = item.productRef;
        const bookingStatusCode = item.bookingStatus;
        const statusLabel = bookingStatus(bookingStatusCode);
        const findProduct = product.find((i) => i._id === productId);
        const images = findProduct && JSON.parse(JSON.parse(findProduct.metaData).images) || [];
        const customer = item.bookingDate ? JSON.parse(item.bookingDate) : null;
        const custMeta = customer?.metaData ? JSON.parse(customer.metaData) : null;

        if (!findProduct || (bookingStatusCode != this.state.filterCode && this.state.filterCode > 0)) return null;

        return (
            <Card key={generateRandomId()}>
                <ImageSlider images={images} />
                <Card.Title>{findProduct.productTitle}</Card.Title >
                <Card.Divider />
                {statusLabel && <Card.FeaturedSubtitle style={{ color: colors.color_primary }}>{`Confirmation status(${statusLabel})`}</Card.FeaturedSubtitle>}
                {customer && (
                    <ListItem.Accordion
                        content={
                            <ListItem.Content>
                                <ListItem.Title>Customer Bio-Data</ListItem.Title>
                                <ListItem.Subtitle>Tap to expand</ListItem.Subtitle>
                            </ListItem.Content>
                        }
                        isExpanded={this.state.productId == findProduct._id}
                        onPress={() =>{
                            this.setState({ 
                                productId: this.state.productId ? null : productId 
                            },()=>{
                                this.onSelectProduct(item._id, findProduct._id)
                            })
                        }}
                    >
                        <Text style={styles.title}>Customer Bio‑Data</Text>
                        <Text style={styles.info}>Name: {customer.userName}</Text>
                        <Text style={styles.info}>Phone: {customer.userContactNumber}</Text>
                        <Text style={styles.info}>Email: {customer.userEmail}</Text>
                        {custMeta && (
                            <Text style={styles.info}>
                                Address: {[
                                    custMeta.state,
                                    custMeta.district,
                                    custMeta.pinCode,
                                    custMeta.town,
                                    custMeta.localAddress,
                                ]
                                    .filter(Boolean)
                                    .join(", ")}
                            </Text>
                        )}
                        {bookingStatusCode === "1" && (
                            <View style={styles.buttonWrapper}>
                                <ListItem bottomDivider >
                                    <ListItem.CheckBox
                                        iconType="material-community"
                                        checkedIcon="checkbox-marked"
                                        uncheckedIcon="checkbox-blank-outline"
                                        checked={this.state.confirmStatus === "confirm"}
                                        onPress={()=>{
                                            this.setState({
                                                confirmCode:2,
                                                confirmStatus:"confirm"
                                            })
                                        }}
                                    />
                                    <Text style={{color:colors.color_primary}}>Confirm</Text>
                                </ListItem>
                                <ListItem bottomDivider >
                                    <ListItem.CheckBox
                                        iconType="material-community"
                                        checkedIcon="checkbox-marked"
                                        uncheckedIcon="checkbox-blank-outline"
                                        checked={this.state.confirmStatus === "rejected"}
                                        onPress={()=>{
                                            this.setState({
                                                confirmCode:3,
                                                confirmStatus:"rejected"
                                            })
                                        }}
                                    />
                                    <Text style={{color:colors.color_primary}}>Rejected</Text>
                                </ListItem>
                                <Button
                                    title="Update Status"
                                    type='outline'
                                    onPress={this.updateStatus}
                                />
                            </View>
                        )}
                    </ListItem.Accordion>
                )}
            </Card>
        );
    };

    render() {
        const { product, orderList, openPopOver, loading, tempStatus, status } = this.state;
        return (
            <SafeAreaView style={styles.container}>
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
                        dense={true}
                        titleStyle={{
                            fontSize: 8,
                            padding: 0,
                            margin: 0
                        }}
                    />
                    <Tab.Item
                        title={"Pending"}
                        dense={true}
                        titleStyle={{
                            fontSize: 8,
                            padding: 0,
                            margin: 0
                        }}
                    />
                    <Tab.Item
                        title={"Confirmed"}
                        dense={true}
                        titleStyle={{
                            fontSize: 8,
                            padding: 0,
                            margin: 0
                        }}
                    />
                    <Tab.Item
                        title={"Rejected"}
                        dense={true}
                        titleStyle={{
                            fontSize: 8,
                            padding: 0,
                            margin: 0
                        }}
                    />
                </Tab>
                {orderList.length > 0 ? (
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={orderList}
                        keyExtractor={(item) => item._id + generateRandomId()}
                        renderItem={this.renderProduct}
                    />
                ) : (
                    <View style={styles.emptyContainer}>
                        <Text style={{
                            fontSize: 16,
                            color: colors.color_secondary
                        }}>
                            No one is booking your property yet!
                        </Text>
                    </View>
                )}
                {loading && <Loader />}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    banner: {
        textAlign: "center",
        fontSize: 20,
        backgroundColor: colors.color_secondary,
        fontWeight: "bold",
        paddingVertical: 20,
        color: colors.color_white,
    },
    emptyContainer: { justifyContent: "center", alignItems: "center", marginTop: 50 },
    emphasis: { color: colors.color_secondary },
    productCard: {
        borderRadius: 10,
        borderColor: colors.color_primary,
        borderWidth: 2,
        marginHorizontal: 8,
        marginVertical: 4,
        overflow: "hidden",
    },
    title: {
        color: colors.color_primary,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 4,
    },
    divider: { height: 1, backgroundColor: colors.color_secondary },
    customerContainer: { backgroundColor: colors.color_light_gray, padding: 4 },
    info: { fontSize: 14, color: colors.color_secondary, paddingLeft: 4 },
    buttonWrapper: { padding: 8, alignItems: "center" },
    popoverContent: { maxHeight: 140, justifyContent: "center", padding: 8 },
});

const mapStateToProps = (state) => {
    return {
        bookingListStatus: state.product.bookingListStatus,
        bookingListResponse: state.product.bookingListResponse,
        orderListStatus: state.product.orderListStatus,
        orderListData: state.product.orderListData,
        feedBackBookingStatus: state.product.feedBackBookingStatus,
        feedBackBookingError: state.product.feedBackBookingError,
        feedBackBookingResponse: state.product.feedBackBookingResponse,
        updateOrderStatus: state.product.updateOrderStatus,
        updateOrderStatusResponse: state.product.updateOrderStatusResponse,
        singleProductStatus: state.product.singleProductStatus,
        singleProductResponse: state.product.singleProductResponse,
    }
};

const mapDispatchToProps = {
    getVendorProductPlaceBookingAction,
    getVendorOrderListAction,
    updateOrderStatusAction,
    cleanUpOrderStatusAction,
    getSingleProductAction,
    createNotificationAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedBackScreen);
