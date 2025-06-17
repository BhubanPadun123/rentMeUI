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

import app from "../../firebaseConfig";
import iconPref, { customTabButton } from "../utils/NavBarUtils";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
                name="ServiceBookingScreen"
                component={ServiceBookingScreen}
                options={{ headerShown: true,title:"Booking Property List" }}
            />
            <Stack.Screen
                name="BookingHistoryScreen"
                component={BookingHistoryScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="UpdateProductStock"
                component={UpdateVendorStock}
                options={{ headerShown: true,title:"Update Property" }}
            />
            <Stack.Screen
                name="FeedBackScreen"
                component={FeedBackScreen}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ServiceDetailScreen"
                component={ServiceDetailScreen}
                options={{ headerShown: true,title:"Booking Property List" }}
            />
            <Stack.Screen
                name="PropertyRegisterScreen"
                component={PropertyRegisterScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Record"
                component={Record}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="NotificationsScreen"
                component={NotificationsScreen}
                options={{ headerShown: true,title:"Notification" }}
            />
        </Stack.Navigator>
    );
}


function HomeStack() {
    return (
        <Stack.Navigator screenOptions={iconPref}>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Record"
                component={Record}
                options={{ headerShown: true }}
            />
            <Stack.Screen
                name="NotificationsScreen"
                component={NotificationsScreen}
                options={{ headerShown: true,title:"Notification" }}
            />
            <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{ headerShown: true, title: "Catagory Search" }}
            />
            <Stack.Screen
                name="ServiceDetailScreen"
                component={ServiceDetailScreen}
                options={{ headerShown: true,title:"Booking Property List" }}
            />
            <Stack.Screen
                name="ServiceBookingScreen"
                component={ServiceBookingScreen}
                options={{ headerShown: true,title:"Booking Property List" }}
            />
            <Stack.Screen
                name="PropertyRegisterScreen"
                component={PropertyRegisterScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PropertyLocationScreen"
                component={PropertyLocationScreen}
                options={{headerShown:true,title:"Property Location"}}
            />
            <Stack.Screen
                name="FeedBackScreen"
                component={FeedBackScreen}
                options={{ headerShown: true,title:"Update Order Confirmation" }}
            />
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="UserProfileScreen"
                component={UserProfileScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="UpdateProductStock"
                component={UpdateVendorStock}
                options={{ headerShown: true,title:"Update Property" }}
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
                options={{ headerShown: true,title:"Booking Property List" }}
            />
        </Stack.Navigator>
    );
}

export default Navigation = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUserInfo=async()=>{
            const userInfo = await AsyncStorage.getItem("currentUser")
            if(userInfo){
                setUser(JSON.parse(userInfo))
            }
        }
        fetchUserInfo()
    }, []);

    function getTabScreen(authenticatedComponent, defaultComponent) {
        return user ? authenticatedComponent : defaultComponent;
    }

    return (
        <>
            <Tab.Navigator screenOptions={iconPref} initialRouteName={"Home"} >
                <Tab.Screen name="Home" component={HomeStack} />
                <Tab.Screen
                    name="Map"
                    component={MapStack}
                    options={{ tabBarButton: customTabButton }}
                />
                <Tab.Screen
                    name="Profile"
                    component={getTabScreen(UserProfileScreen, AuthStack)}
                />
            </Tab.Navigator>
        </>
    );
};
