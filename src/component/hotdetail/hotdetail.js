import React from 'react';
import {NavBar, Icon, List} from 'antd-mobile';
import {connect} from 'react-redux';
import {getHotDetail} from "../../redux/songdetaillist.redux"

@connect(
    state => state.songdetaillist,
    {getHotDetail}
)

class HotDetail extends React.Component {
    componentDidMount () {
        const specialid = this.props.match.params.specialid;
        this.props.getHotDetail(specialid);
    }

    render () {
        const ListItem = List.Item;
        const hotInfo = this.props.hotDetailInfo;
        const hotSongs = this.props.hotDetailSongs;
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
                    电台
                </NavBar>
                <div className="rank-banner">
                    <img src={hotInfo.imgurl && hotInfo.imgurl.replace('{size}', '400')} alt=""/>
                </div>
                <List>
                    {hotSongs && hotSongs.map((item, index) => {
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

export default HotDetail;