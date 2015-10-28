/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */

var Player = require('./Player.react');
var PlayerThumb = require('./PlayerThumb.react');

var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react');
var TodoStore = require('../stores/TodoStore');

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getTodoState() {
  return {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete()
  };
}

function searchTracks(query, one) {

}

var _todos = {};


var TodoApp = React.createClass({

  getInitialState: function () {
    console.info('TodoApp : getInitialState');
    // return getTodoState();
    return {
      tracks : []
    };
  },

  componentDidMount: function () {
    console.info('TodoApp : componentDidMount');
    var self = this;
    var q = 'linkin park';
    var url = 'https://api.spotify.com/v1/search';
    var query = '?q=' + q + '&type=track';

    fetch(url + query)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.tracks.items.length) {
            self.setState({tracks: data.tracks.items});
          }
        })
        .catch(function (error) {
          console.log('Request failed', error);
        });

    // TodoStore.addChangeListener(this._onChange);

  },

  componentWillUnmount: function () {
    console.info('TodoApp : componentWillUnmount');
    // TodoStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function () {
    console.info('TodoApp : render');
    return (
        <div className="wrap">
          <Player allTracks={this.state.tracks}/>
        </div>
    );
  },


  ///**
  // * @return {object}
  // */
  //render: function() {
  //  console.info('TodoApp : render');
  //  return (
  //    <div>
  //      <Header />
  //      <MainSection
  //        allTodos={this.state.allTodos}
  //        areAllComplete={this.state.areAllComplete}
  //      />
  //      <Footer allTodos={this.state.allTodos} />
  //    </div>
  //  );
  //},

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function () {
    console.info('TodoApp : _onChange');
    // this.setState(getTodoState());
  }

});

module.exports = TodoApp;
