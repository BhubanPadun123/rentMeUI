import React, { Component } from "react";
import { View, StyleSheet, Text, Image, ScrollView, Share, TouchableOpacity, Platform } from "react-native";
import { connect } from "react-redux";
import Button from "../components/Button/Button";
import { colors, sizes } from "../styles/Theme";
import ImageSlider from "../components/ImagesViewer";
import Icons from "../utils/Icons";
import { formatDate } from "../utils/utils";
import { generateRandomId } from "../utils/RandomId";
import { showTopMessage } from "../utils/ErrorHandler";
import ItemList from "../components/ListItems";
import { bookingProductAction, clearBookingAction, createNotificationAction } from "../Redux/action/product";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/Loader";
import { configureNotifications } from "../utils/NotificationService";
import * as Notifications from 'expo-notifications';

class ServiceDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notification: null,
            userInfo: null,
            channels: null,
        };
    }

    // Notification listeners
    notificationListener = null;
    responseListener = null;

    componentDidMount() {
        // Setup notification channels (Android)
        if (Platform.OS === 'android') {
            Notifications.getNotificationChannelsAsync()
                .then(value => this.setState({ channels: value ?? [] }));
        }

        // Add notification listeners
        this.notificationListener = Notifications.addNotificationReceivedListener(
            notification => this.setState({ notification })
        );

        this.responseListener = Notifications.addNotificationResponseReceivedListener(
            response => console.log(response)
        );
    }

    componentWillUnmount() {
        // Cleanup notification listeners
        if (this.notificationListener) this.notificationListener.remove();
        if (this.responseListener) this.responseListener.remove();

        // Clear booking action
        this.props.clearBookingAction();
    }

    componentDidUpdate(prevProps) {
        const {
            bookingProductStatus,
            bookingProductError,
            createNotificationStatus
        } = this.props;

        // Handle booking status changes
        if (prevProps.bookingProductStatus !== bookingProductStatus) {
            if (bookingProductStatus === "success") {
                showTopMessage("Thank you for booking property with us. Your booking is successfully placed", "success");
                this.props.createNotificationAction();
                this.goToBookingScreen();
            } else if (bookingProductStatus === "failed") {
                showTopMessage(
                    typeof bookingProductError === "string"
                        ? bookingProductError
                        : "Error while booking the Property, Please Try after sometime",
                    "danger"
                );
            }
        }
    }

    registerForPushNotificationAsync = async () => {
        let { status } = await Notifications.getPermissionsAsync();
        let finalStatus = status;

        if (status !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== "granted") {
            alert("Permission not granted!");
            return;
        }

        const token = await Notifications.getExpoPushTokenAsync();
        return token.data;
    };

    goToBookingScreen = () => {
        this.props.navigation.navigate("Setting",{
            screen:"ServiceBookingScreen"
        });
    };

    goToPropertyLocation = () => {
        // Navigation logic here
    };

    goToLoginScreen = () => {
        this.props.navigation.navigate("LoginScreen");
    };

    handlePlaceOrder = async () => {
        const { item } = this.props.route.params;
        const user = await AsyncStorage.getItem('currentUser');
        let customerInfo = null;

        if (user) {
            customerInfo = JSON.parse(user);
        }

        if (!customerInfo) {
            showTopMessage("User not logged in!", "info");
            setTimeout(() => {
                this.goToLoginScreen();
            }, 5000);
            return;
        }

        const data = {
            vendorRef: item.vendorRef,
            bookingStatus: "1",
            customerRef: customerInfo._id,
            productRef: item._id,
            bookingDate: JSON.stringify(customerInfo)
        };

        // Validate data
        for (const [key, value] of Object.entries(data)) {
            if (!value) {
                showTopMessage(`${key} is missing!`, "info");
                return;
            }
        }

        this.props.bookingProductAction(data);
    };

    renderItem = ({ item, index }) => (
        <View style={{ flexDirection: 'row', gap: 8 }}>
            <Text>{index}.</Text>
            <Text>{typeof item === "string" && item}</Text>
        </View>
    );

    render() {
        const { item } = this.props.route.params;
        const metaData = item?.metaData ? JSON.parse(item.metaData) : null;
        const images = metaData?.images ? JSON.parse(metaData.images) : [];
        const address = metaData?.addressInfo || null;
        const geoLocation = metaData?.geoLocation || null;
        const propertyType = item?.productType || null;
        const total = metaData?.total || null;
        const createdAt = item?.postAt || "";
        const availableItems = metaData?.availableItems || [];

        const {
            bookingProductStatus,
            createNotificationStatus
        } = this.props;

        const isLoading =
            bookingProductStatus === "started" ||
            createNotificationStatus === "started";

        return (
            <View style={styles.out_container}>
                <ScrollView style={styles.container}>
                    <View style={styles.header_container}>
                        <ImageSlider images={images} />
                    </View>
                    <View style={styles.body_container}>
                        <View style={styles.about_container}>
                            <Text style={styles.about}>{item?.productTitle}</Text>
                            {createdAt && (
                                <Text style={styles.postedDate}>
                                    Posted At: {formatDate(createdAt).toLowerCase()}
                                </Text>
                            )}
                            <Text style={styles.desc}>{metaData?.description}</Text>
                        </View>
                    </View>

                    {/* Property Details */}
                    <View style={styles.detail_container}>
                        {address && (
                            <View style={styles.detail}>
                                <Image source={Icons.info} style={styles.icon} />
                                {propertyType && (
                                    <Text style={styles.propertyType}>
                                        Property For: {propertyType}
                                    </Text>
                                )}
                                <Text style={styles.text_content}>{address.state},{address.district},{address.localAdd},{address.town}</Text>
                                {/* <TouchableOpacity
                                    onPress={this.goToPropertyLocation}
                                    style={styles.mapButton}
                                >
                                    <Image source={tabsImages.Map} style={styles.mapIcon} />
                                </TouchableOpacity> */}
                            </View>
                        )}

                        {/* <View style={[
                            styles.detail,
                            { backgroundColor: item.availableStatus ? "pink" : "yellow" }
                        ]}>
                            <Image source={Icons.info} style={styles.icon} />
                            <Text style={styles.availabilityText}>
                                {item.availableStatus ? "Available" : "Not Available"}
                            </Text>
                            <Text style={styles.availabilityDesc}>
                                {item.availableStatus
                                    ? "This property is currently available for booking..."
                                    : "Sorry, this property is currently not available..."}
                            </Text>
                        </View> */}
                    </View>

                    {/* Available Amenities */}
                    {availableItems?.length > 0 && (
                        <View style={styles.amenitiesContainer}>
                            <View style={styles.amenitiesDetail}>
                                <Image source={Icons.info} style={styles.icon} />
                                <Text style={styles.sectionTitle}>Available Amenities</Text>
                                <ItemList
                                    data={availableItems}
                                    renderItem={this.renderItem}
                                />
                            </View>
                        </View>
                    )}

                    {/* Property Stats */}
                    <View style={styles.detail_container}>
                        {total && (
                            <View style={styles.detail}>
                                <Image source={Icons.info} style={styles.icon} />
                                <Text style={styles.sectionTitle}>Total Properties Posted</Text>
                                <Text style={styles.text_content}>{total}</Text>
                                <Text style={styles.statsNote}>
                                    This represents the total count of all properties...
                                </Text>
                                <Text style={styles.statsNote}>
                                    4 out of {total} properties booked.
                                </Text>
                            </View>
                        )}

                        {/* Deposit Information */}
                        <View style={styles.detail}>
                            <Image source={Icons.info} style={styles.icon} />
                            <Text style={styles.sectionTitle}>Deposit Amount</Text>
                            <Text style={styles.text_content}>
                                Rs-{metaData?.deposite} Only
                            </Text>
                            <Text style={styles.depositNote}>
                                The full deposit will be refunded...
                            </Text>
                            <Text style={styles.warningText}>
                                ** Vacating without notice deposit not refund **
                            </Text>
                            <Text style={styles.warningText}>
                                ** Without 1-month notice, 50% refund **
                            </Text>
                        </View>

                        {/* Rent Information */}
                        <View style={styles.detail}>
                            <Image source={Icons.info} style={styles.icon} />
                            <Text style={styles.sectionTitle}>Monthly Rent</Text>
                            <Text style={styles.text_content}>
                                Rs - {metaData?.rent} only
                            </Text>
                            <Text style={styles.rentNote}>
                                Rent calculation begins upon relocation...
                            </Text>
                            <Text style={styles.rentNote}>
                                Due monthly on onboarding date...
                            </Text>
                            <Text style={styles.rentNote}>
                                5-day grace period monthly...
                            </Text>
                        </View>

                        {/* Rules & Regulations */}
                        <View style={styles.detail}>
                            <Image source={Icons.info} style={styles.icon} />
                            <Text style={styles.sectionTitle}>Rules & Regulations</Text>
                            {[
                                "Maintain cleanliness and hygiene...",
                                "No loud music/parties...",
                                "Visitors allowed until 10 PM...",
                                "No alcohol/drugs/illegal activities...",
                                "Report property damage immediately...",
                                "Pets require explicit approval..."
                            ].map((rule, index) => (
                                <Text key={index} style={styles.ruleText}>
                                    {rule}
                                </Text>
                            ))}
                        </View>
                    </View>

                    {/* Booking Button */}
                    <View style={styles.buttonContainer}>
                        <Button
                            text={"Booking"}
                            onPress={this.handlePlaceOrder}
                        />
                    </View>
                </ScrollView>

                {/* Loading Indicator */}
                {isLoading && <Loader />}
            </View>
        );
    }
}

