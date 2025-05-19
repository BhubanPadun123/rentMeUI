export type user={
    _id?:string;
    userName:string;
    userEmail:string;
    userContactNumber:string;
    userType:string;
    password:string;
    isVerifyed:boolean
}
export interface Action{
    type:string;
    payload:user
}
export type token={
    accessToken:string,
    refreshToken:string
}
export type userLoginType={
    userEmail:string;
    password:string
}
export interface ActionLogin{
    type:string;
    payload:token
}
export type forgetPasswordType={
    userEmail:string;
    password:string;
}
export interface ActionForgetPassword{
    type:string;
    payload:user
}

export type uploadImagesType={
    images:string[]
}
export interface ActionUploadImages{
    type:string;
    payload:uploadImagesType
}

type availableAminities={
    name:string;
    count:number
}
type propertyImages={
    url:string
}
type propertyOccupancy={
    occupancy:string
}
export type productType={
    _id?:string;
    vendorRef:string;
    productTitle:string;
    productType:string;
    postAt:string;
    availableStatus:boolean;
    metaData:{
        description:string;
        availableAminities:availableAminities[];
        rentInfo:{
            depositeAmount:string;
            rent_per_month:string;
        };
        vendorContactInfo:{
            name:string;
            email:string;
            contactNumber:string;
        };
        addressInfo:{
            pinCode:string;
            district:string;
            state:string;
            town:string;
            localAdd:string
        };
        geoLocation:any;
        propertyImages:propertyImages[]
    };
    propertyOccupancy:propertyOccupancy[]
}

export interface ActionAddProduct{
    payload:productType,
    type:string
}

export type BookingPayload={
    _id?:string;
    vendorRef:string;
    customerRef:string;
    bookingStatus:string;
    message:string;
    rating:string;
    review:string;
    bookingDate:string
}
export interface ActionBookingProperty{
    type:string;
    payload:BookingPayload
}

export type PrivillagesType={
    roles:string[],
    privillages:{
        "supper_admin":string[],
        "customer":string[],
        "vendor":string[],
        "audit":string[],
        "admin":string[]
    }
}

export type status="started" | "success" | "failed" | null