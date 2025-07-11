import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    Share,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
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
import CSkeleton from "../components/Skeletom";
import BookDetails from "../components/BookDetails";
import {
    Card,
    Dialog,
    Input,
    Button,
    Divider
} from "@rneui/themed"
import {
    Fontisto,
    MaterialIcons,
    MaterialCommunityIcons,
    Ionicons,
    AntDesign,
    Feather
} from "@expo/vector-icons"
import { Calendar } from "react-native-calendars"

class ServiceDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notification: null,
            userInfo: null,
            channels: null,
            loading: true,
            openDialog: false,
            customerData: null
        };
    }

    // Notification listeners
    notificationListener = null;
    responseListener = null;

    async componentDidMount() {
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
        const user = await AsyncStorage.getItem('currentUser');
        let customerInfo = null;

        if (user) {
            customerInfo = JSON.parse(user);
            this.setState({
                userInfo:customerInfo
            })
        }else{
            this.props.navigation.navigate("Profile",{
                screen:"LoginScreen"
            })
        }
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 2000)
    }

    async componentWillUnmount() {
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
        this.props.navigation.navigate("Setting", {
            screen: "ServiceBookingScreen"
        });
    };

    goToPropertyLocation = () => {
        // Navigation logic here
    };

    goToLoginScreen = () => {
        this.props.navigation.navigate("LoginScreen");
    };

    handleOrderBook=(data)=>{
        if(!data) return
        this.props.bookingProductAction(data);
    }

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
            bookingDate: JSON.stringify(this.state.customerData)
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
        const { item } = this.props.route.params
        if(!item){
            return (
                <BookDetails 
                   product={this.props.route.params.book}
                   handleOrderBook={this.handleOrderBook}
                   orderStatus={this.props.bookingProductStatus}
                   orderResponse={this.props.bookingProductResponse}
                   orderError={this.props.bookingProductError}
                   userInfo={this.state.userInfo}
                />
            )
        }
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
            <React.Fragment>
                {
                    this.state.loading ? (
                        <CSkeleton />
                    ) : (
                        <View style={styles.out_container}>
                            <ScrollView style={styles.container}>
                                <View style={styles.header_container}>
                                    <ImageSlider images={images} />
                                </View>

                                <Card containerStyle={{
                                    padding: 0,
                                    backgroundColor: colors.color_light_gray,
                                    elevation: 0,
                                    borderWidth: 0
                                }}>
                                    <Card.Title>
                                        {item?.productTitle}
                                    </Card.Title>
                                    <Card.Title>
                                        {metaData?.description}
                                    </Card.Title>
                                    <Card.Title>
                                        {<Text style={styles.text_content}>{address.state},{address.district},{address.localAdd},{address.town}</Text>}
                                    </Card.Title>
                                    <Button 
                                      title={"Map"}
                                      icon={<Feather name="map-pin" size={24} color="white" />}
                                      onPress={()=>{
                                        this.props.navigation.navigate("PropertyLocationScreen",{item})
                                      }}
                                    />
                                    <Card.Divider />
                                    <View style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-around'
                                    }}>
                                        <View style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={styles.desc}>
                                                Deposit Amount
                                            </Text>
                                            <Text style={styles.desc}>
                                                Rs-{metaData?.deposite}
                                            </Text>
                                        </View>
                                        <View style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={styles.desc}>
                                                Rent/Month
                                            </Text>
                                            <Text style={styles.desc}>
                                                Rs - {metaData?.rent} only
                                            </Text>
                                        </View>
                                        <View style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={styles.desc}>
                                                Notice Period
                                            </Text>
                                            <Text style={styles.desc}>
                                                1 Month
                                            </Text>
                                        </View>
                                    </View>
                                    <Card.Divider />
                                    <View style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-around'
                                    }}>
                                        <View style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={styles.desc}>Available for</Text>
                                            <Text style={styles.desc}>{propertyType}</Text>
                                        </View>
                                        <View style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={styles.desc}>Preferred Tenants</Text>
                                            <Text style={styles.desc}>{propertyType}</Text>
                                        </View>
                                        <View style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text style={styles.desc}>Total Rooms</Text>
                                            <Text style={styles.desc} >{total ? total : "Not provided yet"}</Text>
                                        </View>
                                    </View>
                                    <Card.Divider />
                                    <View style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-around'
                                    }}>
                                        <Text style={styles.depositNote}>Available Properties</Text>
                                        {
                                            Array.isArray(availableItems) && availableItems.length > 0 && (
                                                <View style={{
                                                    display: "flex",
                                                    justifyContent: "space-around",
                                                    flexDirection: 'row',

                                                }}>
                                                    {
                                                        availableItems.includes('bulb') && (
                                                            <View style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',

                                                            }}>
                                                                <Fontisto name="lightbulb" size={24} color="black" />
                                                                <Text style={styles.desc}>Electricity</Text>
                                                            </View>
                                                        )
                                                    }
                                                    {
                                                        availableItems.includes('chair') && (
                                                            <View style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',

                                                            }}>
                                                                <MaterialIcons name="chair-alt" size={24} color="black" />
                                                                <Text style={styles.desc}>Extra Table</Text>
                                                            </View>
                                                        )
                                                    }
                                                    {
                                                        availableItems.includes('tabble') && (
                                                            <View style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',

                                                            }}>
                                                                <Ionicons name="bed-sharp" size={24} color="black" />
                                                                <Text style={styles.desc}>Bed</Text>
                                                            </View>
                                                        )
                                                    }

                                                    {
                                                        availableItems.includes('study table') && (
                                                            <View style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',

                                                            }}>
                                                                <MaterialCommunityIcons name="table-chair" size={24} color="black" />
                                                                <Text style={styles.desc}>Study Table</Text>
                                                            </View>
                                                        )
                                                    }
                                                </View>
                                            )
                                        }
                                    </View>
                                </Card>
                                <Card containerStyle={{
                                    backgroundColor: colors.color_light_gray,
                                    elevation: 0,
                                }}>
                                    <Card.Title>📌 Booking Terms & Payment</Card.Title>
                                    <Card.Divider />
                                    <View style={{
                                        flexDirection: 'column',
                                        gap: 4
                                    }}>
                                        <Card.FeaturedSubtitle style={styles.depositNote}> 1. Advance payment of 1 month’s rent + security deposit is required to confirm booking.</Card.FeaturedSubtitle>
                                        <Card.FeaturedSubtitle style={styles.depositNote}>2. Payments can be made via UPI, bank transfer, or cash.</Card.FeaturedSubtitle>
                                        <Card.FeaturedSubtitle style={styles.depositNote}>3. Rent is to be paid every month on or before the date of your move-in.</Card.FeaturedSubtitle>
                                    </View>
                                    <Card.Title>🔐 Security Deposit & Refund Policy</Card.Title>
                                    <Card.Divider />
                                    <View style={{
                                        flexDirection: 'column',
                                        gap: 4
                                    }}>
                                        <Card.FeaturedSubtitle style={styles.depositNote}> 1. A refundable security deposit of one month rent is required at the time of booking.</Card.FeaturedSubtitle>
                                        <Card.FeaturedSubtitle style={styles.depositNote}>2. The deposit will be fully refunded at the time of leaving, provided:-
                                            {`
                                        a. No damages are caused to the property. 
                                        b. All dues are cleared. 
                                        c. A proper notice period of 30 days (1 month) is served before vacating.`}</Card.FeaturedSubtitle>
                                        <Card.FeaturedSubtitle style={styles.depositNote}>3. ⚠️ If you leave without a 1-month prior notice, only 50% of the deposit will be refunded.</Card.FeaturedSubtitle>
                                    </View>
                                    <Card.Title>📋 House Rules</Card.Title>
                                    <Card.Divider />
                                    <View style={{
                                        flexDirection: 'column',
                                        gap: 4,
                                        justifyContent: 'flex-start'
                                    }}>
                                        <Card.FeaturedSubtitle style={styles.depositNote}> 1. 🕒 Gate Timing: 6 AM – 11 PM (exceptions allowed with prior notice)</Card.FeaturedSubtitle>
                                        <Card.FeaturedSubtitle style={styles.depositNote}>2. 🚭 No Smoking or alcohol consumption inside the premises</Card.FeaturedSubtitle>
                                        <Card.FeaturedSubtitle style={styles.depositNote}>3. 🔊 Maintain low noise levels after 10 PM</Card.FeaturedSubtitle>
                                        <Card.FeaturedSubtitle style={styles.depositNote}>4. 👥 Visitors allowed until 9 PM (ID submission required for overnight stay)</Card.FeaturedSubtitle>
                                        <Card.FeaturedSubtitle style={styles.depositNote}>5. 🧹 Common areas are cleaned weekly – keep your personal area tidy</Card.FeaturedSubtitle>
                                    </View>
                                </Card>

                                <Button
                                    title={"Booking"}
                                    // onPress={this.handlePlaceOrder}
                                    onPress={() => this.setState({ openDialog: true })}
                                    style={{
                                        margin: 4
                                    }}
                                />
                            </ScrollView>

                            {
                                this.state.openDialog && (

                                    <Dialog
                                        isVisible={this.state.openDialog}
                                        onBackdropPress={() => this.setState({ openDialog: false })}
                                        overlayStyle={{
                                            height: sizes.height,
                                            width: sizes.width,
                                            backgroundColor: colors.color_light_gray
                                        }}
                                    >
                                        <KeyboardAvoidingView
                                            style={{ flex: 1, paddingHorizontal: 20,height:"100%" }}
                                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
                                        >
                                            <ScrollView
                                                contentContainerStyle={{ flexGrow: 1, marginTop: 50, paddingBottom: 100 }}
                                                showsVerticalScrollIndicator={false}
                                            >
                                                <CutomerForm
                                                    onSubmit={(e) => {
                                                        this.setState({
                                                            customerData: e,
                                                            openDialog: false
                                                        }, () => {
                                                            this.handlePlaceOrder()
                                                        })
                                                    }}
                                                    onCancel={() => this.setState({
                                                        openDialog: false
                                                    })}
                                                />
                                            </ScrollView>
                                        </KeyboardAvoidingView>
                                    </Dialog>
                                )
                            }
                            {isLoading && <Loader />}
                        </View>
                    )
                }
            </React.Fragment>
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
export default connect(mapStateToProps, {
    bookingProductAction,
    clearBookingAction,
    createNotificationAction
})(ServiceDetailScreen);

