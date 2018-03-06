import React, {Component} from 'react';
import imgPath from '../../static/images/logo.jpg';
import './logo.css';

class Logo extends Component {
    render () {
        return (
            <div className="logo-page-wrapper">
                <div className="logo-wrapper">
                    <img src={imgPath} alt="" style={{width: '180px', height: '180px'}}/>
                </div>
            </div>
        );
    }
}

export default Logo;