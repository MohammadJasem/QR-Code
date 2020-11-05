import React from 'react';
import {
    Col,
    Container,
    Form,
    Input,
    Label,
    FormGroup,
    Button
} from 'reactstrap';
import {Field,reduxForm} from 'redux-form';
import {emailReg} from '../shared/Constants';
import Loading from './Loading';
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import moment from 'moment'
import momentLocaliser from 'react-widgets-moment'
import 'react-widgets/dist/css/react-widgets.css'

momentLocaliser(moment);

let Fields = [];

const setFields = (fields) => {
    Fields = fields;
}

class  CreateForm extends React.Component {

    constructor(props)
    {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = (formValues) => {

        this.props.onSubmit(formValues);
    }

    renderInput = ({input,id,options,multiple,type,meta}) => {

        if(type === 'datetime'){
            return(
                <div>
                    <DateTimePicker
                        {...input}
                        id={id}
                        time={true}
                        format={'YYYY-MM-DD HH:mm:ss'}
                        value={input.value ? new Date(input.value) : null}
                    />
                    {this.renderError(meta)}
                </div>
            );
        }

        else if(type === 'select'){

            let value = input.value ? input.value : (multiple ? [] : -1);
            return(
                <div>
                    <Input
                        type={type}
                        id={id}
                        {...input}
                        value={value}
                        multiple={multiple}
                    >
                        {options ? options.map((option, index) => {
                            return <option key={index} value={option.id}>
                                {option.name || option.title}
                            </option>}) : null
                        }
                    </Input>
                {this.renderError(meta)}
            </div>
            );
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

    render(){

        setFields(this.props.fields);

        const renderError = this.props.err ? <Col md={{size: 8, offset: 4}}>
                                                <div className="alert alert-danger">
                                                    {this.props.err}
                                                </div>
                                            </Col> : null;
        const renderSuccess = this.props.success ? <Col md={{size: 8, offset: 4}}>
                                                        <div className="alert alert-success">
                                                            {this.props.success}
                                                        </div>
                                                    </Col> : null;

        return(
            <div className="mt-4">
                {renderError}
                {renderSuccess}
                <Form
                    onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                    {(
                        this.props.fields.map((field,index) => {
                            return(
                                <FormGroup row key={index}>
                                    <Col md="4">
                                        <Label for={field.label}>
                                            <strong>
                                                {field.label}
                                            </strong>
                                        </Label>
                                    </Col>
                                    <Col md="8">
                                        <Field
                                            id={field.name}
                                            name={field.name}
                                            type={field.type}
                                            defaultText={field.defaultText ? field.defaultText : null}
                                            multiple={field.multiple ? field.multiple : false}
                                            options={field.options ? field.options :  null}
                                            component={this.renderInput}
                                        />
                                    </Col>
                                </FormGroup>
                            );
                        })
                    )}
                    <Button
                        color="primary"
                        type="submit"
                        formMethod="post"
                    >
                        {this.props.isLoading ? <Loading /> : null} Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

const validate = (formValues) => {

    let errors = {};

    Fields.forEach(field => {
        if((field.type === 'text' || field.type === 'password') && !field.confirm){
            if(!formValues[field.name]){
                errors[field.name] = `${field.label} is Required!`;
            }
        }

        if(field.type === 'number'){
            if(!formValues[field.name]){
                errors[field.name] = `Please Specify the number of ${field.label}`;
            }
        }

        if(field.type === 'textarea'){
            if(!formValues[field.name]){
                errors[field.name] = `Please write a short ${field.label}`;
            }
        }

        if(field.type === 'select'){
            if(!formValues[field.name]){
                if(field.multiple){
                    errors[field.name] = `Please Select some ${field.name}`;
                }else{
                    errors[field.name] = `Please Select a ${field.name}`;
                }
            }

            if(formValues[field.name] && (formValues[field.name] === "-1" || formValues[field.name].includes("-1"))){
                if(field.multiple){
                    errors[field.name] = `Please Select some ${field.name}`;
                }else{
                    errors[field.name] = `Please Select a ${field.name}`;
                }
            }
        }

        if(field.email){
            if(formValues[field.name] && !emailReg.test(formValues[field.name])){
                errors[field.name] = "Email Address is invalid";
            }
        }
        if(field.confirm){
            if(formValues['password']){
                if(formValues['password'] !== formValues['confirmPassword']){
                    errors[field.name] = 'Password and Confirm Password do not match!';
                }
            }
        }

        if(field.type === 'datetime'){
            if(!formValues[field.name]){
                errors[field.name] = field.validationErr;
            }
        }
    });

    return errors;
};

export default reduxForm({
    form: 'form#'.concat(Math.random(1000).toString()),
    validate
})(CreateForm);
