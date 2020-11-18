import React from 'react';
import {connect} from 'react-redux';
import {addStudents,addSubjects,createGroup} from '../../../redux/actions';
import CreateForm from '../../CreateForm';
import Loading from '../../Loading';

const fields = [
    {
        label:"Name",
        name:"name",
        type:"text"
    },
    {
        label: 'Belong to Subject',
        name: 'subject_id',
        type: 'select',
        options: []
    },
    {
        label: 'Assign Students to Group',
        name: 'students',
        type:'select',
        multiple: true,
        options: []
    }
];

const mapStateToProps = (state) => ({
    subjects: state.subjects,
    students: state.students,
    groups: state.groups
});

const mapDispatchToProps = dispatch => ({
    addStudents:() => dispatch(addStudents()),
    addSubjects: () => dispatch(addSubjects()),
    postGroup: (group) => dispatch(createGroup(group))
});

class AddGroup extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.addStudents();
        this.props.addSubjects();
    }

    onSubmit = (formValues) => {
        this.props.postGroup(formValues);
    }

    setOptions(options,name,text){
        fields.map(f => {
            f.type === 'select' && f.name === name ? f.options = [{id: -1,name:text}].concat(options) : f;
        });
    }

    render(){

        const {students, subjects,groups} = this.props;

        if(students.isLoading || subjects.isLoading){
            return (<Loading />)
        }

        this.setOptions(students.students,'students','Assign at least one student to the group!');
        this.setOptions(subjects.subjects, 'subject_id', 'Assign this group to a Subject');

        return(
            <CreateForm
                fields={fields}
                isLoading={groups.isLoading}
                err={groups.err}
                success={groups.message}
                onSubmit={(formValues) => this.onSubmit(formValues)}
            />
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddGroup);