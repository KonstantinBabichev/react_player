/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var PlayerThumb = require('./PlayerThumb.react');

var Player = React.createClass({


  /**
   * @return {object}
   */
  render: function() {
    if (Object.keys(this.props.allTracks).length < 1) {
      return null;
    }

    var allTodos = this.props.allTracks;
    var todos = [];


    allTodos.forEach(function (track, index, array) {
      todos.push(<PlayerThumb track={track} />);
    });

    return (
      <div className="player">
        <h2 className="sub-title">Player</h2>
        <div className="player__viewport"></div>
        <div className="player__controls">
          <button className="player__control player__play">play/pause</button>
          <button className="player__control player__next">next</button>
          <button className="player__control player__prev">prev</button>
          <button className="player__control player__clear">clear playlist</button>
        </div>
        <div className="playlist">
          {todos}
        </div>
      </div>
    );
  },

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave: function(text) {
  }

});

module.exports = Player;
