import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './AuthReducer';
import roles from './RolesReducer';
import students from './StudentReducer';
import teachers from './TeacherReducer';
import subjects from './SubjectReducer';
import groups from './GroupReducer';
import schedules from './ScheduleReducer';
import audiences from './AudiencesReducer';

export default combineReducers({
    form: formReducer,
    auth,
    roles,
    students,
    teachers,
    subjects,
    groups,
    schedules,
    audiences
});
