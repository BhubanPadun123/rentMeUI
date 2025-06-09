import { getAuth } from "firebase/auth";
import React from "react";
import { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { colors } from "../styles/Theme";
import { child, get, getDatabase, ref } from "firebase/database";
import parseContentData from "../utils/ParseContentData";
import CardAppointmentSmall from "../components/CardAppointmentSmall";
import { sortAppointmentsByDateAndTime } from "../utils/CalendarUtils";
import Loader from "../components/Loader";


export default function NotificationsScreen({ navigation }) {
    const [appointmentList, setAppointmentList] = useState([]);

    const [userAuth, setUserAuth] = useState(null);
    const [isReady, setIsReady] = useState(false);

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        auth.onAuthStateChanged((userAuth) => {
            setUserAuth(!!userAuth);
        });
    }, []);

    //NAVIGATION
    function goToCalendar() {
        navigation.navigate("CalendarScreen");
    }


    return (
        <ScrollView>
            {isReady && (
                <View style={styles.container}>
                    <View style={styles.app_container}>
                        {appointmentList.length === 0 ? (
                            ""
                        ) : (
                            <View style={styles.list_container}>
                                <Text style={styles.header_text}>Bildirimlerim</Text>
                                <View>
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
                    </View>
                </View>
            )}
            {!isReady && (
                <Loader/>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 48,
    },
    app_container: {
        flex: 1,
        paddingHorizontal: 24,
    },
    list_container: {
        flex: 1,
    },
    header_text: {
        marginVertical: 16,
        fontSize: 30,
        //fontFamily: "Mulish-Medium",
    },
    loading_container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
    },
});
