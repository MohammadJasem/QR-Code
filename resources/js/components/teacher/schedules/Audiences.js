import React from 'react';
import {connect} from 'react-redux';
import {
    getAudiences
} from '../../../redux/actions';
import {
    Table,
    Row,
    Col
}from 'reactstrap';
import Loading from '../../Loading';

const mapStateToProps = state => ({
    audiences: state.audiences
});

class Audiences extends React.Component{

    constructor(props){
        super(props);
    };

    componentDidMount(){
        const {match} = this.props;

        const schedule_id = match.params.schedule_id

        if(schedule_id){
            this.props.getAudiences(schedule_id);
        }
    }

    render(){

        const {audiences} = this.props;

        if(audiences.isLoading){
            return <Loading />
        }
        if(audiences.err){
            return <div className="col-12">
                <div className="alert alert-danger">
                    {audiences.err}
                </div>
            </div>
        }

        const header = `Attendance Report for \
            ${audiences.data.group.name} for Schedule \
            ${audiences.data.schedule_date} for ${audiences.data.group.subject.title}`;

        return(
            <Row>
                <h2>
                    {header}
                </h2>
                <hr />
                <Col md="8">
                    <h3 className="text-success">Attendances</h3>
                    <Table>
                        <thead>
                            <tr>
                                <th>
                                    Student Name
                                </th>
                                <th>
                                    Email Address
                                </th>
                                <th>
                                    Registered At
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {audiences.data.audiences.map((audience,index) => {

                                const mail = `mailto:${audience.user.email}`;
                                return(
                                    <tr key={index}>
                                        <td>
                                            {audience.user.name}
                                        </td>
                                        <td>
                                            <a href={mail}>
                                                {audience.user.email}
                                            </a>
                                        </td>
                                        <td>
                                            {audience.registered_at}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Col>
                <Col md="4">
                    <h3 class="text-danger">Absents</h3>
                    <Table>
                            <thead>
                                <tr>
                                    <th>
                                        Student name
                                    </th>
                                    <th>
                                        Email Address
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {audiences.data.missing.map((missing,index) => {
                                    const mail = `mailto:${missing.email}`;
                                    return <tr key={index}>
                                        <td>{missing.name}</td>
                                        <td>
                                            <a href={mail}>
                                                {missing.email}
                                            </a>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                    </Table>
                </Col>
            </Row>
        );
    }
}

export default connect(mapStateToProps, {
    getAudiences
})(Audiences);
