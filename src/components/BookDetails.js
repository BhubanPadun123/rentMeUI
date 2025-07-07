import React from "react";
import {
    ScrollView,
    Text,
    Image,
    View,
} from "react-native"
import CSkeleton from "./Skeletom";
import ImageSlider from "./ImagesViewer";
import {
    Divider,
    Button,
    Card,
    Dialog,
    Input
} from "@rneui/themed"
import { colors, sizes } from "../styles/Theme";
import { showTopMessage } from "../utils/ErrorHandler";
import Loader from "./Loader";


class BookDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            product: [],
            loading: true,
            images: [],
            metaData: null,
            availableStatus: null,
            productId: null,
            productTitle: "",
            productType: "",
            vendorRef: "",
            vendorInfo: null,
            openDialog: false,
            customerName: "",
            customerPhoneNumber: "",
            bookDeliveryAddress: ""
        }
    }
    componentDidMount() {
        if (this.props.product) {
            const {
                _id,
                availableStatus,
                metaData,
                productTitle,
                productType,
                vendorRef,
            } = this.props.product
            setTimeout(() => {
                this.setState({
                    product: this.props.product,
                    loading: false,
                    images: metaData ? JSON.parse(metaData).images : [],
                    metaData: metaData ? JSON.parse(metaData) : null,
                    availableStatus: availableStatus,
                    productId: _id,
                    productTitle: productTitle,
                    productType: productType,
                    vendorRef: vendorRef,
                    vendorInfo: metaData ? JSON.parse(JSON.parse(metaData).vendorInfo) : null
                })
            }, 2000)
        }
    }
    handleBooking = () => {
        const user = this.props.userInfo
        const {
            vendorRef,
            productId,
            customerName,
            customerPhoneNumber,
            bookDeliveryAddress,
            metaData
        } = this.state
        if (!user || !vendorRef || !productId || !customerName || !customerPhoneNumber || !bookDeliveryAddress || !metaData) {
            showTopMessage("Please Fill All The Form Details", "info")
            return
        }
        const data = {
            vendorRef: vendorRef,
            bookingStatus: 1,
            customerRef: user._id,
            productRef:productId,
            bookingDate: JSON.stringify({
                ...metaData,
                customer: {
                    customerName,
                    customerPhoneNumber,
                    bookDeliveryAddress,
                }
            })
        }
        this.setState({
            openDialog:false,
        },()=>{
            this.props.handleOrderBook(data)
        })
    }

    render() {
        const {
            metaData,
            images,
            vendorInfo
        } = this.state
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    flex: 1
                }}
            >
                {
                    this.state.product && !this.state.loading && (
                        <View style={{
                            gap: 4,
                            paddingBottom: 50
                        }}>
                            <ImageSlider
                                images={images ? JSON.parse(images) : []}
                            />
                            <View style={{
                                gap: 4
                            }}>
                                <Text style={{
                                    fontSize: 20,
                                    textAlign: 'center',
                                    fontWeight: 'bold'
                                }}>{this.state.productTitle},{metaData && metaData.hasOwnProperty('catagory') && metaData.catagory}</Text>
                                <Text style={{
                                    textAlign: 'center'
                                }}>
                                    Market Price of the book Rs:- {metaData && metaData.hasOwnProperty('originalPrice') && metaData.originalPrice}
                                </Text>
                                <Text style={{
                                    textAlign: 'center'
                                }}>Now Selling price of the book Rs:- {metaData && metaData.hasOwnProperty('sellingPrice') && metaData.sellingPrice}</Text>
                            </View>
                            <Card containerStyle={{
                                elevation: 0,
                                backgroundColor: colors.color_light_gray
                            }}>
                                <Card.Title>Book Author {metaData && metaData.hasOwnProperty('bookAuthor') && metaData.bookAuthor}</Card.Title>
                                <Card.Divider />
                                {
                                    metaData && metaData.hasOwnProperty('bookMedium') && (
                                        <>
                                            <Card.Title>Medium {metaData.bookMedium}</Card.Title>
                                            <Card.Divider />
                                        </>
                                    )
                                }
                                <Card.Title>{metaData && metaData.hasOwnProperty('description') && metaData.description}</Card.Title>
                            </Card>
                            <Card containerStyle={{
                                elevation: 0,
                                backgroundColor: colors.color_light_gray
                            }}>
                                <Card.Title>Book Seller Address</Card.Title>
                                <Card.Divider />
                                {
                                    vendorInfo && (
                                        <View>
                                            <Text>{vendorInfo.hasOwnProperty('district') && vendorInfo.district}</Text>
                                            <Text>{vendorInfo.hasOwnProperty('localAddress') && vendorInfo.localAddress}</Text>
                                            <Text>{vendorInfo.hasOwnProperty('pinCode') && vendorInfo.pinCode}</Text>
                                            <Text>{vendorInfo.hasOwnProperty('state') && vendorInfo.state}</Text>
                                            <Text>{vendorInfo.hasOwnProperty('town') && vendorInfo.town}</Text>
                                        </View>
                                    )
                                }
                            </Card>
                            <Dialog
                                isVisible={this.state.openDialog}
                                overlayStyle={{
                                    height: sizes.height,
                                    width: sizes.width,
                                    padding: 0,
                                    margin: 0,
                                    backgroundColor: colors.color_light_gray
                                }}
                                children={
                                    <ScrollView>
                                        <View style={{
                                            flexDirection: 'column',
                                            gap: 4,
                                            marginVertical: 20,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: sizes.height
                                        }}>
                                            <Text style={{
                                                textAlign: 'center',
                                                fontSize: 14
                                            }}>Fill The Form For Complete The Order</Text>
                                            <Divider />
                                            <Input
                                                placeholder="Enter Full Name"
                                                value={this.state.customerName}
                                                onChangeText={(e) => {
                                                    this.setState({
                                                        customerName: e
                                                    })
                                                }}
                                            />
                                            <Input
                                                placeholder="Enter Phone Number"
                                                keyboardType='number-pad'
                                                value={this.state.customerPhoneNumber}
                                                onChangeText={(e) => {
                                                    this.setState({
                                                        customerPhoneNumber: e
                                                    })
                                                }}
                                            />
                                            <Input
                                                placeholder="Delivery Address Full Details"
                                                multiline
                                                value={this.state.bookDeliveryAddress}
                                                onChangeText={(e) => {
                                                    this.setState({
                                                        bookDeliveryAddress: e
                                                    })
                                                }}
                                            />
                                            <Button
                                                title={"SUBMIT"}
                                                onPress={this.handleBooking}
                                            />
                                            <Button
                                                title={"CANCEL"}
                                                onPress={() => {
                                                    this.setState({
                                                        openDialog: !this.state.openDialog
                                                    })
                                                }}
                                            />
                                        </View>
                                    </ScrollView>
                                }
                            />

                            <Button
                                title={"BUY NOW"}
                                style={{
                                    marginHorizontal: 10
                                }}
                                onPress={()=>{
                                    this.setState({
                                        openDialog:true
                                    })
                                }}
                            />
                        </View>
                    )
                }
                {
                    this.state.loading && (
                        <CSkeleton />
                    )
                }
                {
                    this.props.bookingStatus === "started" && (
                        <Loader/>
                    )
                }
            </ScrollView>
        )
    }
}

export default BookDetails
