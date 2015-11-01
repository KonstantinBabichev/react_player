/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoConstants
 */

var keyMirror = require('keymirror');

module.exports = keyMirror({
  PLAYER_INIT: null,
  PLAYER_PLAY: null,
  PLAYER_ADD: null,

  PLAYER_CREATE: null,
  PLAYER_COMPLETE: null,
  PLAYER_DESTROY: null,
  PLAYER_DESTROY_COMPLETED: null,
  PLAYER_TOGGLE_COMPLETE_ALL: null,
  PLAYER_UNDO_COMPLETE: null,
  PLAYER_UPDATE_TEXT: null
});
