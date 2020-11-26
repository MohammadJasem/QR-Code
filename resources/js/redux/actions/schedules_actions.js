import {
    ADD_SCHEDULES,
    SCHEDULE_ADDED,
    ADDING_SCHEDULE,
    ADDING_SCHEDULES,
    ADDING_SCHEDULES_ERR,
    ADDING_SCHEDULE_ERR,
    ADDING_AUDIENCES,
    ADDING_AUDIENCES_ERR,
    ADD_AUDIENCES
} from './ActionTypes';
import {
    getAllSchedules,
    addSchedule,
    getAudiencesByScheduleId
} from '../../api/api';

export const getAudiences = (schedule_id) => dispatch => {

    dispatch(adding_audiences());

    getAudiencesByScheduleId(schedule_id).then(res => {
        if(res.code === 200){
            dispatch(add_audiences(res.data));
        }else{
            dispatch(adding_audiences_err(res.err))
        }
    });
}

export const addSchedules = () => dispatch => {
    dispatch(adding_schedules());

    getAllSchedules().then(response => {

        if(response.code === 200){
            dispatch(add_schedules(response.schedules));
        }else{
            dispatch(adding_schedules_err(response.err));
        }
    });
}

export const createSchedule = (schedule) => dispatch => {

    dispatch(adding_schedule());

    addSchedule(schedule).then(response => {
        if(response.code === 201){
            dispatch(schedule_added(response.message));
        }else{
            dispatch(adding_schedule_err(response.err));
        }
    });
}

const adding_schedule = () => ({
    type: ADDING_SCHEDULE
});

const adding_schedule_err = (err) => ({
    type: ADDING_SCHEDULE_ERR,
    payload: err
});

const schedule_added = (message) => ({
    type: SCHEDULE_ADDED,
    payload: message
});

const adding_schedules = () => ({
    type: ADDING_SCHEDULES
});

const adding_schedules_err = (err) => ({
    type: ADDING_SCHEDULES_ERR,
    payload: err
});

const add_schedules = (schedules) => ({
    type: ADD_SCHEDULES,
    payload: schedules
});

const add_audiences = (data) => ({
    type: ADD_AUDIENCES,
    payload: data
});

const adding_audiences = () => ({
    type: ADDING_AUDIENCES,
});

const adding_audiences_err = (err) => ({
    type: ADDING_AUDIENCES_ERR,
    payload: err
});