// Map Redux state to component props
const mapStateToProps = (state) => ({
    bookingProductStatus: state.product.bookingProductStatus,
    bookingProductError: state.product.bookingProductError,
    bookingProductResponse: state.product.bookingProductResponse,
    createNotificationError: state.product.createNotificationError,
    createNotificationResponse: state.product.createNotificationResponse,
    createNotificationStatus: state.product.createNotificationStatus
});

// Connect component to Redux store
export default connect(mapStateToProps,{
    bookingProductAction, 
    clearBookingAction, 
    createNotificationAction
})(ServiceDetailScreen);

// Styles
const styles = StyleSheet.create({
    out_container: { flex: 1 },
    container: {
        flexGrow: 1,
        paddingHorizontal: 1,
    },
    header_container: {
        marginVertical: 10,
        padding: 4,
        borderRadius: 20,
        backgroundColor: colors.color_white,
    },
    body_container: {
        backgroundColor: colors.color_white,
        marginVertical: 12,
        padding: 16,
        borderRadius: 20,
    },
    about_container: {
        alignItems: 'center',
    },
    about: {
        fontSize: 20,
        textAlign: 'center',
        paddingVertical: 2,
        fontWeight: 'bold',
        color: colors.color_primary
    },
    postedDate: {
        padding: 6,
        fontSize: 14,
        backgroundColor: colors.color_light_gray,
        textAlign: 'center',
        borderRadius: 20,
        marginVertical: 8
    },
    desc: {
        fontSize: 14,
        color: colors.color_primary,
        textAlign: 'center',
        marginTop: 8
    },
    detail_container: {
        // flexDirection: "row",
        // alignItems: "center",
        // marginVertical: 24,
        // justifyContent: "space-between",
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
        padding: 16,
        marginVertical:4
    },
    icon: {
        height: 24,
        width: 24,
        marginBottom: 8
    },
    propertyType: {
        fontSize: 14,
        textAlign: 'center',
        color: colors.color_primary,
        marginBottom: 4
    },
    text_content: {
        color: colors.color_primary,
        fontSize: 10,
        textAlign: 'center'
    },
    mapButton: {
        backgroundColor: colors.color_gray,
        marginVertical: 8,
        width: "80%",
        alignItems: 'center',
        padding: 8,
        borderRadius: 10
    },
    mapIcon: {
        height: 24,
        width: 24
    },
    availabilityText: {
        fontSize: 14,
        color: colors.color_primary,
        fontWeight: 'bold',
        marginBottom: 4
    },
    availabilityDesc: {
        color: colors.color_primary,
        fontSize: 10,
        padding: 4,
        textAlign: 'center'
    },
    amenitiesContainer: {
        marginVertical: 24,
        alignItems: 'center'
    },
    amenitiesDetail: {
        width: "90%",
        backgroundColor: colors.color_white,
        borderRadius: 20,
        padding: 16,
        alignItems: 'center'
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.color_primary,
        marginBottom: 8
    },
    statsContainer: {
        marginVertical: 24,
        paddingHorizontal: 16
    },
    statsNote: {
        fontSize: 10,
        color: colors.color_secondary,
        textAlign: 'center',
        marginVertical: 2
    },
    depositNote: {
        fontSize: 10,
        color: colors.color_primary,
        padding: 4,
        textAlign: 'center'
    },
    warningText: {
        fontSize: 10,
        color: colors.color_secondary,
        textAlign: 'center',
        marginTop: 4,
        fontWeight: 'bold'
    },
    rentNote: {
        fontSize: 10,
        color: colors.color_primary,
        marginVertical: 2,
        paddingHorizontal: 4,
        textAlign: 'center'
    },
    ruleText: {
        fontSize: 10,
        color: colors.color_primary,
        marginVertical: 2,
        paddingHorizontal: 4,
        textAlign: 'center'
    },
    buttonContainer: {
        marginBottom: 20,
        justifyContent: 'center',
        paddingBottom: 10,
        marginHorizontal: 24
    }
});