import React from 'react';
import {Table} from 'reactstrap';
import {connect} from 'react-redux';
import {addTeachers} from '../../../redux/actions';
import Loading from '../../Loading';

const mapStateToProps = state => ({
    teachers: state.teachers
});

const mapDispatchToProps = dispatch => ({
    addTeachers: () => dispatch(addTeachers())
});

class ViewTeachers extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.addTeachers();
    }

    render(){

        const {teachers} = this.props;

        if(teachers.isLoading){
            return <Loading />
        }

        return(
            <Table>
                <thead>
                    <tr>
                        <th>Teacher Name</th>
                        <th>Email Address</th>
                        <th>Registered At</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.teachers.map((t,index) => {
                        return(
                            <tr key={index}>
                                <td>{t.name}</td>
                                <td>{t.email}</td>
                                <td>{t.created_at}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewTeachers);