import * as ActionTypes from '../actions/ActionTypes';

export default (state = {
    isLoading: false,
    groups:[],
    message: null,
    err: null
}, action) => {

    switch(action.type)
    {
        case(ActionTypes.ADDING_GROUPS):{
            return{
                ...state,
                isLoading: true,
                message: null,
                err: null,
                groups: []
            }
        }
        case ActionTypes.ADD_GROUPS:{
            return{
                ...state,
                isLoading: false,
                err:null,
                message: null,
                groups: action.payload
            }
        }
        case ActionTypes.ADDING_GROUPS_ERR:{
            return{
                ...state,
                isLoading: false,
                err: action.payload,
                message: null,
                groups:[]
            }
        }
        case(ActionTypes.ADDING_GROUP):{
            return{
                ...state,
                isLoading: true,
                message: null,
                err: null
            }
        }
        case(ActionTypes.GROUP_ADDED):{
            return{
                ...state,
                isLoading: false,
                message: action.payload,
                err: null
            }
        }
        case(ActionTypes.ADDING_GROUP_ERR):{
            return{
                ...state,
                isLoading: false,
                err: action.payload,
                message: null
            }
        }
        default: return state;
    }
}