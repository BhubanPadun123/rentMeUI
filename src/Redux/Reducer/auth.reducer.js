import * as actionType from "../action/actionType"


const authInitial={
    loginStatus:"",
    loginResponse:[],
    loginError:null,

    signupStatus:"",
    signupResponse:[],
    signupError:null,

    metaDataStatus:"",
    metaDataResponse:[],
    metaDataError:null,
    
    forgetPasswordStatus:"",
    forgetPasswordResponse:[],
    forgetPasswordError:null
}

export const AuthReducer=(state=authInitial,action)=>{
    switch(action.type){
        case actionType.USER_LOGIN:
            state={
                ...state,
                loginStatus:"started",
                loginError:null,
                loginResponse:[]
            }
            return state;
        case actionType.USER_LOGIN_RESPONSE:
            state={
                ...state,
                loginError:null,
                loginResponse:action.payload,
                loginStatus:"success"
            }
            return state;
        case actionType.USER_LOGIN_ERROR:
            state={
                ...state,
                loginError:action.payload,
                loginResponse:[],
                loginStatus:"failed"
            }
            return state;
        case actionType.CLEAN_UP_LOGIN:
            state={
                ...state,
                loginError:null,
                loginResponse:[],
                loginStatus:""
            }
            return state
        case actionType.USER_REGISTER:
            state={
                ...state,
                signupStatus:"started",
                signupResponse:[],
                signupError:null
            }
            return state;
        case actionType.USER_REGISTER_RESPONSE:
            state={
                ...state,
                signupStatus:"success",
                signupResponse:action.payload,
                signupError:null
            }
            return state;
        case actionType.USER_REGISTER_ERROR:
            state={
                ...state,
                signupStatus:"failed",
                signupResponse:[],
                signupError:action.payload
            }
            return state;
        case actionType.CLEAN_UP_REGISTER:
            state={
                ...state,
                signupError:null,
                signupResponse:[],
                signupStatus:""
            }
            return state
        case actionType.UPDATE_USER_METADATA:
            state={
                ...state,
                metaDataStatus:"started",
                metaDataResponse:[],
                metaDataError:null
            }
            return state;
        case actionType.UPDATE_USER_METADATA_RESPONSE:
            state={
                ...state,
                metaDataStatus:"success",
                metaDataResponse:action.payload,
                metaDataError:null
            }
            return state;
        case actionType.UPDATE_USER_METADATA_EROR:
            state={
                ...state,
                metaDataStatus:"failed",
                metaDataResponse:[],
                metaDataError:action.payload
            }
            return state;
        case actionType.CLEAN_UP_UPDATE:
            state={
                ...state,
                metaDataError:null,
                metaDataResponse:[],
                metaDataStatus:""
            }
            return state;
        case actionType.FORGET_PASSWORD:
            state={
                ...state,
                forgetPasswordStatus:"started",
                forgetPasswordResponse:[],
                forgetPasswordError:null
            }
            return state;
        case actionType.FORGET_PASSWORD_RESPONSE:
            state={
                ...state,
                forgetPasswordStatus:"success",
                forgetPasswordResponse:action.payload,
                forgetPasswordError:null
            }
            return state;
        case actionType.FORGET_PASSWORD_ERROR:
            state={
                ...state,
                forgetPasswordStatus:"failed",
                forgetPasswordResponse:[],
                forgetPasswordError:action.payload
            }
            return state;
        default:{
            return state
        }
    }
}