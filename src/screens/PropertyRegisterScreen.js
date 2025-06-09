import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";
import Button from "../components/Button/Button";
import InputBar from "../components/InputBar";
import { getAuth } from "firebase/auth";
import app from "../../firebaseConfig";
import { Formik } from "formik";
import ErrorHandler, { showTopMessage } from "../utils/ErrorHandler";
import { colors } from "../styles/Theme";
import DropdownSelect from "../components/SingleSelect";
import LocationBar from "../components/LocationBar";
import ImagePickerBar from "../components/MultiUploadImageBar";
import { addProduct } from "../APIs/product";

const initialFormValues = {
    title:"",
    description:"",
    state:"",
    district:"",
    town:"",
    pinCode:"",
    localAddress:"",
    geoLocation:"",
    propertyType:"",
    totalProperty:"",
    rent:"",
    deposite:""
};

export default function PropertyRegisterScreen({navigation}) {
    const [loading, setLoading] = useState(false);

    function handleFormSubmit(formValues) {
        const date = new Date()
        const propertyData={
            title:formValues.title,
            description:formValues.description,
            availableStatus:true,
            propertyType:formValues.propertyType,
            createdAt:date,
            town:formValues.town,
            total:formValues.totalProperty,
            metaData:JSON.stringify({
                address:{
                    state:formValues.state,
                    district:formValues.district,
                    pinCode:formValues.pinCode,
                    town:formValues.town,
                    localAddress:formValues.localAddress
                },
                geoLocation:formValues.geoLocation,
                rent:formValues.rent,
                deposite:formValues.deposite,
                images:formValues.images,
            })
        }
        setLoading(true)
        addProduct(propertyData).then((response)=>{
            setLoading(false)
            showTopMessage(response?.message,"success")
            setTimeout(()=>{
                navigation.navigate("HomeScreen")
            },5000)
        }).catch((err)=>{
            setLoading(false)
            showTopMessage(err?.message,"danger")
        })
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
        // behavior="padding"
        >
            <ScrollView style={styles.container}>
                <Text style={styles.text}>Property Register Form</Text>
                <Formik
                    initialValues={{ initialFormValues }}
                    onSubmit={handleFormSubmit}
                >
                    {({ values, handleChange, handleSubmit }) => (
                        <>
                            <View style={styles.input_container}>
                                <InputBar
                                    onType={handleChange("title")}
                                    value={values.title}
                                    placeholder={"Enter Property Name"}
                                />
                                <InputBar
                                    onType={handleChange("description")}
                                    value={values.description}
                                    placeholder={"Enter description"}
                                />
                                <InputBar
                                    onType={handleChange("state")}
                                    value={values.state}
                                    placeholder={"Enter State Name"}
                                />
                                <InputBar
                                    onType={handleChange("district")}
                                    value={values.district}
                                    placeholder={"Enter District Name"}
                                />
                                <InputBar
                                    onType={handleChange("town")}
                                    value={values.town}
                                    placeholder={"Enter Town Name"}
                                />
                                <InputBar
                                    onType={handleChange("localAddress")}
                                    value={values.localAddress}
                                    placeholder={"Full Address Details"}
                                />
                                <DropdownSelect
                                   placeholder="Select Property Type"
                                   options={
                                    [
                                        {value:"commercial",label:"Commercial Place"},
                                        {value:"PG_boy",label:"PG - Boy's"},
                                        {value:"PG_girl",label:"PG - Girld's"},
                                        {value:"PG",label:"PG for all"},
                                        {value:"room_single",label:"Single Room"},
                                        {value:'room-girl',label:"Private room for Girl's"},
                                        {value:'room-boy',label:"Private room for Boy's"},
                                        {value:"working",label:"Working profissional"},
                                        {value:"all",label:"Room for all"}
                                    ]
                                   }
                                   selectedValue={values.propertyType}
                                   onValueChange={handleChange("propertyType")}
                                />
                                <InputBar
                                    onType={handleChange("totalProperty")}
                                    value={values.totalProperty}
                                    placeholder={"Total Number of Property"}
                                />
                                <InputBar
                                    onType={handleChange("rent")}
                                    value={values.rent}
                                    placeholder={"Property Rent/Month"}
                                />
                                <InputBar
                                    onType={handleChange("deposite")}
                                    value={values.deposite}
                                    placeholder={"Property Deposite Amount"}
                                />
                                <LocationBar
                                   onType={handleChange("geoLocation")}
                                   value={values.geoLocation}
                                   placeholder={"Tap to fetch current location"}
                                />
                                <ImagePickerBar
                                   onType={handleChange("images")}
                                   value={values.images}
                                   placeholder="Tap to select images"                                 
                                />
                            </View>
                            <View style={styles.button_container}>
                                <Button
                                    text="Signup"
                                    onPress={handleSubmit}
                                    loading={loading}
                                />
                            </View>
                        </>
                    )}
                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginBottom:50
    },
    text: {
        marginHorizontal: 24,
        marginVertical: 32,
        fontSize: 30,
        textAlign: 'center',
        color: colors.color_primary
        //fontFamily: "Mulish-Medium",
    },
    input_container: {
        marginHorizontal: 24,
    },
    button_container: {
        flexDirection: "row",
        margin: 16,
    },
});
