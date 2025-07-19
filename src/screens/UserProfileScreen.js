import React, { Component } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity
} from "react-native";
import {
    Text,
    Avatar,
    Divider,
    ListItem,
    Card,
    Input,
    Button
} from "@rneui/themed"
import { connect } from "react-redux";
import * as Notifications from 'expo-notifications';
import { getNotificationAction } from "../Redux/action/product";
import { updateUserMetaDataAction, cleanupUpdate } from "../Redux/action/auth";
import { showTopMessage } from "../utils/ErrorHandler";
import { colors, sizes } from "../styles/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UploadImage from "../components/UploadImage";
import Loader from "../components/Loader"
import {
    AntDesign,
    Entypo,
    SimpleLineIcons
} from "@expo/vector-icons"

class UserProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            openAddress: false,
            openContact: false,
            userType: null,
            photoURL: null,
            loading: false,
            state: "",
            district: "",
            localAddress: "",
            photoURL: "",
            pinCode: "",
            town: "",
            isEdit: false
        };
    }

    async componentDidMount() {
        const currentUser = await AsyncStorage.getItem('currentUser')
        if (currentUser) {
            const data = JSON.parse(currentUser)
            this.setState({
                userData: data
            })
        } else {
            this.props.navigation.navigate("LoginScreen")
        }
        // this.props.getNotificationAction(this.state.user._id);
    }

    componentWillUnmount() {
        this.props.cleanupUpdate();
    }
    componentDidUpdate(nextProps) {
        if (this.props.metaDataStatus === "started" && nextProps.metaDataStatus != this.props.metaDataStatus) {
            this.setState({
                loading: true
            })
        }
        if (this.props.metaDataStatus === "success" && nextProps.metaDataStatus != this.props.metaDataStatus) {
            this.setState({
                loading: false
            }, () => {
                if (this.props.metaDataResponse && this.props.metaDataResponse.hasOwnProperty('metaData')) {
                    AsyncStorage.setItem("currentUser", JSON.stringify(this.props.metaDataResponse.metaData))
                    this.setState({
                        userData: this.props.metaDataResponse
                    })
                }
            })
        }
    }

    handleUpdateMetadata = () => {
        if (!this.state.userData) {
            this.props.navigation.navigate("LoginScreen")
        }
        const {
            photoURL,
            state,
            district,
            localAddress,
            town,
            pinCode,
            userData
        } = this.state
        const data = {
            photoURL,
            state,
            district,
            localAddress,
            town,
            pinCode
        }
        let isError = false
        Object.entries(data).map((item) => {
            if (!item[1]) {
                showTopMessage(`${item[0]} field value missing`, "info")
                isError = true
                return
            }
        })
        if (isError) return
        this.props.updateUserMetaDataAction(data, userData._id)
    }
    render() {
        const {
            userData
        } = this.state
        const metaData = userData && userData.hasOwnProperty('metaData') ? JSON.parse(userData.metaData) : null
        let addsData = ""
        if (metaData && Object.entries(metaData).length) {
            Object.entries(metaData).map((item) => {
                if (item[0] != "photoURL") {
                    addsData = addsData + `${item[1]} ,`
                }
            })
        }
        return (
            <ScrollView>
                <View style={styles.btnContainer}>
                    <View style={styles.btnWrapper}>
                        <Button
                            title={"HOME"}
                            icon={<AntDesign name="home" size={40} color="white" />}
                            color={'secondary'}
                            iconPosition='top'
                        />
                        <Button
                            title={"MY-BOOKING"}
                            icon={<AntDesign name="shoppingcart" size={40} color="white" />}
                            color={'secondary'}
                            iconPosition='top'
                            onPress={async () => {
                                this.props.navigation.navigate("Setting", {
                                    screen: "ServiceBookingScreen"
                                })
                            }}
                        />
                    </View>
                    <View style={styles.btnWrapper}>
                        <Button
                            title={"LOGIN"}
                            icon={<Entypo name="login" size={40} color="white" />}
                            color={'secondary'}
                            iconPosition='top'
                            onPress={async () => {
                                await AsyncStorage.clear()
                                this.props.navigation.navigate("Profile", {
                                    screen: "LoginScreen"
                                })
                            }}
                        />
                        <Button
                            title={"LOGOUT"}
                            icon={<SimpleLineIcons name="logout" size={40} color="white" />}
                            color={'secondary'}
                            iconPosition='top'
                            onPress={async () => {
                                await AsyncStorage.clear()
                                this.props.navigation.navigate("Profile", {
                                    screen: "LoginScreen"
                                })
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => ({
    metaDataResponse: state.auth.metaDataResponse,
    metaDataStatus: state.auth.metaDataStatus,
    metaDataError: state.auth.metaDataError,
    getNotificationError: state.product.getNotificationError,
    getNotificationResponse: state.product.getNotificationResponse,
    getNotificationStatus: state.product.getNotificationStatus,
});

const mapDispatchToProps = {
    getNotificationAction,
    updateUserMetaDataAction,
    cleanupUpdate,
};

const styles = StyleSheet.create({
    btnContainer: {
        height: sizes.height,
        justifyContent: 'center',
        gap: 20
    },
    btnWrapper: {
        gap: 20
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen);
