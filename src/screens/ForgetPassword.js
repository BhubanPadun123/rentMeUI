import React from "react";
import {
    Input,
    Text,
    Header,
    Button
} from "@rneui/themed"
import {
    View,
    StyleSheet,
    TouchableOpacity
} from "react-native"
import { colors } from "../styles/Theme";
import {
    Fontisto,
    AntDesign,
    Feather
} from "@expo/vector-icons"
import Loader from "../components/Loader";
import { connect } from "react-redux";
import { forgetPasswordAction } from "../Redux/action/auth";
import { showTopMessage } from "../utils/ErrorHandler";
import { isValidEmail } from "../utils/utils";


class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isViewPass: false,
            isViewCPass: false,
            email:"",
            pass:"",
            cPass:""
        }
    }

    componentDidUpdate(nextProps){
        if(this.props.forgetPasswordStatus === "success" && nextProps.forgetPasswordStatus != this.props.forgetPasswordStatus){
            showTopMessage("Password reset successfull","success")
            this.props.navigation.navigate("LoginScreen")
        }
        if(this.props.forgetPasswordStatus === "failed" && nextProps.forgetPasswordStatus != this.props.forgetPasswordStatus){
            console.log(this.props.forgetPasswordError)
        }
    }

    componentWillUnmount(){
        this.setState({
            cPass:"",
            pass:""
        })
    }

    handleResetPass=()=>{
        const {
            email,
            pass,
            cPass
        } = this.state
        if(!pass || !email || !cPass){
            showTopMessage("Please fill the all field value","info")
            return
        }
        if(cPass !== pass){
            showTopMessage("Entered password misMatch!","info")
            return
        }
        const isValid = isValidEmail(email)
        if(!isValid){
            showTopMessage("Invalid email !","info")
            return
        }
        const data={
            userEmail:email,
            password:pass
        }
        this.props.forgetPasswordAction(data)
    }
    render() {
        return (
            <View style={styles.root}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    letterSpacing: 1.2
                }}>
                    Reset Password
                </Text>
                <Input
                    placeholder="Enter Email Address"
                    leftIcon={<Fontisto name="email" size={24} color="black" />}
                    value={this.state.email}
                    onChangeText={(e)=> this.setState({email:e})}
                />
                <Input
                    placeholder="Enter New Password"
                    rightIcon={
                        <TouchableOpacity
                            onPress={() => this.setState({ isViewPass: !this.state.isViewPass })}
                        >
                            {
                                !this.state.isViewPass ? <Feather name="eye-off" size={24} color="black" /> : <AntDesign name="eyeo" size={24} color="black" />
                            }
                        </TouchableOpacity>
                    }
                    secureTextEntry={this.state.isViewPass ? false : true}
                    value={this.state.pass}
                    onChangeText={(e)=> this.setState({pass:e})}
                />
                <Input
                    placeholder="Confirm Password"
                    rightIcon={
                        <TouchableOpacity
                            onPress={() => this.setState({ isViewCPass: !this.state.isViewCPass })}
                        >
                            {
                                !this.state.isViewCPass ? <Feather name="eye-off" size={24} color="black" />: <AntDesign name="eyeo" size={24} color="black" />
                            }
                        </TouchableOpacity>
                    }
                    secureTextEntry={this.state.isViewCPass ? false : true}
                    value={this.state.cPass}
                    onChangeText={(e)=> this.setState({cPass:e})}
                />
                <Button
                    title={"Reset"}
                    size='lg'
                    type='outline'
                    onPress={this.handleResetPass}
                />
                {
                    this.props.forgetPasswordStatus === "started" && (
                        <Loader/>
                    )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.color_light_gray,
        gap: 8
    },
})

const mapStateToProps = (state) => {
    const {
        forgetPasswordError,
        forgetPasswordResponse,
        forgetPasswordStatus
    } = state.auth
    return {
        forgetPasswordError,
        forgetPasswordResponse,
        forgetPasswordStatus
    }
}

const mapDispatchToProps = {
    forgetPasswordAction
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword)