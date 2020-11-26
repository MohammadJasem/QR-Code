import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import {Table,Button} from 'reactstrap';
import {connect} from 'react-redux';
import {addSchedules} from '../../../redux/actions';
import Loading from '../../Loading';
import {spaces} from '../../../shared/spaces';

// TODO ----> : Any QR Code for an old Schedule shouldn't be generated

const DATE_POLARITY = {
    BEFORE: 'BEFORE',
    AFTER: 'AFTER'
};

const mapStateToProps = (state) => ({
    schedules: state.schedules
});

const mapDispatchToProps = dispatch => ({
    addSchedules: () => dispatch(addSchedules())
});

class ViewSchedules extends React.Component {

    constructor(props)
    {
        super(props);

        // this.onGenerateClicked = this.onGenerateClicked.bind(this);
    }

    componentDidMount(){
        this.props.addSchedules();
    }

    getDiffInDates = (date, polarity) => {

        let now = Date.now();

        let schedule_date = new Date(date).getTime();

        if(polarity === DATE_POLARITY.AFTER){
            return (now - schedule_date) / 3600000;
        }else {
            return (schedule_date - now) / 3600000;

        }
    }

    render()
    {

        const {schedules} = this.props;

        const baseName = spaces.TeacherSpace.baseName;

        if(schedules.isLoading){
            return (<Loading />);
        }

        return(
            <Table>
                <thead>
                    <tr>
                        <th>
                            Subject
                        </th>
                        <th>
                            Group Name
                        </th>
                        <th>
                            Scheduled for
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.schedules.map((s,index) => {

                        let diff_in_hours_before = this.getDiffInDates(s.date_scheduled, 'BEFORE'); // Get The Difference between Dates in Hours
                        let diff_in_hours_after = this.getDiffInDates(s.date_scheduled, 'AFTER');

                        let qr_code_link =  <Link
                                                to={`${baseName.concat(`/schedules/ScheduleQRCode/${s.qr_token}`)}`}
                                            >
                                                Generate QR Code
                                            </Link>;
                        return(
                            <tr key={index}>
                                <td>{s.group.subject.title}</td>
                                <td>{s.group.name}</td>
                                <td>{s.date_scheduled}</td>
                                <td>
                                    {diff_in_hours_after > 2 ? 'The QR Code for this Schedule is no long available!':
                                        (diff_in_hours_before > 1 ? 'This QR Code will be available soon' : qr_code_link)}
                                </td>
                                <td>
                                    <Link to={`${baseName.concat(`/schedules/audiences/${s.id}`)}`}>
                                        Audiences
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ViewSchedules));

