import React from 'react';
import {connect} from 'react-redux';
import {Carousel, List} from 'antd-mobile';
import {getNewSong} from "../../redux/song.redux";
import {getSongInfo} from "../../redux/player.redux";

@connect(
    state => state,
    {getNewSong, getSongInfo}
)


class NewSong extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
        this.handlePlaySong = this.handlePlaySong.bind(this);
    }

    componentDidMount () {
        this.props.getNewSong();
    }

    handlePlaySong (hash) {
        this.props.history.push(`/player/${hash}`);
    }

    render () {
        const ListItem = List.Item;
        return (
            <div>
                <Carousel autoplay={true} infinite autoplayInterval={2000}>
                    {this.props.newsong.banners && this.props.newsong.banners.map(item => (
                        <img
                            key={item.imgurl}
                            src={item.imgurl}
                            alt=""
                            style={{width: '100%', verticalAlign: 'top'}}
                            onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                                this.setState({imgHeight: 'auto'});
                            }}
                        />
                    ))}
                </Carousel>
                <div style={{paddingBottom: '55px'}}>
                    <List>
                        {this.props.newsong.newSongs && this.props.newsong.newSongs.map(item => {
                            return (
                                <ListItem
                                    key={item.hash}
                                    arrow="horizontal"
                                    multipleLine
                                    onClick={() => {
                                        this.handlePlaySong(item.hash)
                                    }}
                                >
                                    {item.filename}
                                </ListItem>)
                        })}
                    </List>

                </div>
            </div>
        );
    }
}

export default NewSong;