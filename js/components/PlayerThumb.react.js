/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');


var PlayerThumb = React.createClass({


  /**
   * @return {object}
   */

  //this.props.name
  render: function() {
    console.log(this.props.preview_url);
    return (
        <div className="playlist__item preview">
          <p className="preview__title">{this.props.track.name}</p>
          <img src={this.props.track.album.images[1].url} alt=""/>
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

module.exports = PlayerThumb;
