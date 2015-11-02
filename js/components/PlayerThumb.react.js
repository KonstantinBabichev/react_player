import React from 'react';
import PlayerActions from '../actions/PlayerActions';

var PlayerThumb = React.createClass({
  render: function() {
    var track = this.props.track,
        title = track.name,
        thumb = track.album.images[0] ? track.album.images[0].url : "https://i.scdn.co/image/bda46f3c79f2df9bee2540ccab7e4582dc5b8a3b";

    return (
        <div onClick={this.props.onClick} className={"playlist__item preview" + (this.props.isActive ? ' playlist__item--active' : '')}>
          <p className="preview__title">{title}</p>
          <img src={thumb} alt=""/>
        </div>
    );
  }
});

module.exports = PlayerThumb;
