import React, { Component } from "react";
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
import { addProductAction, cleanUpAddProductAction } from "../Redux/action/product";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import MultiSelectDropdown from "../components/MultiSelect";
import Loader from "../components/Loader";

const initialFormValues = {
    title: "",
    description: "",
    state: "",
    district: "",
    town: "",
    pinCode: "",
    localAddress: "",
    geoLocation: "",
    propertyType: "",
    totalProperty: "",
    rent: "",
    deposite: "",
    images: [],
};

class PropertyRegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            user: null,
            propertyOccupancy: [],
            availableItems: [],
        };
    }

    async componentDidMount() {
        await this.fetchUserData();
    }

    componentDidUpdate(prevProps) {
        const { addProductStatus, addProductError, navigation } = this.props;

        if (prevProps.addProductStatus !== addProductStatus) {
            if (addProductStatus === "success") {
                this.setState({ loading: false });
                showTopMessage("Property Uploaded successfully", "success");
                setTimeout(() => navigation.navigate("Home"), 5000);
            } else if (addProductStatus === "failed") {
                this.setState({ loading: false });
                showTopMessage(
                    typeof addProductError === "string"
                        ? addProductError
                        : "Error while uploading property. Please try again!",
                    "danger"
                );
            }
        }
    }

    componentWillUnmount() {
        this.setState({ user: null });
        this.props.cleanUpAddProductAction();
    }

    fetchUserData = async () => {
        const userInfo = await AsyncStorage.getItem("currentUser");
        if (userInfo) {
            this.setState({ user: JSON.parse(userInfo) });
        }
    };

    handleFormSubmit = (formValues) => {
        const { user, propertyOccupancy, availableItems } = this.state;
        const { navigation } = this.props;

        if (!user) {
            navigation.navigate("LoginScreen");
            return;
        }

        const propertyData = {
            vendorRef: user._id,
            tag:"room",
            productTitle: formValues.title,
            availableStatus: true,
            productType: formValues.propertyType,
            postAt: new Date(),
            propertyOccupancy,
            metaData: JSON.stringify({
                addressInfo: {
                    state: formValues.state,
                    district: formValues.district,
                    pinCode: formValues.pinCode,
                    town: formValues.town,
                    localAdd: formValues.localAddress,
                },
                geoLocation: formValues.geoLocation,
                rent: formValues.rent,
                deposite: formValues.deposite,
                images: formValues.images,
                description: formValues.description,
                town: formValues.town,
                total: formValues.totalProperty,
                availableItems,
            }),
        };

        this.props.addProductAction(propertyData);
    };

    render() {
        const { loading, propertyOccupancy, availableItems } = this.state;
        const { addProductStatus } = this.props;

        return (
            <KeyboardAvoidingView style={styles.container}>
                <ScrollView style={styles.container}>
                    <Text style={styles.text}>Property Register Form</Text>
                    <Formik
                        initialValues={initialFormValues}
                        onSubmit={this.handleFormSubmit}
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <>
                                <View style={styles.input_container}>
                                    <InputBar onType={handleChange("title")} value={values.title} placeholder="Enter Property Name" />
                                    <InputBar onType={handleChange("description")} value={values.description} placeholder="Enter description" />
                                    <InputBar onType={handleChange("state")} value={values.state} placeholder="Enter State Name" />
                                    <InputBar onType={handleChange("district")} value={values.district} placeholder="Enter District Name" />
                                    <InputBar onType={handleChange("town")} value={values.town} placeholder="Enter Town Name" />
                                    <InputBar onType={handleChange("localAddress")} value={values.localAddress} placeholder="Full Address Details" />

                                    <DropdownSelect
                                        placeholder="Select Property Type"
                                        options={[
                                            { value: "commercial", label: "Commercial Place" },
                                            { value: "PG_boy", label: "PG - Boy's" },
                                            { value: "PG_girl", label: "PG - Girl's" },
                                            { value: "PG", label: "PG for all" },
                                            { value: "room_single", label: "Single Room" },
                                            { value: "room-girl", label: "Private room for Girl's" },
                                            { value: "room-boy", label: "Private room for Boy's" },
                                            { value: "working", label: "Working professional" },
                                            { value: "all", label: "Room for all" },
                                        ]}
                                        selectedValue={values.propertyType}
                                        onValueChange={handleChange("propertyType")}
                                    />

                                    <MultiSelectDropdown
                                        options={[
                                            { label: "Student", value: "student" },
                                            { label: "Men", value: "men" },
                                            { label: "Women", value: "women" },
                                            { label: "All", value: "all" },
                                        ]}
                                        placeholder="Select Recommended Option*"
                                        onValueChange={(val) => this.setState({ propertyOccupancy: val })}
                                        selectedValues={propertyOccupancy}
                                    />

                                    <MultiSelectDropdown
                                        options={[
                                            { label: "Table", value: "tabble" },
                                            { label: "Chair", value: "chair" },
                                            { label: "Bulb", value: "bulb" },
                                            { label: "Study Table", value: "study table" },
                                            { label: "Many More", value: "more" },
                                        ]}
                                        placeholder="Select Available Items"
                                        onValueChange={(val) => this.setState({ availableItems: val })}
                                        selectedValues={availableItems}
                                    />

                                    <InputBar onType={handleChange("totalProperty")} value={values.totalProperty} placeholder="Total Number of Property" />
                                    <InputBar onType={handleChange("rent")} value={values.rent} placeholder="Property Rent/Month" />
                                    <InputBar onType={handleChange("deposite")} value={values.deposite} placeholder="Property Deposite Amount" />
                                    <LocationBar onType={handleChange("geoLocation")} value={values.geoLocation} placeholder="Tap to fetch current location" />
                                    <ImagePickerBar
                                        onType={handleChange("images")}
                                        value={values.images}
                                        placeholder="Tap to select images"
                                        onUpload={(val) => this.setState({ loading: val })}
                                    />
                                </View>

                                <View style={[styles.button_container, { marginBottom: 30 }]}>
                                    <Button text="Upload" onPress={handleSubmit} loading={loading} />
                                </View>
                            </>
                        )}
                    </Formik>
                </ScrollView>

                {(addProductStatus === "started" || loading) && <Loader />}
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    text: {
        marginHorizontal: 24,
        marginVertical: 32,
        fontSize: 30,
        textAlign: "center",
        color: colors.color_primary,
    },
    input_container: {
        marginHorizontal: 24,
    },
    button_container: {
        flexDirection: "row",
        margin: 16,
    },
});

const mapStateToProps = (state) => ({
    addProductStatus: state.product.addProductStatus,
    addProductError: state.product.addProductError,
    addProductResponse: state.product.addProductResponse,
});

const mapDispatchToProps = {
    addProductAction,
    cleanUpAddProductAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PropertyRegisterScreen);
