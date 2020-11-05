import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    auth: state.auth
});

class Home extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="container justify-content-center">
                <h2>
                    This is The home page of Admin Space
                </h2>
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(Home);