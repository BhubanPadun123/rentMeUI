import { getAuth } from "firebase/auth";
import React from "react";
import { useEffect, useState } from "react";
import tabsImages from "../utils/TabsImages";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    ImageBackground,
    Image,
    TouchableOpacity
} from "react-native";
import { colors } from "../styles/Theme";
import SearchBar from "../components/SearchBar";
import { child, get, getDatabase, ref } from "firebase/database";
import parseContentData from "../utils/ParseContentData";
import CardAppointmentSmall from "../components/CardAppointmentSmall";
import { sortAppointmentsByDateAndTime } from "../utils/CalendarUtils";
import categories from "../utils/Categories";
import { CardCarousel } from "../components/CardCarousel";
import Category from "../components/Category";
import Icons from "../utils/Icons";
import {
    getUserInfo
} from "../APIs/userApi"


export default function HomeScreen({ navigation }) {
    const [appointmentList, setAppointmentList] = useState([]);

    const [userAuth, setUserAuth] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const [userInfo, setUserInfo] = useState(null)

    const auth = getAuth();
    const user = auth.currentUser;

    // //Kullanıcı oturumu
    useEffect(() => {
        auth.onAuthStateChanged((userAuth) => {
            setUserAuth(!!userAuth);
        });
    }, []);
    //randevu listesi getirme
    useEffect(() => {
        if (userAuth) {
            getUserInfo().then((res) => {
                console.log(res);
                setUserInfo(res)
                setTimeout(() => {
                    setIsReady(true);
                }, 2000)
            })
        } else {
            setAppointmentList([]);
            setTimeout(() => {
                setIsReady(true);
            }, 2000);
        }
    }, [userAuth]); // User auth dependecy

    async function fetchServiceInfo(id) {
        const dbRef = ref(getDatabase(), "services/" + id);

        return get(dbRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    return snapshot.val();
                } else {
                    return null;
                }
            })
            .catch(() => {
                console.error(error);
                return null;
            });
    }

    //NAVIGATION
    function goToCalendar() {
        navigation.navigate("CalendarScreen");
    }

    //NAVIGATION
    function goToNotifications() {
        navigation.navigate("NotificationsScreen");
    }

    const handleSearch = () => {
        navigation.navigate("SearchScreen");
    };

    const handleCategorySelect = (selectedCategory, type) => {
        navigation.navigate("SearchScreen", { category: { ...selectedCategory }, type: type });
    };
    const goToLogin = () => {
        navigation.navigate("LoginScreen");
    }
    const goToPropertyRegister = () => {
        navigation.navigate("PropertyRegisterScreen")
    }
    return (
        <ScrollView>
            {isReady && (
                <View style={styles.container}>
                    <View style={styles.top_container}>
                        <View style={styles.header_container}>
                            <Text style={styles.header_text}>HomeKart</Text>
                            {/* {
                                userInfo && userInfo.hasOwnProperty('userType') && userInfo.userType === "owner" && (
                                    <TouchableOpacity onPress={goToPropertyRegister}>
                                        <Image source={Icons.add} style={{ height: 26, width: 26 }} />
                                    </TouchableOpacity>
                                )
                            } */}
                        </View>
                        <ImageBackground
                            style={styles.card_container}
                            imageStyle={{ borderRadius: 20, overflow: "hidden" }}
                            source={require("../../assets/backgroundsearch.png")}
                        >
                            <View style={styles.welcome_container}>
                                <Text style={styles.welcome_text}>
                                    Find Your Comfort place one
                                </Text>
                            </View>
                            <Text style={styles.detail_text}>
                                Find comfort place one with one click
                            </Text>
                            <View style={styles.search_container}>
                                <SearchBar
                                    placeholder_text={"Search..."}
                                    onSearch={handleSearch}
                                />
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.app_container}>
                        <Text style={styles.text}>Your Home Maters</Text>
                        <View>
                            <CardCarousel
                                list={categories}
                                onSelectCategory={handleCategorySelect}
                            />
                        </View>

                        {appointmentList.length === 0 ? (
                            ""
                        ) : (
                            <View>
                                <Text style={styles.text}>
                                    Yaklaşan Randevular
                                </Text>
                                <View style={styles.list_container}>
                                    {appointmentList
                                        .slice(0, 2)
                                        .map((appointment) => (
                                            <CardAppointmentSmall
                                                appointment={appointment}
                                                serviceInfo={
                                                    appointment.serviceInfo
                                                }
                                                key={appointment.id}
                                                onPress={goToCalendar}
                                            />
                                        ))}
                                </View>
                            </View>
                        )}
                        <Text style={styles.text}>Recently Uploaded Properties</Text>
                        <View style={styles.category_container}>
                            {categories.map((category) => (
                                <Category
                                    category={category}
                                    key={category.name}
                                    onPress={() =>
                                        handleCategorySelect(category, "product")
                                    }
                                />
                            ))}
                        </View>
                    </View>
                </View>
            )}
            {!isReady && (
                <View style={styles.loading_container}>
                    <ActivityIndicator
                        size="large"
                        color={colors.color_primary}
                    />
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 48,
        marginBottom: 120,
    },
    top_container: {
        paddingHorizontal: 24,
    },
    card_container: {
        marginVertical: 10,
        padding: 16,
        overflow: 'hidden'
    },
    header_container: {
        marginVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center'
    },
    welcome_container: {
        marginTop: 8,
        marginBottom: 64,
        flexDirection: "row",
        alignItems: "center",
    },
    search_container: {
        flex: 1,
        paddingBottom: 8,
    },
    app_container: {
        flex: 1,
        paddingHorizontal: 24,
    },
    list_container: {
        flex: 1,
        marginVertical: 8,
    },
    category_container: {
        marginVertical: 8,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'center'
    },
    header_text: {
        fontSize: 34,
        // //fontFamily: "Mulish-Medium",
        color: colors.color_primary,
        flex: 1,
    },
    welcome_text: {
        paddingHorizontal: 8,
        fontSize: 24,
        color: colors.color_white,
        // //fontFamily: "Mulish-Medium",
    },
    text: {
        flex: 1,
        fontSize: 18,
        // //fontFamily: "Mulish-Medium",
    },
    detail_text: {
        flex: 1,
        flexWrap: "wrap",
        fontSize: 16,
        paddingVertical: 16,
        paddingHorizontal: 8,
        color: colors.color_white,
        // //fontFamily: "Mulish-Medium",
    },
    welcome_text_bold: {
        color: colors.color_white,
        fontSize: 24,
        // //fontFamily: "Mulish-Bold",
    },
    icon: {
        color: colors.color_primary,
    },
    loading_container: {
        alignContent: "center",
        justifyContent: "center",
    },
});
