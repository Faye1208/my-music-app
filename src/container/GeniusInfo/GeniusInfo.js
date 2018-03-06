import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {List, WingBlank, WhiteSpace, TextareaItem, Button, NavBar, Icon} from 'antd-mobile';
import {update} from "../../redux/user.redux";
import AvatarSelector from '../../component/AvatarSelector/AvatarSelector';

@connect(
    state => state.user,
    {update}
)
class GeniusInfo extends Component {
    constructor (props) {
        super(props);
        this.state = {
            title: '',
            desc: '',
            avatar: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleChange (key, val) {
        this.setState({
            [key]: val
        });
    }

    handleUpdate () {
        this.props.update(this.state);
    }

    render () {
        const pathname = this.props.location.pathname;
        const redirectTo = this.props.redirectTo;
        return (
            <div className="geniusinfo-wrapper top-padding">
                {redirectTo && (redirectTo !== pathname ? <Redirect to={this.props.redirectTo}/> : null)}
                <NavBar
                    icon={<Icon type="left" size="lg"/>}
                    onLeftClick={() => {
                        this.props.history.go(-1)
                    }}
                >个人资料</NavBar>
                <AvatarSelector selectAvatar={(imgname) => {
                    this.setState({
                        avatar: imgname
                    })
                }}/>
                <WingBlank>
                    <List>
                        {/*<InputItem onChange={value => {*/}
                        {/*this.handleChange('title', value)*/}
                        {/*}}>求职岗位</InputItem>*/}
                        <TextareaItem
                            rows={3}
                            title="个人简介"
                            onChange={value => {
                                this.handleChange('desc', value)
                            }}
                        />
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={() => {
                        this.handleUpdate()
                    }}>保 存</Button>
                </WingBlank>
            </div>
        );
    }
}

export default GeniusInfo;