import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, InputItem, WhiteSpace, WingBlank, Button} from 'antd-mobile';
import {Redirect} from 'react-router-dom';
import Logo from '../../component/Logo/Logo';
import appForm from '../../component/appForm/appForm';
import {register} from "../../redux/user.redux";

@connect(
    state => state.user,
    {register}
)

@appForm

class Register extends Component {
    constructor (props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
    }

    componentDidMount () {
        this.props.handleChange('type', 'genius');
    }

    handleRegister () {
        this.props.register(this.props.state);
    }

    render () {
        return (
            <div className="register-page-wrapper login-page-wrapper">
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo/>
                <WingBlank>
                    {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                    <List>
                        <InputItem
                            placeholder='用户名'
                            onChange={value => {
                                this.props.handleChange('user', value)
                            }}>
                            <img src={require('../../static/images/user.png')} alt=""/>
                        </InputItem>
                        <InputItem
                            placeholder='密 码'
                            onChange={value => {
                                this.props.handleChange('pwd', value)
                            }} type="password"> <img src={require('../../static/images/pwd.png')} alt=""/>
                        </InputItem>
                        <InputItem
                            placeholder='确认密码'
                            onChange={value => {
                                this.props.handleChange('repeatpwd', value)
                            }} type="password">
                            <img src={require('../../static/images/pwd.png')} alt=""/>
                        </InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={() => {
                        this.handleRegister()
                    }}>注册</Button>
                    <WhiteSpace/>

                </WingBlank>

            </div>
        );
    }
}

export default Register;