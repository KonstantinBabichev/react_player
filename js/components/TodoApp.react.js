import React from 'react';
import ReactDOM from 'react-dom';

import Player from './Player.react';
import PlayerThumb from './PlayerThumb.react';
import PlayerStore from '../stores/PlayerStore';
import PlayerActions from '../actions/PlayerActions';

function getTodoState() {
  return {
    tracks : PlayerStore.getAll(),
    currentTrack : PlayerStore.getCurrentTrack()
  };
}

function searchTracks(query, one) {

}

var _todos = {};

class TodoApp extends React.Component {
  constructor() {
    super();
    this.render = this.render.bind(this);
    this._onChange = this._onChange.bind(this);
    this.state = getTodoState();
  }
  componentDidMount () {
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
            PlayerActions.setItems(data.tracks.items);
          }
        })
        .catch(function (error) {
          console.log('Request failed', error);
        });

    PlayerStore.addChangeListener(this._onChange);

  }
  componentWillUnmount () {
    console.info('TodoApp : componentWillUnmount');
    PlayerStore.removeChangeListener(this._onChange);
  }
  render () {
    console.info('TodoApp : render');
    return (
        <div className="wrap">
          <Player allTracks={this.state.tracks}/>
        </div>
    );
  }
  _onChange () {
    console.info('TodoApp : _onChange');
    console.info(this);
    this.setState(getTodoState());
  }
}

var TodoAppz = React.createClass({

  getInitialState: function () {
    console.info('TodoApp : getInitialState');
    return getTodoState();
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
            PlayerActions.setItems(data.tracks.items);
          }
        })
        .catch(function (error) {
          console.log('Request failed', error);
        });

    PlayerStore.addChangeListener(this._onChange);

  },

  componentWillUnmount: function () {
    console.info('TodoApp : componentWillUnmount');
    PlayerStore.removeChangeListener(this._onChange);
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

  _onChange: function () {
    console.info('TodoApp : _onChange');
     this.setState(getTodoState());
  }

});

module.exports = TodoApp;
