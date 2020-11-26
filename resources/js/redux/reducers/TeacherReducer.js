import * as ActionTypes from '../actions/ActionTypes'

export default (state = {
    isLoading: false,
    teachers: [],
    err: null
}, action) => {

    switch(action.type)
    {
        case ActionTypes.ADDING_TEACHERS:{
            return {
                ...state,
                isLoading: true,
                teachers: [],
                err: null
            }
        }
        case ActionTypes.ADD_TEACHERS:{
            return {
                ...state,
                isLoading: false,
                teachers: action.payload,
                err: null
            }
        }
        case ActionTypes.ADDING_TEACHERS_ERR:{
            return{
                ...state,
                err: action.payload,
                isLoading: false,
                teachers: []
            }
        }
        default: return state;
    }
}