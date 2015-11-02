import React from 'react';
import ReactDOM from 'react-dom';

import PlayerThumb from './PlayerThumb.react';
import PlayerStore from '../stores/PlayerStore';
import PlayerActions from '../actions/PlayerActions';

var _playerAudio = new Audio(),
    _tracks = [],
    _currentTrack = {},
    _isPlaying = false;

function getPlayerState() {
  return PlayerStore.getState();
}

function play(track) {
  PlayerActions.play(track);
}

function pause() {
  _isPlaying ? _playerAudio.pause() : _playerAudio.play();
  _isPlaying = !_isPlaying;
}



function clear() {

}

function init() {

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
    play(item);
  }

  _play() {
    play();
  }

  _next() {
    PlayerActions.next();
  }

  _prev() {
    PlayerActions.prev();
  }

  _clear() {
    PlayerActions.clearPlaylist();
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
      var current = track == self.state.currentTrack;
      return <PlayerThumb onClick={self._handleThumbClick.bind(this, track)} key={i} track={track} isActive={current}/>;
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
