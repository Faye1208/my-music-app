import React, {Component} from 'react';
import {WingBlank, WhiteSpace, List} from 'antd-mobile';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

@withRouter

class UserCard extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    }

    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (v) {
        this.props.history.push(`/chat/${v._id}`);
    }

    render () {
        const ListItem = List.Item;
        const userData = this.props.data;
        const Brief = ListItem.Brief;
        return (
            <div className="usercard-wrapper">
                <WingBlank>
                    <WhiteSpace/>
                    <List>
                        {userData.map(v => {
                            return v.avatar ? (

                                <ListItem
                                    key={v._id}
                                    thumb={
                                        <img
                                            src={require(`../img/${v.avatar}.png`)}
                                            style={{
                                                width: '35px',
                                                height: '35px',
                                                display: 'inline-block',
                                                marginTop: '8px',
                                                marginBottom: '8px'
                                            }}
                                            alt=""/>
                                    }
                                    arrow="horizontal"
                                    multipleLine
                                    onClick={() => this.handleClick(v)}
                                >
                                    {v.user}
                                    <Brief>{v.desc.split('\n').map(k => (<div key={k}>{k}</div>))}</Brief>
                                </ListItem>

                            ) : null
                        })}
                    </List>

                </WingBlank>
            </div>
        );
    }
}

export default UserCard;