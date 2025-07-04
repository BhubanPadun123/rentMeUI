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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function AuthStack() {
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
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ForgetPassword"
                component={ForgetPassword}
                options={{ headerShown: false }}
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
function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ 
                    headerShown: true, 
                    header:()=> <CustomerHomeHeader/>
                }}
            />
            <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{
                    headerShown: true, 
                    title: "Catagory Search",
                    header:()=> <CustomerHomeHeader/>
                }}
            />
            <Stack.Screen
                name="ServiceDetailScreen"
                component={ServiceDetailScreen}
                options={{ 
                    headerShown: true, 
                    title: "Property Details",
                    header:()=> <CustomerHomeHeader/>
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
        const { user } = this.state
        const SettingStack = user && user?.userType ? this.findStack(user.userType) : CustomerSettingStack;

        return (
            <>
                <Tab.Navigator
                    screenOptions={iconPref}
                    initialRouteName={!user ? "Profile" : "Home"}
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
                        name="Profile"
                        component={AuthStack}
                        options={{
                            unmountOnBlur: true
                        }}
                    />
                </Tab.Navigator>
            </>
        );
    }
};

export default Navigation