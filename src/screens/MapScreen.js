import React, { useEffect, useState } from "react";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { getDatabase, ref, child, get } from "firebase/database";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { colors, sizes } from "../styles/Theme";
import { Feather } from "@expo/vector-icons";
import parseContentData from "../utils/ParseContentData";
import { showMessage } from "react-native-flash-message";
import districtCoordinates from "../utils/MapScreenUtils";
import { useDispatch,useSelector } from "react-redux";
import { getAllSpecifictProductAction } from "../Redux/action/product";
import Loader from "../components/Loader";

export default function MapScreen({ navigation }) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [locationDetail,setLocationDetail] = useState(null)
    const [serviceList, setServiceList] = useState([
        { id: 1, title: "Bhuban Padun", latitude: 28.6139, longitude: 77.2090, color: 'red' },
        { id: 2, title: "Temporary", latitude: 19.0760, longitude: 72.8777, color: 'green' },
        { id: 3, title: "Temporary", latitude: 12.9716, longitude: 77.5946, color: 'purple' },
        { id: 4, title: "Bhuban Padun Happy Home", latitude: 27.648712, longitude: 94.880699, color: 'yellow' }
    ]);
    const [isAllOk,setIsAllOk] = useState(false)
    const [initialRegion, setInitialRegion] = useState(null);

    const {
        areaProductStatus,
        areaProductResponse,
        areaProductError
    } = useSelector((state)=> state.product)

    useEffect(()=>{
        if(areaProductStatus === "success" && areaProductResponse && Array.isArray(areaProductResponse) && areaProductResponse.length > 0){
            setServiceList(areaProductResponse)
            setLoading(false)
            setIsAllOk(true)
        }
        if(areaProductStatus === "started"){
            setLoading(true)
        }
    },[areaProductStatus])

    useEffect(() => {
        async function getLocationAsync() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            const address = await Location.reverseGeocodeAsync({latitude,longitude})
            setInitialRegion({
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
            if(address && address.length > 0){
                setLocationDetail(address[0]);
            }
        }

        getLocationAsync();
    }, []);

    useEffect(()=>{
        if(locationDetail){
            fetchProductList()
        }
    },[locationDetail])

    function fetchProductList(){
        if(!locationDetail) return
        console.log(locationDetail)
        if(locationDetail.hasOwnProperty('city')){
            dispatch( getAllSpecifictProductAction(locationDetail.city,"map"))
        }
    }
    //Navigate to detail
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
                            key={service.id}
                            coordinate={{latitude:service.latitude,longitude:service.longitude}}
                            title={`${service.title}`}
                            pinColor={service.color}
                        >
                            <Callout style={styles.callout_container}>
                                <TouchableOpacity
                                    onPress={() => handleServiceSelect(service)}
                                >
                                    <View style={styles.callout_button}>
                                        <Text style={styles.callout_title}>
                                            {service.id}{" "}
                                            {service.title}
                                        </Text>
                                        <Text style={styles.callout_text}>
                                            {service.title}
                                        </Text>
                                    </View>

                                    {/* <Feather
                                        name="chevron-right"
                                        size={24}
                                        color={colors.color_primary}
                                    /> */}
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
        // //fontFamily: "Mulish-Medium",
        paddingBottom: 12,
        fontSize: 18,
        color:"red"
    },
    callout_text: {
        // //fontFamily: "Mulish-Light",
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
