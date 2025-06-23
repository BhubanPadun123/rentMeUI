import React, { Component } from "react";
import {
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Text
} from "react-native";
import { connect } from "react-redux";
import CardMedium from "../components/CardMedium";
import ProductCart from "../components/ProductCart";
import { colors, sizes } from "../styles/Theme";
import userImages from "../utils/UserImageUtils";
import {
    getAllSpecifictProductAction,
    getAllProductAction,
} from "../Redux/action/product.js";
import SearchBar from "../components/SearchBar.js";

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
            this.props.getAllProductAction(this.state.state, 5)
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
        this.props.navigation.navigate("ServiceDetailScreen", { item });
    };

    handleSearch = (text) => {
        const searchedText = text.toLowerCase();
        const {
            areaProductResponse,
            productListResponse
        } = this.props
        const { product } = this.state;

        if (!searchedText) {
            if(areaProductResponse.length){
                this.setState({
                    product:areaProductResponse
                })
            }
            if(productListResponse.length){
                this.setState({
                    product:productListResponse
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
        return (
            <ProductCart
                category={item}
                isSelected={this.state.selectedCategory === item.title}
                onPress={() => this.goToProductDetails(item)}
                key={item.title}
            />
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
                    <ActivityIndicator
                        style={styles.loadingIndicator}
                        size="large"
                        color={colors.color_primary}
                    />
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
                                        data={product}
                                        keyExtractor={(category) => category._id}
                                        renderItem={this.renderCategory}
                                    />
                                </View>
                            )}

                        {productListStatus === "success" &&
                            product.length > 0 &&
                            this.type === "all" && (
                                <FlatList
                                    horizontal={false}
                                    showsHorizontalScrollIndicator={false}
                                    snapToInterval={sizes.width}
                                    decelerationRate={"normal"}
                                    data={product}
                                    keyExtractor={(category) => category._id}
                                    renderItem={this.renderCategory}
                                />
                            )}
                        {
                            !loading && product.length === 0 && (
                                <Text style={[styles.search_container]}>
                                    Property Not Available In This Catagory Yet!
                                </Text>
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
        marginTop: 10,
        marginBottom: 12,
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
