import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import {
    getNotificationAction,
    deleteNotification,
    clearNotification,
} from "../Redux/action/product";
import { colors } from "../styles/Theme";
import Loader from "../components/Loader";
import {
    ListItem
} from "@rneui/themed"

class NotificationsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: null,
            selectedId: null,
            path: "",
            loading: true
        };
    }

    componentDidMount() {
        this.fetchUserData()
    }
    componentDidUpdate(prevProps) {
        if (this.props.getNotificationStatus === "started" && this.props.getNotificationStatus != prevProps.getNotificationStatus) {
            this.setState({
                loading: true
            })
        }
        if (this.props.getNotificationStatus === "success" && this.props.getNotificationStatus != prevProps.getNotificationStatus) {
            this.setState({
                loading: false
            })
        }
        if (this.props.deleteNotificationStatus === "started" && this.props.deleteNotificationStatus != prevProps.deleteNotificationStatus) {
            this.setState({
                loading: true
            })
        }
        if (this.props.deleteNotificationStatus === "success" && this.props.deleteNotificationStatus != prevProps.deleteNotificationStatus) {
            this.setState({
                loading: false
            }, () => {
                if (this.state.path) {
                    this.props.navigation.navigate(this.state.path)
                }
            })
        }
    }

    fetchUserData = async () => {
        const data = await AsyncStorage.getItem("currentUser");
        if (data) {
            const userData = JSON.parse(data);
            this.setState({
                userInfo: userData
            }, () => {
                this.props.getNotificationAction(userData._id)
            });
        } else {
            this.goToLogin();
        }
    };

    goToLogin = () => {
        this.props.navigation.navigate("Profile", {
            screen: "LoginScreen"
        });
    };

    goToLocation = (path, id) => {
        if (!path || !id) return;
        this.setState({
            selectedId: id,
            path: path
        }, () => {
            this.props.deleteNotification(id)
            this.props.clearNotification()
        })
    };

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (item && item.redirectLink && item._id) {
                        this.goToLocation(item.redirectLink, item._id);
                    }
                }}
            >
                <ListItem bottomDivider
                    containerStyle={{
                        flexDirection: 'column'
                    }}
                >
                    <ListItem.Title style={{ fontSize: 14, fontWeight: 'bold' }}>{item?.title}</ListItem.Title>
                    <ListItem.Subtitle style={{ textAlign: 'center', fontSize: 10 }}>{item?.message}</ListItem.Subtitle>
                </ListItem>
            </TouchableOpacity>
        );
    };

    render() {
        const {
            getNotificationStatus,
            getNotificationResponse,
        } = this.props;

        return (
            <View style={styles.container}>
                {this.state.loading && <Loader />}

                {getNotificationStatus === "success" &&
                    Array.isArray(getNotificationResponse) &&
                    getNotificationResponse.length > 0 && (
                        <FlatList
                            data={getNotificationResponse}
                            keyExtractor={(item) => item._id}
                            renderItem={this.renderItem}
                        />
                    )}

                {getNotificationStatus === "success" &&
                    Array.isArray(getNotificationResponse) &&
                    getNotificationResponse.length === 0 && (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>Notification Empty!</Text>
                        </View>
                    )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cartContainer: {
        borderWidth: 1,
        borderColor: colors.color_primary,
        minHeight: 50,
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: colors.color_light_gray,
        overflow: "hidden",
        borderRadius: 4,
    },
    titleText: {
        fontSize: 24,
        color: colors.color_white,
        fontWeight: "bold",
        textAlign: "center",
    },
    messageText: {
        fontSize: 14,
        color: colors.color_secondary,
        fontWeight: "bold",
        textAlign: "center",
    },
    emptyContainer: {
        flex: 1,
        backgroundColor: colors.color_light_gray,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        textAlign: "center",
        fontSize: 20,
        color: colors.color_secondary,
    },
});

const mapStateToProps = (state) => ({
    getNotificationError: state.product.getNotificationError,
    getNotificationResponse: state.product.getNotificationResponse,
    getNotificationStatus: state.product.getNotificationStatus,
    deleteNofiticationError: state.product.deleteNofiticationError,
    deleteNotificationResponse: state.product.deleteNotificationResponse,
    deleteNotificationStatus: state.product.deleteNotificationStatus
});
const mapDispatchToProps = {
    getNotificationAction,
    deleteNotification,
    clearNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsScreen);
