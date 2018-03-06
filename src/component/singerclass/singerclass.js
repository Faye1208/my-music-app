import React from 'react';
import {connect} from 'react-redux';
import {getSingerClass} from "../../redux/songdetaillist.redux";
import {NavBar, Icon, List} from 'antd-mobile';
import {withRouter} from 'react-router-dom';

@withRouter

@connect(
    state => state.songdetaillist,
    {getSingerClass}
)

class SingerClass extends React.Component {
    constructor (props) {
        super(props);
        this.handleSingerSong = this.handleSingerSongs.bind(this);
    }

    componentDidMount () {
        const classid = this.props.match.params.classid;
        this.props.getSingerClass(classid);
    }

    handleSingerSongs (singerid) {
        this.props.history.push(`/singersongs/${singerid}`);
    }

    render () {
        const ListItem = List.Item;
        const className = this.props.singerClassName;
        const singerClassList = this.props.singerClassList;
        return (
            <div className="top-padding">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" size="lg"/>}
                    onLeftClick={() => {
                        this.props.history.go(-1)
                    }}
                    rightContent={<Icon key="1" type="ellipsis"/>}
                >
                    {className ? className : '歌手列表'}
                </NavBar>
                <List>
                    {singerClassList && singerClassList.map((item, index) => {
                        return <ListItem
                            key={item.singerid}
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
                                this.handleSingerSong(item.singerid);
                            }}
                        >{item.singername}</ListItem>
                    })}
                </List>

            </ div>
        );
    }
}

export default SingerClass;