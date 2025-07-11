// MapScreen.js
import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { LeafletView } from 'react-native-leaflet-view'
import leafletContent from '../../assets/leafletContent.js'
import Loader from '../components/Loader'
import { connect } from 'react-redux'
import {
    getAllProductAction
} from "../Redux/action/product.js"
import { sizes } from '../styles/Theme.js';

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
        const { item } = this.props.route.params
        if(item && item.hasOwnProperty('metaData')){
            const {
                metaData
            } = item
            const metaDataInfo = JSON.parse(metaData)
            if(metaDataInfo && metaDataInfo.hasOwnProperty('geoLocation')){
                const {geoLocation} = metaDataInfo
                const geoLocationInfo = JSON.parse(geoLocation)
                const {
                    latitude,
                    longitude
                } = geoLocationInfo.coords
                const data=[
                    {
                        latitude: latitude, longitude: longitude, name: item.productTitle
                    }
                ]
        
                const html = leafletContent(data);
                this.setState({ webViewContent: html });
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
    container: { 
        flex: 1,
        height:sizes.height
    },
    loading_container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
