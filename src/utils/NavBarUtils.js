import React from "react";
import { StyleSheet, TouchableOpacity, View, Image, ScrollView } from "react-native";
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
import { useNavigation, useRoute } from "@react-navigation/native";

//ICONS
const iconPref = ({ route, ...props }) => {
    const hiddenRoutes = [
        "Profile"
    ]
    const isTabHidden = hiddenRoutes.includes(route.name)

    const handleNav = (name) => props.navigation.navigate(name)
    return {
        tabBarIcon: ({ color }) => {

            return (
                <Tab
                    disableIndicator
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
                                    "Room" :
                                    route.name === "Books" ?
                                        "Book" : "User"
                        }
                        titleStyle={{ color: 'white', fontSize: 10 }}
                        icon={
                            route.name === "Home" ?
                                <MaterialCommunityIcons name="home" size={24} color="white" /> :
                                route.name === "Setting" ?
                                    <MaterialCommunityIcons name="view-dashboard" size={24} color="white" /> :
                                    route.name === "Books" ?
                                        <Ionicons name="newspaper-outline" size={24} color="white" />
                                        : <FontAwesome name="user-o" size={24} color="white" />
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

export const CustomerHomeHeader = ({ props }) => {
    const [openDialog, setOpen] = React.useState(false)
    const [selectLang, setLang] = React.useState("English")
    const handleNavToUser = () => {
        props.navigation.navigate("Profile", {
            screen: "UserProfileScreen"
        })
    }
    return (
        <View style={homeHeaderStyles.root}>
            <View style={homeHeaderStyles.wrapper}>
                <Image style={homeHeaderStyles.logo}
                    source={tabsImages.icon}
                />
                <View style={homeHeaderStyles.actionWrapper}>
                    <Button
                        icon={<FontAwesome5 name="user-cog" size={24} color="#4b3ec2" />}
                        color={'warning'}
                        buttonStyle={{
                            borderRadius: 40
                        }}
                        onPress={handleNavToUser}
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
                            alignItems: 'flex-start'
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
                                onPress={() => {
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
                                onPress={() => {
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

function findIcon(name) {
    switch (name) {
        case "Earning":
            return <Entypo name="database" size={24} color="white" />
        case "NotificationsScreen":
            return <MaterialIcons name="notifications" size={24} color="white" />
        case "UpdateProductStock":
            return <AntDesign name="edit" size={24} color="white" />
        case "PropertyRegisterScreen":
            return <Entypo name="upload" size={24} color="white" />
        case "ServiceBookingScreen":
            return <Feather name="shopping-cart" size={24} color="white" />
        case "FeedBackScreen":
            return <AntDesign name="gift" size={24} color="white" />
        case "Record":
            return <MaterialCommunityIcons name="card-account-details-outline" size={24} color="white" />
        case "ManageUser":
            return <MaterialIcons name="manage-accounts" size={24} color="white" />
        default:
            return null
    }
}
const CustomerSetingHeaderNavList = [
    {
        nav: "NotificationsScreen",
        label: "Notification"
    },

    {
        nav: "ServiceBookingScreen",
        label: "My Booking"
    }
]
export function SettingStackHeaderCustomer(props) {
    const [currentNav, setNav] = React.useState(0)
    const navigate = useNavigation()
    const handleClickNav = (name) => {
        if (!name) return
        navigate.navigate(name)
    }
    const RenderTabs = () => {
        return (
            <Tab
                disableIndicator
                onChange={(e) => {
                    setNav(e)
                    const findNav = CustomerSetingHeaderNavList[e].nav
                    handleClickNav(findNav)
                }}
                containerStyle={{
                    minHeight: 60,
                    justifyContent: 'center',
                    alignItems: 'baseline',
                    padding: 0,
                    backgroundColor: "#826012"
                }}>
                {
                    CustomerSetingHeaderNavList.map((item, key) => {
                        if (!findIcon(item.nav)) return null
                        return (
                            <Tab.Item
                                key={item.label}
                                icon={findIcon(item.nav)}
                                title={item.label}
                                dense={true}
                                size='lg'
                                containerStyle={{
                                    // alignItems: 'baseline',
                                    // justifyContent: 'flex-end',
                                    backgroundColor: "#826012",
                                    marginTop: 40,
                                }}
                                titleStyle={{
                                    color: "white"
                                }}
                                active={true}
                            />
                        )
                    })
                }
            </Tab>
        )
    }
    return (
        <RenderTabs />
    )
}
const VendorSetingHeaderNavList = [
    {
        nav: "UpdateProductStock",
        label: "Edit Properties"
    },
    {
        nav: "FeedBackScreen",
        label: "Update Booking"
    },
    {
        nav: "NotificationsScreen",
        label: "Notification"
    },
    {
        nav: "ServiceBookingScreen",
        label: "My Booking"
    },
    {
        nav: "PropertyRegisterScreen",
        label: "Register Property"
    }
]
export function SettingStackHeaderVendor(props) {
    const [currentNav, setNav] = React.useState(0)
    const navigate = useNavigation()
    const handleClickNav = (name) => {
        if (!name) return
        navigate.navigate(name)
    }
    const RenderTabs = () => {
        return (
            <Tab
                disableIndicator
                onChange={(e) => {
                    setNav(e)
                    const findNav = VendorSetingHeaderNavList[e].nav
                    handleClickNav(findNav)
                }}
                containerStyle={{
                    minHeight: 60,
                    justifyContent: 'center',
                    alignItems: 'baseline',
                    padding: 0,
                    backgroundColor: "#826012"
                }}>
                {
                    VendorSetingHeaderNavList.map((item, key) => {
                        if (!findIcon(item.nav)) return null
                        return (
                            <Tab.Item
                                key={item.label}
                                icon={findIcon(item.nav)}
                                title={item.label}
                                dense={true}
                                size='lg'
                                containerStyle={{
                                    // alignItems: 'baseline',
                                    // justifyContent: 'flex-end',
                                    backgroundColor: "#826012",
                                    marginTop: 40
                                }}
                                titleStyle={{
                                    color: "white"
                                }}
                                active={true}
                            />
                        )
                    })
                }
            </Tab>
        )
    }
    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            <RenderTabs />
        </ScrollView>
    )
}

const SupperAdminSetingHeaderNavList = [
    {
        nav: "Earning",
        label: "Platform Earning"
    },
    {
        nav: "UpdateProductStock",
        label: "Edit Properties"
    },
    {
        nav: "FeedBackScreen",
        label: "Update Booking"
    },
    {
        nav: "Record",
        label: "Record's"
    },
    {
        nav: "NotificationsScreen",
        label: "Notification"
    },
    {
        nav: "ServiceBookingScreen",
        label: "My Booking"
    },
    {
        nav: "PropertyRegisterScreen",
        label: "Upload Properties"
    },
    {
        nav: "ManageUser",
        label: "Manage Users"
    }
]
export function SettingStackHeaderSupperAdmin(props) {
    const [currentNav, setNav] = React.useState(0)
    const navigate = useNavigation()
    const handleClickNav = (name) => {
        if (!name) return
        navigate.navigate(name)
    }
    const RenderTabs = () => {
        return (
            <Tab
                disableIndicator
                onChange={(e) => {
                    setNav(e)
                    const findNav = SupperAdminSetingHeaderNavList[e].nav
                    handleClickNav(findNav)
                }}
                containerStyle={{
                    minHeight: 60,
                    justifyContent: 'center',
                    alignItems: 'baseline',
                    padding: 0,
                    backgroundColor: "#826012"
                }}>
                {
                    SupperAdminSetingHeaderNavList.map((item, key) => {
                        if (!findIcon(item.nav)) return null
                        return (
                            <Tab.Item
                                key={item.label}
                                icon={findIcon(item.nav)}
                                title={item.label}
                                dense={true}
                                size='lg'
                                containerStyle={{
                                    // alignItems: 'baseline',
                                    // justifyContent: 'flex-end',
                                    backgroundColor: "#826012",
                                    marginTop: 40
                                }}
                                titleStyle={{
                                    color: "white"
                                }}
                                active={true}
                            />
                        )
                    })
                }
            </Tab>
        )
    }
    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            <RenderTabs />
        </ScrollView>
    )
}

const AdminSetingHeaderNavList = [
    {
        nav: "Record",
        label: "Record"
    },
    {
        nav: "NotificationsScreen",
        label: "Notification"
    },
    {
        nav: "ManageUser",
        label: "Manage User"
    }
]
export function SettingStackHeaderAdmin(props) {
    const [currentNav, setNav] = React.useState(0)
    const navigate = useNavigation()
    const handleClickNav = (name) => {
        if (!name) return
        navigate.navigate(name)
    }
    const RenderTabs = () => {
        return (
            <Tab
                disableIndicator
                onChange={(e) => {
                    setNav(e)
                    const findNav = AdminSetingHeaderNavList[e + 1].nav
                    handleClickNav(findNav)
                }}
                containerStyle={{
                    minHeight: 60,
                    // justifyContent: 'center',
                    // alignItems: 'baseline',
                    padding: 0,
                    backgroundColor: "#826012"
                }}>
                {
                    AdminSetingHeaderNavList.map((item, key) => {
                        if (!findIcon(item.nav)) return null
                        return (
                            <Tab.Item
                                key={item.label}
                                icon={findIcon(item.nav)}
                                title={item.label}
                                dense={true}
                                size='lg'
                                containerStyle={{
                                    // alignItems: 'baseline',
                                    // justifyContent: 'flex-end',
                                    backgroundColor: "#826012",
                                    marginTop: 40
                                }}
                                titleStyle={{
                                    color: "white"
                                }}
                                active={true}
                            />
                        )
                    })
                }
            </Tab>
        )
    }

    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            <RenderTabs />
        </ScrollView>
    )
}

const StuffSetingHeaderNavList = [
    {
        nav: "Record",
        label: "Record"
    },
    {
        nav: "NotificationsScreen",
        label: "Notification"
    }
]
export function SettingStackHeaderStuff(props) {
    const [currentNav, setNav] = React.useState(0)
    const navigate = useNavigation()
    const handleClickNav = (name) => {
        if (!name) return
        navigate.navigate(name)
    }
    const RenderTabs = () => {
        return (
            <Tab
                disableIndicator
                onChange={(e) => {
                    setNav(e)
                    const findNav = StuffSetingHeaderNavList[e].nav
                    handleClickNav(findNav)
                }}
                containerStyle={{
                    minHeight: 60,
                    justifyContent: 'center',
                    alignItems: 'baseline',
                    padding: 0,
                    backgroundColor: "#826012"
                }}>
                {
                    StuffSetingHeaderNavList.map((item, key) => {
                        if (!findIcon(item.nav)) return null
                        return (
                            <Tab.Item
                                key={item.label}
                                icon={findIcon(item.nav)}
                                title={item.label}
                                dense={true}
                                size='lg'
                                containerStyle={{
                                    // alignItems: 'baseline',
                                    // justifyContent: 'flex-end',
                                    backgroundColor: "#826012",
                                    marginTop: 40
                                }}
                                titleStyle={{
                                    color: "white"
                                }}
                                active={true}
                            />
                        )
                    })
                }
            </Tab>
        )
    }
    return (
        <RenderTabs />
    )
}
export default iconPref;
