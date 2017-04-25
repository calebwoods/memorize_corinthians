/*
 * PassageSelect
 */
import React, { Component } from 'react';
import { asyncNavigateIndex } from '../actions/AppActions';

class PassageSelect extends Component {
  renderOption(passage, index, selected) {
    return (
      <option
        key={ index }
        value={ index }
      >{ passage.metadata() }</option>
    )
  }

  changePassage(e) {
    this.props.dispatch(asyncNavigateIndex(parseInt(e.target.value, 0)));
  }

  render() {
    if (this.props.collection.length > 1) {
      return (
        <select
          ref="passage-select"
          value={ this.props.selectedIndex }
          onChange={ this.changePassage.bind(this) }
          className="passage-select"
        >
          { this.props.collection.map((passage, index) => { return this.renderOption(passage, index, this.props.selectedIndex) }) }
        </select>
      )
    } else {
      return (
        <span className="passage-select">
          { this.props.collection[this.props.selectedIndex].metadata() }
        </span>
      )
    }
  }
}

export default PassageSelect
