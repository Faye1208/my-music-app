import {combineReducers} from 'redux';
import {user} from './redux/user.redux';
import {chatuser} from "./redux/chatuser.redux";
import {chat} from "./redux/chat.redux";
import {newsong} from "./redux/song.redux";
import {songdetaillist} from "./redux/songdetaillist.redux";
import {player} from "./redux/player.redux";
import {mysong} from "./redux/mysong.redux";

export default combineReducers({user, chatuser, chat, newsong, songdetaillist, player, mysong});