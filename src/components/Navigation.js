import React, { Component } from "react";
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
import UpdateUser from "../screens/User/UpdateUser";
import {
    MyFavourite,
    UpdateLocation,
    Request,
    Privacy,
    TermAndCondition,
    SupportUs,
    FAQ,
    AboutUs,
    Feedback
} from "../screens/User/index"
import { useDispatch, useSelector, connect } from "react-redux";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
                    headerShown: false,
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
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="UpdateUser"
                component={UpdateUser}
                options={{
                    headerShown:true,
                    title:"Update Profile Info"
                }}
            />
            <Stack.Screen 
                name="MyFav"
                component={MyFavourite}
                options={{
                    headerShown:true,
                    title:"My Fav"
                }}
            />
            <Stack.Screen 
                name="UpdateLocation"
                component={UpdateLocation}
                options={{
                    headerShown:true,
                    title:"Update Location"
                }}
            />
            <Stack.Screen 
                name="Request"
                component={Request}
                options={{
                    headerShown:true,
                    title:"Request Item"
                }}
            />
            <Stack.Screen 
                name="Privacy"
                component={Privacy}
                options={{
                    headerShown:true,
                    title:"Platform Privacy and policy"
                }}
            />
            <Stack.Screen 
                name="TermAndCondition"
                component={TermAndCondition}
                options={{
                    headerShown:true,
                    title:"Platform Term & Condition"
                }}
            />
            <Stack.Screen 
                name="SupportUs"
                component={SupportUs}
                options={{
                    headerShown:true,
                    title:"Support Us"
                }}
            />
            <Stack.Screen 
                name="FAQ"
                component={FAQ}
                options={{
                    headerShown:true,
                    title:"FAQ's"
                }}
            />
            <Stack.Screen 
                name="Feedback"
                component={Feedback}
                options={{
                    headerShown:true,
                    title:"Feedback"
                }}
            />
            <Stack.Screen 
                name="AboutUs"
                component={AboutUs}
                options={{
                    headerShown:true,
                    title:"About Us and Connect"
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
            <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{
                    headerShown: true,
                    title: "Room Location",
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
                name="PropertyLocationScreen"
                component={PropertyLocationScreen}
                options={{
                    headerShown: true,
                    title: "Location",
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

class Navigation extends Component {
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
    render() {
        this.findUser()
        const { user } = this.state

        return (
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
                    name="MyHome"
                    component={SupperAdminSettingStack}
                    options={{
                        unmountOnBlur: true,
                    }}
                />
                <Tab.Screen
                    name="Add"
                    component={SupperAdminSettingStack}
                    options={{
                        unmountOnBlur: true,
                    }}
                />
                <Tab.Screen
                    name="MyBook"
                    component={SupperAdminSettingStack}
                    options={{
                        unmountOnBlur: true,
                    }}
                />

                <Tab.Screen
                    name="Profile"
                    component={AuthStack}
                    options={{
                        unmountOnBlur: true,
                    }}
                />
            </Tab.Navigator>
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