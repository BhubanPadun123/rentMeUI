import React from "react";
import {
    Text,
    ListItem,
    Card,
    Tab,
    Button
} from "@rneui/themed"
import {
    FlatList,
    View,
    StyleSheet
} from "react-native"
import { getOrgUsersAction, updateUserRoleAction } from "../Redux/action/auth";
import { connect } from "react-redux";
import Loader from "../components/Loader";
import { showTopMessage } from "../utils/ErrorHandler"
import { colors } from "../styles/Theme";

class ManageUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            users: [],
            selectedUser: null,
            role: null,
            selectedRole: null,
            filterCode: 0
        }
    }

    componentDidMount() {
        this.props.getOrgUsersAction()
    }
    componentDidUpdate(prevProps) {
        if (this.props.orgUserStatus === "started" && this.props.orgUserStatus != prevProps.orgUserStatus) {
            this.setState({
                loading: true,
                users: []
            })
        }
        if (this.props.orgUserStatus === "success" && this.props.orgUserStatus != prevProps.orgUserStatus) {
            this.setState({
                loading: false,
                users: this.props.orgUserResponse
            })
        }
        if (this.props.updateOrgUserStatus === "started" && this.props.updateOrgUserStatus != prevProps.updateOrgUserStatus) {
            this.setState({
                loading: true
            })
        }
        if (this.props.updateOrgUserStatus === "success" && this.props.updateOrgUserStatus != prevProps.updateOrgUserStatus) {
            showTopMessage("User Role updated successfully", "success")
            this.setState({
                selectedUser: null,
                loading: false,
                role: null
            }, () => {
                this.props.getOrgUsersAction()
            })
        }
    }

    handleUpdateRole = () => {
        const {
            selectedUser,
            role
        } = this.state
        if (!selectedUser || !role) return
        const data = {
            id: selectedUser,
            role: role
        }
        this.props.updateUserRoleAction(data)
    }

    handleEmplyee = ({ item, index }) => {
        if (!item) return null
        const userName = item.hasOwnProperty('userName') ? item.userName : null
        const userEmail = item.hasOwnProperty('userEmail') ? item.userEmail : null
        const userContactNumber = item.hasOwnProperty('userContactNumber') ? item.userContactNumber : null
        const userType = item.hasOwnProperty('userType') ? item.userType : null
        if (this.state.selectedRole && userType != this.state.selectedRole) return null

        return (
            <Card key={index}>
                <Card.Title>{`User Name:- ${userName}`}</Card.Title>
                <Card.Title>{`User Phone Number:- ${userContactNumber}`}</Card.Title>
                <Card.Title>{`User Email:- ${userEmail}`}</Card.Title>
                <Card.Title>{`User Role:- ${userType}`}</Card.Title>
                <Card.Divider />
                <ListItem bottomDivider onPress={() => {
                    this.setState({
                        selectedUser: this.state.selectedUser ? "" : item._id,
                        role: this.state.role ? null : "admin"
                    })
                }} >
                    <ListItem.CheckBox
                        iconType="material-community"
                        checkedIcon="checkbox-marked"
                        uncheckedIcon="checkbox-blank-outline"
                        checked={
                            this.state.selectedUser === item._id && this.state.role === "admin"
                        }
                    />
                    <ListItem.Content>
                        <ListItem.Title>Admin</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem bottomDivider onPress={() => {
                    this.setState({
                        selectedUser: this.state.selectedUser ? "" : item._id,
                        role: this.state.role ? null : "stuff"
                    })
                }}>
                    <ListItem.CheckBox
                        iconType="material-community"
                        checkedIcon="checkbox-marked"
                        uncheckedIcon="checkbox-blank-outline"
                        checked={
                            this.state.selectedUser === item._id && this.state.role === "stuff"
                        }
                    />
                    <ListItem.Content>
                        <ListItem.Title>Stuff</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <Button
                    title={"UPDATE ROLE"}
                    onPress={this.handleUpdateRole}
                    disabled={userType === "supper_admin"}
                />
            </Card>
        )
    }
    render() {
        const {
            users
        } = this.state
        return (
            <View
                style={styles.root}
            >
                <Tab
                    value={this.state.filterCode}
                    onChange={(e) => {
                        let role = ""
                        switch(e){
                            case 0:
                                role = null
                                break;
                            case 1:
                                role="owner"
                                break;
                            case 2:
                                role="customer"
                                break;
                            case 3:
                                role="stuff"
                                break;
                            case 4:
                                role="admin"
                                break;
                            case 5:
                                role="supper_admin"
                                break;
                            default:
                                role=null
                        }
                        this.setState({
                            filterCode: e,
                            selectedRole:role
                        })
                    }}
                    variant="primary"
                    indicatorStyle={{
                        padding: 0,
                        margin: 0,
                    }}
                >
                    <Tab.Item
                        title={"All-User"}
                        dense={true}
                        titleStyle={{
                            fontSize: 8,
                            padding: 0,
                            margin: 0,
                        }}
                    />
                    <Tab.Item
                        title={"Vendor"}
                        dense={true}
                        titleStyle={{
                            fontSize: 8,
                            padding: 0,
                            margin: 0,
                        }}
                    />
                    <Tab.Item
                        title={"Customer"}
                        dense={true}
                        titleStyle={{
                            fontSize: 8,
                            padding: 0,
                            margin: 0,
                        }}
                    />
                    <Tab.Item
                        title={"Stuff"}
                        dense={true}
                        titleStyle={{
                            fontSize: 8,
                            padding: 0,
                            margin: 0,
                        }}
                    />
                    <Tab.Item
                        title={"Admin"}
                        dense={true}
                        titleStyle={{
                            fontSize: 8,
                            padding: 0,
                            margin: 0,
                        }}
                    />
                    <Tab.Item
                        title={"Supper-Admin"}
                        dense={true}
                        titleStyle={{
                            fontSize: 8,
                            padding: 0,
                            margin: 0,
                        }}
                    />
                </Tab>
                {
                    users.length > 0 ? (
                        <FlatList
                            data={users}
                            keyExtractor={(item) => item._id}
                            renderItem={this.handleEmplyee}
                        />
                    ) : (
                        <Text style={{
                            textAlign:'center',
                            fontSize:20,
                            color:colors.color_primary,
                            fontWeight:'bold',
                            marginTop:100
                        }}>
                            user list empty!
                        </Text>
                    )
                }
                {
                    this.state.loading && (
                        <Loader />
                    )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    }
})
const mapStateToProps = (state) => {

    return {
        updateOrgUserStatus: state.auth.updateOrgUserStatus,
        updateOrgUserResponse: state.auth.updateOrgUserResponse,
        updateOrgUserError: state.auth.updateOrgUserError,
        orgUserStatus: state.auth.orgUserStatus,
        orgUserResponse: state.auth.orgUserResponse,
        orgUserError: state.auth.orgUserError
    }
}
const mapDispatchToProps = {
    updateUserRoleAction,
    getOrgUsersAction
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageUser)