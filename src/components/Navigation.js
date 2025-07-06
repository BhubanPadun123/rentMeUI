import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import Record from "../screens/Record";
import SearchScreen from "../screens/SearchScreen";
import ServiceDetailScreen from "../screens/ServiceDetailScreen";
import ServiceBookingScreen from "../screens/ServiceBookingScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import MapScreen from "../screens/MapScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import UpdateVendorStock from "../screens/UpdateVendorStock";
import BookingHistoryScreen from "../screens/BookingHistoryScreen";
import FeedBackScreen from "../screens/FeedBackScreen";
import PropertyRegisterScreen from "../screens/PropertyRegisterScreen";
import PropertyLocationScreen from "../screens/PropertyLocationScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PlatformEarning from "../screens/Earning";
import ForgetPassword from "../screens/ForgetPassword";
import BookLibrary from "../screens/BookLibrary";
import MyLiBrary from "../screens/MyLibrary"
import UploadBooks from "../screens/UploadBook"
import iconPref, {
    customTabButton,
    SettingStackHeaderAdmin,
    SettingStackHeaderCustomer,
    SettingStackHeaderSupperAdmin,
    SettingStackHeaderVendor,
    SettingStackHeaderStuff,
    CustomerHomeHeader
} from "../utils/NavBarUtils";
import ManageUser from "../screens/ManageUser";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
    Tab as CTab
} from "@rneui/themed"
import {
    Ionicons,
    MaterialCommunityIcons,
    FontAwesome5
} from "@expo/vector-icons"
import { useDispatch, useSelector, connect } from "react-redux";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function BookStack(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Library"
                component={BookLibrary}
                options={{
                    headerShown: true,
                    unmountOnBlur: true,
                    header: () => {
                        return (
                            <CTab
                                dense
                                disableIndicator
                                containerStyle={{
                                    minHeight: 60,
                                    justifyContent: 'center',
                                    alignItems: 'baseline',
                                    padding: 0,
                                    backgroundColor: "#826012"
                                }}
                                onChange={async (e) => {
                                    if (e == 1) {
                                        props.navigation.navigate("UploadBook")
                                    } else if (e == 0) {
                                        props.navigation.navigate("MyBook")
                                    }
                                }}
                            >
                                <CTab.Item
                                    title={"Library"}
                                    iconPosition='top'
                                    icon={<MaterialCommunityIcons name="library" size={24} color="white" />}
                                    dense={true}
                                    size='lg'
                                    containerStyle={{
                                        // alignItems: 'flex-end',
                                        // justifyContent: 'flex-end',
                                        backgroundColor: "#826012",
                                        marginTop: 40
                                    }}
                                    titleStyle={{
                                        color: 'white'
                                    }}
                                />
                                <CTab.Item
                                    title={"Upload"}
                                    iconPosition='top'
                                    icon={<FontAwesome5 name="upload" size={24} color="white" />}
                                    dense={true}
                                    size='lg'
                                    containerStyle={{
                                        // alignItems: 'flex-end',
                                        // justifyContent: 'flex-end',
                                        backgroundColor: "#826012",
                                        marginTop: 40
                                    }}
                                    titleStyle={{
                                        color: 'white'
                                    }}
                                />
                            </CTab>
                        )
                    }
                }}
            />
            <Stack.Screen
                name="MyBook"
                component={MyLiBrary}
                options={{
                    headerShown: true,
                    unmountOnBlur: true,
                    header: () => {
                        return (
                            <CTab
                                dense
                                disableIndicator
                                containerStyle={{
                                    minHeight: 60,
                                    justifyContent: 'center',
                                    alignItems: 'baseline',
                                    padding: 0,
                                    backgroundColor: "#826012"
                                }}
                                onChange={async (e) => {
                                    if (e == 1) {
                                        props.navigation.navigate("UploadBook")
                                    } else if (e == 0) {
                                        props.navigation.navigate("MyBook")
                                    }
                                }}
                            >
                                <CTab.Item
                                    title={"Library"}
                                    iconPosition='top'
                                    icon={<MaterialCommunityIcons name="library" size={24} color="white" />}
                                    dense={true}
                                    size='lg'
                                    containerStyle={{
                                        // alignItems: 'flex-end',
                                        // justifyContent: 'flex-end',
                                        backgroundColor: "#826012",
                                        marginTop: 40
                                    }}
                                    titleStyle={{
                                        color: 'white'
                                    }}
                                />
                                <CTab.Item
                                    title={"Upload"}
                                    iconPosition='top'
                                    icon={<FontAwesome5 name="upload" size={24} color="white" />}
                                    dense={true}
                                    size='lg'
                                    containerStyle={{
                                        // alignItems: 'flex-end',
                                        // justifyContent: 'flex-end',
                                        backgroundColor: "#826012",
                                        marginTop: 40
                                    }}
                                    titleStyle={{
                                        color: 'white'
                                    }}
                                />
                            </CTab>
                        )
                    }
                }}
            />
            <Stack.Screen
                name="UploadBook"
                component={UploadBooks}
                options={{
                    headerShown: true,
                    unmountOnBlur: true,
                    header: () => {
                        return (
                            <CTab
                                dense
                                disableIndicator
                                containerStyle={{
                                    minHeight: 60,
                                    justifyContent: 'center',
                                    alignItems: 'baseline',
                                    padding: 0,
                                    backgroundColor: "#826012"
                                }}
                                onChange={async (e) => {
                                    if (e == 1) {
                                        props.navigation.navigate("UploadBook")
                                    } else if (e == 0) {
                                        props.navigation.navigate("MyBook")
                                    }
                                }}
                            >
                                <CTab.Item
                                    title={"Library"}
                                    iconPosition='top'
                                    icon={<MaterialCommunityIcons name="library" size={24} color="white" />}
                                    dense={true}
                                    size='lg'
                                    containerStyle={{
                                        // alignItems: 'flex-end',
                                        // justifyContent: 'flex-end',
                                        backgroundColor: "#826012",
                                        marginTop: 40
                                    }}
                                    titleStyle={{
                                        color: 'white'
                                    }}
                                />
                                <CTab.Item
                                    title={"Upload"}
                                    iconPosition='top'
                                    icon={<FontAwesome5 name="upload" size={24} color="white" />}
                                    dense={true}
                                    size='lg'
                                    containerStyle={{
                                        // alignItems: 'flex-end',
                                        // justifyContent: 'flex-end',
                                        backgroundColor: "#826012",
                                        marginTop: 40
                                    }}
                                    titleStyle={{
                                        color: 'white'
                                    }}
                                />
                            </CTab>
                        )
                    }
                }}
            />
        </Stack.Navigator>
    )
}
function AuthStack(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="UserProfileScreen"
                component={UserProfileScreen}
                options={{
                    headerShown: true,
                    title: "User Profile",
                    header: () => {
                        return (
                            <CTab
                                dense
                                disableIndicator
                                containerStyle={{
                                    minHeight: 60,
                                    justifyContent: 'center',
                                    alignItems: 'baseline',
                                    padding: 0,
                                    backgroundColor: "#826012"
                                }}
                                onChange={async (e) => {
                                    if (e == 1) {
                                        props.navigation.navigate("LoginScreen")
                                    } else if (e == 0) {
                                        props.navigation.navigate("Home")
                                    }
                                }}
                            >
                                <CTab.Item
                                    title={"Back"}
                                    iconPosition='left'
                                    icon={<Ionicons name="arrow-back" size={24} color="white" />}
                                    dense={true}
                                    size='lg'
                                    containerStyle={{
                                        alignItems: 'baseline',
                                        justifyContent: 'flex-end',
                                        backgroundColor: "#826012",
                                        marginTop: 40
                                    }}
                                />
                                <CTab.Item
                                    title={"Logout"}
                                    iconPosition='right'
                                    icon={<MaterialCommunityIcons name="logout" size={24} color="white" />}
                                    dense={true}
                                    size='lg'
                                    containerStyle={{
                                        alignItems: 'flex-end',
                                        justifyContent: 'flex-end',
                                        backgroundColor: "#826012",
                                        marginTop: 40
                                    }}
                                />
                            </CTab>
                        )
                    }
                }}
            />
            <Stack.Screen
                name="ForgetPassword"
                component={ForgetPassword}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerShown: true,
                    header: () => <CustomerHomeHeader props={props} />
                }}
            />
        </Stack.Navigator>
    );
}
function SupperAdminSettingStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Record"
                component={Record}
                options={{
                    headerShown: true,
                    header: () => <SettingStackHeaderSupperAdmin route={"Record"} />
                }}
            />
            <Stack.Screen
                name="NotificationsScreen"
                component={NotificationsScreen}
                options={{
                    headerShown: true,
                    header: () => <SettingStackHeaderSupperAdmin route={"NotificationsScreen"} />,
                }}
            />
            <Stack.Screen
                name="ServiceBookingScreen"
                component={ServiceBookingScreen}
                options={{
                    headerShown: true,
                    header: () => <SettingStackHeaderSupperAdmin route={"ServiceBookingScreen"} />
                }}
            />
            <Stack.Screen
                name="PropertyRegisterScreen"
                component={PropertyRegisterScreen}
                options={{
                    headerShown: true,
                    header: () => <SettingStackHeaderSupperAdmin route={"PropertyRegisterScreen"} />
                }}
            />
            <Stack.Screen
                name="PropertyLocationScreen"
                component={PropertyLocationScreen}
                options={{
                    headerShown: true,
                    header: () => <SettingStackHeaderSupperAdmin route={"PropertyLocationScreen"} />
                }}
            />
            <Stack.Screen
                name="FeedBackScreen"
                component={FeedBackScreen}
                options={{
                    headerShown: true,
                    header: () => <SettingStackHeaderSupperAdmin route={"FeedBackScreen"} />
                }}
            />
            <Stack.Screen
                name="UpdateProductStock"
                component={UpdateVendorStock}
                options={{
                    headerShown: true,
                    header: () => <SettingStackHeaderSupperAdmin route={"UpdateProductStock"} />
                }}
            />
            <Stack.Screen
                name="Earning"
                component={PlatformEarning}
                options={{
                    headerShown: true,
                    header: () => <SettingStackHeaderSupperAdmin route={"Earning"} />
                }}
            />
            <Stack.Screen
                name="BookingHistoryScreen"
                component={BookingHistoryScreen}
                options={{
                    headerShown: true,
                    header: () => <SettingStackHeaderSupperAdmin route={"BookingHistoryScreen"} />
                }}
            />
            <Stack.Screen
                name="ManageUser"
                component={ManageUser}
                options={{
                    headerShown: true,
                    header: () => <SettingStackHeaderSupperAdmin route={"ManageUser"} />
                }}
            />
        </Stack.Navigator>
    )
}
function AdminSettingStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Record"
                component={Record}
                options={{
                    headerShown: true,
                    header: () => <SettingStackHeaderAdmin route={"Record"} />
                }}
            />
            <Stack.Screen
                name="NotificationsScreen"
                component={NotificationsScreen}
                options={{
                    headerShown: true,
                    header: () => <SettingStackHeaderAdmin route={"NotificationsScreen"} />,
                }}
            />
            <Stack.Screen
                name="ManageUser"
                component={ManageUser}
                options={{
                    headerShown: true,
                    header: () => <SettingStackHeaderAdmin route={"ManageUser"} />
                }}
            />
        </Stack.Navigator>
    )
}
function StuffSettingStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="NotificationsScreen"
                component={NotificationsScreen}
                options={{
                    headerShown: true,
                    header: () => <SettingStackHeaderStuff route={"NotificationsScreen"} />,
                }}
            />
            <Stack.Screen
                name="Record"
                component={Record}
                options={{
                    headerShown: true,
                    header: () => <SettingStackHeaderStuff route={"Record"} />
                }}
            />
        </Stack.Navigator>
    )
}
function VendorSettingStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Record"
                component={Record}
                options={{
                    headerShown: true,
                    header: () => <SettingStackHeaderVendor route={"Record"} />
                }}
            />
            <Stack.Screen
                name="NotificationsScreen"
                component={NotificationsScreen}
                options={{
                    headerShown: true,
                    header: () => <SettingStackHeaderVendor route={"NotificationsScreen"} />
                }}
            />
            <Stack.Screen
                name="ServiceBookingScreen"
                component={ServiceBookingScreen}
                options={{
                    headerShown: true,
                    header: () => <SettingStackHeaderVendor route={"ServiceBookingScreen"} />
                }}
            />
            <Stack.Screen
                name="PropertyRegisterScreen"
                component={PropertyRegisterScreen}
                options={{
                    headerShown: true,
                    header: () => <SettingStackHeaderVendor route={"PropertyRegisterScreen"} />
                }}
            />
            <Stack.Screen
                name="PropertyLocationScreen"
                component={PropertyLocationScreen}
                options={{
                    headerShown: true,
                    header: () => <SettingStackHeaderVendor route={"PropertyLocationScreen"} />
                }}
            />
            <Stack.Screen
                name="FeedBackScreen"
                component={FeedBackScreen}
                options={{
                    headerShown: true,
                    header: () => <SettingStackHeaderVendor route={"FeedBackScreen"} />
                }}
            />
            <Stack.Screen
                name="UpdateProductStock"
                component={UpdateVendorStock}
                options={{
                    headerShown: true,
                    header: () => <SettingStackHeaderVendor route={"UpdateProductStock"} />
                }}
            />
            <Stack.Screen
                name="BookingHistoryScreen"
                component={BookingHistoryScreen}
                options={{
                    headerShown: true,
                    header: () => <SettingStackHeaderVendor route={"BookingHistoryScreen"} />
                }}
            />
        </Stack.Navigator>
    )
}
function CustomerSettingStack() {
    return (
        <Stack.Navigator
        >
            <Stack.Screen
                name="NotificationsScreen"
                component={NotificationsScreen}
                options={{
                    headerShown: true,
                    header: () => <SettingStackHeaderCustomer route={"NotificationsScreen"} />,
                }}
            />
            <Stack.Screen
                name="ServiceBookingScreen"
                component={ServiceBookingScreen}
                options={{
                    headerShown: true,
                    header: () => <SettingStackHeaderCustomer route={"ServiceBookingScreen"} />
                }}
            />
            <Stack.Screen
                name="BookingHistoryScreen"
                component={BookingHistoryScreen}
                options={{
                    headerShown: true,
                    header: () => <SettingStackHeaderCustomer route={"BookingHistoryScreen"} />
                }}
            />
        </Stack.Navigator>
    )
}
function HomeStack(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerShown: true,
                    header: () => <CustomerHomeHeader props={props} />
                }}
            />
            <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{
                    headerShown: true,
                    title: "Search Properties",
                    cardShadowEnabled: true,
                    cardStyle: {
                        backgroundColor: "#d9d0c7"
                    },
                    headerStyle: {
                        backgroundColor: '#826012',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}
            />
            <Stack.Screen
                name="ServiceDetailScreen"
                component={ServiceDetailScreen}
                options={{
                    headerShown: true,
                    title: "Property Details",
                    cardShadowEnabled: true,
                    cardStyle: {
                        backgroundColor: "#d9d0c7"
                    },
                    headerStyle: {
                        backgroundColor: '#826012',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}
            />

        </Stack.Navigator>
    );
}

function MapStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ServiceDetailScreen"
                component={ServiceDetailScreen}
                options={{ headerShown: true, title: "Booking Property List" }}
            />
        </Stack.Navigator>
    );
}

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }
    async componentDidMount() {
        this.findUser()
        if (this.props.loginResponse && this.props.loginResponse.hasOwnProperty('userData')) {
            this.setState({
                user: this.props.loginResponse.userData
            })
        }
    }
    async componentDidUpdate(prevProps) {
        this.findUser()
    }
    findUser = async () => {
        const userInfo = await AsyncStorage.getItem("currentUser");
        if (userInfo) {
            this.setState({ user: JSON.parse(userInfo) });
        }
    }
    findStack = (role) => {
        switch (role) {
            case "customer":
                return CustomerSettingStack
            case "supper_admin":
                return SupperAdminSettingStack
            case "admin":
                return AdminSettingStack
            case "stuff":
                return StuffSettingStack
            case "owner":
                return VendorSettingStack
            default:
                return CustomerSettingStack
        }
    }
    render() {
        this.findUser()
        const { user } = this.state
        const SettingStack = user && user?.userType ? this.findStack(user.userType) : CustomerSettingStack;

        return (
            <>
                {
                    !user ? (
                        <Tab.Navigator
                            screenOptions={{
                                tabBarShowLabel:false
                            }}
                            initialRouteName={"LoginScreen"}
                        >
                            <Tab.Screen
                                name="Profile"
                                component={AuthStack}
                                options={{
                                    unmountOnBlur: true,
                                    headerShown: false,
                                    tabBarStyle:{
                                        display:'none'
                                    }
                                }}
                            />
                        </Tab.Navigator>
                    ) : (
                        <Tab.Navigator
                            screenOptions={iconPref}
                            initialRouteName={"Home"}
                        >
                            <Tab.Screen
                                name="Home"
                                component={HomeStack}
                                options={{
                                    unmountOnBlur: true
                                }}
                            />
                            <Tab.Screen
                                name="Setting"
                                component={SettingStack}
                                options={{
                                    // tabBarButton: customTabButton,
                                    unmountOnBlur: true
                                }}
                            />
                            <Tab.Screen
                                name="Books"
                                component={BookStack}
                                options={{
                                    unmountOnBlur: true
                                }}
                            />
                            <Tab.Screen
                                name="Profile"
                                component={AuthStack}
                                options={{
                                    unmountOnBlur: true
                                }}
                            />
                        </Tab.Navigator>
                    )
                }
            </>
        );
    }
};
const mapStateToProps = (state) => {
    return {
        loginResponse: state.auth.loginResponse,
        loginStatus: state.auth.loginStatus
    }
}
export default connect(mapStateToProps)(Navigation)