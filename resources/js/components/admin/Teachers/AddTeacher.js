import React,{Component} from 'react';
import {connect} from 'react-redux';
import {create, addRoles} from '../../../redux/actions';
import CreateForm from '../../CreateForm';
import * as Roles from '../../../shared/Roles';

const fields = [
    {
        label:"Name",
        name:"name",
        type:"text"
    },
    {
        label:"Email",
        name:"email",
        email:true,
        type:"text"
    },
];

const mapStateToProps = state => ({
    roles: state.roles,
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    create:(name,email,role_id) => dispatch(create(name,email,role_id)),
    getRoles: () => dispatch(addRoles())
});

class AddTeacher extends Component {

    constructor(props){
        super(props);
    }

    onSubmit = ({name,email}) => {

        const role = this.props.roles.roles
            .filter(role => role.role_name === Roles.ROLE_TEACHER)[0];
        this.props.create(name,email,role.id);
    };

    componentDidMount(){
        this.props.getRoles();
    }

    render(){
        return(
            <CreateForm
                form="AddTeacherForm"
                fields={fields}
                isLoading={this.props.auth.isLoading}
                err={this.props.auth.create_err}
                success={this.props.auth.success}
                onSubmit={(formValues) => this.onSubmit(formValues)}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTeacher);