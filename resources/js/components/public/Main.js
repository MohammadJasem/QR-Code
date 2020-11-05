import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {signInAsync} from '../../redux/actions';
import Panel from '../Panel';
import * as Roles from '../../shared/Roles';
import PublicRoutes from './PublicRoutes';

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    signIn: (email, password) => dispatch(signInAsync(email,password))
})

class Main extends React.Component{
    constructor(props){

        super(props);
    }

    trySignIn = (email,password) => {
        this.props.signIn(email,password);
        if(localStorage.getItem('token')){
            if(localStorage.getItem('role') === Roles.ROLE_ADMIN){
                return(
                    <Redirect to="/admin" />
                );
            }else if(localStorage.getItem('role') === Roles.ROLE_TEACHER)
            {
                return(
                    <Redirect to="/teacher" />
                );
            }
        }else{
            return(
                <Redirect to="/" />
            );
        }
    }

    render(){
        return(
            <>
                <div className="container">
                    <PublicRoutes
                        err={this.props.auth.login_err}
                        isLoading={this.props.auth.isLoading}
                        trySignIn = {(email,password) => this.trySignIn(email,password)}
                    />
                </div>
                {
                    (localStorage.getItem('token') ?
                        <Panel role={localStorage.getItem('role')} /> : null)
                }
            </>
        )
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));