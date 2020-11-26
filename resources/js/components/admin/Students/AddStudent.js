import React from 'react';
import {
    Field,
    reduxForm
} from 'redux-form';
import {connect} from 'react-redux';
import {create,addRoles,addGroups} from '../../../redux/actions';
import {
    Col,
    Form,
    Input,
    Label,
    FormGroup,
    Button
} from 'reactstrap';
import {emailReg} from '../../../shared/Constants';
import * as Roles from '../../../shared/Roles';
import Loading from '../../Loading';

const mapStateToProps = state => ({
    roles: state.roles,
    groups:state.groups,
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    create: (name,email,role_id,group_id) => dispatch(create(name,email,role_id,group_id)),
    getRoles: () => dispatch(addRoles()),
    getGroups: () => dispatch(addGroups(1))
});

class AddStudent extends React.Component{
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        this.props.getGroups();
        this.props.getRoles();
    }

    onSubmit = (formValues) => {
        let role = this
            .props
            .roles
            .roles.filter(role => role.role_name === Roles.ROLE_STUDENT)[0];

        // Create Student

        let {name,email,group_id} = formValues;

        this.props.create(name,email,role.id,group_id);
    }

    renderInput = ({input,id,type,meta,multiple,options}) => {

        if(type === 'select'){

            let value = input.value ? input.value : (multiple ? [] : -1);

            return <div>
                <Input
                    type={type}
                    id={id}
                    value={value}
                    {...input}
                >
                    <option value={-1}>
                        Assign Student a Group
                    </option>
                    {options ? options.map((g,index) => {
                        return <option key={index} value={g.id}>
                            {g.name}
                        </option>
                    }):null}
                </Input>
                {this.renderError(meta)}
            </div>
        }

        return(
            <div>
                <Input
                    type={type}
                    id={id}
                    {...input}
                />
                {this.renderError(meta)}
            </div>
        );
    }

    renderError({touched, error}){
        if(touched && error){
            return(
                <div className="text-danger">
                    {error}
                </div>
            );
        }
        return null;
    }

    render()
    {

        const {groups} = this.props;

        const successMessage = this.props.auth.success ? <Col md={{offset: 4, size: 8}}>
                                    <div className="alert alert-success">
                                        {this.props.auth.success}
                                    </div>
                                </Col>: null;
        const errMessage = this.props.auth.create_err ? <Col md={{offset: 4, size: 8}}>
                                    <div className="alert alert-danger">
                                        {this.props.auth.create_err}
                                    </div>
                                </Col>: null

        return(
            <div className="mt-4">
                <Form
                    onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                    {errMessage}
                    {successMessage}
                    <FormGroup row>
                        <Col md="4">
                            <Label for="name">
                                <strong>
                                    Student Name:
                                </strong>
                            </Label>
                        </Col>
                        <Col md="8">
                            <Field
                                id="name"
                                name="name"
                                type="text"
                                component={this.renderInput}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="4">
                            <Label for="email">
                                <strong>
                                    Student Email:
                                </strong>
                            </Label>
                        </Col>
                        <Col md="8">
                            <Field
                                id="email"
                                name="email"
                                type="text"
                                component={this.renderInput}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                    <Col md="4">
                        <Label for="group">
                            <strong>
                                Assign to Group:
                            </strong>
                        </Label>
                    </Col>
                    <Col md="8">
                        <Field
                            id="group"
                            name="group_id"
                            type="select"
                            options={groups.groups}
                            multiple={false}
                            component={this.renderInput}
                        />
                    </Col>
                </FormGroup>
                    <Button
                        type="submit"
                        formMethod="post"
                        color="primary">
                        {this.props.auth.isLoading ?<Loading /> : null} Add
                    </Button>
                </Form>
            </div>
        );
    }
}

const validate = (formValues) => {

    let errors = {};

    if(!formValues.name){
        errors.name="Name is Required!";
    }
    if(!formValues.email){
        errors.email="Email Address is Required!";
    }
    if(formValues.email && !emailReg.test(formValues.email)){
        errors.email = "Email Address is invalid!";
    }
    // if(!formValues.group_id || formValues.group_id === "-1"){
    //     errors.group_id = 'Please Select a Group!';
    // }
    // if(!formValues.password){
    //     errors.password = "Password is required";
    // }
    // if(formValues.password && formValues.password !== formValues.confirmPassword
    // ){
    //     errors.confirmPassword = "Password and Confirm Password do not match!";
    // }

    return errors;
}

export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({
    form: 'AddStudentForm',
    validate
})(AddStudent));
