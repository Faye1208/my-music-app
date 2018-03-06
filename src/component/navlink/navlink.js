import React, {Component} from 'react';
import {TabBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

@withRouter

@connect(
    state => state
)

class NavLinkBar extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    }

    render () {
        const navList = this.props.data;
        const pathname = this.props.location.pathname;
        return (
            <TabBar>
                {navList.map(v => {
                    return <TabBar.Item
                        badge={v.path === '/msg' && this.props.chat.unread}
                        key={v.path}
                        title={v.text}
                        icon={{uri: require(`./img/${v.icon}.png`)}}
                        selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
                        selected={v.subRoute ? (v.subRoute.indexOf(pathname) >= 0) : pathname === v.path}
                        onPress={() => {
                            if (v.path === '/songpanel/:panelid') {
                                this.props.history.push('/songpanel/new');
                            } else {
                                this.props.history.push(v.path);
                            }
                        }}
                    >
                    </TabBar.Item>

                })}
            </TabBar>

        )
            ;
    }
}

export default NavLinkBar;