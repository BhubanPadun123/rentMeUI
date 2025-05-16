export type user={
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

export type status="started" | "success" | "failed" | null