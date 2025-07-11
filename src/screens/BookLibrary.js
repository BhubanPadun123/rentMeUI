import React,{Component} from "react";
import {
    Text,
    Card
} from "@rneui/themed"
import {
    FlatList,
    View,
    StyleSheet,
    TouchableNativeFeedback,
    Image
} from "react-native"
import {
    getAllProductAction
} from "../Redux/action/product"
import { connect } from "react-redux";
import CSkeleton from "../components/Skeletom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchBar from "../components/SearchBar";

class BookLibrary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: null,
            product: []
        }
    }

    componentDidMount() {
        this.fetchUserData()
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.productListStatus === "started" && nextProps.productListStatus != this.props.productListStatus) {
            this.setState({
                loading: true
            })
        }
        if (nextProps.productListStatus === "success" && nextProps.productListStatus != this.props.productListStatus) {
            this.setState({
                loading: false,
                product: nextProps.productListResponse
            })
        }
    }
    fetchUserData = async () => {
        const userInfo = await AsyncStorage.getItem("currentUser");
        if (userInfo) {
            this.setState({
                user: JSON.parse(userInfo)
            }, () => {
                this.props.getAllProductAction(0, 10, "book")
            })
        } else {
            this.props.navigation.navigate("Profile", {
                screen: "LoginScreen"
            })
        }
    }
    handleSearch = (e) => {
        const allProduct = this.props.productListResponse
        if (!allProduct || !Array.isArray(allProduct)) return null
        const filterItem = allProduct.filter((item) => {
            return (
                item.productTitle &&
                item.productTitle.toLowerCase().includes(e.toLowerCase())
            );
        });
        if(filterItem){
            this.setState({
                product:filterItem
            })
        }else{
            this.setState({
                allProduct
            })
        }
    }
    handleViewBook=(book)=>{
        if(!book) return
        console.log(book)
        this.props.navigation.navigate("Home",{
            screen:"ServiceDetailScreen",
            params:{book}
        })
    }
    render() {
        const {
            product
        } = this.state

        return (
            <View style={styles.root}>
                <View style={{
                    paddingHorizontal:20,
                    paddingTop:20
                }}>
                    <SearchBar
                        placeholder_text={"Search by book name.."}
                        onSearch={(e) => this.handleSearch(e)}
                    />
                </View>
                <View style={{
                    width: "100%",
                    paddingBottom:80
                }}>
                    {
                        product && Array.isArray(product) && product.length > 0 && (
                            <FlatList
                                data={product}
                                keyExtractor={(e) => e._id}
                                // numColumns={2}
                                renderItem={(item) => {
                                    if (!item) return null
                                    const metaData = item.item.hasOwnProperty('metaData') ? JSON.parse(item.item.metaData) : null
                                    const images = metaData && metaData.hasOwnProperty('images') ? JSON.parse(metaData.images) : []
                                    return (
                                        <TouchableNativeFeedback onPress={()=> this.handleViewBook(item.item)} >
                                            <Card containerStyle={{
                                                padding: 0,
                                                width: "auto"
                                            }}>
                                                {
                                                    images && images.length > 0 && (
                                                        <Image
                                                            source={{ uri: images[0] }}
                                                            style={{
                                                                height: 200,
                                                                width: "100%"
                                                            }}
                                                            resizeMode='center'
                                                        />
                                                    )
                                                }
                                                <Card.Divider />
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <Card.Title>
                                                        {item.item && item.item.hasOwnProperty('productTitle') && item.item.productTitle},
                                                    </Card.Title>
                                                    <Card.Title>
                                                        {metaData && metaData.hasOwnProperty('catagory') && metaData.catagory},
                                                    </Card.Title>
                                                    <Card.Title>{metaData && metaData.hasOwnProperty('bookMedium') && metaData.bookMedium}</Card.Title>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'column',
                                                    justifyContent: 'flex-start'
                                                }}>
                                                    <Card.Title style={{
                                                        textAlign: 'center',
                                                    }}>
                                                        Market Price Rs. {metaData && metaData.hasOwnProperty('originalPrice') && metaData.originalPrice}
                                                    </Card.Title>
                                                    <Card.Title>Now Selling Price Rs.{metaData && metaData.hasOwnProperty('sellingPrice') && metaData.sellingPrice}</Card.Title>
                                                    <Card.Title>Book Author Name: {metaData && metaData.hasOwnProperty('bookAuthor') && metaData.bookAuthor}</Card.Title>
                                                </View>
                                            </Card>
                                        </TouchableNativeFeedback>
                                    )
                                }}
                            />
                        )
                    }
                </View>
                {
                    this.state.loading && (
                        <CSkeleton />
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
        productListResponse: state.product.productListResponse,
        productListError: state.product.productListError,
        productListStatus: state.product.productListStatus
    }
}

export default connect(mapStateToProps, {
    getAllProductAction
})(BookLibrary)