import * as ActionTypes from '../actions/ActionTypes'

export default (state = {
    isLoading: false,
    students: [],
    err: null
}, action) => {

    switch(action.type)
    {
        case ActionTypes.ADDING_STUDENTS:{
            return {
                ...state,
                isLoading: true,
                students: [],
                err: null
            }
        }
        case ActionTypes.ADD_STUDENTS:{
            return {
                ...state,
                isLoading: false,
                students: action.payload,
                err: null
            }
        }
        case ActionTypes.ADDING_STUDENTS_ERR:{
            return{
                ...state,
                err: action.payload,
                isLoading: false,
                students: []
            }
        }
        default:{
            return state;
        }
    }
}