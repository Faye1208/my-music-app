import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducer';
import AuthRoute from './component/AuthRoute/AuthRoute';
import Login from './container/Login/Login';
import Register from './container/Register/Register';
import GeniusInfo from './container/GeniusInfo/GeniusInfo';
import Genius from "./component/genius/genius";
import Dashboard from './component/Dashboard/DashBoard';
import Chat from './component/chat/chat';
import RankDetail from './component/rankdetail/rankdetail';
import HotDetail from './component/hotdetail/hotdetail';
import SingerClass from './component/singerclass/singerclass';
import SingerSongs from './component/singersongs/singersongs';
import Player from './component/player/player';
import './config';
import './index.css';
// import './component/player/play.scss';


const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute/>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route path="/geniusinfo" component={GeniusInfo}/>
                    <Route path="/genius" component={Genius}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/chat/:user" component={Chat}/>
                    <Route path="/rankdetail/:rankid" component={RankDetail}/>
                    <Route path="/hotdetail/:specialid" component={HotDetail}/>
                    <Route path="/singerclass/:classid" component={SingerClass}/>
                    <Route path="/singersongs/:singerid" component={SingerSongs}/>
                    <Route path="/player/:hash" component={Player}/>
                    <Route component={Dashboard}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
