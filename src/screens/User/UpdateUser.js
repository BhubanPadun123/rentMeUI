import React from "react"
import {
    View,
    Text,
    ScrollView
} from "react-native"
import { sizes } from "../../styles/Theme"
import {
    Input,
    Button
} from "@rneui/themed"

function UpdateUser(props) {
    console.log(props)
    return (
        <ScrollView>
            <View style={{
                height:sizes.height,
                alignItems:'center'
            }}>
                <Text style={{
                    fontSize:20,
                    fontWeight:'500',
                    marginVertical:8
                }}>Update info</Text>
                <Input 
                   placeholder="Your Full Name"
                   keyboardType='default'
                />
                <Input 
                   placeholder="Email Address"
                   keyboardType="email-address"
                />
                <Input 
                   keyboardType="number-pad"
                   placeholder="Enter Phone Number"
                />
                <Input 
                   placeholder="Current Location"
                />
                <Button 
                   title={"UPDATE"}
                   type='outline'
                   size='lg'
                />
            </View>
        </ScrollView>
    )
}

export default UpdateUser