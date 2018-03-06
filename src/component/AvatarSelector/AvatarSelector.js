import React, {Component} from 'react';
import {Grid, WingBlank, List, WhiteSpace} from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatarSelector extends Component {
    static propTypes = {
        selectAvatar: PropTypes.func.isRequired
    };

    constructor (props) {
        super(props);
        this.state = {};
    }

    render () {
        const avatarList = ['boy', 'bull', 'chick', 'crab', 'girl', 'hippo', 'koala', 'lemur', 'ligion', 'man', 'pig', 'tiger', 'whale', 'woman', 'zebra'].map(item => ({
            icon: require(`../img/${item}.png`),
            text: item
        }));

        const getHeader = this.state.text ? (
            <div>
                <span>已选择：</span>
                <img src={this.state.icon} alt={this.state.text} style={{width: 20}}/>
            </div>
        ) : '请选择头像 : ';

        return (
            <WingBlank>
                <List renderHeader={() => getHeader}>
                    <Grid
                        data={avatarList}
                        columnNum={5}
                        onClick={(element) => {
                            this.setState(element);
                            this.props.selectAvatar(element.text);
                        }}
                    />
                </List>
                <WhiteSpace/>
            </WingBlank>
        );
    }
}

export default AvatarSelector;