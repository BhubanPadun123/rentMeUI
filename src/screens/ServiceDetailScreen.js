import React from "react";
import { View, StyleSheet, Text, Image, ScrollView, Share, TouchableOpacity } from "react-native";
import Button from "../components/Button/Button";
import { Feather, Ionicons } from "@expo/vector-icons";
import { colors, sizes } from "../styles/Theme";
import userImages from "../utils/UserImageUtils";
import ImageSlider from "../components/ImagesViewer";
import Icons from "../utils/Icons";
import tabsImages from "../utils/TabsImages";

const imageList = [
    'https://picsum.photos/id/10/600/400',
    'https://picsum.photos/id/20/600/400',
    'https://picsum.photos/id/30/600/400',
    'https://picsum.photos/id/40/600/400',
];
export default function ServiceDetailScreen({ route, navigation }) {

    const { item } = route.params;
    const metaData = item && item.hasOwnProperty('metaData') ? JSON.parse(item.metaData) : null
    const images = metaData && metaData.hasOwnProperty('images') ? JSON.parse(metaData.images) : null
    const address = metaData && metaData.hasOwnProperty('address') ? metaData.address : null
    const geoLocation = metaData && metaData.hasOwnProperty('geoLocation') ? metaData.geoLocation : null
    console.log(metaData)

    const shareContent = async () => {
        try {
            const result = await Share.share({
                message: "Şuna bir göz at ...",
                title: "Uygulama Paylaşımı",
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    //NAVIGATION
    const goToBookingScreen = (item) => {
        navigation.navigate("ServiceBookingScreen", { item });
    };
    const goToPropertyLocation=()=>{
        navigation.navigate("PropertyLocationScreen",{geoLocation:geoLocation,title:item && item.title ? item.title : "Demo Place"})
    }

    return (
        <View style={styles.out_container}>
            <ScrollView style={styles.container}>
                <View style={styles.header_container}>
                    <ImageSlider
                        images={images ? images : imageList}
                    />
                </View>
                {/* Body */}
                <View style={styles.body_container}>
                    <View style={styles.about_container}>
                        <Text style={styles.about}>{item && item.title && item.title}</Text>
                        <Text style={styles.desc}>{item && item.description && item.description}</Text>
                    </View>
                </View>

                <View style={styles.detail_container}>
                    <View style={styles.detail}>
                        {
                            address && (
                                <>
                                    <Image
                                        source={Icons.info}
                                        style={{ height: 24, width: 24 }}
                                    />
                                    <Text style={styles.text_content}>{address.state && address.state}</Text>
                                    <Text style={styles.text_content}>{address.district && address.district}</Text>
                                    <Text style={styles.text_content}>{address.localAddress && address.localAddress}</Text>
                                    <TouchableOpacity onPress={goToPropertyLocation} style={{
                                        backgroundColor: colors.color_gray,
                                        marginVertical: 4,
                                        zIndex: 4,
                                        width: "80%",
                                        alignItems: 'center',
                                        padding: 2,
                                        borderRadius: 10
                                    }}>
                                        <Image
                                            source={tabsImages.Map}
                                            style={{
                                                height: 24,
                                                width: 24
                                            }}
                                        />
                                    </TouchableOpacity>
                                </>
                            )
                        }
                    </View>
                    <View style={[styles.detail, { backgroundColor: item.availableStatus ? "pink" : "yellow" }]}>
                        {
                            metaData && (
                                <>
                                    <Image
                                        source={Icons.info}
                                        style={{ height: 24, width: 24 }}
                                    />
                                    <Text style={[styles.text_content, { fontSize: 14 }]}>{item.availableStatus && item.availableStatus ? "Available" : "Not Available"}</Text>
                                    {
                                        item.availableStatus && item.availableStatus ? (
                                            <Text style={[styles.text_content, { padding: 4 }]}>
                                                This property is currently available for booking. Reserve now to secure your stay before it’s gone. Limited slots may apply, so act quickly to confirm.
                                            </Text>
                                        ) : (
                                            <Text style={[styles.text_content, { padding: 4 }]}>
                                                Sorry, this property is currently not available for booking. Please check back later or explore similar listings nearby for your preferred date range and requirements.
                                            </Text>
                                        )
                                    }
                                </>
                            )
                        }
                    </View>
                </View>

                <View style={[styles.detail_container, { flexDirection: 'column', gap: 4 }]}>
                    <View style={styles.detail}>
                        {
                            metaData && (
                                <>
                                    <Image
                                        source={Icons.info}
                                        style={{ height: 24, width: 24 }}
                                    />
                                    <Text style={[styles.text_content, { fontSize: 12 }]}>Deposit Amount</Text>
                                    <Text style={styles.text_content}>Rs-{metaData.deposite && metaData.deposite} Only</Text>

                                    <Text style={[styles.text_content, { padding: 4 }]}>
                                        The full deposit will be refunded at the time of vacating the property, only if a one-month advance notice is provided.
                                    </Text>

                                    <Text style={[styles.text_content, { padding: 4, color: colors.color_secondary }]}>
                                        ** Vacating the property without any prior notice will lead to a complete forfeiture of the deposit amount. **
                                    </Text>

                                    <Text style={[styles.text_content, { padding: 4, color: colors.color_secondary, marginBottom: 2 }]}>
                                        ** If advance notice of one month is not provided, only 50% of the deposit will be refunded upon exit. **
                                    </Text>
                                </>
                            )
                        }
                    </View>
                    <View style={[styles.detail]}>
                        {
                            metaData && (
                                <>
                                    <Image
                                        source={Icons.info}
                                        style={{ height: 24, width: 24 }}
                                    />
                                    <Text style={[styles.text_content, { fontSize: 12, padding: 4 }]}>Monthly Rent</Text>

                                    <Text style={[styles.text_content, { marginHorizontal: 2 }]}>
                                        Rs - {metaData.rent && metaData.rent} only
                                    </Text>

                                    <Text style={styles.text_content}>
                                        Rent calculation will begin immediately upon relocating to the property.
                                    </Text>

                                    <Text style={[styles.text_content, { marginVertical: 4, paddingHorizontal: 4 }]}>
                                        Rent is expected to be paid monthly on the same date as the onboarding date.
                                    </Text>

                                    <Text style={[styles.text_content, { marginVertical: 4, paddingHorizontal: 4 }]}>
                                        A grace period of up to 5 days is allowed each month for rent payment.
                                    </Text>

                                </>
                            )
                        }
                    </View>
                    <View style={[styles.detail]}>
                        <Image
                            source={Icons.info}
                            style={{ height: 24, width: 24 }}
                        />
                        <Text style={[styles.text_content, { fontSize: 12, padding: 4 }]}>Rules & Regulations</Text>

                        <Text style={[styles.text_content, { marginVertical: 2, paddingHorizontal: 4 }]}>
                            All tenants must maintain cleanliness and hygiene within the premises at all times.
                        </Text>

                        <Text style={[styles.text_content, { marginVertical: 2, paddingHorizontal: 4 }]}>
                            Loud music, parties, or any activity causing disturbance to neighbors is strictly prohibited.
                        </Text>

                        <Text style={[styles.text_content, { marginVertical: 2, paddingHorizontal: 4 }]}>
                            Entry of visitors is allowed until 10:00 PM; overnight stays require prior permission.
                        </Text>

                        <Text style={[styles.text_content, { marginVertical: 2, paddingHorizontal: 4 }]}>
                            Consumption of alcohol, drugs, or any illegal activity inside the property is not allowed and will lead to immediate termination.
                        </Text>

                        <Text style={[styles.text_content, { marginVertical: 2, paddingHorizontal: 4 }]}>
                            Any property damage must be reported immediately and will be chargeable if found intentional or due to negligence.
                        </Text>

                        <Text style={[styles.text_content, { marginVertical: 2, paddingHorizontal: 4 }]}>
                            Pets are not allowed unless explicitly approved in the rental agreement.
                        </Text>

                    </View>
                </View>
            </ScrollView>

            <View style={styles.button_container}>
                <Button
                    text={"Add To cart"}
                    onPress={() => goToBookingScreen(item)}
                />
                <Button
                    text={"Booking"}
                    onPress={() => goToBookingScreen(item)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    out_container: { flex: 1 },
    container: {
        flexGrow: 1,
        paddingHorizontal: 24,
    },
    share_container: {
        flex: 1,
        marginTop: 48,
        marginHorizontal: 4,
        flexDirection: "row-reverse",
        alignItems: "center",
    },
    header_container: {
        flexDirection: "row",
        backgroundColor: colors.color_white,
        marginVertical: 10,
        padding: 4,
        borderRadius: 20,

    },
    body_container: {
        flexDirection: "row",
        backgroundColor: colors.color_white,
        marginVertical: 12,
        padding: 16,
        borderRadius: 20,
        justifyContent: "center",
    },
    image_container: {
        marginRight: 16,
        borderRadius: 50,
        overflow: "hidden",
        width: 100,
        height: 100,
    },
    title_container: {
        flex: 1,
    },
    location_container: { flexDirection: "row", paddingVertical: 8 },
    about_container: {
        flex: 1,
        justifyContent: "space-evenly",
    },
    button_container: {
        flexDirection: "row",
        marginBottom: 126,
        marginHorizontal: 24,
        gap: 2
    },
    title: {
        fontSize: 24,
        //fontFamily: "Mulish-Medium",
    },
    about: {
        fontSize: 20,
        //fontFamily: "Mulish-Light",
    },
    desc: {
        fontSize: 14,
        color: colors.color_primary
    },
    detail_container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 24,
        justifyContent: "space-between",
    },
    skills_container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 16,
        flexWrap: "wrap",
    },
    detail: {
        flex: 1,
        alignItems: "center",
        borderRadius: 20,
        marginHorizontal: 12,
        minHeight: sizes.width / 3,
        maxHeight: "auto",
        justifyContent: "center",
        backgroundColor: colors.color_white,
    },
    detail_text: {
        textAlign: "center",
        fontSize: 20,
        //fontFamily: "Mulish-SemiBold",
        color: colors.color_primary,
    },
    chips: {
        alignSelf: "flex-start",
        //fontFamily: "Mulish-Light",
        color: colors.color_white,
    },
    chip_container: {
        borderRadius: 20,
        backgroundColor: colors.color_primary,
        padding: 12,
        margin: 4,
    },
    location: {
        fontSize: 16,
        //fontFamily: "Mulish-Light",
        flex: 1,
        color: colors.color_primary,
        justifyContent: "center",
    },
    text_content: {
        color: colors.color_primary,
        fontSize: 10
    }
});
