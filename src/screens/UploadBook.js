import React,{Component} from "react";
import {
    Text,
    Divider,
    Input,
    ListItem,
    Button
} from "@rneui/themed"
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View
} from "react-native"
import { colors } from "../styles/Theme";
import {
    FontAwesome
} from "@expo/vector-icons"
import ImagePickerBar from "../components/MultiUploadImageBar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from "../components/Loader";
import { addProductAction } from "../Redux/action/product";
import { connect } from "react-redux";
import { showTopMessage } from "../utils/ErrorHandler";

class UploadBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookType: "",
            user: null,
            bookName: "",
            bookMedium: "",
            bookAuthor: "",
            originalPrice: "",
            sellingPrice: "",
            description: "",
            images: [],
            catagory: "",
            loading: false
        }
    }
    componentDidMount() {
        this.fetchUserData()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.addProductStatus === "started" && nextProps.addProductStatus != this.props.addProductStatus) {
            this.setState({
                loading: true
            })
        }
        if (nextProps.addProductStatus === "success" && nextProps.addProductStatus != this.props.addProductStatus) {
            this.setState({
                bookType: "",
                user: null,
                bookName: "",
                bookMedium: "",
                bookAuthor: "",
                originalPrice: "",
                sellingPrice: "",
                description: "",
                images: [],
                catagory: "",
                loading: false
            }, () => {
                showTopMessage("Book uploaded successfully!","success")
            })
        }
    }

    fetchUserData = async () => {
        const userInfo = await AsyncStorage.getItem("currentUser");
        if (userInfo) {
            this.setState({
                user: JSON.parse(userInfo)
            })
        } else {
            this.props.navigation.navigate("Profile", {
                screen: "LoginScreen"
            })
        }
    }
    handleUpload = () => {
        const {
            bookAuthor,
            bookMedium,
            bookName,
            bookType,
            originalPrice,
            sellingPrice,
            images,
            catagory,
            description,
        } = this.state
        const data = {
            bookAuthor,
            bookMedium,
            bookName,
            bookType,
            originalPrice,
            sellingPrice,
            images,
            catagory,
            description,
        }
        let error = false
        Object.entries(data).map((item) => {
            if (!item[1]) {
                error = true
            }
        })
        if (error) {
            showTopMessage("Please fill all the mandatory detail!", "info")
            return
        }
        if (!this.state.user) {
            this.props.navigation.navigate("Profile", {
                screen: "LoginScreen"
            })
            return
        }
        const uploadData = {
            vendorRef: this.state.user._id,
            tag:"book",
            productTitle: bookName,
            availableStatus: true,
            productType: bookType,
            postAt: new Date(),
            propertyOccupancy: ["all"],
            metaData: JSON.stringify({
                vendorInfo: this.state.user.metaData,
                bookAuthor,
                bookMedium,
                originalPrice,
                sellingPrice,
                images,
                catagory,
                description,
            })
        }
        this.props.addProductAction(uploadData)
    }
    render() {
        console.log(this.state.user)
        return (
            <KeyboardAvoidingView>
                <ScrollView>
                    <View style={styles.root}>
                        <Text style={{
                            textAlign: 'center',
                            padding: 4,
                            fontSize: 16,
                            fontWeight: 'bold'
                        }}>Fill all the book details for sell</Text>
                        <Divider style={{ marginTop: 20 }} />
                        <Input
                            placeholder="Enter Book Name*"
                            value={this.state.bookName}
                            onChangeText={(e)=> this.setState({bookName:e})}
                        />
                        <View>
                            <Text style={{
                                textAlign: 'center',
                                color: 'red'
                            }}>Select book catagory*</Text>
                            <ListItem containerStyle={{
                                backgroundColor: colors.color_light_gray,
                                elevation: 0
                            }} onPress={() => this.setState({ bookType: "academic" })} >
                                <ListItem.CheckBox containerStyle={{
                                    backgroundColor: colors.color_light_gray
                                }} checked={this.state.bookType === "academic"} />
                                <ListItem.Title>Academic Book</ListItem.Title>
                            </ListItem>
                            <ListItem containerStyle={{
                                backgroundColor: colors.color_light_gray,
                                elevation: 0
                            }} onPress={() => this.setState({ bookType: "gov_exam" })}>
                                <ListItem.CheckBox containerStyle={{
                                    backgroundColor: colors.color_light_gray
                                }} checked={this.state.bookType === "gov_exam"} />
                                <ListItem.Title>Gov Exam Book</ListItem.Title>
                            </ListItem>
                            <ListItem containerStyle={{
                                backgroundColor: colors.color_light_gray,
                                elevation: 0
                            }} onPress={() => this.setState({ bookType: "entrance_exam" })}>
                                <ListItem.CheckBox containerStyle={{
                                    backgroundColor: colors.color_light_gray
                                }} checked={this.state.bookType === "entrance_exam"} />
                                <ListItem.Title>Entrace Eaxm Book</ListItem.Title>
                            </ListItem>
                            <ListItem containerStyle={{
                                backgroundColor: colors.color_light_gray,
                                elevation: 0
                            }} onPress={() => this.setState({ bookType: "nobel" })} >
                                <ListItem.CheckBox containerStyle={{
                                    backgroundColor: colors.color_light_gray
                                }} checked={this.state.bookType === "nobel"} />
                                <ListItem.Title>Nobel Book</ListItem.Title>
                            </ListItem>
                            <ListItem containerStyle={{
                                backgroundColor: colors.color_light_gray,
                                elevation: 0
                            }} onPress={() => this.setState({ bookType: "other" })} >
                                <ListItem.CheckBox containerStyle={{
                                    backgroundColor: colors.color_light_gray
                                }} checked={this.state.bookType === "other"} />
                                <ListItem.Title>Other Book</ListItem.Title>
                            </ListItem>
                        </View>
                        {
                            this.state.bookType === "entrance_exam" && (
                                <Input
                                    placeholder="Enter Entrace Exam Name*"
                                    value={this.state.catagory}
                                    onChangeText={(e) => this.setState({ catagory: e })}
                                />
                            )
                        }
                        {
                            this.state.bookType === "gov_exam" && (
                                <Input
                                    placeholder="Enter Gov Exam Name*"
                                    value={this.state.catagory}
                                    onChangeText={(e) => this.setState({ catagory: e })}
                                />
                            )
                        }
                        {
                            this.state.bookType === "academic" && (
                                <Input
                                    placeholder="Enter Class Name*"
                                    value={this.state.catagory}
                                    onChangeText={(e) => this.setState({ catagory: e })}
                                />
                            )
                        }
                        <Input
                            placeholder="Medium (Assamese or English or Hindi)*"
                            value={this.state.bookMedium}
                            onChangeText={(e) => this.setState({ bookMedium: e })}
                        />
                        <Input
                            placeholder="Book Author Name*"
                            value={this.state.bookAuthor}
                            onChangeText={(e) => this.setState({ bookAuthor: e })}
                        />
                        <Input
                            placeholder="Enter Book Original Price*"
                            value={this.state.originalPrice}
                            onChangeText={(e) => this.setState({ originalPrice: e })}
                        />
                        <Input
                            placeholder="Enter Your Book Price*"
                            value={this.state.sellingPrice}
                            onChangeText={(e) => this.setState({ sellingPrice: e })}
                        />
                        <Input
                            placeholder="Enter some lines of description*"
                            multiline
                            value={this.state.description}
                            onChangeText={(e) => this.setState({ description: e })}
                        />
                        <Button
                            title={"Upload Book Images"}
                            icon={<FontAwesome name="cloud-upload" size={24} color="white" />}
                            iconPosition='right'
                            children={
                                <ImagePickerBar
                                    onType={(e) => { this.setState({ images: e }) }}
                                    value={this.state.images}
                                    placeholder={"Upload Book Images"}
                                    onUpload={(e) => {
                                        if (e) {
                                            this.setState({
                                                loading: true
                                            })
                                        } else {
                                            this.setState({
                                                loading: false
                                            })
                                        }
                                    }}
                                />
                            }
                            containerStyle={{
                                padding: 0,
                                margin: 0
                            }}
                        />
                        <Button
                            title={"UPLOAD"}
                            onPress={this.handleUpload}
                        />
                    </View>
                    {
                        this.state.loading && (
                            <Loader />
                        )
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.color_light_gray,
        gap: 4
    }
})
const mapStateToProps = (state) => {
    return {
        addProductError: state.product.addProductError,
        addProductResponse: state.product.addProductResponse,
        addProductStatus: state.product.addProductStatus
    }
}
export default connect(mapStateToProps, {
    addProductAction
})(UploadBooks)