import React, {Component} from 'react';

export default function appForm (Comp) {
    return class WrapComp extends Component {
        constructor (props) {
            super(props);
            this.state = {};
            this.handleChange = this.handleChange.bind(this);
        }

        handleChange (key, val) {
            this.setState({
                [key]: val
            });
        }

        render () {
            return (
                <div>
                    <Comp handleChange={this.handleChange} state={this.state} {...this.props}/>
                </div>
            );
        }
    };
}