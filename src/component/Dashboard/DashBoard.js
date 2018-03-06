import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {NavBar, Icon} from 'antd-mobile';
import User from '../user/user';
import Msg from '../Msg/Msg';
import NavLinkBar from '../navlink/navlink';
import Found from '../Found/Found';
import MyMusic from '../mymusic/mymusic';
import {getMsgList, receiveMsg} from "../../redux/chat.redux";


@connect(
    state => state,
    {getMsgList, receiveMsg}
)

class Dashboard extends Component {
    componentDidMount () {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList();
            this.props.receiveMsg();
        }
    }

    render () {
        const {pathname} = this.props.location;
        const navList = [
            {
                path: `/songpanel/:panelid`,
                title: '',
                icon: 'boss',
                text: '发现',
                component: Found,
                subRoute: ['/songpanel/new', '/songpanel/rank', '/songpanel/station', '/songpanel/singer']
            },
            {
                path: '/mymusic',
                title: '我的音乐',
                icon: 'music',
                text: '我的音乐',
                component: MyMusic
            },
            {
                path: '/msg',
                title: '消息',
                icon: 'msg',
                text: '消息',
                component: Msg
            },
            {
                path: '/me',
                title: '个人中心',
                icon: 'user',
                text: '我',
                component: User
            }
        ];

        const navItem = navList.find(v => {
            return pathname === v.path || v.subRoute;
        });
        return navItem ? (
            <div className="dashboard-wrapper">
                {
                    (navItem.path === '/songpanel/:panelid') ?
                        <NavBar
                            mode="dark"
                            leftContent={<img width="95%" src={require('../../static/images/logo.png')} alt=""/>}
                            rightContent={<Icon type="search" size="md"/>}
                        /> :
                        <NavBar className="fixed-header" mode="dark">
                            {navItem.title}
                        </NavBar>
                }
                <div className="dashboard-content-wrapper">
                    <Switch>
                        {navList.map(v => {
                            return <Route key={v.path} path={v.path} component={v.component}/>
                        })}
                    </Switch>
                </div>
                <NavLinkBar data={navList}/>
            </div>
        ) : (<h2>找不到该页面</h2>);
    }
}

export default Dashboard;