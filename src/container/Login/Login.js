import React, {Component} from 'react';
import {List, InputItem, WhiteSpace, WingBlank, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Logo from '../../component/Logo/Logo';
import {login} from "../../redux/user.redux";
import appForm from '../../component/appForm/appForm';


@connect(
    state => state.user,
    {login}
)
@appForm
class Login extends Component {
    constructor (props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister () {
        this.props.history.push('/register');
    }

    handleLogin () {
        this.props.login(this.props.state);
    }

    render () {
        const pathname = this.props.location.pathname;
        const redirectTo = this.props.redirectTo;
        return (
            <div className="login-page-wrapper">
                {redirectTo && redirectTo !== pathname ? <Redirect to={redirectTo}/> : null}
                <Logo/>
                <WingBlank>
                    {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                    <List>
                        <InputItem
                            placeholder='用户名'
                            onChange={value => {
                                this.props.handleChange('user', value)
                            }}>
                            <img src={require('../../static/images/user.png')} alt=""/> </InputItem>
                        <InputItem
                            placeholder='密 码'
                            onChange={value => {
                                this.props.handleChange('pwd', value)
                            }} type="password">
                            <img src={require('../../static/images/pwd.png')} alt=""/>
                        </InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={() => {
                        this.handleLogin()
                    }}>登 录</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={() => {
                        this.handleRegister()
                    }}>注 册</Button>
                </WingBlank>
            </div>
        );
    }
}

export default Login;