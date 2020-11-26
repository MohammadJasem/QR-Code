import React from 'react';
import {Table} from 'reactstrap';
import {connect} from 'react-redux';
import {addStudents} from '../../../redux/actions';
import Loading from '../../Loading';

const mapStateToProps = state => ({
    students: state.students
});

const mapDispatchToProps = dispatch => ({
    addStudents: () => dispatch(addStudents())
});

class ViewStudents extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.addStudents();
    }

    render(){

        const {students} = this.props;

        if(students.isLoading){
            return <Loading />
        }

        return(
            <Table>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Email Address</th>
                        <th>Registered At</th>
                    </tr>
                </thead>
                <tbody>
                    {students.students.map((std,index) => {
                        return(
                            <tr key={index}>
                                <td>{std.name}</td>
                                <td>{std.email}</td>
                                <td>{std.created_at}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewStudents);