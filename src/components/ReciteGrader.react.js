import React, { Component } from 'react';
import Grader from '../grader';
import { asyncCompletePassage } from '../actions/AppActions';

export default class ReciteGrader extends Component {
  constructor(props) {
    super(props);
    this.state = { reciteText: '' };
  }

  grade() {
    const input = this.state.reciteText;
    const source = this.props.passage.text();

    this.setState((oldState, props) => {
      const grader = new Grader(source, input);
      return { grader };
    })
  }

  clearGrade() {
    this.setState((oldState, props) => {
      return { reciteText: '', grader: undefined };
    });
  }

  updateText(e) {
    const { value } = e.target
    this.setState((oldState, props) => {
      return { reciteText: value };
    });
  }

  renderGrader() {
    if (!this.state || !this.state.grader) {
      return (
        <div className="actions">
          <button
            onClick={ this.grade.bind(this) }
          >
            <i className="fa fa-strikethrough"></i> Grade
          </button>
        </div>
      );
    }

    const { grader } = this.state;
    const { dispatch } = this.props;
    return (
      <div className='grade'>
        <p>Score: { grader.correctScore() } of { grader.wordCount() } words</p>

        <p>
          { grader.diffObjects().map((diff, index) => {
            return <span key={index} className={diff.type}>{ diff.text }</span>
          }) }
        </p>

        <div className="actions">
          <button
            className="restart"
            onClick={ this.clearGrade.bind(this) }
          >
            <i className="fa fa-undo"></i> Retry
          </button>
          <button
            className="complete"
            onClick={() => { dispatch(asyncCompletePassage()) }}
          >
            <i className="fa fa-check"></i> Nailed it!
          </button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="reciteMode">
        <h3>Recite the passage</h3>

        <textarea
          placeholder='Type or use voice to text here'
          ref='reciteText'
          onChange={ this.updateText.bind(this) }
          value={ this.state.reciteText }
        ></textarea>

        { this.renderGrader() }
      </div>
    )
  }
}
