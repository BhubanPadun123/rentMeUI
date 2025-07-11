// MapScreen.js
import React,{Component} from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { LeafletView } from 'react-native-leaflet-view'
import leafletContent from '../../assets/leafletContent.js'
import Loader from '../components/Loader'
import { connect } from 'react-redux'
import {
    getAllProductAction
} from "../Redux/action/product.js"

class MapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            webViewContent: null,
            loading: false,
            data: []
        };
    }

    componentDidMount() {
        // Example: multiple locations
        this.props.getAllProductAction(0, 10000, "room")
        const locations = [
            { latitude: 28.6139, longitude: 77.2090, name: 'New Delhi' },
            { latitude: 19.0760, longitude: 72.8777, name: 'Mumbai' },
            { latitude: 13.0827, longitude: 80.2707, name: 'Chennai' },
            { latitude: 12.9716, longitude: 77.5946, name: 'Bengaluru' },
        ];

        const html = leafletContent(locations);
        this.setState({ webViewContent: html });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.productListStatus === "started" && this.props.productListStatus != nextProps.productListStatus) {
            this.setState({
                loading: true
            })
        }
        if (nextProps.productListStatus === "success" && this.props.productListStatus != nextProps.productListStatus) {
            if (nextProps.productListResponse && Array.isArray(nextProps.productListResponse)) {
                const {
                    productListResponse
                } = nextProps
                const data = []
                productListResponse.forEach((item) => {
                    const {
                        metaData
                    } = item
                    const metaDataInfo = metaData ? JSON.parse(metaData) : null
                    if (metaDataInfo && metaDataInfo.hasOwnProperty('geoLocation')) {
                        const geoLocationInfo = JSON.parse(metaDataInfo.geoLocation)
                        const {
                            latitude,
                            longitude
                        } = geoLocationInfo.coords
                        data.push({
                            latitude: latitude,
                            longitude: longitude,
                            name: item.productTitle
                        })
                    }
                })
                if (data.length > 0) {
                    const html = leafletContent(data);
                    this.setState({ webViewContent: html });
                }
            }
        }
    }

    render() {
        const { webViewContent } = this.state;

        if (!webViewContent) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <LeafletView
                    source={{ html: webViewContent }}
                    renderLoading={() => <Loader />}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        productListResponse: state.product.productListResponse,
        productListError: state.product.productListError,
        productListStatus: state.product.productListStatus
    }
}

export default connect(mapStateToProps, {
    getAllProductAction
})(MapScreen);

const styles = StyleSheet.create({
    container: { flex: 1 },
    loading_container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
