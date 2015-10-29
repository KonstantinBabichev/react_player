var React = require('react'),
    PlayerActions = require('../actions/PlayerActions');

var PlayerThumb = React.createClass({
  _handleClick: function(e) {
    e.preventDefault();
    console.log(this.props.track);
    PlayerActions.play();
  },

  render: function() {
    var title = this.props.track.name,
        thumb = this.props.track.album.images[1].url;

    return (
        <div onClick={this._handleClick} className="playlist__item preview">
          <p className="preview__title">{title}</p>
          <img src={thumb} alt=""/>
        </div>
    );
  }
});

module.exports = PlayerThumb;
