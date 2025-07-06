import React, { Component } from "react";
import {
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Text,
    Image,
    TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import ProductCart from "../components/ProductCart";
import { colors, sizes } from "../styles/Theme";
import {
    getAllSpecifictProductAction,
    getAllProductAction,
} from "../Redux/action/product.js";
import SearchBar from "../components/SearchBar.js";
import CSkeleton from "../components/Skeletom.js";
import {
    Card
} from "@rneui/themed"
import {
    FontAwesome6
} from "@expo/vector-icons"

class SearchScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            product: [],
            serviceList: [],
            filteredServiceList: [],
            selectedCategory: "",
            state: 0,
        };

        const { category, type } = props.route.params || {};
        this.category = category;
        this.type = type;
    }

    componentDidMount() {
        const { navigation } = this.props
        if (this.category && this.category.hasOwnProperty("value")) {
            this.fetchProduct(this.category.value);
        }
        if (this.type === "all") {
            this.props.getAllProductAction(this.state.state, 5,"room")
        }
        this.onBlur = navigation.addListener('blur', () => {
            this.setState({
                product: [],
                loading: true
            })
        })
    }
    componentWillUnmount() {
        this.onBlur && this.onBlur()
        this.onFocus && this.onFocus()
    }
    componentDidUpdate(prevProps) {
        const {
            areaProductStatus,
            areaProductResponse,
            productListStatus,
            productListResponse,
        } = this.props;

        if (
            areaProductStatus === "success" &&
            areaProductStatus !== prevProps.areaProductStatus &&
            Array.isArray(areaProductResponse) &&
            areaProductResponse.length > 0
        ) {
            this.setState({ product: areaProductResponse, loading: false });
        } else {
            if (areaProductStatus === "success" &&
                areaProductStatus !== prevProps.areaProductStatus &&
                Array.isArray(areaProductResponse) &&
                areaProductResponse.length == 0) {
                this.setState({ product: [], loading: false });
            }
        }

        if (
            productListStatus === "success" &&
            productListStatus !== prevProps.productListStatus &&
            Array.isArray(productListResponse) &&
            productListResponse.length > 0
        ) {
            this.setState({
                product: productListResponse,
                loading: false
            });
        } else {
            if (
                productListStatus === "success" &&
                productListStatus !== prevProps.productListStatus &&
                Array.isArray(productListResponse) &&
                productListResponse.length == 0
            ) {
                this.setState({
                    product: [],
                    loading: false
                });
            }
        }
    }

    fetchProduct = (name) => {
        this.props.getAllSpecifictProductAction("all", name)
    };

    goToProductDetails = (item) => {
        this.props.navigation.replace("ServiceDetailScreen", { item });
    };

    handleSearch = (text) => {
        const searchedText = text.toLowerCase();
        const {
            areaProductResponse,
            productListResponse
        } = this.props
        const { product } = this.state;

        if (!searchedText) {
            if (areaProductResponse.length) {
                this.setState({
                    product: areaProductResponse
                })
            }
            if (productListResponse.length) {
                this.setState({
                    product: productListResponse
                })
            }
            return;
        }

        const filteredList = product.filter((p) => {
            if (!p.metaData) return false;

            let metaData;
            try {
                metaData = typeof p.metaData === "string" ? JSON.parse(p.metaData) : p.metaData;
            } catch (err) {
                return false;
            }

            const addressInfo = metaData.addressInfo || {};

            return Object.values(addressInfo).some((value) => {
                return (
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchedText)
                );
            });
        });
        this.setState({ product: filteredList });
    };


    renderCategory = ({ item }) => {
        const metaData = item && item.hasOwnProperty('metaData') ? JSON.parse(item.metaData) : null
        const images = metaData && metaData.hasOwnProperty('images') ? JSON.parse(metaData.images) : []
        return (
            <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => this.goToProductDetails(item)}
            >
                <Card containerStyle={{
                    // width: "40%",
                    flex: 1,
                    padding: 0
                }}>
                    {
                        Array.isArray(images) && images.length > 0 && (
                            <Image
                                source={{ uri: images[0] }}
                                style={{
                                    width: "100%",
                                    height: 100
                                }}
                            />
                        )
                    }
                    <Card.Title>{item.productTitle}</Card.Title>
                </Card>
            </TouchableOpacity>
        );
    };

    render() {
        const { loading, product } = this.state;
        const {
            areaProductStatus,
            productListStatus,
            productListResponse,
            areaProductResponse
        } = this.props;

        return (
            <View style={styles.container}>
                {(loading) ? (
                    <CSkeleton />
                ) : (
                    <View style={styles.container}>
                        <View style={styles.search_container}>
                            <SearchBar
                                onSearch={this.handleSearch}
                                placeholder_text="Search by place....."
                            />
                        </View>

                        {areaProductStatus === "success" &&
                            product.length > 0 &&
                            this.type !== "all" && (
                                <View style={styles.category_container}>
                                    <FlatList
                                        horizontal={false}
                                        showsHorizontalScrollIndicator={false}
                                        snapToInterval={sizes.width}
                                        decelerationRate={"normal"}
                                        numColumns={2}
                                        data={product}
                                        keyExtractor={(category) => category._id}
                                        renderItem={this.renderCategory}
                                        columnWrapperStyle={{
                                            gap: 1,
                                            padding: 0,
                                            justifyContent: 'center',
                                            marginRight: 2
                                        }}
                                    />
                                </View>
                            )}

                        {productListStatus === "success" &&
                            product.length > 0 &&
                            this.type === "all" && (
                                <FlatList
                                    // horizontal={false}
                                    showsHorizontalScrollIndicator={false}
                                    snapToInterval={sizes.width}
                                    decelerationRate={"normal"}
                                    data={product}
                                    keyExtractor={(category) => category._id}
                                    renderItem={this.renderCategory}
                                    numColumns={2}
                                    columnWrapperStyle={{
                                        gap: 1,
                                        padding: 0,
                                        justifyContent: "space-between",
                                        margin: 0
                                    }}
                                />
                            )}
                        {
                            !loading && product.length === 0 && (
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignContent: 'center'
                                }}>
                                    <View style={{
                                        width:"100%",
                                        justifyContent:'center',
                                        alignItems:'center'
                                    }}>
                                        <FontAwesome6 name="note-sticky" size={50} color="gray" />
                                    </View>
                                    <Text style={[styles.search_container]}>
                                        Properties not listed at your searching location.
                                    </Text>
                                </View>
                            )
                        }
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
    search_container: {
        marginTop: 2,
        marginBottom: 4,
        marginHorizontal: 24,
    },
    category_container: {
        marginHorizontal: 4,
    },
    list_container: {
        marginBottom: 32,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

const mapStateToProps = (state) => ({
    areaProductStatus: state.product.areaProductStatus,
    areaProductResponse: state.product.areaProductResponse,
    areaProductError: state.product.areaProductError,
    productListStatus: state.product.productListStatus,
    productListResponse: state.product.productListResponse,
    productListError: state.product.productListError,
});

const mapDispatchToProps = {
    getAllSpecifictProductAction,
    getAllProductAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
