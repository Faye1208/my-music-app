import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, Badge} from 'antd-mobile';

@connect(
    state => state
)

class Msg extends Component {
    getLastItem (arr) {
        return arr[arr.length - 1];
    }

    render () {
        const Item = List.Item;
        const Brief = Item.Brief;
        const msgGroup = {};
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || [];
            msgGroup[v.chatid].push(v);
        });
        const chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = this.getLastItem(a).create_time;
            const b_last = this.getLastItem(b).create_time;
            return b_last - a_last;
        });
        const userid = this.props.user._id;
        const users = this.props.chat.users;
        return (
            <div className="top-padding">
                {chatList.filter(v => v[0].from === userid || v[0].to === userid).map(v => {
                    const lastItem = this.getLastItem(v);
                    const targetId = v[0].from === userid ? v[0].to : v[0].from;
                    const unreadnum = v.filter(item => !item.read && item.to === userid).length;
                    return (
                        <List key={lastItem._id}>
                            <Item
                                thumb={require(`../img/${users[targetId].avatar}.png`)}
                                arrow="horizontal"
                                extra={<Badge text={unreadnum}/>}
                                onClick={() => this.props.history.push(`/chat/${targetId}`)}
                            >
                                <Brief>{users[targetId].name}</Brief>
                                {lastItem.content}
                            </Item>
                        </List>
                    )
                })}
            </div>
        );
    }
}

export default Msg;