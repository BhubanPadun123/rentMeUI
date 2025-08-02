import React from "react"
import { 
    ScrollView, 
    View,
    Text
} from "react-native"
import { sizes } from "../../styles/Theme"

function SupportUsPage(props){
    return(
        <ScrollView>
            <View style={{
                height:sizes.height
            }}>
                <Text>My Favourites</Text>
            </View>
        </ScrollView>
    )
}

export default SupportUsPage