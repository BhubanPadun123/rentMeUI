import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Linking
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import {
    getVendorStockAction,
    getAllProductAction,
    getOrderInRangeAction,
} from "../Redux/action/product";
import { getUserAction, clearUserAction } from "../Redux/action/auth";
import Loader from "../components/Loader";
import { colors } from "../styles/Theme";
import TableComponent from "../components/CTable";
import { bookingStatus } from "../utils/utils";
import { ListItem, Card, Button } from "@rneui/themed";
import { Feather } from "@expo/vector-icons";
import { showTopMessage } from "../utils/ErrorHandler";

class Record extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            userInfo: null,
            vendorProduct: [],
            start: 0,
            orderList: [],
            selectedId: null,
            vendorData: null,
            selectedVendorId: null
        };
    }

    componentDidMount() {
        this.fetchUserData();
    }

    componentDidUpdate(prevProps) {
        const { vendorStackStatus, vendorStackResponse, orderInRangeStatus, orderInRangeResponse } = this.props;

        if (
            vendorStackStatus === "success" &&
            prevProps.vendorStackStatus !== vendorStackStatus
        ) {
            this.setState({
                vendorProduct: vendorStackResponse,
                loading: false
            });
        }

        if (
            orderInRangeStatus === "success" &&
            prevProps.orderInRangeStatus !== orderInRangeStatus
        ) {
            this.setState({
                orderList: orderInRangeResponse,
                loading: false
            });
        }
        if (this.props.vendorStackStatus === "started" && this.props.vendorStackStatus != prevProps.vendorStackStatus) {
            this.setState({
                loading: true
            })
        }
        if (this.props.orderInRangeStatus === "started" && this.props.orderInRangeStatus != prevProps.orderInRangeStatus) {
            this.setState({
                loading: true
            })
        }
        if (this.props.getUserStatus === "started" && this.props.getUserStatus != prevProps.getUserStatus) {
            this.setState({
                loading: true
            })
        }
        if (this.props.getUserStatus === "success" && this.props.getUserStatus != prevProps.getUserStatus) {
            this.setState({
                loading: false,
                vendorData: this.props.getUserResponse
            })
        }
        if (this.props.getUserStatus === "failed" && this.props.getUserStatus != prevProps.getUserStatus) {
            this.setState({
                loading: false,
                vendorData: null
            }, () => {
                showTopMessage(this.props.getUserError, "danger")
            })
        }

    }

    fetchUserData = async () => {
        const user = await AsyncStorage.getItem("currentUser");
        if (user) {
            const userData = JSON.parse(user);
            this.setState({ userInfo: userData });

            if (userData._id && userData.userType) {
                if (userData.userType === "owner") {
                    this.props.getVendorStockAction(userData._id);
                }
                if (
                    userData.userType === "supper_admin" || 
                    userData.userType === "admin" ||
                    userData.userType === "stuff"
                ) {
                    await this.props.getOrderInRangeAction(this.state.start, this.state.start + 5);
                }
            }
        }
    };

    handleFetchNext = (start) => {
        if (!start) return;
        const end = start + 5;
        this.props.getOrderInRangeAction(start, end);
        this.setState({ start: end });
    };

    CallOwner = (num) => {
        if (!num) return;
        Linking.openURL(`tel:${num}`).catch(console.log);
    };

    CallCustomer = (num) => {
        if (!num) return;
        Linking.openURL(`tel:${num}`).catch(console.log);
    };

    RenderVendorItem = ({ item }) => {
        const metaData = item?.metaData ? JSON.parse(item.metaData) : null;
        const total = metaData?.total ?? null;

        return (
            <Card>
                <View>
                    <Text style={styles.vendorTitle}>{item?.productTitle}</Text>
                    <Text style={styles.vendorDetail}>
                        Total number of available property for future booking : {total}
                    </Text>
                </View>
            </Card>
        );
    };

    RenderOrder = ({ item, index }) => {
        const bookingDate = item?.bookingDate ? JSON.parse(item.bookingDate) : null;
        const bookingCode = item?.bookingStatus ?? null;
        const status = bookingCode ? bookingStatus(bookingCode) : "";
        const name = bookingDate?.userName ?? "";
        const PhoneNumber = bookingDate?.userContactNumber ?? "";
        const email = bookingDate?.userEmail ?? "";

        if (!bookingDate) return null;

        return (
            <Card>
                <TableComponent
                    headerData={["SL_No", "Name", "PhoneNumber", "Email", "Status"]}
                    rowData={[[index + 1, name, PhoneNumber, email, status]]}
                />
                <Card.FeaturedSubtitle>
                    <View style={{ width: "100%", marginTop: 8, padding: 10, gap: 4 }}>
                        <Button
                            title="Call Customer"
                            icon={<Feather name="phone-call" size={24} color="black" />}
                            type="outline"
                            onPress={() => this.CallCustomer(PhoneNumber)}
                            size="lg"
                        />
                        <ListItem.Accordion
                            content={
                                <ListItem.Content>
                                    <ListItem.Title>Get Owner</ListItem.Title>
                                    <ListItem.Subtitle>Tap to expand</ListItem.Subtitle>
                                </ListItem.Content>
                            }
                            isExpanded={this.state.selectedId === item._id}
                            onPress={() => {
                                this.setState({
                                    selectedId: this.state.selectedId ? "" : item._id,
                                    selectedVendorId: this.state.selectedVendorId ? null : item.vendorRef
                                }, () => {
                                    this.state.selectedVendorId && this.props.getUserAction(this.state.selectedVendorId)
                                    !this.state.selectedVendorId && this.props.clearUserAction()
                                })
                            }}
                        >
                            {
                                this.props.getUserStatus === "success" && this.state.vendorData && (
                                    <Card>
                                        <Card.Title>Vendor Name:- {this.state.vendorData.hasOwnProperty('userName') && this.state.vendorData.userName}</Card.Title>
                                        <Card.Title>Vendor Phone Number:- {this.state.vendorData.hasOwnProperty('userContactNumber') && this.state.vendorData.userContactNumber}</Card.Title>
                                        <Card.Title>Vendor Email Address:- {this.state.vendorData.hasOwnProperty('userEmail') && this.state.vendorData.userEmail}</Card.Title>
                                        <Button
                                            title={"Call Vendor"}
                                            onPress={() => {
                                                const num = this.state.vendorData.hasOwnProperty('userContactNumber') ? this.state.vendorData.userContactNumber : null
                                                this.CallOwner(num)
                                            }}
                                            icon={<Feather name="phone-call" size={24} color="black" />}
                                            type='outline'
                                        />
                                    </Card>
                                )
                            }
                        </ListItem.Accordion>
                    </View>
                </Card.FeaturedSubtitle>
            </Card>
        );
    };

    render() {
        const { vendorProduct, userInfo, orderList, start } = this.state;
        const { vendorStackStatus, orderInRangeStatus, orderInRangeError } = this.props;
        return (
            <View>
                {vendorProduct.length > 0 && userInfo?.userType === "owner" && (
                    <FlatList
                        data={vendorProduct}
                        keyExtractor={(item) => item._id}
                        renderItem={this.RenderVendorItem}
                    />
                )}

                {orderList.length > 0 &&
                    (userInfo?.userType === "supper_admin" || 
                        userInfo?.userType === "admin" ||
                        userInfo?.userType === "stuff"
                    ) && (
                        <FlatList
                            data={orderList}
                            keyExtractor={(item) => item._id}
                            renderItem={this.RenderOrder}
                            onEndReached={() => {
                                if (orderList.length < 9) return;
                                this.handleFetchNext(start + 5);
                            }}
                        />
                    )}

                {orderInRangeStatus === "failed" &&
                    (userInfo?.userType === "supper_admin" || userInfo?.userType === "admin" || userInfo?.userType==="stuff") && (
                        <Text style={[styles.cartContainer, { fontSize: 20, color: colors.color_secondary }]}>
                            {JSON.stringify(orderInRangeError)}
                        </Text>
                    )}

                {this.state.loading && <Loader />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cartContainer: {
        borderWidth: 1,
        borderColor: colors.color_primary,
        marginHorizontal: 20,
        marginVertical: 8,
        padding: 4,
        backgroundColor: colors.color_light_gray,
    },
    vendorTitle: {
        fontSize: 20,
        color: colors.color_secondary,
        padding: 4,
        fontWeight: "bold",
        textAlign: "center",
    },
    vendorDetail: {
        fontSize: 14,
        color: colors.color_primary,
    },
});

const mapStateToProps = (state) => ({
    vendorStackError: state.product.vendorStackError,
    vendorStackResponse: state.product.vendorStackResponse,
    vendorStackStatus: state.product.vendorStackStatus,
    orderInRangeError: state.product.orderInRangeError,
    orderInRangeResponse: state.product.orderInRangeResponse,
    orderInRangeStatus: state.product.orderInRangeStatus,
    getUserStatus: state.auth.getUserStatus,
    getUserResponse: state.auth.getUserResponse,
    getUserError: state.auth.getUserError
});

const mapDispatchToProps = {
    getVendorStockAction,
    getAllProductAction,
    getOrderInRangeAction,
    getUserAction,
    clearUserAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Record);
