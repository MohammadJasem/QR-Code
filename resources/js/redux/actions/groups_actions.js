import {
    ADDING_GROUP,
    GROUP_ADDED,
    ADD_GROUPS,
    ADDING_GROUPS,
    ADDING_GROUPS_ERR,
    ADDING_GROUP_ERR
} from './ActionTypes';
import {
    getGroups,
    addGroup
} from '../../api/api';

export const addGroups = (is_admin) => dispatch => {
    dispatch(adding_groups());

    getGroups(is_admin).then(response => {

        console.log(response);
        if(response.code === 200){
            dispatch(add_groups(response.groups));
        }else{
            dispatch(adding_groups_err('Error While Retrieving groups'));
        }
    });
}

export const createGroup = (group) => dispatch => {

    dispatch(adding_group());

    addGroup(group).then(response => {

        if(response.code === 201){
            dispatch(group_added(response.message));
        }else{
            dispatch(adding_group_err(response.err));
        }
    });
}

const adding_group = () => ({
    type: ADDING_GROUP
});

const group_added = (message) => ({
    type: GROUP_ADDED,
    payload: message
});

const adding_group_err = (err) => ({
    type: ADDING_GROUP_ERR,
    payload: err
});

const adding_groups = () => ({
    type: ADDING_GROUPS
});

const add_groups = (groups) => ({
    type: ADD_GROUPS,
    payload: groups
});

const adding_groups_err = (err) => ({
    type: ADDING_GROUPS_ERR,
    payload: err
});
