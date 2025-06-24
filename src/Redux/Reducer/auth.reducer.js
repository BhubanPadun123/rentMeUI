import * as actionType from "../action/actionType"


const authInitial = {
    loginStatus: "",
    loginResponse: [],
    loginError: null,

    signupStatus: "",
    signupResponse: [],
    signupError: null,

    metaDataStatus: "",
    metaDataResponse: [],
    metaDataError: null,

    forgetPasswordStatus: "",
    forgetPasswordResponse: [],
    forgetPasswordError: null,

    getUserStatus: "",
    getUserResponse: [],
    getUserError: null,

    orgUserStatus: "",
    orgUserResponse: [],
    orgUserError: null,

    updateOrgUserStatus: "",
    updateOrgUserResponse: [],
    updateOrgUserError: null
}

export const AuthReducer = (state = authInitial, action) => {
    switch (action.type) {
        case actionType.USER_LOGIN:
            state = {
                ...state,
                loginStatus: "started",
                loginError: null,
                loginResponse: []
            }
            return state;
        case actionType.USER_LOGIN_RESPONSE:
            state = {
                ...state,
                loginError: null,
                loginResponse: action.payload,
                loginStatus: "success"
            }
            return state;
        case actionType.USER_LOGIN_ERROR:
            state = {
                ...state,
                loginError: action.payload,
                loginResponse: [],
                loginStatus: "failed"
            }
            return state;
        case actionType.CLEAN_UP_LOGIN:
            state = {
                ...state,
                loginError: null,
                loginResponse: [],
                loginStatus: ""
            }
            return state
        case actionType.USER_REGISTER:
            state = {
                ...state,
                signupStatus: "started",
                signupResponse: [],
                signupError: null
            }
            return state;
        case actionType.USER_REGISTER_RESPONSE:
            state = {
                ...state,
                signupStatus: "success",
                signupResponse: action.payload,
                signupError: null
            }
            return state;
        case actionType.USER_REGISTER_ERROR:
            state = {
                ...state,
                signupStatus: "failed",
                signupResponse: [],
                signupError: action.payload
            }
            return state;
        case actionType.CLEAN_UP_REGISTER:
            state = {
                ...state,
                signupError: null,
                signupResponse: [],
                signupStatus: ""
            }
            return state
        case actionType.UPDATE_USER_METADATA:
            state = {
                ...state,
                metaDataStatus: "started",
                metaDataResponse: [],
                metaDataError: null
            }
            return state;
        case actionType.UPDATE_USER_METADATA_RESPONSE:
            state = {
                ...state,
                metaDataStatus: "success",
                metaDataResponse: action.payload,
                metaDataError: null
            }
            return state;
        case actionType.UPDATE_USER_METADATA_EROR:
            state = {
                ...state,
                metaDataStatus: "failed",
                metaDataResponse: [],
                metaDataError: action.payload
            }
            return state;
        case actionType.CLEAN_UP_UPDATE:
            state = {
                ...state,
                metaDataError: null,
                metaDataResponse: [],
                metaDataStatus: ""
            }
            return state;
        case actionType.FORGET_PASSWORD:
            state = {
                ...state,
                forgetPasswordStatus: "started",
                forgetPasswordResponse: [],
                forgetPasswordError: null
            }
            return state;
        case actionType.FORGET_PASSWORD_RESPONSE:
            state = {
                ...state,
                forgetPasswordStatus: "success",
                forgetPasswordResponse: action.payload,
                forgetPasswordError: null
            }
            return state;
        case actionType.FORGET_PASSWORD_ERROR:
            state = {
                ...state,
                forgetPasswordStatus: "failed",
                forgetPasswordResponse: [],
                forgetPasswordError: action.payload
            }
            return state;
        case actionType.GET_USER:
            state = {
                ...state,
                getUserStatus: "started",
                getUserResponse: [],
                getUserError: ""
            }
            return state;
        case actionType.GET_USER_RESPONSE:
            state = {
                ...state,
                getUserStatus: "success",
                getUserResponse: action.payload,
                getUserError: ""
            }
            return state;
        case actionType.GET_USER_ERROR:
            state = {
                ...state,
                getUserStatus: "failed",
                getUserResponse: [],
                getUserError: action.payload
            }
            return state;
        case actionType.CLEAR_USER:
            state = {
                ...state,
                getUserStatus: "",
                getUserResponse: [],
                getUserError: null
            }
            return state;
        case actionType.ORG_USERS:
            state = {
                ...state,
                orgUserStatus: "started",
                orgUserResponse: [],
                orgUserError: null
            }
            return state;
        case actionType.ORG_USERS_RESPONSE:
            state = {
                ...state,
                orgUserStatus: "success",
                orgUserResponse: action.payload,
                orgUserError: null
            }
            return state;
        case actionType.ORG_USERS_ERROR:
            state = {
                ...state,
                orgUserStatus: "failed",
                orgUserResponse: [],
                orgUserError: action.payload
            }
            return state;
        case actionType.UPDATE_ORG_ROLE:
            state = {
                ...state,
                updateOrgUserStatus: "started",
                updateOrgUserResponse: [],
                updateOrgUserError: null
            }
            return state;
        case actionType.UPDATE_ORG_ROLE_RESPONSE:
            state = {
                ...state,
                updateOrgUserStatus: "success",
                updateOrgUserResponse: action.payload,
                updateOrgUserError: null
            }
            return state;
        case actionType.UPDATE_ORG_ROLE_ERROR:
            state = {
                ...state,
                updateOrgUserStatus: "failed",
                updateOrgUserResponse: [],
                updateOrgUserError: action.payload
            }
            return state;
        default: {
            return state
        }
    }
}