// Styles
const styles = StyleSheet.create({
    out_container: { flex: 1 },
    container: {
    },
    header_container: {
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
    depositNote: {
        fontSize: 10,
        color: colors.color_primary,
        padding: 4,
        textAlign: 'left'
    },
    buttonContainer: {
        marginBottom: 20,
        justifyContent: 'center',
        paddingBottom: 10,
        marginHorizontal: 24
    }
});

function CutomerForm({
    onSubmit,
    onCancel
}) {
    const [isPressData, setPressData] = React.useState(false)
    const [name, setName] = React.useState("")
    const [phoneNumber, setPhoneNumber] = React.useState("")
    const [addDetails, setAddress] = React.useState("")
    const [selectedDate, setDate] = React.useState("")

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    // Get one month from today
    const nextMonth = new Date();
    nextMonth.setMonth(today.getMonth() + 1);
    const nextMonthStr = nextMonth.toISOString().split('T')[0];

    const handleSubmit = () => {
        if (!name || !addDetails || !phoneNumber || !selectedDate) {
            alert("Please fill all the data!")
            return
        }
        const data = {
            name,
            phoneNumber,
            addDetails,
            selectedDate
        }
        onSubmit(data)
    }
    return (
        <View
        >
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 40
            }}>Complete the form details</Text>
            <Divider />
            <Input
                placeholder="Enter Full Name"
                value={name}
                onChangeText={(e) => setName(e)}
            />
            <Input
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChangeText={(e) => setPhoneNumber(e)}
                keyboardType='phone-pad'
            />
            <Input
                placeholder="Address Details"
                multiline
                value={addDetails}
                onChangeText={(e) => setAddress(e)}
            />
            <Input
                placeholder="When are you planning to relocate?"
                value={selectedDate}
                rightIcon={
                    <TouchableOpacity onPress={() => setPressData(true)}>
                        <AntDesign name="calendar" size={24} color="black" />
                    </TouchableOpacity>
                }
                onPress={() => setPressData(!isPressData)}
            />
            {
                isPressData && (
                    <Calendar
                        current={selectedDate}
                        minDate={todayStr}
                        maxDate={nextMonthStr}
                        onDayPress={(day) => {
                            setDate(day.dateString)
                            setPressData(false)
                        }}
                        markedDates={{
                            [todayStr]: { selected: true, marked: true, selectedColor: 'blue' }
                        }}
                        theme={{
                            selectedDayBackgroundColor: '#00adf5',
                            todayTextColor: '#00adf5',
                            arrowColor: 'orange',
                            textSectionTitleColor: '#b6c1cd',
                        }}
                    />
                )
            }
            <Button
                title={"SUBMIT"}
                onPress={handleSubmit}
            />
            <Button
                title={"CANCEL"}
                onPress={onCancel}
                type='outline'
            />
        </View>
    )
}