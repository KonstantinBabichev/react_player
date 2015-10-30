import {EventEmitter} from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import PlayerConstants from '../constants/PlayerConstants';

var CHANGE_EVENT = 'change',
  _tracks = [],
  _currentTrack = {};

function setInitialState() {
  return new Promise(function (resolve, reject) {

    searchItems()
      .then(function (tracks) {
        setItems(tracks);
        resolve(tracks);
      });
  });
}

function searchItems(q = 'linkin park') {
  return new Promise(function (resolve, reject) {
    var baseUrl = 'https://api.spotify.com/v1/search',
      query = '?q=' + q + '&type=track',
      url = baseUrl + query;

    fetch(url)
      .then(response => response.json())
      .then(function (data) {
        if (data.tracks.items.length) {
          resolve(data.tracks.items);
        }
      })
      .catch(function (error) {
        console.log('Request failed', error);
        reject('Request failed', error);
      });
  });
}

function play() {
  _currentTrack = _tracks[0];
  _tracks = [_tracks[0]];
}

function setItems(tracks) {
  console.log(' ---  setItems ----');
  _tracks = tracks;
  console.log(' ---  setItems ----');
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
      console.log('case PlayerConstants.PLAYER_PLAY ' + PlayerConstants.PLAYER_INIT);
      setInitialState().then(function () {
        PlayerStore.emitChange();
      });
      break;
    case PlayerConstants.PLAYER_PLAY:
      console.log('case PlayerConstants.PLAYER_PLAY ' + PlayerConstants.PLAYER_PLAY);
      play();
      PlayerStore.emitChange();
      break;
    case PlayerConstants.PLAYER_SET_ITEMS:
      console.log('case PlayerConstants.PLAYER_PLAY ' + PlayerConstants.PLAYER_PLAY);
      setItems(action);
      PlayerStore.emitChange();
      break;

    default:
    // no op
  }
});

module.exports = PlayerStore;
