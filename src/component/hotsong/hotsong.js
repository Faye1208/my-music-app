import React from 'react';
import {connect} from 'react-redux';
import {List} from 'antd-mobile';
import {getHotSong} from "../../redux/song.redux"

@connect(
    state => state,
    {getHotSong}
)

class HotSong extends React.Component {
    constructor (props) {
        super(props);
        this.handdleHotDetail = this.handdleHotDetail.bind(this);

    }

    componentDidMount () {
        this.props.getHotSong();
    }

    handdleHotDetail (specialid) {
        this.props.history.push(`/hotdetail/${specialid}`);
    }

    render () {
        const ListItem = List.Item;
        const ItemBrief = ListItem.Brief;
        return (
            <div style={{paddingBottom: '60px'}}>
                <List>
                    {this.props.newsong.hotSongList && this.props.newsong.hotSongList.map(item => (
                        <ListItem
                            key={item.specialid}
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
                                this.handdleHotDetail(item.specialid);
                            }}
                        >
                            {item.specialname}
                            <ItemBrief>
                                <img
                                    style={{
                                        width: '15px',
                                        height: '15px',
                                        verticalAlign: 'top',
                                        marginRight: '5px'
                                    }}
                                    src={require('../../static/images/icon_music.png')}
                                    alt=""/>
                                {item.playcount}
                            </ItemBrief>
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}

export default HotSong;