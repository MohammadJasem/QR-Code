import React from 'react';
import AdminPanel from './admin/AdminPanel';
import TeacherPanel from './teacher/TeacherPanel';
import * as Roles from '../shared/Roles';

function Panel({role}){

    if(role === Roles.ROLE_ADMIN){
        return(
            <AdminPanel />
        );
    }else{
        return <TeacherPanel />
    }
}

export default Panel;