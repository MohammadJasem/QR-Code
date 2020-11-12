import {ADD_ROLES} from './ActionTypes';
import {getRoles} from '../../api/api';

export const addRoles = () => (dispatch) => {
    getRoles().then(response => {
        dispatch(adding_roles(response));
    });
}

const adding_roles = (roles) => ({
    type: ADD_ROLES,
    payload: roles
});