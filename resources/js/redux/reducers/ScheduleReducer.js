import * as ActionTypes from '../actions/ActionTypes';

export default (state = {

    isLoading: false,
    schedules:[],
    err: null,
    message: null
}, action) => {

    switch(action.type){

        case ActionTypes.ADDING_SCHEDULE:{
            return{
                ...state,
                isLoading: true,
                message: null,
                err: null
            }
        }

        case ActionTypes.SCHEDULE_ADDED:{
            return{
                ...state,
                isLoading: false,
                message: action.payload,
                err: null
            }
        }

        case ActionTypes.ADDING_SCHEDULE_ERR:{
            return{
                ...state,
                err: action.payload,
                message: err,
                isLoading: false
            }
        }

        case ActionTypes.ADDING_SCHEDULES:{
            return {
                ...state,
                err: null,
                isLoading: true,
                message: null,
                schedules: [],
            }
        }

        case ActionTypes.ADDING_SCHEDULES_ERR:{
            return {
                ...state,
                err: action.payload,
                isLoading: false,
                message: null,
                schedules: []
            }
        }

        case ActionTypes.ADD_SCHEDULES:{
            return{
                ...state,
                err: null,
                message: null,
                isLoading: false,
                schedules: action.payload,
            }
        }
        default: return state;
    }
}