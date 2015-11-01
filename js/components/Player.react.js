import React from 'react';
import ReactDOM from 'react-dom';

import PlayerThumb from './PlayerThumb.react';
import PlayerStore from '../stores/PlayerStore';
import PlayerActions from '../actions/PlayerActions';

function getPlayerState() {
  return PlayerStore.getState();
}

class Player extends React.Component {
  constructor() {
    console.warn('Player : constructor');
    super();
    this.render = this.render.bind(this);
    this._onChange = this._onChange.bind(this);
    this.state = getPlayerState();
  }

  _handleThumbClick(item) {
    console.warn('Player : _handleThumbClick');
    var _playerAudio = new Audio();
    _playerAudio.src = item.preview_url;
    _playerAudio.play();
  }

  _play() {
    console.log('- _play -');
    console.log('- _play -');
  }

  _next() {
    console.log('- _next -');
  }

  _prev() {
    console.log('- _prev -');
  }

  _clear() {
    console.log('- _clear -');
  }

  componentDidMount() {
    console.info('Player : componentDidMount');

    PlayerActions.start();
    PlayerStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    console.info('Player : componentWillUnmount');
    PlayerStore.removeChangeListener(this._onChange);
  }

  render() {
    console.log('Player : render');
    var self = this,
        tracks = this.state.tracks;

    //if (tracks.length < 1) return null;

    tracks = tracks.map(function (track, i) {
      return <PlayerThumb onClick={self._handleThumbClick.bind(this, track)} key={i} track={track}/>;
    });

    return (
      <div className="player">
        <h2 className="sub-title">Player</h2>

        <div className="player__viewport"></div>
        <div className="player__controls">
          <button onClick={this._play} className="player__control player__play">play/pause</button>
          <button onClick={this._next} className="player__control player__next">next</button>
          <button onClick={this._prev} className="player__control player__prev">prev</button>
          <button onClick={this._clear} className="player__control player__clear">clear playlist</button>
        </div>
        <div className="playlist">
          {tracks}
        </div>
      </div>
    );
  }

  _onChange() {
    console.info('Player : _onChange');
    this.setState(getPlayerState());
  }
}

module.exports = Player;
