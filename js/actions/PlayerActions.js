import AppDispatcher from '../dispatcher/AppDispatcher';
import PlayerConstants from '../constants/PlayerConstants';

var PlayerActions = {
  setItems: function (items) {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.PLAYER_SET_ITEMS,
      items: items
    });
  },

  addToPlayList: function (item) {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.PLAYER_ADD,
      item: item
    });
  },

  play: function (item) {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.PLAYER_PLAY,
      item: item
    });
  },

  next: function () {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.PLAYER_NEXT
    });
  },

  prev: function () {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.PLAYER_PREV
    });
  },

  clearPlaylist: function () {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.PLAYER_CLEAR_PLAYLIST
    });
  },

  start: function () {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.PLAYER_INIT
    });
  }
};

module.exports = PlayerActions;
