import React from 'react';
import ReactDOM from 'react-dom';

import annyang from '../vendor/annyang.min';
import PlayerActions from '../actions/PlayerActions';

function clear() {

}

function init() {

}

function my() {

}

class Voice {
  constructor() {
    console.log('Voice : constructor');
    console.log(window.annyang);

    if (false) {
      var commands = {
        'find': function () {
          console.warn('search!');
          cbs.search();
        },
        'search': function () {
          console.warn('search!');
          cbs.search();
        },

        'find *song': function (song) {
          cbs.search(song);
        },
        'find *song for me': function (song) {
          cbs.search(song);
        },
        'search *song': function (song) {
          cbs.search(song);
        },

        'add song': function () {
          console.warn('save song!');
          cbs.add();
        },
        'add track': function () {
          console.warn('save song!');
          cbs.add();
        },
        'save song': function () {
          console.warn('save song!');
          cbs.add();
        },
        'save track': function () {
          console.warn('save song!');
          cbs.add();
        },
        'save songs': function () {
          console.warn('save song!');
          cbs.add();
        },
        'save tracks': function () {
          console.warn('save song!');
          cbs.add();
        },

        'next': function () {
          console.warn('next!');
          cbs.next();
        },
        'next song': function () {
          console.warn('next!');
          cbs.next();
        },
        'next track': function () {
          console.warn('next!');
          cbs.next();
        },

        'previous': function () {
          console.warn('prev!');
          cbs.prev();
        },
        'previous song': function () {
          console.warn('prev!');
          cbs.prev();
        },
        'previous track': function () {
          console.warn('prev!');
          cbs.prev();
        },

        'play': function () {
          console.warn('prev!');
          cbs.play();
        },
        'pause': function () {
          console.warn('pause!');
          cbs.pause();
        },
        'stop': function () {
          console.warn('pause!');
          cbs.pause();
        },

        ':nomatch': function (message) {
          console.log('no match , ' + message);
        }
      };

      annyang.addCommands(commands);
      // annyang.setLanguage("ru");

      annyang.start();

      annyang.addCallback('result', function (userSaid) {
        console.warn('result');
        console.log(userSaid);
        userSaid = userSaid.length ? userSaid.join('; ') : userSaid;

        var resultsWrap = document.querySelectorAll('.recognition__results')[0];
        resultsWrap.innerHTML = userSaid;
      });

      annyang.addCallback('resultMatch', function (userSaid, commandText, phrases) {
        console.warn('result match');
        console.log(phrases);
        console.log(userSaid);
      });

      annyang.addCallback('error', function () {
        console.warn('error');
        var resultsWrap = document.querySelectorAll('.recognition__results')[0];
        resultsWrap.innerHTML = 'recognition error';
      });

      annyang.addCallback('end', function () {
        console.warn('end');
      });
    }

  }

  init() {

  }
}

module.exports = Voice;
