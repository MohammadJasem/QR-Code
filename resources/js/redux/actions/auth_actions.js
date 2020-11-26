import {
    SIGNING_IN,
    SIGN_IN,
    SIGN_OUT,
    SIGN_IN_ERR,
    ADDING_USER,
    USER_ADDED,
    CREATING_USER_ERR
} from './ActionTypes';
import * as Roles from '../../shared/Roles';
import {
    login,
    register
} from '../../api/api';

export const signInAsync = (email,password) => (dispatch) => {

    dispatch(signing_in());

    login(email,password).then(response => {
        if(response.code === 200)
        {
            switch(response.role_name){
                case Roles.ROLE_ADMIN:
                    storeCredentialsAndSignIn(dispatch,response);
                break;
                case Roles.ROLE_TEACHER:
                    storeCredentialsAndSignIn(dispatch,response);
                break;
                default:
                    dispatch(signInError('Email Address or Password is incorrect!'));
            }
        }else{
            dispatch(signInError(response.message));
        }
    });
}

export const signOutAsync = () => (dispatch) => {

    localStorage.removeItem('username');
    localStorage.removeItem('role_id');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    dispatch(signOut());
}

const storeCredentialsAndSignIn = (dispatch,response) => {
    localStorage.setItem('token', response.api_token);
    localStorage.setItem('username', response.name);
    localStorage.setItem('role_id', response.role_id);
    localStorage.setItem('role', response.role_name);

    // Signing the user in...
    dispatch(signIn(response.api_token));
}

export const create = (name,email,role_id,group_id) => (dispatch) => {

    dispatch(creating_user());

    register(name,email,role_id,group_id).then(response =>{
        if(response.code === 201){
            dispatch(user_added());
        }else{
            dispatch(creating_user_err(response.message));
        }
    });
}

const creating_user = () => ({
    type: ADDING_USER
});

const user_added = () => ({
    type: USER_ADDED,
    payload: 'User Created Successfully'
});

const creating_user_err = (err) => ({
    type: CREATING_USER_ERR,
    payload: err
});

const signing_in = () => ({
    type: SIGNING_IN
});

const signIn = (token = '') => ({
    type: SIGN_IN,
    payload: token
});

const signOut = () => ({
    type: SIGN_OUT
});

const signInError = (err) => ({
    type: SIGN_IN_ERR,
    payload: err
});
