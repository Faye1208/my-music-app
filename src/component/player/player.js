import React from 'react';
import {connect} from 'react-redux';
import {getSongInfo} from "../../redux/player.redux";
import {toSongUpdate} from "../../redux/mysong.redux";
import {formatLyric, formatTime} from '../../utils';
import './play.scss';

@connect(
    state => state.player,
    {getSongInfo, toSongUpdate}
)

class Player extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isplay: true,
            audioMax: 0,
            audioValue: 0,
            currentTime: '00:00',
            durationTime: '00:00',
            scrollTop: 0,
            currentIndex: 0,
            try_hash: '',
            try_singer_name: '',
            try_imgurl: '',
            try_song_name: ''
        };
        this.handlePlayPause = this.handlePlayPause.bind(this);
        this.togglePlaySong = this.togglePlaySong.bind(this);
        this.handleTimeupdate = this.handleTimeupdate.bind(this);
        this.getTotalTime = this.getTotalTime.bind(this);
        this.handleLyricChange = this.handleLyricChange.bind(this);
        this.handleCanPlay = this.handleCanPlay.bind(this);
    }

    componentDidMount () {
        const hash = this.props.match.params.hash;
        this.props.getSongInfo(hash);
    }

    handleCanPlay () {
        const data = {
            try_hash: this.state.try_hash,
            try_singer_name: this.state.try_singer_name,
            try_imgurl: this.state.try_imgurl,
            try_song_name: this.state.try_song_name
        }
        this.props.toSongUpdate(data);
    }

    handlePlayPause () {
        this.togglePlaySong();
        this.setState({
            isplay: !this.state.isplay
        });
    }

    togglePlaySong () {
        if (this.state.isplay) {
            this.audio.pause();
        } else {
            this.audio.play();
        }
    }

    handleTimeupdate (currentTime) {
        this.setState({
            audioValue: currentTime,
            currentTime: formatTime(currentTime),
        });
        this.handleLyricChange(currentTime);
    }

    handleLyricChange (currentTime) {
        const lrcData = formatLyric(this.props.songInfo.lyrics);
        lrcData.forEach((item, index, lrcData) => {
            if (currentTime >= item[0] && index > this.state.currentIndex) {
                this.setState({
                    currentIndex: index,
                    scrollTop: this.state.scrollTop - 17,
                    changeColor: !this.state.changeColor
                });
            }

        });

    }


    getTotalTime (duration) {
        this.setState({
            audioMax: this.audio.duration,
            durationTime: formatTime(this.audio.duration),
            try_hash: this.props.songInfo.hash,
            try_singer_name: this.props.songInfo.author_name,
            try_imgurl: this.props.songInfo.img,
            try_song_name: this.props.songInfo.song_name
        });
    }

    render () {
        const songInfo = this.props.songInfo;
        const lrcData = songInfo.lyrics ? formatLyric(songInfo.lyrics) : null;
        return (
            <div className="player-wrapper">
                <img src={songInfo.img} alt=""
                     style={{
                         window: '100%',
                         height: '100%',
                         position: 'absolute',
                         top: 0,
                         left: '-41%',
                         zIndex: -1,
                         filter: `blur(12px)`

                     }}
                />
                <div className="bg-filter"
                     style={{
                         width: '100%',
                         height: '100%',
                         position: 'absolute',
                         top: 0,
                         zIndex: 1,
                         background: 'rgba(0,0,0,.7)'
                     }}
                >
                </div>
                <div className="player-inner">
                    <audio
                        src={songInfo.play_url}
                        preload="auto"
                        autoPlay
                        onCanPlay={() => this.handleCanPlay()}
                        onLoadedMetadata={() => this.getTotalTime(this.audio.duration)}
                        onTimeUpdate={() => this.handleTimeupdate(this.audio.currentTime)}
                        onEnded={() => {
                            this.setState({
                                currentIndex: 0,
                                scrollTop: 0,
                                isplay: false,
                            })
                        }}
                        ref={audio => {
                            this.audio = audio
                        }}
                    />
                    <header>
                        <img className="close-player"
                             style={{width: '10px', height: '15px'}}
                             src={require('../../static/images/goback_icon.png')}
                             alt=""
                             onClick={() => this.props.history.go(-1)}
                        />
                        <span>{songInfo.song_name}</span>
                        <span>· · ·</span>
                    </header>
                    <section>
                        <div className="img-wrapper">
                            <img src={songInfo.img} alt=""/>
                        </div>
                        <div className="lrc-wrapper">
                            <div ref={lrc => this.lrc = lrc} className="lrc-inner"
                                 style={{
                                     width: '100%',
                                     position: 'relative',
                                     top: `${this.state.scrollTop}px`
                                 }}
                            >
                                {lrcData && lrcData.map((item, index) => {
                                    return <p key={item[0]}
                                              style={{
                                                  color: `${(index === this.state.currentIndex) ? 'dodgerblue' : 'white'}`,
                                                  fontSize: `${(index === this.state.currentIndex) ? '14px' : '12px'}`
                                              }}
                                    >
                                        {item[1]}
                                    </p>
                                })}
                            </div>
                        </div>
                        <div className="progress-wrapper">
                            <span>{this.state.currentTime}</span> <span>/</span> <span>{this.state.durationTime}</span>
                            <progress max={this.state.audioMax} value={this.state.audioValue}>80</progress>
                        </div>
                        <div className="control-wrapper">
                            <img className="icon-prev" src={require(`../../static/images/play_prev.png`)} alt=""/>
                            <img className="play-pause"
                                 src={require(`../../static/images/${this.state.isplay ? 'pause' : 'play'}_icon.png`)}
                                 alt=""
                                 onClick={this.handlePlayPause}
                            />
                            <img className="icon-next" src={require(`../../static/images/play_next.png`)} alt=""/>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default Player;