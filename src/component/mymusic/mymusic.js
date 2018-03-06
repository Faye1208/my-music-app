import React from 'react';
import {connect} from 'react-redux';
import {List} from 'antd-mobile';
import {getTrysongList} from "../../redux/mysong.redux";

@connect(
    state => state.mysong,
    {getTrysongList}
)

class MyMusic extends React.Component {
    componentDidMount () {
        this.props.getTrysongList();
    }

    render () {
        const Item = List.Item;
        const songData = this.props.trysongList.reverse();
        return (
            <div className="top-padding" style={{paddingBottom: '55px'}}>
                <List renderHeader={() => '我的试听'}>
                    {songData && songData.map(item => (
                        <Item
                            key={item._id}
                            thumb={<img
                                src={item.try_imgurl}
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
                                this.props.history.push(`/player/${item.try_hash}`)
                            }}
                        >
                            {item.try_singer_name} - {item.try_song_name}
                        </Item>
                    ))}
                </List>
            </ div>
        )
    }
}

export default MyMusic;