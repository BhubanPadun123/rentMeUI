import React,{Component} from "react";

import {
    Skeleton,
} from "@rneui/themed"
import { sizes } from "../styles/Theme";
import {
    View,
    StyleSheet
} from "react-native"
import {
    LinearProgress
} from "@rneui/base"

class CSkeleton extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={{
                width:sizes.width,
                flex:1,
                display:'flex',
                flexDirection:'row',
                gap:4
            }}>
                <View style={styles.root}>
                    <Skeleton
                        animation='pulse'
                        width={sizes.width / 2}
                        height={100}
                        LinearGradientComponent={LinearProgress}
                    />
                    <Skeleton
                        animation='pulse'
                        width={sizes.width / 2}
                        height={100}
                        LinearGradientComponent={LinearProgress}
                    />
                    <Skeleton
                        animation='pulse'
                        width={sizes.width / 2}
                        height={100}
                        LinearGradientComponent={LinearProgress}
                    />
                    <Skeleton
                        animation='pulse'
                        width={sizes.width / 2}
                        height={100}
                        LinearGradientComponent={LinearProgress}
                    />
                    <Skeleton
                        animation='pulse'
                        width={sizes.width / 2}
                        height={100}
                        LinearGradientComponent={LinearProgress}
                    />
                </View>
                <View style={styles.root}>
                    <Skeleton
                        animation='pulse'
                        width={sizes.width / 2}
                        height={100}
                        LinearGradientComponent={LinearProgress}
                    />
                    <Skeleton
                        animation='pulse'
                        width={sizes.width / 2}
                        height={100}
                        LinearGradientComponent={LinearProgress}
                    />
                    <Skeleton
                        animation='pulse'
                        width={sizes.width / 2}
                        height={100}
                        LinearGradientComponent={LinearProgress}
                    />
                    <Skeleton
                        animation='pulse'
                        width={sizes.width / 2}
                        height={100}
                        LinearGradientComponent={LinearProgress}
                    />
                    <Skeleton
                        animation='pulse'
                        width={sizes.width / 2}
                        height={100}
                        LinearGradientComponent={LinearProgress}
                    />
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    root: {
        display:'flex',
        flexDirection:'column',
        gap:4
    },
    items: {
        display: "flex",
        flexDirection: 'column'
    }
})

export default CSkeleton