import React from 'react';
import {connect} from 'react-redux';
import {Tabs, Badge} from 'antd-mobile';
import {Switch, Route} from 'react-router-dom';
import {getNewSong, getSongRank, getHotSong, getSingerList} from "../../redux/song.redux";
import SingerList from '../singerlist/singerlist';
import NewSong from '../newsong/newsong';
import HotSong from '../hotsong/hotsong';
import SongRank from '../songrank/songrank';

@connect(
    state => state,
    {getNewSong, getSongRank, getHotSong, getSingerList}
)

class Found extends React.Component {
    componentDidMount () {
        this.props.getNewSong();
    }

    render () {
        const tabs = [
            {
                title: <Badge>新歌</Badge>,
                path: '/songpanel/new',
                component: NewSong,
                action: this.props.getNewSong,
                index: 0
            },
            {
                title: <Badge>排行</Badge>,
                path: '/songpanel/rank',
                component: SongRank,
                action: this.props.getSongRank,
                index: 1
            },
            {
                title: <Badge>电台</Badge>,
                component: HotSong,
                path: '/songpanel/station',
                index: 2

            },
            {
                title: <Badge>歌手</Badge>,
                component: SingerList,
                path: '/songpanel/singer',
                index: 3
            }
        ];
        const pathname = this.props.location.pathname;
        return (
            <div className="song-found-wrapper top-padding">
                <Tabs tabs={tabs}
                      initialPage={0}
                      swipeable={false}
                      onTabClick={(tab, index) => {
                          this.props.history.push(tab.path);
                      }}
                      renderTabBar={props =>
                          <Tabs.DefaultTabBar
                              {...props}
                              activeTab={props.tabs.find((item) => pathname === item.path).index}
                          />
                      }

                >
                    <Switch>
                        {tabs.map(item => {
                            return (
                                <Route key={item.path} path={item.path} component={item.component}/>
                            )
                        })}
                    </Switch>

                </Tabs>
            </
                div>

        );
    }
}

export default Found;

