var React = require('react'),
    PlayerThumb = require('./PlayerThumb.react');

var PlayerActions = require('../actions/PlayerActions');

var Player = React.createClass({
  _play: function() {
    console.log('- _play -');
    console.log('- _play -');
  },
  _next: function() {
    console.log('- _next -');
  },
  _prev: function() {
    console.log('- _prev -');
  },
  _clear: function() {
    console.log('- _clear -');
  },

  render: function() {
    if (Object.keys(this.props.allTracks).length < 1) {
      return null;
    }

    var allTracks = this.props.allTracks,
        tracks = [];

    allTracks.forEach(function (track, index, array) {
      tracks.push(<PlayerThumb key={track.id} track={track} />);
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
});

module.exports = Player;
