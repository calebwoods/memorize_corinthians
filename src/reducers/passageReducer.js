/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the passageReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 *
 * To add a new reducer, add a file like this to the reducers folder, and
 * add it in the rootReducer.js.
 */
import assignToEmpty from '../utils/assign';

import { NAVIGATE_NEXT, NAVIGATE_PREVIOUS, NAVIGATE_INDEX, COMPLETE_PASSAGE, CHANGE_RECALL, PLAY_AUDIO, PAUSE_AUDIO, RECALL_STAGES } from '../constants/AppConstants';
import { VERSE_MODE, SEGMENT_MODE, CHAPTER_MODE, CHANGE_MODE, RESTORE_STATE } from '../constants/AppConstants';
import { saveState } from '../saveState';
import * as passage from '../passage';

// import all verse data
const verses = passage.verses();

// import the segment data
const segments = passage.segments();

// import all chapter data
const chapters = passage.chapters();

const initialState = assignToEmpty({
  active: {
    VERSE_MODE  : 0,
    SEGMENT_MODE: 0,
    CHAPTER_MODE: 0
  },
  verses        : verses,
  segments      : segments,
  chapters      : chapters,
  mode          : SEGMENT_MODE,
  recallStage   : RECALL_STAGES.FULL,
  isAudioPlaying: false
});

function assignAndSave(oldState, newState) {
  let state = assignToEmpty(oldState, newState)
  saveState(state);
  return state;
}

function activeCollection(state) {
  if (state.mode === VERSE_MODE) {
    return verses;
  } else if (state.mode === SEGMENT_MODE) {
    return segments;
  } else if (state.mode === CHAPTER_MODE){
    return chapters;
  }
}

function passageReducer(state = initialState, action) {
  Object.freeze(state); // Don't mutate state directly, always use assign()!

  let newActive = {};

  switch (action.type) {
    case NAVIGATE_NEXT:
      newActive = state.active;
      if (newActive[state.mode] < activeCollection(state).length - 1) {
        newActive[state.mode]++;
      }

      return assignAndSave(state, {
        active: newActive
      });

    case NAVIGATE_PREVIOUS:
      newActive = state.active;
      if (newActive[state.mode] > 0) {
        newActive[state.mode]--;
      }

      return assignAndSave(state, {
        active: newActive
      });

    case NAVIGATE_INDEX:
      newActive = state.active;

      if (activeCollection(state)[action.index]) {
        newActive[state.mode] = action.index;
      }

      return assignAndSave(state, {
        active: newActive
      });

    case COMPLETE_PASSAGE:
      newActive = state.active;
      if (newActive[state.mode] < activeCollection(state).length - 1) {
        newActive[state.mode]++;
      }

      return assignAndSave(state, {
        active: newActive,
        recallStage: RECALL_STAGES.FULL
      });

    case CHANGE_RECALL:
      return assignAndSave(state, {
        recallStage: action.mode
      });

    case CHANGE_MODE:
      return assignAndSave(state, {
        mode: action.mode
      });

    case PLAY_AUDIO:
      return assignToEmpty(state, {
        isAudioPlaying: true
      });

    case PAUSE_AUDIO:
      return assignToEmpty(state, {
        isAudioPlaying: false
      });

    case RESTORE_STATE:
      return assignToEmpty(state, action.state);

    default:
      return state;
  }
}

export default passageReducer;
