import * as actionType from "../actionTypes/index"
import {
    user,
    Action,
    ActionLogin,
    userLoginType,
    forgetPasswordType,
    ActionForgetPassword,
    PrivillagesType,
    status
} from "../actionTypes/dataType"

interface userState{
    register:{
        status:"started" | "success" | "failed" | null,
        data:user | [],
        error:any
    },
    login:{
        status:"started" | "success" | "failed" | null,
        data:userLoginType | null,
        error:any
    },
    forgetPassword:{
        status:'started' | 'success' | 'failed' | null,
        data:forgetPasswordType | null,
        error:any
    },
    privillages:{
        status:status,
        data:any,
        error:any
    }
}

const initialState:userState = {
    register:{
        status:null,
        data:[],
        error:null
    },
    login:{
        status:null,
        data:null,
        error:null
    },
    forgetPassword:{
        status:null,
        data:null,
        error:null
    },
    privillages:{
        status:null,
        data:[],
        error:""
    }
}


export const UserReducer=(state=initialState,action:Action)=>{
    switch(action.type){
        case actionType.USER_REGISTER_STATUS:
            state = {
                ...state,
                register:{
                    status:"started",
                    data:[],
                    error:null
                }
            }
            return state
        case actionType.USER_REGISTER_RESPONSE:
            state={
                ...state,
                register:{
                    status:"success",
                    data:action.payload,
                    error:null
                }
            }
            return state
        case actionType.USER_REGISTER_ERROR:
            state={
                ...state,
                register:{
                    status:'failed',
                    data:[],
                    error:action.payload
                }
            }
            return state
        
        case actionType.USER_LOGIN_STATUS:
            state={
                ...state,
                login:{
                    status:'started',
                    data:null,
                    error:null
                }
            }
            return state;
        case actionType.USER_LOGIN_RESPONSE:
            state={
                ...state,
                login:{
                    status:'success',
                    data:action.payload,
                    error:null
                }
            }
            return state;
        case actionType.USER_LOGIN_ERROR:
            state={
                ...state,
                login:{
                    status:'failed',
                    data:null,
                    error:action.payload
                }
            }
            return state
        case actionType.FORGET_PASSWORD_STATUS:
            state={
                ...state,
                forgetPassword:{
                    status:"started",
                    data:null,
                    error:null
                }
            }
            return state
        case actionType.FORGET_PASSWORD_RESPONSE:
            state={
                ...state,
                forgetPassword:{
                    status:'success',
                    data:action.payload,
                    error:null
                }
            }
            return state
        case actionType.FORGET_PASSWORD_ERROR:
            state={
                ...state,
                forgetPassword:{
                    status:'failed',
                    data:null,
                    error:action.payload
                }
            }
            return state
        case actionType.RESET_FORGET_PASSWORD_RESPONSE:
            state={
                ...state,
                forgetPassword:{
                    status:null,
                    data:action.payload,
                    error:null
                }
            }
            return state
        case actionType.GET_USER_PRIVILLAGES_STATUS:
            state = {
                ...state,
                privillages:{
                    status:'started',
                    data:[],
                    error:""
                }
            }
            return state
        case actionType.GET_USER_PRIVILLAGES_RESPONSE:
            state={
                ...state,
                privillages:{
                    status:'success',
                    data:action.payload,
                    error:""
                }
            }
            return state
        case actionType.GET_USER_PRIVILLAGES_ERROR:
            state={
                ...state,
                privillages:{
                    status:'failed',
                    data:[],
                    error:action.payload
                }
            }
        default:
            return state
    }
}