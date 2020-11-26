import React from 'react';
import {connect} from 'react-redux';
import CreateForm from '../../CreateForm';
import {addGroups,createSchedule} from '../../../redux/actions';
import Loading from '../../Loading';

const mapStateToProps = state => ({
    groups: state.groups,
    schedules: state.schedules
});

const mapDispatchToProps = dispatch => ({
    addGroups: () => dispatch(addGroups(0)),
    postSchedule: (schedule) => dispatch(createSchedule(schedule))
});

const fields = [
    {
        label: 'Create New Schedule for',
        name: 'group_id',
        type: 'select',
        options: []
    },
    {
        label: 'Scheduled at',
        name: 'date_scheduled',
        validationErr: 'Please Select a Valid Date, and a Time before Creating a Schedule',
        type: 'datetime'
    },
];

class AddSchedule extends React.Component{

    constructor(props){
        super(props);
    }

    handleSubmit = (formValues) => {
        this.props.postSchedule(formValues);
    }

    componentDidMount(){
        this.props.addGroups();
    }

    setGroups = (groups) => {
        fields.map(f => {
            f.type === 'select' ? f.options = groups : f;
        });
    }

    render()
    {
        const {groups,schedules} = this.props;

        if(groups.isLoading){
            return <Loading />
        }

        this.setGroups(groups.groups);

        return(
            <>
                <CreateForm
                    fields={fields}
                    isLoading={schedules.isLoading}
                    success={schedules.message}
                    err={schedules.err}
                    onSubmit={(formValues) => {this.handleSubmit(formValues)}}
                />
            </>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddSchedule);
