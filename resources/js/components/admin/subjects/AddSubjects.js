import React,{Component} from 'react';
import CreateForm from '../../CreateForm';
import {connect} from 'react-redux';
import {addTeachers,createSubject} from '../../../redux/actions';
import Loading from '../../Loading';

let fields = [
    {
        label:"Title",
        name:"title",
        type:"text"
    },
    {
        label: 'Description',
        name:'description',
        type:'textarea',
    },
    {
        label: 'Credits',
        name:'credits',
        type:'number',
    },
    {
        label: 'Number Of Schedules',
        name:'num_of_schedules',
        type:'number',
    },
    {
        label: 'Assign To',
        name:'teacher_id',
        type:'select',
        options: []
    }
];

const mapStateToProps = state => ({
    teachers: state.teachers,
    subjects: state.subjects
});

const mapDispatchToProps = dispatch => ({
    addTeachers: () => dispatch(addTeachers()),
    postSubject: (formValues) => dispatch(createSubject(formValues))
});

class AddSubject extends Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.addTeachers();
    }

    onSubmit = (formValues) => {
        this.props.postSubject(formValues);
    }

    setTeachers = (teachers) => {
        fields.map(f => {
            f.type === 'select' ? f.options = [{id: -1, name:'Assign This Subject a Teacher'}].concat(teachers) : f;
        });
    }

    render(){

        if(this.props.teachers.isLoading){
            return <Loading />
        }

        this.setTeachers(this.props.teachers.teachers);

        return(
            <CreateForm
                fields={fields}
                isLoading={this.props.subjects.isLoading}
                err={this.props.subjects.err}
                success={this.props.subjects.message}
                onSubmit={(formValues) => this.onSubmit(formValues)}
            />
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddSubject);