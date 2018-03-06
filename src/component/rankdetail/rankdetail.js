import React from 'react';
import {NavBar, Icon, List} from 'antd-mobile';
import {connect} from 'react-redux';
import {getRankDetail} from "../../redux/songdetaillist.redux";

@connect(
    state => state.songdetaillist,
    {getRankDetail}
)

class RankDetail extends React.Component {
    componentDidMount () {
        const rankid = this.props.match.params.rankid;
        this.props.getRankDetail(rankid);
    }

    render () {
        console.log(this.props);
        const rankinfo = this.props.rankinfo;
        const ListItem = List.Item;
        const rankSong = this.props.ranksongs.list;
        return (
            <div className="song-found-wrapper top-padding">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" size="lg"/>}
                    onLeftClick={() => {
                        this.props.history.go(-1)
                    }}
                    rightContent={<Icon key="1" type="ellipsis"/>}
                >
                    {rankinfo.rankname}
                </NavBar>
                <div className="rank-banner">
                    <img src={rankinfo.banner7url && rankinfo.banner7url.replace('{size}', '400')} alt=""/>
                </div>
                <List>
                    {rankSong && rankSong.map((item, index) => {
                        return <ListItem
                            key={item.hash}
                            arrow="horizontal"
                            multipleLine
                            onClick={() => {
                                this.props.history.push(`/player/${item.hash}`);
                            }}
                        ><span>{`${index + 1}.`}</span> {item.filename}</ListItem>
                    })}
                </List>
            </div>
        );
    }

}

export default RankDetail;