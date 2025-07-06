import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { getAllProductAction } from "../Redux/action/product";
import SearchBar from "../components/SearchBar";
import { CardCarousel } from "../components/CardCarousel";
import ProductCart from "../components/ProductCart";
import Loader from "../components/Loader";
import { colors } from "../styles/Theme";
import {
    serviceList,
    serviceList_ass
} from "../utils/Categories";
import CSkeleton from "../components/Skeletom";
import { getNotificationAction } from "../Redux/action/product";
import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    registerForPushNotificationsAsync,
    schedulePushNotification
} from "../utils/NotificationService";
import {
    Ionicons
} from "@expo/vector-icons"
import {
    Button
} from "@rneui/themed"
import tabsImages from "../utils/TabsImages";
import { InfoCart } from "../components/Banner/Home";
import { Divider } from "@rneui/base";
import { homeText } from "../utils/text";

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: true,
            userInfo: null,
            refreshing: false,
            product: [],
            currentUser: null,
            token: null,
            notificationListner: null,
            notificationResponse: null
        };
    }

    async componentDidMount() {
        const { navigation } = this.props
        const user = await AsyncStorage.getItem("currentUser")
        if (user) {
            const currentUser = JSON.parse(user)
            this.setState({
                currentUser: currentUser
            }, () => {
                this.props.getNotificationAction(currentUser._id)
                registerForPushNotificationsAsync().then((token) => {
                    this.setState({
                        token
                    }, () => {
                        this.notificationListener = Notifications.addNotificationReceivedListener(notification => {
                            this.setState({
                                notificationListner: notification
                            })
                        })
                        this.responseListener = Notifications.addNotificationResponseReceivedListener(response => {
                            this.setState({
                                notificationResponse: response
                            })
                        })
                    })
                })
            })
        }
        this.fetchFirstProduct();

        this.blurListener = navigation.addListener("blur", () => {
            this.setState({
                product: [],
                isReady: false
            })
        });
    }
    componentWillUnmount() {
        this.focusListener && this.focusListener()
        this.blurListener && this.blurListener()
        this.notificationListener && this.notificationListener.remove()
        this.responseListener && this.responseListener.remove()
    }

    componentDidUpdate(prevProps) {
        const { productListStatus, productListResponse } = this.props;

        if (
            productListStatus === "success" &&
            prevProps.productListStatus !== "success"
        ) {
            this.setState({
                product: productListResponse,
                isReady: true
            });
        }
        if (this.props.productListStatus === "started" && this.props.productListStatus != prevProps.productListStatus) {
            this.setState({
                isReady: false
            })
        }
        if (this.props.getNotificationStatus === "started" && this.props.getNotificationStatus != prevProps.getNotificationStatus) {
            this.setState({
                isReady: false
            })
        }
        if (this.props.getNotificationStatus === "success" && this.props.getNotificationStatus != prevProps.getNotificationStatus) {
            this.setState({
                isReady: true
            }, () => {
                if (this.props.getNotificationResponse && Array.isArray(this.props.getNotificationResponse)) {
                    this.props.getNotificationResponse.map(async (item) => {
                        await schedulePushNotification({
                            title: item.title,
                            body: item.message,
                            data: {}
                        })
                    })
                }
            })
        }
    }

    fetchFirstProduct = () => {
        this.props.getAllProductAction(0, 10);
    };

    goTo = (screen, params = {}) => {
        this.props.navigation.navigate(screen, params);
    };

    handleSearch = () => {
        this.props.navigation.navigate("SearchScreen", { category: null, type: "all" });
    };

    handleCategorySelect = (selectedCategory, type) => {
        this.props.navigation.navigate("SearchScreen", { category: { ...selectedCategory }, type });
    };

    goToProductDetails = (item) => {
        this.props.navigation.navigate("ServiceDetailScreen", { item });
    };

    onRefresh = () => {
        this.setState({ refreshing: true });
        this.fetchFirstProduct();
        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 2000);
    };

    render() {
        const { isReady, refreshing, product } = this.state;
        const { productListStatus } = this.props;

        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={this.onRefresh}
                    />
                }
                contentContainerStyle={{
                    backgroundColor: 'white'
                }}
            >
                {
                    !isReady && product.length > 0 && (
                        <CSkeleton />
                    )
                }
                {isReady && (
                    <View style={styles.container}>
                        <InfoCart />
                        <View style={{
                            paddingVertical: 4,
                            display: "flex",
                            flexDirection: 'row',
                            gap: 4,
                            justifyContent: 'flex-start',
                            marginTop: 16,
                            paddingLeft: 20
                        }}>
                            <Divider
                                orientation='vertical'
                                style={{
                                    backgroundColor: "#826012",
                                    height: 20,
                                    width: 8,
                                    borderRadius: 4
                                }}
                            />
                            <Text style={{
                                fontWeight: "bold",
                                fontSize: 18
                            }}>
                                {homeText.assQuickTab}
                            </Text>
                        </View>
                        <View>
                            <CardCarousel
                                list={serviceList_ass}
                                onSelectCategory={this.handleCategorySelect}
                            />
                        </View>
                        <View style={{
                            display: "flex",
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingRight: 20
                        }}>
                            <View style={{
                                paddingVertical: 4,
                                display: "flex",
                                flexDirection: 'row',
                                gap: 4,
                                justifyContent: 'flex-start',
                                marginTop: 16,
                                paddingLeft: 20
                            }}>
                                <Divider
                                    orientation='vertical'
                                    style={{
                                        backgroundColor: "#826012",
                                        height: 20,
                                        width: 8,
                                        borderRadius: 4
                                    }}
                                />
                                <Text style={{
                                    fontWeight: "bold",
                                    fontSize: 18
                                }}>
                                    {homeText.assQuickTab}
                                </Text>
                            </View>
                            <View style={{
                                justifyContent:'flex-end',
                                alignItems:'baseline',
                                marginTop:10
                            }}>
                                <TouchableOpacity style={{
                                    display:"flex",
                                    flexDirection:"row",
                                    gap:4,
                                    alignItems:'center',
                                    justifyContent:'center'
                                }}>
                                    <Text style={{
                                        fontSize: 10,
                                        borderBottomColor: "pink",
                                        borderBottomWidth: 1
                                    }}>View All</Text>
                                    <Ionicons name="arrow-forward-circle-sharp" size={24} color="gray" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <CardCarousel
                                list={product}
                                onSelectCategory={this.goToProductDetails}
                                type="product"
                            />
                        </View>
                        {/* <View>{product.length > 0 && this.renderProduct()}</View> */}
                    </View>
                )}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 120,
    },
    top_container: {
        paddingHorizontal: 24,
    },
    card_container: {
        marginVertical: 10,
        padding: 16,
        overflow: "hidden",
    },
    header_container: {
        marginVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    welcome_container: {
        marginTop: 8,
        marginBottom: 64,
        flexDirection: "row",
        alignItems: "center",
    },
    search_container: {
        flex: 1,
        paddingBottom: 8,
    },
    list_container: {
        flex: 1,
        marginVertical: 8,
    },
    category_container: {
        marginVertical: 8,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
    },
    header_text: {
        fontSize: 34,
        color: colors.color_primary,
        flex: 1,
    },
    welcome_text: {
        paddingHorizontal: 8,
        fontSize: 24,
        color: colors.color_white,
    },
    text: {
        flex: 1,
        fontSize: 18,
    },
    detail_text: {
        flex: 1,
        flexWrap: "wrap",
        fontSize: 16,
        paddingVertical: 16,
        paddingHorizontal: 8,
        color: colors.color_white,
    },
});

const mapStateToProps = (state) => ({
    productListStatus: state.product.productListStatus,
    productListError: state.product.productListError,
    productListResponse: state.product.productListResponse,
    getNotificationStatus: state.product.getNotificationStatus,
    getNotificationResponse: state.product.getNotificationResponse,
    getNotificationError: state.product.getNotificationError
});

const mapDispatchToProps = {
    getAllProductAction,
    getNotificationAction
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
