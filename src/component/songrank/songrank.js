import React from 'react';
import {connect} from 'react-redux';
import {List} from 'antd-mobile';
import {getSongRank} from "../../redux/song.redux"

@connect(
    state => state,
    {getSongRank}
)

class SongRank extends React.Component {
    constructor (props) {
        super(props);
        this.handdleRankDetail = this.handdleRankDetail.bind(this);
    }

    componentDidMount () {
        this.props.getSongRank();
    }

    handdleRankDetail (rankid) {
        this.props.history.push(`/rankdetail/${rankid}`);
    }

    render () {
        const ListItem = List.Item;
        return (
            <div style={{paddingBottom: '60px'}}>
                <List>
                    {this.props.newsong.songRankList && this.props.newsong.songRankList.map(item => {
                        return (
                            <ListItem
                                key={item.rankid}
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
                                    this.handdleRankDetail(item.rankid);
                                }}
                            >
                                {item.rankname}
                            </ListItem>
                        );
                    })}
                </List>
            </div>
        );
    }
}

export default SongRank;