import {ADDING_STUDENTS, ADDING_STUDENTS_ERR, ADD_STUDENTS} from './ActionTypes';
import {getStudents} from '../../api/api';

export const addStudents = () => dispatch => {
    dispatch(adding_students());

    getStudents().then(response => {
        if(response.code === 200){
            dispatch(add_students(response.students));
        }else {
            dispatch(students_err(response.message));
        }
    });
}

const adding_students = () => ({
    type:ADDING_STUDENTS
});

const add_students = (students) => ({
    type:ADD_STUDENTS,
    payload: students
});

const students_err = (err) => ({
    type:ADDING_STUDENTS_ERR,
    payload: err
});