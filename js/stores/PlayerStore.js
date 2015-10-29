/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var PlayerConstants = require('../constants/PlayerConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {};
var _tracks = {};
var _currentTrack = {};
/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function play() {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  _currentTrack = {a : 5};
  _tracks = [_tracks[0]];
}

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function setItems(data) {
  console.log(' ---  setItems ----');
  console.log(data);
  _tracks = data.items;
  console.log(' ---  setItems ----');
}

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _todos[id] = {
    id: id,
    complete: false,
    text: text
  };
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  _todos[id] = assign({}, _todos[id], updates);
}

/**
 * Update all of the TODO items with the same object.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.
 */
function updateAll(updates) {
  for (var id in _todos) {
    update(id, updates);
  }
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
  delete _todos[id];
}

/**
 * Delete all the completed TODO items.
 */
function destroyCompleted() {
  for (var id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
    }
  }
}

var PlayerStore = assign({}, EventEmitter.prototype, {

  /**
   * Tests whether all the remaining TODO items are marked as completed.
   * @return {boolean}
   */
  areAllComplete: function() {
    for (var id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }
    return true;
  },

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _tracks;
  },
  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getCurrentTrack: function() {
    return _currentTrack;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case PlayerConstants.PLAYER_PLAY:
      console.log('case PlayerConstants.PLAYER_PLAY ' + PlayerConstants.PLAYER_PLAY);
      play();
      PlayerStore.emitChange();
      break;
    case PlayerConstants.PLAYER_SET_ITEMS:
      console.log('case PlayerConstants.PLAYER_PLAY ' + PlayerConstants.PLAYER_PLAY);
      setItems(action);
      // PlayerStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = PlayerStore;
