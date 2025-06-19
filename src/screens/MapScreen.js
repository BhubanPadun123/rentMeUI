// MapScreen.js
import React, { useEffect, useState } from "react";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import { colors, sizes } from "../styles/Theme";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpecifictProductAction } from "../Redux/action/product";
import Loader from "../components/Loader";

export default function MapScreen({ navigation }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [locationDetail, setLocationDetail] = useState(null);
    const [serviceList, setServiceList] = useState([]);
    const [isAllOk, setIsAllOk] = useState(false);
    const [initialRegion, setInitialRegion] = useState(null);

    const {
        areaProductStatus,
        areaProductResponse,
        areaProductError
    } = useSelector((state) => state.product);

    useEffect(() => {
        if (
            areaProductStatus === "success" &&
            Array.isArray(areaProductResponse) &&
            areaProductResponse.length > 0
        ) {
            setServiceList(areaProductResponse);
            setLoading(false);
            setIsAllOk(true);
        }
        if (areaProductStatus === "started") {
            setLoading(true);
        }
    }, [areaProductStatus]);

    useEffect(() => {
        let isMounted = true;

        async function getLocationAsync() {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") return;

                const location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;

                if (!isMounted) return;

                setInitialRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });

                try {
                    const address = await Location.reverseGeocodeAsync({ latitude, longitude });
                    if (isMounted && address.length > 0) {
                        setLocationDetail(address[0]);
                    }
                } catch (err) {
                    console.log("Reverse geocode error:", err);
                }
            } catch (err) {
                console.log("Location error:", err);
            }
        }

        getLocationAsync();
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (locationDetail && locationDetail.city) {
            dispatch(getAllSpecifictProductAction(locationDetail.city, "map"));
        }
    }, [locationDetail]);

    const handleServiceSelect = (item) => {
        navigation.navigate("ServiceDetailScreen", { item });
    };

    if (!isAllOk) {
        return <Loader />;
    }

    return (
        <View style={styles.container}>
            {initialRegion && !loading ? (
                <MapView
                    style={styles.map}
                    provider="google"
                    initialRegion={initialRegion}
                    loadingIndicatorColor={colors.color_primary}
                    userLocationUpdateInterval={1000}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                >
                    <Circle
                        center={{
                            latitude: initialRegion.latitude,
                            longitude: initialRegion.longitude,
                        }}
                        radius={2000}
                        strokeWidth={2}
                        strokeColor="rgba(0, 0, 255, 0.5)"
                        fillColor="rgba(0, 0, 255, 0.2)"
                    />

                    {serviceList
                        .filter(
                            (s) =>
                                typeof s.latitude === "number" &&
                                typeof s.longitude === "number" &&
                                !isNaN(s.latitude) &&
                                !isNaN(s.longitude)
                        )
                        .map((service) => (
                            <Marker
                                key={String(service.id)}
                                coordinate={{
                                    latitude: service.latitude,
                                    longitude: service.longitude,
                                }}
                                title={String(service.title)}
                                pinColor={service.color || "red"}
                            >
                                <Callout style={styles.callout_container}>
                                    <TouchableOpacity onPress={() => handleServiceSelect(service)}>
                                        <View style={styles.callout_button}>
                                            <Text style={styles.callout_title}>
                                                {String(service.id)} {String(service.title)}
                                            </Text>
                                            <Text style={styles.callout_text}>{String(service.title)}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </Callout>
                            </Marker>
                        ))}
                </MapView>
            ) : (
                <ActivityIndicator
                    style={styles.loading_container}
                    size="large"
                    color={colors.color_primary}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
    callout_container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: colors.color_white,
        paddingLeft: 8,
    },
    callout_title: {
        paddingBottom: 12,
        fontSize: 18,
        color: "red",
    },
    callout_text: {
        fontSize: 13,
    },
    callout_button: {
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
    },
    loading_container: {
        position: "absolute",
        top: sizes.height / 2,
        left: sizes.width / 2,
    },
});