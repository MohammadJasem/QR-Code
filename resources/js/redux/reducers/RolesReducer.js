import * as ActionTypes from '../actions/ActionTypes';

export default (state = {
    roles: [],
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_ROLES:
            return{
                ...state,
                roles: action.payload
            }
        default:
            return state;
    }
}