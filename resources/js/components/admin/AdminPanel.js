import React, {Component} from 'react';
import {Route,Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {signOutAsync} from '../../redux/actions';
import {Col, Row} from 'reactstrap';
import Sidebar from '../Sidebar';
import Home from './Home';
import ViewStudents from './Students/ViewStudents';
import AddStudent from '../admin/Students/AddStudent';
import AddTeacher from '../admin/Teachers/AddTeacher';
import AddSubject from './subjects/AddSubjects';
import {spaces} from '../../shared/spaces';
import Toggle from '../ToggleButton';
import './admin.css';
import AddGroup from '../admin/groups/AddGroups';
import ViewTeachers from './Teachers/ViewTeachers';

const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch(signOutAsync())
});

class AdminPanel extends Component{
    constructor(props){
        super(props);
        this.state = {
            isNavOpen: true
        }
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav = () => {
        this.setState(prev => ({
            isNavOpen: !prev.isNavOpen
        }));
    }

    renderSidebar = () => {
        if(this.state.isNavOpen){
            return(
            <Col md="2">
                <Sidebar
                    profilePhoto={require('../../assets/John-Doe.png')}
                    space={spaces.AdminSpace}
                    signOut={() => this.props.signOut()}
                />
            </Col>);
        }else {
            return null;
        }
    }

    render()
    {
        const baseName = spaces.AdminSpace.baseName;
        return(
            <Row>
                {this.renderSidebar()}
                <Col md="8" className="ml-4">
                    <Toggle onClick={this.toggleNav} />
                    <Switch>
                        <Route exact path={baseName}>
                            <Home />
                        </Route>
                        <Route exact path={baseName.concat('/students/add')}>
                            <AddStudent />
                        </Route>
                        <Route exact path={baseName.concat('/students/view')}>
                            <ViewStudents />
                        </Route>
                        <Route exact path={baseName.concat('/teachers/add')}>
                            <AddTeacher />
                        </Route>
                        <Route exact path={baseName.concat('/teachers/view')}>
                            <ViewTeachers />
                        </Route>
                        <Route exact path={baseName.concat('/subjects/add')}>
                            <AddSubject />
                        </Route>
                        <Route exact path={baseName.concat('/groups/add')}>
                            <AddGroup />
                        </Route>
                        <Route exact path={"/signout"}>
                            {null}
                        </Route>
                        <Redirect to={baseName} />
                    </Switch>
                </Col>
            </Row>
        );
    }
}

export default connect(null, mapDispatchToProps)(AdminPanel);
