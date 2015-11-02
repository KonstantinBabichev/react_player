import {EventEmitter} from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import PlayerConstants from '../constants/PlayerConstants';

var CHANGE_EVENT = 'change',
    _tracks = getPlaylist(),
    _currentTrack = {};

var _playerAudio = new Audio(),
    _isPlaying = false;

function init() {
  return new Promise(function (resolve, reject) {
    console.log('---- init -----');
    console.log(_tracks.length);
    resolve(_tracks);
  });
}

function getAllTracks() {
  return _tracks;
}

function getCurrentTrack() {
  return _currentTrack;
}

function getPlaylist() {
  var pl = localStorage.getItem('playlist');
  return pl ? JSON.parse(pl) : [];
}

function savePlaylist() {
  localStorage.setItem('playlist', JSON.stringify(_tracks));
}

function addTrack(track) {
  console.log('--- addTrack ---');
  var exist = _tracks.findIndex(function(item, index, array){
    return item.id == track.id;
  });

  if (!(exist == -1)) return null;

  _tracks.push(track);
  savePlaylist();
}

function play(track) {
  if (track && _currentTrack.id != track.id) {
    _currentTrack = track;
    _playerAudio.src = _currentTrack.preview_url;
    _playerAudio.pause();
    _isPlaying = false
  }

  _isPlaying ? _playerAudio.pause() : _playerAudio.play();
  _isPlaying = !_isPlaying;
}

function next() {
  var currentTrackIndex = _tracks.findIndex(function(track){ return track.id == _currentTrack.id}),
      nextTrack = null;

  if (currentTrackIndex != -1) {
    nextTrack = _tracks[currentTrackIndex + 1] ? _tracks[currentTrackIndex + 1] : _tracks[0];
  }

  play(nextTrack);
}

function prev() {
  var currentTrackIndex = _tracks.findIndex(function(track){ return track.id == _currentTrack.id}),
      prevTrack = null;

  if (currentTrackIndex != -1) {
    prevTrack = _tracks[currentTrackIndex - 1] ? _tracks[currentTrackIndex - 1] : _tracks[_tracks.length - 1];
  }

  play(prevTrack);
}



var PlayerStore = Object.assign({}, EventEmitter.prototype, {
  getState: function () {
    return {
      tracks: getAllTracks(),
      currentTrack: getCurrentTrack()
    };
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function (action) {

  switch (action.actionType) {
    case PlayerConstants.PLAYER_INIT:
      console.log('case PlayerConstants.PLAYER_INIT ' + PlayerConstants.PLAYER_INIT);
      init().then(function () {
        PlayerStore.emitChange();
      });
      break;

    case PlayerConstants.PLAYER_ADD:
      console.log('case PlayerConstants.PLAYER_ADD ' + PlayerConstants.PLAYER_ADD);
      addTrack(action.item);
      PlayerStore.emitChange();
      break;

    case PlayerConstants.PLAYER_PLAY:
      console.log('case PlayerConstants.PLAYER_PLAY ' + PlayerConstants.PLAYER_PLAY);
      play(action.item);
      PlayerStore.emitChange();
      break;

    case PlayerConstants.PLAYER_NEXT:
      console.log('case PlayerConstants.PLAYER_NEXT ' + PlayerConstants.PLAYER_NEXT);
      next();
      PlayerStore.emitChange();
      break;

    case PlayerConstants.PLAYER_PREV:
      console.log('case PlayerConstants.PLAYER_NEXT ' + PlayerConstants.PLAYER_PREV);
      prev();
      PlayerStore.emitChange();
      break;

    default:
  }

});

module.exports = PlayerStore;
