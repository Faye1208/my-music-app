import React from 'react';
import {connect} from 'react-redux';
import {List} from 'antd-mobile';
import {getSingerList} from "../../redux/song.redux";

@connect(
    state => state.newsong,
    {getSingerList}
)

class SingerList extends React.Component {
    constructor (props) {
        super(props);
        this.handleSingerClass = this.handleSingerClass.bind(this);
    }

    componentDidMount () {
        this.props.getSingerList();
    }

    handleSingerClass (classid) {
        this.props.history.push(`/singerclass/${classid}`);
    }

    render () {
        const ListItem = List.Item;
        return (
            <div style={{paddingBottom: '55px'}}>
                <List>
                    {this.props.singerList && this.props.singerList.map(item => (
                        <ListItem
                            key={item.classid}
                            thumb={<img
                                src={item.imgurl.replace('{size}', '400')}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    display: 'inline-block',
                                    marginTop: '8px',
                                    marginBottom: '8px'
                                }}
                                alt=""/>
                            }
                            arrow="horizontal"
                            multipleLine
                            onClick={() => {
                                this.handleSingerClass(item.classid);
                            }}
                        >
                            {item.classname}
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}

export default SingerList;