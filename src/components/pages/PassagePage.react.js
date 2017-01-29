/*
 * PassagePage
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Combokeys from 'combokeys'

import { asyncNavigateNext, asyncNavigatePrevious, asyncCompletePassage, asyncChangeMode, asyncChangeRecall } from '../../actions/AppActions';
import { VERSE_MODE, SEGMENT_MODE, CHAPTER_MODE, RECALL_STAGES } from '../../constants/AppConstants';

import AudioPlayer from '../AudioPlayer.react';
import PassageSelect from '../PassageSelect.react';
import KeyboardShortcutHUD from '../KeyboardShortcutHUD.react';
import Swipeable from 'react-swipeable';

// use named export for unconnected component (unit tests)
export class PassagePage extends Component {
  componentDidMount() {
    let combokeys = new Combokeys(document.documentElement);
    combokeys.bind('right', () => { this.props.dispatch(asyncNavigateNext()) });
    combokeys.bind('left', () => { this.props.dispatch(asyncNavigatePrevious()) });
    combokeys.bind('v', () => { this.props.dispatch(asyncChangeMode(VERSE_MODE)) });
    combokeys.bind('s', () => { this.props.dispatch(asyncChangeMode(SEGMENT_MODE)) });
    combokeys.bind('c', () => { this.props.dispatch(asyncChangeMode(CHAPTER_MODE)) });
    combokeys.bind('1', () => { this.props.dispatch(asyncChangeRecall(RECALL_STAGES.FULL)) });
    combokeys.bind('2', () => { this.props.dispatch(asyncChangeRecall(RECALL_STAGES.FIRST)) });
    combokeys.bind('3', () => { this.props.dispatch(asyncChangeRecall(RECALL_STAGES.NONE)) });
  }

  componentWillUnmount() {
    let combokeys = new Combokeys(document.documentElement);
    combokeys.unbind('right');
    combokeys.unbind('left');
    combokeys.unbind('v');
    combokeys.unbind('s');
    combokeys.unbind('c');
    combokeys.unbind('1');
    combokeys.unbind('2');
    combokeys.unbind('3');
  }

  renderPassageText(dispatch, recallStage, activePassage) {
    if (recallStage === RECALL_STAGES.NONE) {
      return (
        <div className="reciteMode">
          <h3>Recite the passage</h3>

          <p>How did you do?</p>

          <div className="actions">
            <button
              className="restart"
              onClick={() => { dispatch(asyncChangeRecall(RECALL_STAGES.FULL)) }}
            >
              <i className="fa fa-undo"></i> More practice
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
    } else {
      return (
        <p dangerouslySetInnerHTML={{ __html: activePassage.formattedText() }}></p>
      );
    }
  }

  render() {
    const dispatch = this.props.dispatch;
    const { active, verses, segments, chapters, mode, recallStage, isAudioPlaying } = this.props.data;

    let activePassage = {};
    let activeCollection = [];
    let activeIndex = 0;

    if (mode === VERSE_MODE) {
      activeCollection = verses;
      activeIndex = active[VERSE_MODE];
    } else if (mode === SEGMENT_MODE) {
      activeCollection = segments;
      activeIndex = active[SEGMENT_MODE];
    } else {
      activeCollection = chapters;
      activeIndex = active[CHAPTER_MODE];
    }
    activePassage = activeCollection[activeIndex];

    return (
      <div>
        <KeyboardShortcutHUD />
        <div className="top-nav">
          <div className="mode-controls">
            <button className={ mode == VERSE_MODE ? "active" : ""}
                    onClick={() => { dispatch(asyncChangeMode(VERSE_MODE)) }}>
              {verses[active[VERSE_MODE]].shortMetadata()}
            </button>

            <button className={ mode == SEGMENT_MODE ? "active" : ""}
                    onClick={() => { dispatch(asyncChangeMode(SEGMENT_MODE)) }}>
              {segments[active[SEGMENT_MODE]].shortMetadata()}
            </button>

            <button className={ mode == CHAPTER_MODE ? "active" : ""}
                    onClick={() => { dispatch(asyncChangeMode(CHAPTER_MODE)) }}>
              {chapters[active[CHAPTER_MODE]].bookAndChapter()}
            </button>
          </div>

          <div className="meta-information">
            <a href="http://www.esv.org">ESV</a>
            <PassageSelect
              dispatch={dispatch}
              collection={activeCollection}
              selectedIndex={activeIndex}
            ></PassageSelect>
            <Link to="/help">Help</Link>
          </div>
        </div>

        <div className="verse-controls">
          <button className="previous"
                  title="Previous"
                  onClick={() => { dispatch(asyncNavigatePrevious()) }}>
            <i className="fa fa-angle-left"></i>
          </button>

          <button className="next"
                  title="Next"
                  onClick={() => { dispatch(asyncNavigateNext()) }}>
            <i className="fa fa-angle-right"></i>
          </button>
        </div>

        <div>
          <Swipeable
            className={ "verse-wrapper " + recallStage }
            onSwipedLeft={() => { dispatch(asyncNavigateNext()) }}
            onSwipedRight={() => { dispatch(asyncNavigatePrevious()) }}
          >

            { this.renderPassageText(dispatch, recallStage, activePassage) }

          </Swipeable>
        </div>

        <div className="stage-controls">
          <button
            className={ recallStage == RECALL_STAGES.FULL ? "active" : ""}
            onClick={() => { dispatch(asyncChangeRecall(RECALL_STAGES.FULL)) }}
          >KNOW</button>

          <button
            className={ recallStage == RECALL_STAGES.FIRST ? "active" : ""}
            onClick={() => { dispatch(asyncChangeRecall(RECALL_STAGES.FIRST)) }}
          >K___</button>

          <button
            className={ recallStage == RECALL_STAGES.NONE ? "active" : ""}
            onClick={() => { dispatch(asyncChangeRecall(RECALL_STAGES.NONE)) }}
          >____</button>

          <AudioPlayer className="audio-controls"
                       src={ activePassage.audioUrl() }
                       dispatch={ dispatch }
                       isAudioPlaying={ isAudioPlaying } />
        </div>
      </div>
    );
  }
}

function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(PassagePage);
