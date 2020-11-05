import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import {
    Container,
    Row,
    Col,
    Form,
    Input,
    Label,
    FormGroup,
    Button
} from 'reactstrap';
import {emailReg} from '../../shared/Constants';
import Loading from '../Loading';

class LoginForm extends Component {

    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    trySignOut = () => {
        this.props.trySignOut();
    }

    trySignIn = ({email, password}) => {

        this.props.trySignIn(email, password);
    }

    onSubmit(formValues){

        this.trySignIn(formValues);
    }

    // handleInputChange(event){
    //     const target = event.target;

    //     const value = target.type === 'checkbox' ? target.checked : target.value;

    //     const name = target.name;

    //     this.setState({
    //         [name]: value
    //     });
    // }

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

    renderInput = ({input, id, type,meta}) => {

        // if(type === 'select'){
        //     return(
        //         <Input type={type} id={id} {...input}>
        //             ({options.map((option, index) => <option key={index}>{option}</option>)})
        //         </Input>
        //     );
        // }

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

    renderErrorMessage = (message) => {
        if(message){
            return(
                <div className="alert alert-danger">
                    {message}
                </div>
            );
        }else{
            return null;
        }
    }

    render() {
        return (
            <>
                <Container className="justify-content-center pt-5">
                    <Row>
                        <Col sm={12} md={{size: 6, offset: 3}}>
                        {this.renderErrorMessage(this.props.err)}
                            <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                <FormGroup>
                                    <Label for="email">
                                        <strong>
                                            Enter your login Email
                                        </strong>
                                    </Label>
                                    <Field
                                        name="email"
                                        id="email"
                                        type={'text'}
                                        component={this.renderInput}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">
                                        <strong>
                                            Password
                                        </strong>
                                    </Label>
                                    <Field
                                        id="password"
                                        name="password"
                                        type={'password'}
                                        component={this.renderInput}
                                    />
                                </FormGroup>
                                <div className="pt-2 pb-2">
                                    <button type="button" className="btn btn-link">
                                        forgot your password?
                                    </button>
                                </div>
                                <FormGroup row>
                                    <Col md={12}>
                                        <FormGroup check>
                                            <Label check>
                                                <Field
                                                    id="rememberMe"
                                                    name="rememberMe"
                                                    type={'checkbox'}
                                                    component={this.renderInput}
                                                />
                                                <strong>Remember Me</strong>{' '}
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                                <Button
                                    formMethod="post"
                                    type="submit"
                                    color='primary'
                                    >
                                    {this.props.isLoading ? <Loading /> : null} Login
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

function validate(formValues){

    const errors = {};
    if(!formValues.email){
        errors.email = "Email Address is required!"
    }
    if(formValues.email && !emailReg.test(formValues.email)){
        errors.email = "Email Address is invalid";
    }
    if(!formValues.password){
        errors.password="Password is required";
    }

    return errors;
};

export default reduxForm({
    form: 'loginForm',
    validate
})(LoginForm);