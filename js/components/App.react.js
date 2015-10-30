import React from 'react';
import ReactDOM from 'react-dom';

import Player from './Player.react';
import PlayerThumb from './PlayerThumb.react';
import PlayerStore from '../stores/PlayerStore';
import PlayerActions from '../actions/PlayerActions';

function getTodoState() {
  return PlayerStore.getState();
}

function searchTracks(query, one) {
}

class App extends React.Component {
  constructor() {
    console.warn('App : constructor');
    super();
    this.render = this.render.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    console.warn('App : componentDidMount');
    PlayerStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    console.warn('App : componentWillUnmount');
    PlayerStore.removeChangeListener(this._onChange);
  }

  render() {
    console.warn('App : render');
    return (
      <div className="wrap">
        <Player />
      </div>
    );
  }

  _onChange() {
    console.warn('TodoApp : _onChange');
    this.setState(getTodoState());
  }
}

module.exports = App;
