import * as ActionTypes from '../actions/ActionTypes';

export default (state = {

    message: null,
    err: null,
    isLoading: false,
    subjects: []
}, action) => {
    switch(action.type){

        case ActionTypes.ADDING_SUBJECTS:{
            return {
                ...state,
                err: null,
                message: null,
                subjects: [],
                isLoading: true
            }
        }

        case ActionTypes.ADDING_SUBJECTS_ERR: {
            return {
                ...state,
                err: action.payload,
                message: null,
                subjects: [],
                isLoading: false
            }
        }

        case ActionTypes.ADD_SUBJECTS:{
            return {
                ...state,
                err: null,
                message: null,
                subjects: action.payload,
                isLoading: false
            }
        }

        case ActionTypes.ADDING_SUBJECT:
            return {
                ...state,
                isLoading: true,
                message: null,
                err: null
            }

        case ActionTypes.ADDING_SUBJECT_ERR:
            return{
                ...state,
                isLoading:false,
                err: action.payload,
                message: null,
            }
        case ActionTypes.SUBJECT_ADDED:
            return{
                ...state,
                isLoading: false,
                err: null,
                message: action.payload
            }
        default: return state;
    }
}