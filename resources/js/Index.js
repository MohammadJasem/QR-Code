import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Main from './components/public/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from './redux/reducers/configureStore';

const store = createStore(
    configureStore,
    applyMiddleware(thunk)
);

export default class Index extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Provider store={store}>
                <BrowserRouter>
                    <Main />
                </BrowserRouter>
            </Provider>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}