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
    Button,
    PricingCard
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
                <View style={{
                    marginTop: 40,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: '400'
                    }}>Your Account</Text>
                </View>
                <View>
                    <PricingCard
                        title="Bhuban Padun"
                        containerStyle={{
                            padding: 0,
                        }}
                        wrapperStyle={{
                            padding: 0,
                            margin: 0,
                            gap: 0,
                            // height:30,
                            display: 'flex',
                            flexDirection: 'row',
                            elevation: 4,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        button={{
                            title: "Edit",
                            icon: <AntDesign name="edit" size={24} color="gray" />,
                            size: "sm",
                            style: {
                                width: "auto",
                                padding: 2
                            },
                            onPress:()=>{
                                this.props.navigation.navigate("UpdateUser")
                            }
                        }}
                    />
                </View>
                <View style={styles.btnContainer}>
                    <Card
                        children={
                            <View style={{
                                gap:4
                            }}>
                                <ListItem
                                    containerStyle={{
                                        padding: 0,
                                        borderWidth:1,
                                        borderColor:'gray',
                                        paddingHorizontal:4,
                                        borderRadius:4
                                    }}
                                >
                                    <ListItem.Content style={{
                                        padding:0,
                                        margin:0,
                                        display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'space-between',
                                        alignItems:'center'
                                    }}>
                                        <ListItem.Title>My Favorites</ListItem.Title>
                                        <Button 
                                           icon={<AntDesign name="arrowright" size={24} color="black" />}
                                           type='clear'
                                           onPress={()=> this.props.navigation.navigate("MyFav")}
                                        />
                                    </ListItem.Content>
                                </ListItem>
                                <ListItem
                                    containerStyle={{
                                        padding: 0,
                                        borderWidth:1,
                                        borderColor:'gray',
                                        paddingHorizontal:4,
                                        borderRadius:4
                                    }}
                                >
                                    <ListItem.Content style={{
                                        padding:0,
                                        margin:0,
                                        display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'space-between',
                                        alignItems:'center'
                                    }}>
                                        <ListItem.Title>Update Location</ListItem.Title>
                                        <Button 
                                           icon={<AntDesign name="arrowright" size={24} color="black" />}
                                           type='clear'
                                           onPress={()=> this.props.navigation.navigate("UpdateLocation")}
                                        />
                                    </ListItem.Content>
                                </ListItem>
                                <ListItem
                                    containerStyle={{
                                        padding: 0,
                                        borderWidth:1,
                                        borderColor:'gray',
                                        paddingHorizontal:4,
                                        borderRadius:4
                                    }}
                                >
                                    <ListItem.Content style={{
                                        padding:0,
                                        margin:0,
                                        display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'space-between',
                                        alignItems:'center'
                                    }}>
                                        <ListItem.Title>Request Books or Rooms</ListItem.Title>
                                        <Button 
                                           icon={<AntDesign name="arrowright" size={24} color="black" />}
                                           type='clear'
                                           onPress={()=> this.props.navigation.navigate("Request")}
                                        />
                                    </ListItem.Content>
                                </ListItem>
                                <ListItem
                                    containerStyle={{
                                        padding: 0,
                                        borderWidth:1,
                                        borderColor:'gray',
                                        paddingHorizontal:4,
                                        borderRadius:4
                                    }}
                                >
                                    <ListItem.Content style={{
                                        padding:0,
                                        margin:0,
                                        display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'space-between',
                                        alignItems:'center'
                                    }}>
                                        <ListItem.Title>Privacy Policy</ListItem.Title>
                                        <Button 
                                           icon={<AntDesign name="arrowright" size={24} color="black" />}
                                           type='clear'
                                           onPress={()=> this.props.navigation.navigate("Privacy")}
                                        />
                                    </ListItem.Content>
                                </ListItem>
                                <ListItem
                                    containerStyle={{
                                        padding: 0,
                                        borderWidth:1,
                                        borderColor:'gray',
                                        paddingHorizontal:4,
                                        borderRadius:4
                                    }}
                                >
                                    <ListItem.Content style={{
                                        padding:0,
                                        margin:0,
                                        display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'space-between',
                                        alignItems:'center'
                                    }}>
                                        <ListItem.Title>Terms & Condition</ListItem.Title>
                                        <Button 
                                           icon={<AntDesign name="arrowright" size={24} color="black" />}
                                           type='clear'
                                           onPress={()=> this.props.navigation.navigate("TermAndCondition")}
                                        />
                                    </ListItem.Content>
                                </ListItem>
                                <ListItem
                                    containerStyle={{
                                        padding: 0,
                                        borderWidth:1,
                                        borderColor:'gray',
                                        paddingHorizontal:4,
                                        borderRadius:4
                                    }}
                                >
                                    <ListItem.Content style={{
                                        padding:0,
                                        margin:0,
                                        display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'space-between',
                                        alignItems:'center'
                                    }}>
                                        <ListItem.Title>Support us</ListItem.Title>
                                        <Button 
                                           icon={<AntDesign name="arrowright" size={24} color="black" />}
                                           type='clear'
                                           onPress={()=> this.props.navigation.navigate("SupportUs")}
                                        />
                                    </ListItem.Content>
                                </ListItem>
                                <ListItem
                                    containerStyle={{
                                        padding: 0,
                                        borderWidth:1,
                                        borderColor:'gray',
                                        paddingHorizontal:4,
                                        borderRadius:4
                                    }}
                                >
                                    <ListItem.Content style={{
                                        padding:0,
                                        margin:0,
                                        display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'space-between',
                                        alignItems:'center'
                                    }}>
                                        <ListItem.Title>FAQ</ListItem.Title>
                                        <Button 
                                           icon={<AntDesign name="arrowright" size={24} color="black" />}
                                           type='clear'
                                           onPress={()=> this.props.navigation.navigate("FAQ")}
                                        />
                                    </ListItem.Content>
                                </ListItem>
                                <ListItem
                                    containerStyle={{
                                        padding: 0,
                                        borderWidth:1,
                                        borderColor:'gray',
                                        paddingHorizontal:4,
                                        borderRadius:4
                                    }}
                                >
                                    <ListItem.Content style={{
                                        padding:0,
                                        margin:0,
                                        display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'space-between',
                                        alignItems:'center'
                                    }}>
                                        <ListItem.Title>Feedback</ListItem.Title>
                                        <Button 
                                           icon={<AntDesign name="arrowright" size={24} color="black" />}
                                           type='clear'
                                           onPress={()=> this.props.navigation.navigate("Feedback")}
                                        />
                                    </ListItem.Content>
                                </ListItem>
                                <ListItem
                                    containerStyle={{
                                        padding: 0,
                                        borderWidth:1,
                                        borderColor:'gray',
                                        paddingHorizontal:4,
                                        borderRadius:4
                                    }}
                                >
                                    <ListItem.Content style={{
                                        padding:0,
                                        margin:0,
                                        display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'space-between',
                                        alignItems:'center'
                                    }}>
                                        <ListItem.Title>Connect us</ListItem.Title>
                                        <Button 
                                           icon={<AntDesign name="arrowright" size={24} color="black" />}
                                           type='clear'
                                           onPress={()=> this.props.navigation.navigate("AboutUs")}
                                        />
                                    </ListItem.Content>
                                </ListItem>
                                <ListItem
                                    containerStyle={{
                                        padding: 0,
                                        borderWidth:1,
                                        borderColor:'gray',
                                        paddingHorizontal:4,
                                        borderRadius:4
                                    }}
                                >
                                    <ListItem.Content style={{
                                        padding:0,
                                        margin:0,
                                        display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'space-between',
                                        alignItems:'center'
                                    }}>
                                        <ListItem.Title>Invite</ListItem.Title>
                                        <Button 
                                           icon={<AntDesign name="arrowright" size={24} color="black" />}
                                           type='clear'
                                        />
                                    </ListItem.Content>
                                </ListItem>
                                <ListItem
                                    containerStyle={{
                                        padding: 0,
                                        borderWidth:1,
                                        borderColor:'gray',
                                        paddingHorizontal:4,
                                        borderRadius:4
                                    }}
                                >
                                    <ListItem.Content style={{
                                        padding:0,
                                        margin:0,
                                        display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'space-between',
                                        alignItems:'center'
                                    }}>
                                        <ListItem.Title>Logout</ListItem.Title>
                                        <Button 
                                           icon={<AntDesign name="arrowright" size={24} color="black" />}
                                           type='clear'
                                        />
                                    </ListItem.Content>
                                </ListItem>
                            </View>
                        }
                    />
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
        gap: 20
    },
    btnWrapper: {
        gap: 20
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen);
