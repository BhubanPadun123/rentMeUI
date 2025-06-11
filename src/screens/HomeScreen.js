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
    FlatList
} from "react-native";
import { colors, sizes } from "../styles/Theme";
import SearchBar from "../components/SearchBar";
import categories from "../utils/Categories";
import { CardCarousel } from "../components/CardCarousel";
import Category from "../components/Category";
import Icons from "../utils/Icons";
import {
    getUserInfo
} from "../APIs/userApi"
import Loader from "../components/Loader";
import { getFirstProducts } from "../APIs/product";
import { showTopMessage } from "../utils/ErrorHandler";
import ProductCart from "../components/ProductCart";


export default function HomeScreen({ navigation }) {
    const [userAuth, setUserAuth] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [product, setProduct] = useState([])

    useEffect(() => {
        getUserInfo().then((res) => {
            setUserInfo(res)
            fetchFirstProduct()
        }).catch((err) => {
            showTopMessage("Error app is down please restart after sometime!", "info")
        })
    }, []);
    function fetchFirstProduct() {
        setIsReady(false)
        getFirstProducts().then((res) => {
            setProduct(res.data)
            setTimeout(() => {
                setIsReady(true)
            }, 5000)
        }).catch((err) => {
            showTopMessage("Error while fetch the data.please re-start your application", "info")
        })
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
    const goToProductDatils = (category) => {
        navigation.navigate("ServiceDetailScreen",{item:category})
    };

    const RenderProduct = () => {
        if (product.length === 0) return null
        return (
            <React.Fragment>
                {
                    product.map((item) => {
                        return (
                            <ProductCart
                                category={item}
                                isSelected={""}
                                onPress={() => goToProductDatils(item)}
                                key={item.title}
                            />
                        )
                    })
                }
            </React.Fragment>
        )
    }
    return (
        <ScrollView>
            {isReady && (
                <View style={styles.container}>
                    <View style={styles.top_container}>
                        <View style={styles.header_container}>
                            <Text style={styles.header_text}>HomeKart</Text>
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
                        <Text style={styles.text}>Explore More</Text>
                        <View>
                            <CardCarousel
                                list={categories}
                                onSelectCategory={handleCategorySelect}
                            />
                        </View>
                        <Text style={styles.text}>Recently Uploaded Properties</Text>
                    </View>
                    <View>
                        {
                            product.length > 0 && RenderProduct()
                        }
                    </View>
                </View>
            )}
            {!isReady && (
                <Loader />
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
        justifyContent: 'center',
        alignItems: 'center'
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
