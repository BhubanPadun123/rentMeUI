import React from "react";

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

class CSkeleton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.root}>
                <Skeleton
                    animation="wave"
                    width={"100%"}
                    height={"100%"}
                    LinearGradientComponent={LinearProgress}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        width: sizes.width,
        height: sizes.height
    },
    items: {
        display: "flex",
        flexDirection: 'column'
    }
})

export default CSkeleton