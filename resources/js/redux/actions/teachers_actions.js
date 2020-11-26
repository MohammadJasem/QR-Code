import {
    ADDING_TEACHERS,
    ADDING_TEACHERS_ERR,
    ADD_TEACHERS
} from './ActionTypes';
import {getTeachers} from '../../api/api';

export const addTeachers = () => dispatch => {

    dispatch(adding_teachers());

    getTeachers().then(response => {
        if(response.code === 200){
            dispatch(add_teachers(response.teachers));
        }else {
            dispatch(teachers_err(response.message));
        }
    });
}

const adding_teachers = () => ({
    type: ADDING_TEACHERS
});

const add_teachers = (teachers) => ({
    type: ADD_TEACHERS,
    payload: teachers
});

const teachers_err = (err) => ({
    type: ADDING_TEACHERS_ERR,
    payload: err
});