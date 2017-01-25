/*
 * AudioPlayer
 */
import React, { Component } from 'react';
import Combokeys from 'combokeys'
import { asyncPlayAudio, asyncPauseAudio } from '../actions/AppActions';

class AudioPlayer extends Component {

  renderPlayButton() {
    const { dispatch } = this.props;
    this._audioElement = null;
    return (
      <button className="playAudio" onClick={() => {dispatch(asyncPlayAudio(this._audioElement));}}>
        <i className="fa fa-play" title="play"></i>
      </button>
    );
  }

  renderPauseButton() {
    const { dispatch } = this.props;
    return (
      <button className="pauseAudio" onClick={() => {dispatch(asyncPauseAudio(this._audioElement))}}>
        <i className="fa fa-pause" title="pause"></i>
      </button>
    );
  }

  renderAudioElement() {
    const { src } = this.props;
    return (
      <audio ref={(me) => {this._audioElement = me}} loop="loop">
        <source src={ src } type="audio/mp3"/>
      </audio>
    );
  }

  render() {
    const { isAudioPlaying } = this.props;
    return (
      <span className="audioContainer">
        { isAudioPlaying ? this.renderPauseButton() : this.renderPlayButton() }
        { this.renderAudioElement() }
      </span>
    );
  }

  componentDidMount() {
    let combokeys = new Combokeys(document.documentElement);
    combokeys.bind('p', () => {
      if (this.props.isAudioPlaying) {
        this.props.dispatch(asyncPauseAudio(this._audioElement))
      } else {
        this.props.dispatch(asyncPlayAudio(this._audioElement))
      }
    });
  }

  componentWillUnmount() {
    let combokeys = new Combokeys(document.documentElement);
    combokeys.unbind('p');
  }

  componentDidUpdate() {
    if (this.props.isAudioPlaying) {
      // Call load in case we change verses while the audio is playing
      // Or else the audio element will keep using the old src
      this._audioElement.load();
      this._audioElement.play();
    }
  }
}

export default AudioPlayer
