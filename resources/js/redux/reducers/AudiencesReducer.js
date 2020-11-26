import {
    ADDING_AUDIENCES,
    ADDING_AUDIENCES_ERR,
    ADD_AUDIENCES
} from '../actions/ActionTypes';

export default (state = {
    isLoading: false,
    data: {
        group:{
            subject:{},
            users:[]
        },
        audiences: [],
        missing: []
    },
    err: null
}, action) => {
    switch(action.type){
        case ADDING_AUDIENCES:{
            return {
                ...state,
                isLoading: true,
                err: null,
                data: {}
            }
        }

        case ADDING_AUDIENCES_ERR:
            return{
                ...state,
                isLoading: false,
                data:{},
                err: action.payload
            }
        case ADD_AUDIENCES:{
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                err: null
            }
        }

        default: return state;
    }
}
