import React, {Component} from 'react';
import {List, InputItem, NavBar, Grid, Icon} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMsgList, sendMsg, receiveMsg, readMsg} from "../../redux/chat.redux";
import {getChatId} from "../../utils";


@connect(
    state => state,
    {getMsgList, sendMsg, receiveMsg, readMsg}
)

class Chat extends Component {
    constructor (props) {
        super(props);
        this.state = {
            text: '',
            msg: [],
            showEmoji: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount () {

        /*
         * 避免刷新页面的时候，聊天记录没有了，
         * 因此需要在Chat组件渲染以后调用一下以下函数
         */
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList();
            // this.props.receiveMsg();
        }
    }

    componentWillUnmount () {
        const to = this.props.match.params.user;
        this.props.readMsg(to);
    }

    // 修复antd的Grid组件一加载只显示以后的bug
    fixCarousel () {
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'))
        }, 0);
    }

    handleChange (v) {
        this.setState({text: v});
    }

    handleSubmit () {

        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({from, to, msg});
        this.setState({text: ''});
        this.props.getMsgList();

    }

    render () {
        const emoji = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 ☺ 🙂  🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮  🤐 😯 😪 😫 😴 😌 😛 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👶 👦 👧 👨 👩 👴 👵 👨‍⚕️  👩‍ 👨‍🎓 👩‍🎓 👨‍⚖️ 👩‍⚖️ 👨‍🌾  👩‍🌾 👨‍🍳 👩‍🍳 👨‍🔧 👩‍🔧 👨‍🏭  👩‍🏭 👨‍💼 👩‍💼 👨‍🔬 👩‍🔬 👨‍💻 👩‍💻 👨👩‍🎤 👨‍🎨 👩‍🎨 👨‍✈️  👩‍✈️ 👨‍🚀 👩‍🚀 👨‍🚒 👩‍🚒 👮 👮‍♂️ 👮‍♀️ 🕵 🕵️‍♂️ 🕵️‍♀️ 💂 💂‍♂️  💂‍♀️  👷 👷‍♂️ 👷‍♀️ 🤴 👸 👳 👳‍♂️ 👳‍♀️ 👲 🧕 🧔 👱 👱‍♂️ 👱‍♀️ 🤵 👰 🤰 🤱 👼 🎅 🤶 🧙‍♀️ 🧙‍♂️ 🧚‍♀️ 🧚‍♂️ 🧛‍♀️ 🧛‍♂️ 🧜‍♀️ 🧜‍♂️ 🧝‍♀️ 🧝‍♂️ 🧞‍♀️ 🧞‍♂️ 🧟‍♀️ 🧟‍♂️ 🙍 🙍‍♂️ 🙍‍♀️ 🙎 🙎‍♂️ 🙎‍♀ 🙅 🙅‍♂️ 🙅‍♀️ 🙆 🙆‍♂️ 🙆‍♀️ 💁 💁‍♂️ 💁‍♀️ 🙋 🙋‍♂️ 🙋‍♀️ 🙇 🙇‍♂️ 🙇‍♀️ 🤦‍♂️ 🤦‍♀️ 🤷 🤷‍♂️ 🤷‍♀️ 💆 💆‍♂️ 💆‍♀️ 💇 💇‍♂️ 💇‍♀️ 🚶 🚶‍♂️ 🚶‍♀️ 🏃 🏃‍♂️ 🏃‍♀️ 💃 🕺 👯 👯‍♂️ 👯‍♀️ 🧖‍♀️ 🧖‍♂️ 🕴 🗣 👤 👥 👫 👬 👭 💏 👨‍❤️‍💋‍👨 👩‍❤️‍💋‍👩 💑 👨‍❤️‍👨 👩‍❤️‍👩 👪 👨‍👩‍👦 👨‍👩‍👧 👨‍👩‍👧‍👦 👨‍👩‍👦‍👦 👨‍👩‍👧‍👧 👨‍👨‍👦 👨‍👨‍👧 👨‍👨‍👧‍👦 👨‍👨‍👦‍👦 👨‍👨‍👧‍👧 👩‍👩‍👦 👩‍👩‍👧 👩‍👩‍👧‍👦 👩‍👩‍👦‍👦 👩‍👩‍👧‍👧 👨‍👦 👨‍👦‍👦 👨‍👧 👨‍👧‍👦 👨‍👧‍👧 👩‍👦 👩‍👦‍👦 👩‍👧 👩‍👧‍👦 👩👧‍👧 🤳 💪 👈 👉 ☝ 👆 🖕 👇 ✌ 🤞 🖖 🤘 🖐 ✋ 👌 👍 👎 ✊ 👊 🤛 🤜 🤚 👋 🤟 ✍ 👏 👐 🙌 🤲 🙏 🤝 💅 👂 👃 👣 👀 👁 🧠 👅 👄 💋 👓 🕶 👔 👕 👖 🧣 🧤 🧥 🧦 👗 👘 👙 👚 👛 👜 👝 🎒 👞 👟 👠 👡 👢 👑 👒 🎩 🎓 🧢 ⛑ 💄 💍 🌂 ☂ 💼'
            .split(' ')
            .filter(v => v)
            .map(v => ({text: v}));
        const toUser = this.props.match.params.user;
        const users = this.props.chat.users;
        const Item = List.Item;
        const user = this.props.user._id;
        const chatid = getChatId(user, toUser);
        const chatmsg = this.props.chat.chatmsg.filter(v => v.chatid === chatid);
        if (!users[toUser]) {
            return null;
        }
        return (
            <div id="chat-page" className="top-padding">
                <NavBar
                    icon={<Icon type="left"/>}
                    onLeftClick={() => this.props.history.goBack()}
                    mode="dark"
                >{users[toUser].name}</NavBar>
                {chatmsg.map(v => {
                    // 只需设置发送消息的一方的头像即可
                    const avatar = require(`../img/${users[v.from].avatar}.png`)
                    return v.from === toUser ? (
                        <List key={v._id}>
                            <Item thumb={avatar}>{v.content}</Item>
                        </List>
                    ) : (
                        <List key={v._id}>
                            <Item
                                className="chat-me"
                                extra={<img src={avatar} alt=""/>}
                            >
                                {v.content}
                            </Item>
                        </List>
                    );
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={this.state.text}
                            onChange={this.handleChange}
                            extra={
                                <div>
                                    <span
                                        style={{marginRight: 15}}
                                        onClick={() => {
                                            this.setState({showEmoji: !this.state.showEmoji});
                                            this.fixCarousel();
                                        }}
                                    >😋</span>
                                    <span onClick={this.handleSubmit}>发送</span>
                                </div>
                            }
                        />
                    </List>
                    {this.state.showEmoji && <Grid
                        data={emoji}
                        columnNum={9}
                        isCarousel={true}
                        carouselMaxRow={4}
                        onClick={el => {
                            this.setState({
                                text: this.state.text + el.text
                            })
                        }}
                    />}
                </div>
            </div>
        );
    }
}

export default Chat;