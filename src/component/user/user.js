import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Result, WhiteSpace, List, Button, WingBlank} from 'antd-mobile';
import BrowserCookie from 'browser-cookies';
import {logoutSubmit} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom';

@connect(
    state => state,
    {logoutSubmit}
)

class User extends Component {
    constructor (props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout () {
        // window.location.href=window.location.href;
        const alert = Modal.alert;

        alert('退出应用', '确认退出应用吗？？', [
            {
                text: '取消', onPress: () => {
            }
            },
            {
                text: '确认',
                onPress: () => {
                    this.props.logoutSubmit();
                    BrowserCookie.erase('userid');
                }
            }
        ]);
    }

    render () {
        const user = this.props.user;
        const Item = List.Item;
        const Brief = Item.Brief;
        return user.user ? (
            <div className="user-wrapper top-padding">
                <Result
                    img={user.avatar ?
                        <img src={require(`../img/${user.avatar}.png`)} style={{width: 50}} alt=""/> : null}
                    title={user.user}
                    message={user.company ? user.company : null}
                />
                <WhiteSpace/>
                <WingBlank>
                    <List renderHeader={() => '个人简介'}>
                        <Item multipleLine>
                            {user.title}
                            {user.desc ? user.desc.split('\n').map(k => (<Brief key={k}>{k}</Brief>)) : null}
                        </Item>
                        <Item
                            arrow="horizontal"
                            multipleLine
                            onClick={() => {
                                this.props.history.push('/genius');
                            }}
                        >好友</Item>
                    </List>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.logout}>退出登录</Button>
                </WingBlank>

            </div>
        ) : <Redirect to={user.redirectTo}/>;
    }
}

export default User;