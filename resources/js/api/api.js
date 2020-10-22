import axios from './axios';

// Authenticating Users
const token = localStorage.getItem('token');

// For Assigning Role to a newly-created user

export const login = async (email,password) => {

    try{
        const response = await axios.post('login', {
            email,
            password,
        });
        return response.data;
    }catch(err){
        return err.response.data;
    }
}

export const getRoles = async () => {
    try{
        const response = await axios.get('roles',{
            headers:{
                Authorization: 'Bearer '.concat(token)
            }
        });

        return response.data;
    }catch(err){
        return err.response.data;
    }
}

export const register = async (name,email,role_id,group_id) => {

    try{
        const response = await axios.post('register',{
            name,
            email,
            role_id,
            group_id
        },{
            headers:{
                Authorization: 'Bearer '.concat(token)
            }
        });
        return response.data;
    }catch(err){
        return err.response.data;
    }
}

export const getTeachers = async () => {
    try {
        const response = await axios.get('teachers',{
            headers:{
                Authorization: 'Bearer '.concat(token)
            }
        });
        return response.data;
    }catch(err){
        return err.response.data;
    }
}

export const getStudents = async () => {
    try {
        const response = await axios.get('students',{
            headers:{
                Authorization: 'Bearer '.concat(token)
            }
        });
        return response.data;
    }catch(err){
        return err.response.data;
    }
}

export const getSubjects = async () => {
    try{
        const response = await axios.get('subjects',{
            headers:{
                Authorization: 'Bearer '.concat(token)
            }
        });

        return response.data;
    }catch(err){
        return err.response.data;
    }
}

export const addSubject = async ({title, description, credits,num_of_schedules,teacher_id}) => {
    try {
        const response = await axios.post('addSubject',{
                title,
                description,
                num_of_schedules,
                credits,
                teacher_id
            },
            {
            headers:{
                Authorization: 'Bearer '.concat(token)
            }
        });
        return response.data;
    }catch(err){
        return err.response.data;
    }
}

export const addGroup = async ({name,subject_id,students}) => {
    try{
        const response = await axios.post('addGroup',{
            name,
            subject_id,
            students
        },{
            headers:{
                Authorization: 'Bearer '.concat(token)
            }
        });

        return response.data;
    }catch(err){
        return err.response.data;
    }
}

export const getGroups = async (is_admin) => {
    try{
        const response = await axios.get(`getGroups/${is_admin}`,{
            headers:{
                Authorization: 'Bearer '.concat(token)
            }
        });

        return response.data;
    }catch(err){
        return err.response.data;
    }
}

export const getAllSchedules = async () => {

    try{
        const response = await axios.get('schedules',{
            headers:{
                'Authorization': 'Bearer '.concat(token)
            }
        });

        return response.data;
    }catch(err){
        return err.response.data;
    }
}

export const addSchedule = async ({group_id,date_scheduled}) => {

    try{
        const response = await axios.post('addSchedule',{
            group_id,
            date_scheduled
        },{
            headers:{
                'Authorization': 'Bearer '.concat(token)
            }
        });
        return response.data;
    }catch(err){
        return err.response.data;
    }
}

export const getAudiencesByScheduleId = async (schedule_id) => {
    try{
        const response = await axios.get(`audiences/${schedule_id}`,{
            headers:{
                'Authorization': 'Bearer '.concat(token)
            }
        });
        return response.data;
    }catch(err){
        return err.response.data;
    }
}
