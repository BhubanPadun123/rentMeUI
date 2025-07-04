import React from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { colors, sizes } from "../styles/Theme";
import tabsImages from "./TabsImages";
import {
    Card,
    Button,
    Text,
    Tab,
    Divider,
    Dialog,
    CheckBox,
    ListItem
} from "@rneui/themed"
import {
    FontAwesome5,
    MaterialCommunityIcons
} from "@expo/vector-icons"
import {
    Feather,
    SimpleLineIcons,
    MaterialIcons,
    AntDesign,
    FontAwesome,
    Entypo,
    Ionicons
} from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native";

//ICONS
const iconPref = ({ route, ...props }) => {
    const hiddenRoutes = [
    ]
    const isTabHidden = hiddenRoutes.includes(route.name)
    const handleNav = (name) => props.navigation.navigate(name)
    return {
        tabBarIcon: ({ color }) => {

            return (
                <Tab
                    onChange={() => handleNav(route.name)}
                    containerStyle={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: "center",
                        display: 'flex',
                        backgroundColor: "#826012",
                        paddingTop: 4,
                    }}
                >
                    <Tab.Item
                        title={
                            route.name === "Home" ?
                                "Home" :
                                route.name === "Setting" ?
                                    "Dashboard" : "News"
                        }
                        titleStyle={{ color: 'white', fontSize: 10 }}
                        icon={
                            route.name === "Home" ?
                                <MaterialCommunityIcons name="home" size={24} color="white" /> :
                                route.name === "Setting" ?
                                    <MaterialCommunityIcons name="view-dashboard" size={24} color="white" />
                                    : <Ionicons name="newspaper-outline" size={24} color="white" />
                        }
                    />
                </Tab>
            )
        },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: colors.color_gray,
        headerShown: false,
        tabBarShowLabel: false,
    };
};

export const CustomerHomeHeader = () => {
    const [openDialog, setOpen] = React.useState(false)
    const [selectLang,setLang] = React.useState("English")
    return (
        <View style={homeHeaderStyles.root}>
            <View style={homeHeaderStyles.wrapper}>
                <Image style={homeHeaderStyles.logo}
                    source={tabsImages.icon}
                />
                <View style={homeHeaderStyles.actionWrapper}>
                    <Card
                        containerStyle={{
                            padding: 0,
                            borderRadius: 10,
                            backgroundColor: "#826012",
                            justifyContent: 'center',
                            alignItems: "center"
                        }}
                    >
                        <View style={homeHeaderStyles.cardWrapper}>
                            <Text style={homeHeaderStyles.text}>Lang</Text>
                            <Divider orientation='vertical' />
                            <Text style={homeHeaderStyles.text}>{selectLang}</Text>
                            <Divider orientation='vertical' />
                            <TouchableOpacity onPress={()=> setOpen(!openDialog)}>
                                <AntDesign name="caretdown" size={18} color="gray" />
                            </TouchableOpacity>
                        </View>
                    </Card>
                    <Button
                        icon={<FontAwesome5 name="user-cog" size={24} color="#4b3ec2" />}
                        color={'warning'}
                        buttonStyle={{
                            borderRadius: 40
                        }}
                    />
                </View>
            </View>
            {
                openDialog && (
                    <Dialog
                        isVisible={openDialog}
                        onBackdropPress={() => setOpen(false)}
                        overlayStyle={{
                            padding: 0,
                            margin: 0
                        }}
                    >
                        <Dialog.Title title="Select Language" titleStyle={{
                            textAlign: 'center',
                            fontSize: 16
                        }} />
                        <Divider orientation='horizontal' />
                        <View style={{
                            padding: 0,
                            margin: 0,
                            justifyContent: 'flex-start',
                            width: "100%",
                            alignItems:'flex-start'
                        }}>
                            <Dialog.Button size='sm'
                                title={"English"}
                                icon={<CheckBox checked={selectLang === "English"} style={{
                                    padding: 0
                                }} />}
                                style={{
                                    padding: 0,
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start'
                                }}
                                onPress={()=> {
                                    setLang("English")
                                    setOpen(false)
                                }}
                            />
                            <Dialog.Button size="sm"
                                title={"Assamese"}
                                icon={<CheckBox checked={selectLang === "Assamese"} />}
                                style={{
                                    padding: 0,
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start'
                                }}
                                onPress={()=> {
                                    setLang("Assamese")
                                    setOpen(false)
                                }}
                            />
                        </View>
                    </Dialog>
                )
            }
        </View>
    )
}

const homeHeaderStyles = StyleSheet.create({
    root: {
        height: 100,
        backgroundColor: "white",
        maxWidth: sizes.width
    },
    wrapper: {
        height: 100,
        backgroundColor: "#826012",
        borderBottomStartRadius: 40,
        borderBottomEndRadius: 40,
        width: sizes.width,
        justifyContent: "space-between",
        alignItems: "flex-end",
        flexDirection: 'row',
        paddingLeft: 20,
        paddingBottom: 10
    },
    logo: {
        height: 100,
        width: 100,
        borderRadius: 100,
        bottom: -10,
    },
    actionWrapper: {
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        gap: 2,
        height: 40,
        padding: 2
    },
    text: {
        fontSize: 10,
        fontWeight: 'bold',
        color: "white"
    }
})

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
const CustomerSetingHeaderNavList = ["NotificationsScreen", 'ServiceBookingScreen', 'BookingHistoryScreen']
export function SettingStackHeaderCustomer(props) {
    const navigate = useNavigation()
    const handleClickNav = (name) => {
        if (!name) return
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
                        <TouchableOpacity key={item} onPress={() => handleClickNav(item)}
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
const VendorSetingHeaderNavList = ["BookingHistoryScreen", "UpdateProductStock", "FeedBackScreen", "PropertyLocationScreen", "Record", "NotificationsScreen", "ServiceBookingScreen", "PropertyRegisterScreen"]
export function SettingStackHeaderVendor(props) {
    const navigate = useNavigation()
    const handleClickNav = (name) => {
        if (!name) return
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
                        <TouchableOpacity key={item} onPress={() => handleClickNav(item)}
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
    const handleClickNav = (name) => {
        if (!name) return
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
                        <TouchableOpacity key={item} onPress={() => handleClickNav(item)}
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
    const handleClickNav = (name) => {
        if (!name) return
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
                        <TouchableOpacity key={item} onPress={() => handleClickNav(item)}
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
    const handleClickNav = (name) => {
        if (!name) return
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
                        <TouchableOpacity key={item} onPress={() => handleClickNav(item)}
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
