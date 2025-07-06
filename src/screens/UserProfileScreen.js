import React, { Component } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform
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
            town: ""
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
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, marginTop: 50 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        // maxHeight: 60,
                        padding: 4
                    }}>
                        {
                            metaData && metaData.hasOwnProperty('photoURL') ? (
                                <Avatar
                                    size={50}
                                    rounded
                                    source={{
                                        uri: metaData && metaData.hasOwnProperty('photoURL') ? metaData.photoURL : ""
                                    }}
                                />
                            ) : (
                                <UploadImage
                                    photoURL={this.state.photoURL}
                                    imgUrl={this.state.photoURL}
                                    handleUpdateToDb={(e) => {
                                        this.setState({
                                            photoURL: e,
                                            loading: false
                                        })
                                    }}
                                    onSelect={() => { this.setState({ loading: true }) }}
                                />
                            )
                        }
                    </View>
                    <Divider />
                    {
                        metaData && Object.entries(metaData).length && userData && userData.hasOwnProperty('userName') ? (
                            <View style={styles.infoConteinr}>
                                <Text style={{
                                    textAlign: 'center',
                                    fontSize: 20,
                                    color: colors.color_primary,
                                    fontWeight: 'bold'
                                }}>{userData.userName}</Text>
                                <ListItem.Accordion style={{ marginTop: 30 }}
                                    content={
                                        <ListItem.Content>
                                            <ListItem.Title>Address detail</ListItem.Title>
                                        </ListItem.Content>
                                    }
                                    isExpanded={this.state.openAddress}
                                    onPress={() => this.setState({ openAddress: !this.state.openAddress })}
                                >
                                    <Card>
                                        <Card.Title>{addsData}</Card.Title>
                                    </Card>
                                </ListItem.Accordion>
                                <ListItem.Accordion content={
                                    <ListItem.Content>
                                        <ListItem.Title>Contact detail</ListItem.Title>
                                    </ListItem.Content>
                                }
                                    isExpanded={this.state.openContact}
                                    onPress={() => this.setState({ openContact: !this.state.openContact })}
                                >
                                    <Card>
                                        <Card.Title>Phone Number {`(${userData.hasOwnProperty('userContactNumber') && userData.userContactNumber})`}</Card.Title>
                                        <Card.Title>Email Address {`(${userData.hasOwnProperty('userEmail') && userData.userEmail})`}</Card.Title>
                                    </Card>
                                </ListItem.Accordion>
                                <Button
                                    title={"LOGOUT"}
                                    type='outline'
                                    size='sm'
                                    onPress={async () => {
                                        await AsyncStorage.clear()
                                        this.props.navigation.navigate("LoginScreen")
                                    }}
                                />
                            </View>
                        ) : (
                            <View style={styles.infoConteinr}>
                                <Input
                                    placeholder="Enter State Name"
                                    value={this.state.state}
                                    onChangeText={(e) => this.setState({ state: e })}
                                />
                                <Input
                                    placeholder="Enter Distrct Name"
                                    value={this.state.district}
                                    onChangeText={(e) => this.setState({ district: e })}
                                />
                                <Input
                                    placeholder="Enter PIN Code"
                                    value={this.state.pinCode}
                                    onChangeText={(e) => this.setState({ pinCode: e })}
                                    keyboardType='number-pad'
                                />
                                <Input
                                    placeholder="Enter Town Name"
                                    value={this.state.town}
                                    onChangeText={(e) => this.setState({ town: e })}
                                />
                                <Input
                                    placeholder="Enter Local Address"
                                    value={this.state.localAddress}
                                    onChangeText={(e) => this.setState({ localAddress: e })}
                                    multiline
                                />
                                <Button
                                    title={"UPDATE"}
                                    size='lg'
                                    color={'secondary'}
                                    onPress={this.handleUpdateMetadata}
                                />
                            </View>
                        )
                    }
                </ScrollView>
                {
                    this.state.loading && (
                        <Loader />
                    )
                }
            </KeyboardAvoidingView>
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
    root: {
        // flex: 1,
        paddingTop: 50,
        backgroundColor: colors.color_light_gray
    },
    infoConteinr: {
        marginTop: 8,
        flex: 1,
        flexGrow: 1,
        gap: 8
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen);
