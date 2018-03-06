import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {loadData} from "../../redux/user.redux";
import {connect} from 'react-redux';

@withRouter
@connect(
    null,
    {loadData}
)

class AuthRoute extends React.Component {
    componentDidMount () {
        const pathName = this.props.location.pathname;
        const publicList = ['/login', '/register'];

        if (publicList.indexOf(pathName) > -1) {
            return null;
        }
        axios.get('/mproxy/user/info')
            .then(response => {
                if (response.status === 200) {
                    if (response.data.code === 0) {
                        this.props.loadData(response.data.data);
                    } else {
                        this.props.history.push('/login');
                    }
                }
            });
    }

    render () {
        return null;
    }
}

export default AuthRoute;