import * as actionType from "../action/actionType"


const authInitial={
    loginStatus:"",
    loginResponse:[],
    loginError:null
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
        default:{
            return state
        }
    }
}