import React from 'react';
import {connect} from 'react-redux';
import {NavBar, Icon, List} from 'antd-mobile';
import {getSingerSongs} from "../../redux/songdetaillist.redux";

@connect(
    state => state.songdetaillist,
    {getSingerSongs}
)

class SingerSong extends React.Component {
    componentDidMount () {
        const singerid = this.props.match.params.singerid;
        this.props.getSingerSongs(singerid);
    }

    render () {
        const singerInfo = this.props.singerInfo;
        const singerSongs = this.props.singerSongs;
        const ListItem = List.Item;
        return (
            <div className="top-padding">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" size="lg"/>}
                    onLeftClick={() => {
                        this.props.history.go(-1)
                    }}
                    rightContent={<Icon key="1" type="ellipsis"/>}
                >
                    {singerInfo.singername}
                </NavBar>
                <div className="rank-banner">
                    <img src={singerInfo.imgurl && singerInfo.imgurl.replace('{size}', '400')} alt=""/>
                </div>
                <List>
                    {singerSongs && singerSongs.map(item => {
                        return <ListItem
                            key={item.hash}
                            arrow="horizontal"
                            multipleLine
                            onClick={() => {
                                this.props.history.push(`/player/${item.hash}`);
                            }}
                        >
                            {item.filename}
                        </ListItem>
                    })}
                </List>
            </div>
        );
    }
}

export default SingerSong;