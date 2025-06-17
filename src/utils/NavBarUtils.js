import { StyleSheet, TouchableOpacity, View,Image } from "react-native";
import { colors } from "../styles/Theme";
import tabsImages from "./TabsImages";

//ICONS
const iconPref = ({ route }) => {
    const hiddenRoutes = [
        "PropertyRegisterScreen",
        "Search",
        "Profile",
        "LoginScreen",
        "SignUpScreen", 
        "UserProfileScreen", 
        "ServiceBookingScreen", 
        "BookingHistoryScreen", 
        "UserInfosScreen", 
        "FeedBackScreen",
        "ServiceBookingScreen"
    ]
    const isTabHidden = hiddenRoutes.includes(route.name)
    return {
        tabBarIcon: ({ color }) => {
            let iconName;

            if (route.name === "Home") {
                iconName = tabsImages.Home
            } else if (route.name === "Profile") {
                iconName = tabsImages.Profile
            } else if (route.name === "Calander") {
                iconName = tabsImages.Calander
            } else if (route.name === "Search") {
                iconName = tabsImages.Search
            }
            //returns in each icon
            return <Image source={iconName} style={{height:40,width:40}} />
        },
        tabBarStyle:  {
                ...styles.shadow,
                // position: "absolute",
                // bottom: 40,
                // left: 20,
                // right: 20,
                // borderRadius: 20,
                // height: 80,
                // justifyContent: "center",
                // alignItems: "center",
                // paddingBottom: 0,
                backgroundColor: 'pink',
            },
        tabBarActiveTintColor: colors.color_primary,
        tabBarInactiveTintColor: colors.color_gray,
        headerShown: false,
        tabBarShowLabel: false,
    };
};

export const customTabButton = ({ children, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        style={{ top: -20, justifyContent: "center", alignItems: "center" }}
    >
        <View
            style={{
                width: 56,
                height: 56,
                borderRadius: 32,
                backgroundColor: colors.color_primary,
                ...styles.shadow,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Image source={tabsImages.Map} style={{height:30,width:30}} />
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    shadow: {
        shadowColor: colors.color_gray,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default iconPref;
