import * as ActionTypes from '../actions/ActionTypes';

const INITIAL_STATE = {
    login_err: null,
    create_err: null,
    isSignedIn: false,
    token: null,
    isLoading: false,
    success: null
};

export default (state = INITIAL_STATE , action) => {

    switch(action.type)
    {
        case ActionTypes.ADDING_USER:{
            return {
                ...state,
                isLoading: true,
                login_err: null,
                create_err: null,
                success: null
            }
        }
        case ActionTypes.USER_ADDED:{
            return {
                ...state,
                isLoading: false,
                login_err: null,
                create_err: null,
                success: action.payload
            }
        }
        case ActionTypes.SIGNING_IN:
            return {
                ...state,
                isLoading: true,
                login_err: null,
                create_err: null,
                success: null
            }
        case ActionTypes.SIGN_IN:
            return {
                ...state,
                login_err: null,
                create_err: null,
                success: null,
                token: action.payload,
                isSignedIn: true,
                isLoading: false
            }
        case ActionTypes.SIGN_OUT:
            return{
                ...state,
                login_err: null,
                create_err: null,
                token: null,
                isSignedIn: false,
                success: null
            }
        case ActionTypes.SIGN_IN_ERR:
            return {
                ...state,
                login_err: action.payload,
                create_err: null,
                success: null,
                token: null,
                isLoading: false
            }
        case ActionTypes.CREATING_USER_ERR:
            return {
                ...state,
                login_err: null,
                create_err: action.payload,
                success: null,
                token: null,
                isLoading: false
        }
        default:
            return state;
    }
}