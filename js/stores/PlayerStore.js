import {EventEmitter} from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import PlayerConstants from '../constants/PlayerConstants';

var CHANGE_EVENT = 'change',
    _tracks = getPlaylist(),
    _currentTrack = {};

function init() {
  return new Promise(function (resolve, reject) {
    console.log('---- init -----');
    console.log(_tracks.length);
    resolve(_tracks);
  });
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

function play() {
  _currentTrack = _tracks[0];
  _tracks = [_tracks[0]];
}

function update(id, updates) {
  _todos[id] = assign({}, _todos[id], updates);
}

function updateAll(updates) {
  for (var id in _todos) {
    update(id, updates);
  }
}

function destroy(id) {
  delete _todos[id];
}

function destroyCompleted() {
  for (var id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
    }
  }
}

function getAllTracks() {
  return _tracks;
}

function getCurrentTrack() {
  return _currentTrack;
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
      play();
      PlayerStore.emitChange();
      break;


    default:

  }
});

module.exports = PlayerStore;
