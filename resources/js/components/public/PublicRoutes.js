import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Header from './Header';
import Contact from './Contact';
import About from './About';
import LoginForm from './LoginForm';

class PublicRoutes extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        if(!localStorage.getItem('token')){
            return(
                <>
                    <Header />
                    <Switch>
                        <Route exact path="/">
                            <LoginForm
                                err={this.props.err}
                                isLoading={this.props.isLoading}
                                trySignIn={(email,password) => this.props.trySignIn(email,password)}
                            />
                        </Route>
                        <Route exact path="/contact">
                            <Contact />
                        </Route>
                        <Route exact path="/about">
                            <About />
                        </Route>
                        <Redirect to="/" />
                    </Switch>
                </>
            );
            }else{
                return null;
        }
    }
}

export default PublicRoutes;