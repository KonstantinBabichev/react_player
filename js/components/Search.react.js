import React from 'react';
import ReactDOM from 'react-dom';

import PlayerThumb from './PlayerThumb.react';
//import PlayerStore from '../stores/PlayerStore';
import PlayerActions from '../actions/PlayerActions';

var _results = [],
    _loading = false;

function toggleLoading(flag) {
  _loading = flag;
}

function setResults(results) {
  _results = results;
}

function getResults() {
  return _results;
}

function getState() {
  return {
    results: _results,
    loading: _loading
  };
}

function search(q = 'linkin park') {
  return new Promise(function (resolve, reject) {
    console.log('request =' + q + '=');
    if (q == '') reject('Request failed');

    var baseUrl = 'https://api.spotify.com/v1/search',
        query = '?q=' + q + '&type=track',
        url = baseUrl + query;

    fetch(url)
        .then(response => response.json())
        .then(function (data) {
          if (data.tracks.items.length) {
            resolve(data.tracks.items);
          } else {
            reject('search failed - no items');
          }
        })
        .catch(function (error) {
          console.log('request failed', error);
          reject('search failed', error);
        });
  });
}

class Search extends React.Component {
  constructor() {
    console.warn('Search : constructor');
    super();
    this.render = this.render.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this.state = getState();
  }

  _handleChange(event) {
    if (this.state.loading) return null;
    var self = this;

    toggleLoading(true);
    self.setState(getState());

    search(event.target.value).then(function (data) {
      toggleLoading(false);
      setResults(data);
      self.setState(getState());
    }).catch(function (error) {
      console.log('Request failed', error);
      toggleLoading(false);
      self.setState(getState());
    });
  }

  _handleThumbClick(item) {
    PlayerActions.addToPlayList(item);
  }

  _search() {
    console.log('- _play -');
  }

  componentDidMount() {
    console.info('Search : componentDidMount');
  }

  componentWillUnmount() {
    console.info('Search : componentWillUnmount');
  }

  render() {
    console.log('Search : render');
    var self = this,
        results = this.state.results;

    results = results.map(function (track, i) {
      return <PlayerThumb onClick={self._handleThumbClick.bind(this, track)} key={i} track={track}/>;
    });

    return (
        <div className="search">
          <h2 className="search__title sub-title">Search</h2>

          <form className="search__form" action="#">
            <input onChange={this._handleChange} className="search__input" type="text"/>
          </form>
          <div className="search__results">
            {results}
          </div>
        </div>
    );
  }
}

module.exports = Search;
