import React from 'react';
import QRCode from 'qrcode.react';
import {Route,Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {signOutAsync} from '../../redux/actions';
import {spaces} from '../../shared/spaces';
import {Row, Col, Modal} from 'reactstrap';
import Sidebar from '../Sidebar';
import Home from './Home';
import Toggle from '../ToggleButton';
import AddSchedule from './schedules/AddSchedule';
import ViewSchedules from './schedules/ViewSchedules';
import ScheduleQRCode from './schedules/SchduleQRCode';
import Audiences from './schedules/Audiences';

const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch(signOutAsync())
});

class TeacherPanel extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {
            isNavOpen: true,
            isModalOpen: false,
            qr_code_url: ''
        };
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
                    space={spaces.TeacherSpace}
                    signOut={() => this.props.signOut()}
                />
            </Col>);
        }else {
            return null;
        }
    }

    toggleModal = (qr_code_url) => {
        this.setState( (prevState) => ({
            qr_code_url,
            isModalOpen: !prevState.isModalOpen
        }));
    }

    render()
    {
        const {isModalOpen,qr_code_url} = this.state;
        const baseName = spaces.TeacherSpace.baseName;
        return(
            <Row>
                <Modal
                    isOpen={isModalOpen}
                    toggle={this.toggleModal}
                    className='justify-content-center'
                >
                    <QRCode
                        size={650}
                        includeMargin={true}
                        value={qr_code_url}
                    />
                </Modal>
                {this.renderSidebar()}
                <Col md="8" className="ml-4">
                    <Toggle onClick={this.toggleNav} />
                    <Switch>
                        <Route exact path={baseName}>
                            <Home />
                        </Route>
                        <Route exact path={baseName.concat('/schedules/add')}>
                            <AddSchedule />
                        </Route>
                        <Route exact path={baseName.concat('/schedules/view')}>
                            <ViewSchedules />
                        </Route>
                        <Route exact path={baseName.concat('/schedules/ScheduleQRCode/:qr_token')} component={({match}) => <ScheduleQRCode toggle={(qr_code_url) => this.toggleModal(qr_code_url)} match={match} />} />
                        <Route exact path={baseName.concat('/schedules/audiences/:schedule_id')} component={({match}) => <Audiences match={match} />} />
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

export default connect(null, mapDispatchToProps)(TeacherPanel);
