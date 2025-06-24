import { StyleSheet, TouchableOpacity, View, Image, Button } from "react-native";
import { colors, sizes } from "../styles/Theme";
import tabsImages from "./TabsImages";
import {
    Feather,
    SimpleLineIcons,
    MaterialCommunityIcons,
    MaterialIcons,
    AntDesign,
    FontAwesome,
    Entypo
} from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native";

//ICONS
const iconPref = ({ route }) => {
    const hiddenRoutes = [
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
            return <Image source={iconName} style={{ height: 40, width: 40 }} />
        },
        tabBarStyle: {
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
            <Feather name="settings" size={24} color="white" />
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
const SettingStackScreen = [
    "BookingHistoryScreen",
    "Earning",
    "UpdateProductStock",
    "FeedBackScreen",
    "PropertyRegisterScreen",
    "Record",
    "NotificationsScreen",
    "ServiceBookingScreen",

]
function findIcon(name) {
    switch (name) {
        case "Earning":
            return <Entypo name="database" size={24} color="black" />
        case "NotificationsScreen":
            return <MaterialIcons name="notifications" size={24} color="black" />
        case "UpdateProductStock":
            return <MaterialIcons name="browser-updated" size={24} color="black" />
        case "PropertyRegisterScreen":
            return <AntDesign name="plussquareo" size={24} color="black" />
        case "ServiceBookingScreen":
            return <Feather name="shopping-cart" size={24} color="black" />
        case "FeedBackScreen":
            return <AntDesign name="gift" size={24} color="black" />
        case "Record":
            return <AntDesign name="windowso" size={24} color="black" />
        case "ManageUser":
            return <MaterialIcons name="manage-accounts" size={24} color="black" />
        default:
            return null
    }
}
const CustomerSetingHeaderNavList = ["NotificationsScreen",'ServiceBookingScreen','BookingHistoryScreen']
export function SettingStackHeaderCustomer(props) {
    const navigate = useNavigation()
    const handleClickNav = (name)=>{
        if(!name) return
        navigate.navigate(name)
    }
    return (
        <View style={{
            width: sizes.width,
            height: 80,
            backgroundColor: colors.color_primary,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            paddingBottom: 4,
            paddingRight: 20,
            flexDirection: 'row',
            gap: 14
        }}>
            {
                CustomerSetingHeaderNavList.map((item, index) => {
                    if (!findIcon(item)) return
                    return (
                        <TouchableOpacity key={item} onPress={()=> handleClickNav(item)}
                            style={{
                                backgroundColor: props.route === item && "red",
                                padding: 1
                            }}
                        >
                            {
                                findIcon(item)
                            }
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}
const VendorSetingHeaderNavList = ["BookingHistoryScreen","UpdateProductStock","FeedBackScreen","PropertyLocationScreen","Record","NotificationsScreen","ServiceBookingScreen","PropertyRegisterScreen"]
export function SettingStackHeaderVendor(props) {
    const navigate = useNavigation()
    const handleClickNav = (name)=>{
        if(!name) return
        navigate.navigate(name)
    }
    return (
        <View style={{
            width: sizes.width,
            height: 60,
            backgroundColor: colors.color_primary,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            paddingBottom: 4,
            paddingRight: 20,
            flexDirection: 'row',
            gap: 14
        }}>
            {
                VendorSetingHeaderNavList.map((item, index) => {
                    if (!findIcon(item)) return
                    return (
                        <TouchableOpacity key={item} onPress={()=> handleClickNav(item)}
                            style={{
                                backgroundColor: props.route === item && "red",
                                padding: 1
                            }}
                        >
                            {
                                findIcon(item)
                            }
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

const SupperAdminSetingHeaderNavList = [
    "BookingHistoryScreen",
    "Earning",
    "UpdateProductStock",
    "FeedBackScreen",
    "PropertyLocationScreen",
    "Record",
    "NotificationsScreen",
    "ServiceBookingScreen",
    "PropertyRegisterScreen",
    "ManageUser"
]
export function SettingStackHeaderSupperAdmin(props) {
    const navigate = useNavigation()
    const handleClickNav = (name)=>{
        if(!name) return
        navigate.navigate(name)
    }
    return (
        <View style={{
            width: sizes.width,
            height: 60,
            backgroundColor: colors.color_primary,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            paddingBottom: 4,
            paddingRight: 20,
            flexDirection: 'row',
            gap: 10
        }}>
            {
                SupperAdminSetingHeaderNavList.map((item, index) => {
                    if (!findIcon(item)) return
                    return (
                        <TouchableOpacity key={item} onPress={()=> handleClickNav(item)}
                            style={{
                                backgroundColor: props.route === item && "red",
                                padding: 1
                            }}
                        >
                            {
                                findIcon(item)
                            }
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

const AdminSetingHeaderNavList = [
    "Record",
    "NotificationsScreen",
    "ManageUser"
]
export function SettingStackHeaderAdmin(props) {
    const navigate = useNavigation()
    const handleClickNav = (name)=>{
        if(!name) return
        navigate.navigate(name)
    }
    return (
        <View style={{
            width: sizes.width,
            height: 60,
            backgroundColor: colors.color_primary,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            paddingBottom: 4,
            paddingRight: 20,
            flexDirection: 'row',
            gap: 14
        }}>
            {
                AdminSetingHeaderNavList.map((item, index) => {
                    if (!findIcon(item)) return
                    return (
                        <TouchableOpacity key={item} onPress={()=> handleClickNav(item)}
                            style={{
                                backgroundColor: props.route === item && "red",
                                padding: 1
                            }}
                        >
                            {
                                findIcon(item)
                            }
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

const StuffSetingHeaderNavList = [
    "Record",
    "NotificationsScreen"
]
export function SettingStackHeaderStuff(props) {
    const navigate = useNavigation()
    const handleClickNav = (name)=>{
        if(!name) return
        navigate.navigate(name)
    }
    return (
        <View style={{
            width: sizes.width,
            height: 60,
            backgroundColor: colors.color_primary,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            paddingBottom: 4,
            paddingRight: 20,
            flexDirection: 'row',
            gap: 14
        }}>
            {
                StuffSetingHeaderNavList.map((item, index) => {
                    if (!findIcon(item)) return
                    return (
                        <TouchableOpacity key={item} onPress={()=> handleClickNav(item)}
                            style={{
                                backgroundColor: props.route === item && "red",
                                padding: 1
                            }}
                        >
                            {
                                findIcon(item)
                            }
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}
export default iconPref;
