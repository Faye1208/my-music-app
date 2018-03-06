import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavBar, Icon} from 'antd-mobile';
import {getUserList} from "../../redux/chatuser.redux";
import UserCard from '../usercard/usercard';

@connect(
    state => state,
    {getUserList}
)

class Genius extends Component {
    componentDidMount () {
        this.props.getUserList('genius');
    }

    render () {
        const userid = this.props.user._id;
        const userList = this.props.chatuser.userList.filter(item => item._id !== userid);
        return (
            <div className="genius-wrapper top-padding">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" size="lg"/>}
                    onLeftClick={() => {
                        this.props.history.go(-1)
                    }}
                    rightContent={<Icon key="1" type="ellipsis"/>}
                >好友</NavBar>
                <UserCard data={userList}/>
            </div>
        );

    }

}

export default Genius;