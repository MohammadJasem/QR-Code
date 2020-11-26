import {
    ADD_SUBJECTS,
    ADDING_SUBJECT,
    ADDING_SUBJECTS,
    ADDING_SUBJECTS_ERR,
    ADDING_SUBJECT_ERR,
    SUBJECT_ADDED
} from './ActionTypes';
import {getSubjects, addSubject} from '../../api/api';

export const addSubjects = () => dispatch => {
    dispatch(adding_subjects());

    getSubjects().then(response => {
        if(response.code === 200){
            dispatch(add_subjects(response.subjects));
        }else{
            dispatch(adding_subjects_err(response.message));
        }
    });
}

export const createSubject = (formValues) => dispatch => {

    dispatch(adding_subject());

    addSubject(formValues).then(response => {
        if(response.code === 201){
            dispatch(subject_added(response.message));
        }else{
            dispatch(adding_subject_err(response.message));
        }
    });
}

const add_subjects = (subjects) => ({
    type:ADD_SUBJECTS,
    payload: subjects
});

const adding_subjects = () => ({
    type: ADDING_SUBJECTS
});

const adding_subjects_err = (err) => ({
    type: ADDING_SUBJECTS_ERR,
    payload: err
});

const adding_subject = () => ({
    type: ADDING_SUBJECT
});

const subject_added = (message) => ({
    type: SUBJECT_ADDED,
    payload: message
});

const adding_subject_err = (err) => ({
    type: ADDING_SUBJECT_ERR,
    payload: err
});