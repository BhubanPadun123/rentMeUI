import React, { useEffect, useState } from "react";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Platform,
    Alert,
} from "react-native";
import * as Location from "expo-location";
import { colors, sizes } from "../styles/Theme";
import { showTopMessage } from "../utils/ErrorHandler";

export default function PropertyLocationScreen({ route, navigation }) {
    const { geoLocation, title } = route.params || {};
    const [loading, setLoading] = useState(true);
    const [serviceList, setServiceList] = useState([]);
    const [initialRegion, setInitialRegion] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function getLocationAsync() {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    Alert.alert("Permission denied", "Location access is required to view the map.");
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;

                let parsedGeoLocation = geoLocation;
                if (geoLocation && typeof geoLocation === "string") {
                    try {
                        parsedGeoLocation = JSON.parse(geoLocation);
                    } catch (e) {
                        parsedGeoLocation = null;
                    }
                }

                if (
                    parsedGeoLocation?.coords?.latitude &&
                    parsedGeoLocation?.coords?.longitude
                ) {
                    if (!isMounted) return;
                    setInitialRegion({
                        latitude,
                        longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    });

                    setServiceList([
                        {
                            id: 1,
                            title: title || "Unknown Title",
                            latitude: parsedGeoLocation.coords.latitude,
                            longitude: parsedGeoLocation.coords.longitude,
                            color: "red",
                        },
                    ]);
                } else {
                    if (!isMounted) return;
                    setInitialRegion({
                        latitude,
                        longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    });
                }

                if (isMounted) setLoading(false);
            } catch (error) {
                console.log("Location error:", error);
                if (isMounted) setLoading(false);
            }
        }

        getLocationAsync();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleServiceSelect = (item) => {
        navigation.navigate("ServiceDetailScreen", { item });
    };

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

                    {serviceList.map((service) => (
                        <Marker
                            key={String(service.id)}
                            coordinate={{
                                latitude: service.latitude,
                                longitude: service.longitude,
                            }}
                            title={service.title || "Untitled"}
                            pinColor={service.color || "red"}
                        >
                            <Callout style={styles.callout_container}>
                                <TouchableOpacity
                                    onPress={() => handleServiceSelect(service)}
                                >
                                    <View style={styles.callout_button}>
                                        <Text style={styles.callout_title}>{service.title}</Text>
                                        <Text style={styles.callout_text}>Tap for more info</Text>
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
        fontSize: 18,
        color: "black",
    },
    callout_text: {
        fontSize: 13,
        color: "gray",
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