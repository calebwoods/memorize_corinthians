import expect from 'expect';

import { VERSE_MODE, SEGMENT_MODE, CHAPTER_MODE, CHANGE_RECALL, RECALL_STAGES, CHANGE_MODE, NAVIGATE_NEXT, NAVIGATE_PREVIOUS, NAVIGATE_INDEX, COMPLETE_PASSAGE, PLAY_AUDIO, RESTORE_STATE } from '../constants/AppConstants';
import * as passage from '../passage'
import { getLastState, clearSavedTestState } from '../saveState'

import passageReducer from '../reducers/passageReducer';

describe('passageReducer', () => {
  it('should return the initial state', () => {
    const verses         = passage.verses();
    const segments       = passage.segments();
    const chapters       = passage.chapters();
    const intialReduction = passageReducer(undefined, {});

    expect(intialReduction.active[VERSE_MODE]).toEqual(0);
    expect(intialReduction.active[SEGMENT_MODE]).toEqual(0);
    expect(intialReduction.active[CHAPTER_MODE]).toEqual(0);
    expect(intialReduction.verses).toEqual(verses);
    expect(intialReduction.mode).toEqual(SEGMENT_MODE);
    expect(intialReduction.recallStage).toEqual(RECALL_STAGES.FULL);
    expect(intialReduction.isAudioPlaying).toEqual(false);
  });

  describe('navigating between content in modes', () => {
    describe('verse mode', () => {
      let initialState = {};

      beforeEach(() => {
        initialState = {
          active: {
            VERSE_MODE: 5,
            SEGMENT_MODE: 0,
            CHAPTER_MODE: 0
          },
          mode: VERSE_MODE
        };
      });

      it('should increment active by one', () => {
        let intialReduction = passageReducer(initialState, {
          type: NAVIGATE_NEXT
        });

        expect(intialReduction.active[VERSE_MODE]).toEqual(6);
        expect(intialReduction.active[SEGMENT_MODE]).toEqual(0);
        expect(intialReduction.active[CHAPTER_MODE]).toEqual(0);

        let secondReduction = passageReducer(intialReduction, {
          type: NAVIGATE_NEXT
        });

        expect(secondReduction.active[VERSE_MODE]).toEqual(7);
      });

      it('should decrement active by one', () => {
        let intialReduction = passageReducer(initialState, {
          type: NAVIGATE_PREVIOUS
        });

        expect(intialReduction.active[VERSE_MODE]).toEqual(4);
        expect(intialReduction.active[SEGMENT_MODE]).toEqual(0);
        expect(intialReduction.active[CHAPTER_MODE]).toEqual(0);

        let secondReduction = passageReducer(intialReduction, {
          type: NAVIGATE_PREVIOUS
        });

        expect(secondReduction.active[VERSE_MODE]).toEqual(3);
      });

      it('should navigate to index', () => {
        let intialReduction = passageReducer(initialState, {
          type: NAVIGATE_INDEX, index: 2
        });

        expect(intialReduction.active[VERSE_MODE]).toEqual(2);
        expect(intialReduction.active[SEGMENT_MODE]).toEqual(0);
        expect(intialReduction.active[CHAPTER_MODE]).toEqual(0);
      });

      it('should ignore invalid index', () => {
        let intialReduction = passageReducer(initialState, {
          type: NAVIGATE_INDEX, index: 1000
        });

        expect(intialReduction.active[VERSE_MODE]).toEqual(5);
        expect(intialReduction.active[SEGMENT_MODE]).toEqual(0);
        expect(intialReduction.active[CHAPTER_MODE]).toEqual(0);
      });
    });

    describe('segment mode', () => {
      let initialState   = {};

      beforeEach(() => {
        initialState = {
          active: {
            VERSE_MODE: 0,
            SEGMENT_MODE: 5,
            CHAPTER_MODE: 0
          },
          mode: SEGMENT_MODE
        };
      });

      it('should increment active by one', () => {
        let intialReduction = passageReducer(initialState, {
          type: NAVIGATE_NEXT
        });

        expect(intialReduction.active[SEGMENT_MODE]).toEqual(6);
        expect(intialReduction.active[VERSE_MODE]).toEqual(0);
        expect(intialReduction.active[CHAPTER_MODE]).toEqual(0);

        let secondReduction = passageReducer(intialReduction, {
          type: NAVIGATE_NEXT
        });

        expect(secondReduction.active[SEGMENT_MODE]).toEqual(7);
      });

      it('should decrement active by one', () => {
        let intialReduction = passageReducer(initialState, {
          type: NAVIGATE_PREVIOUS
        });

        expect(intialReduction.active[SEGMENT_MODE]).toEqual(4);
        expect(intialReduction.active[VERSE_MODE]).toEqual(0);
        expect(intialReduction.active[CHAPTER_MODE]).toEqual(0);

        let secondReduction = passageReducer(intialReduction, {
          type: NAVIGATE_PREVIOUS
        });

        expect(secondReduction.active[SEGMENT_MODE]).toEqual(3);
      });

      it('should navigate to index', () => {
        let intialReduction = passageReducer(initialState, {
          type: NAVIGATE_INDEX, index: 2
        });

        expect(intialReduction.active[SEGMENT_MODE]).toEqual(2);
        expect(intialReduction.active[VERSE_MODE]).toEqual(0);
        expect(intialReduction.active[CHAPTER_MODE]).toEqual(0);
      });

      it('should ignore invalid index', () => {
        let intialReduction = passageReducer(initialState, {
          type: NAVIGATE_INDEX, index: 1000
        });

        expect(intialReduction.active[SEGMENT_MODE]).toEqual(5);
        expect(intialReduction.active[VERSE_MODE]).toEqual(0);
        expect(intialReduction.active[CHAPTER_MODE]).toEqual(0);
      });
    });

    describe('chapter mode', () => {
      let initialState = {};

      beforeEach(() => {
        initialState = {
          active: {
            VERSE_MODE: 0,
            SEGMENT_MODE: 0,
            CHAPTER_MODE: 1
          },
          mode: CHAPTER_MODE
        };
      });

      it('should increment active by one', () => {
        let intialReduction = passageReducer(initialState, {
          type: NAVIGATE_NEXT
        });

        expect(intialReduction.active[CHAPTER_MODE]).toEqual(2);
        expect(intialReduction.active[VERSE_MODE]).toEqual(0);
        expect(intialReduction.active[SEGMENT_MODE]).toEqual(0);
      });

      it('should decrement active by one', () => {
        let intialReduction = passageReducer(initialState, {
          type: NAVIGATE_PREVIOUS
        });

        expect(intialReduction.active[CHAPTER_MODE]).toEqual(0);
        expect(intialReduction.active[VERSE_MODE]).toEqual(0);
        expect(intialReduction.active[SEGMENT_MODE]).toEqual(0);
      });

      it('should navigate to index', () => {
        let intialReduction = passageReducer(initialState, {
          type: NAVIGATE_INDEX, index: 2
        });

        expect(intialReduction.active[CHAPTER_MODE]).toEqual(2);
        expect(intialReduction.active[VERSE_MODE]).toEqual(0);
        expect(intialReduction.active[SEGMENT_MODE]).toEqual(0);
      });

      it('should ignore invalid index', () => {
        let intialReduction = passageReducer(initialState, {
          type: NAVIGATE_INDEX, index: 1000
        });

        expect(intialReduction.active[CHAPTER_MODE]).toEqual(1);
        expect(intialReduction.active[VERSE_MODE]).toEqual(0);
        expect(intialReduction.active[SEGMENT_MODE]).toEqual(0);
      });

      it('should handle navigating below lower bounds', () => {
        let intialReduction = passageReducer(initialState, {
          type: NAVIGATE_PREVIOUS
        });
        let secondReduction = passageReducer(initialState, {
          type: NAVIGATE_PREVIOUS
        });

        expect(intialReduction.active[CHAPTER_MODE]).toEqual(0);
        expect(intialReduction.active[VERSE_MODE]).toEqual(0);
        expect(intialReduction.active[SEGMENT_MODE]).toEqual(0);
      })

      it('should handle navigating above upper bounds', () => {
        let intialReduction = passageReducer(initialState, {
          type: NAVIGATE_NEXT
        });
        let secondReduction = passageReducer(initialState, {
          type: NAVIGATE_NEXT
        });

        expect(intialReduction.active[CHAPTER_MODE]).toEqual(2);
        expect(intialReduction.active[VERSE_MODE]).toEqual(0);
        expect(intialReduction.active[SEGMENT_MODE]).toEqual(0);
      })
    });
  });

  describe('changing modes', () => {
    describe('verse mode', () => {
      let initialState = {};

      beforeEach(() => {
        initialState = {
          active: {
            VERSE_MODE: 0,
            SEGMENT_MODE: 0,
            CHAPTER_MODE: 0
          },
          mode: SEGMENT_MODE
        };
      });

      it('should handle the CHANGE_MODE action', () => {
        let intialReduction = passageReducer(initialState, {
          type: CHANGE_MODE,
          mode: VERSE_MODE
        });

        expect(intialReduction.mode).toEqual(VERSE_MODE);
      });
    });

    describe('segment mode', () => {
      let initialState = {};

      beforeEach(() => {
        initialState = {
          active: {
            VERSE_MODE: 0,
            SEGMENT_MODE: 0,
            CHAPTER_MODE: 0
          },
          mode: VERSE_MODE
        };
      });

      it('should handle the CHANGE_MODE action', () => {
        let intialReduction = passageReducer(undefined, {
          type: CHANGE_MODE,
          mode: SEGMENT_MODE
        });

        expect(intialReduction.mode).toEqual(SEGMENT_MODE);
      });
    });

    describe('chapter mode', () => {
      let initialState = {};

      beforeEach(() => {
        initialState = {
          active: {
            VERSE_MODE: 0,
            SEGMENT_MODE: 0,
            CHAPTER_MODE: 0
          },
          mode: VERSE_MODE
        };
      });

      it('should handle the CHANGE_MODE action', () => {
        let intialReduction = passageReducer(undefined, {
          type: CHANGE_MODE,
          mode: CHAPTER_MODE
        });

        expect(intialReduction.mode).toEqual(CHAPTER_MODE);
      });
    });
  });

  describe('save and restore state', () => {
    let initialState = {};

    beforeEach(() => {
      initialState = {
        active: {
          VERSE_MODE: 0,
          SEGMENT_MODE: 0,
          CHAPTER_MODE: 0
        },
        mode: VERSE_MODE,
        recallStage: RECALL_STAGES.FULL,
        isAudioPlaying: false
      };
      clearSavedTestState();
    });

    it('should restore state', () => {
      let newState = passageReducer(initialState, {
        type: RESTORE_STATE,
        state: {
          active: {
            VERSE_MODE: 7,
            SEGMENT_MODE: 6,
            CHAPTER_MODE: 3
          },
          mode: SEGMENT_MODE,
          recallStage: RECALL_STAGES.FIRST
        }
      });
      expect(newState.active.VERSE_MODE).toEqual(7);
      expect(newState.active.SEGMENT_MODE).toEqual(6);
      expect(newState.active.CHAPTER_MODE).toEqual(3);
      expect(newState.mode).toEqual(SEGMENT_MODE);
      expect(newState.recallStage).toEqual(RECALL_STAGES.FIRST);
      expect(newState.isAudioPlaying).toEqual(false);
    });

    it('should save state.active', () => {
      passageReducer(initialState, {
        type: NAVIGATE_NEXT
      });
      let lastState = getLastState();
      expect(lastState.active.VERSE_MODE).toEqual(1);
    });

    it('should save state.mode', () => {
      passageReducer(initialState, {
        type: CHANGE_MODE,
        mode: CHAPTER_MODE
      });
      let lastState = getLastState();
      expect(lastState.mode).toEqual(CHAPTER_MODE);
    });

    it('should save state.recallStage', () => {
      passageReducer(initialState, {
        type: CHANGE_RECALL,
        mode: RECALL_STAGES.FIRST
      });
      let lastState = getLastState();
      expect(lastState.recallStage).toEqual(RECALL_STAGES.FIRST);
    });

    it('should save subsequent state changes', () => {
      let state = passageReducer(initialState, {
        type: CHANGE_MODE,
        mode: SEGMENT_MODE
      });
      passageReducer(state, {
        type: NAVIGATE_NEXT
      });
      let lastState = getLastState();
      expect(lastState.mode).toEqual(SEGMENT_MODE);
      expect(lastState.active.VERSE_MODE).toEqual(0);
      expect(lastState.active.SEGMENT_MODE).toEqual(1);

    });

    it('should NOT save state.isAudioPlaying', () => {
      passageReducer(initialState, {
        type: PLAY_AUDIO
      });
      let lastState = getLastState();
      expect(lastState.isAudioPlaying).toNotExist();
    });
  });

  describe('complete passage', () => {
    describe('verse mode', () => {
      let initialState = {};

      beforeEach(() => {
        initialState = {
          active: {
            VERSE_MODE: 1,
            SEGMENT_MODE: 0,
            CHAPTER_MODE: 0
          },
          mode: VERSE_MODE,
          recallStage: RECALL_STAGES.NONE
        };
      });

      it('should increment active by one and switch recall mode', () => {
        let intialReduction = passageReducer(initialState, {
          type: COMPLETE_PASSAGE
        });

        expect(intialReduction.active[VERSE_MODE]).toEqual(2);
        expect(intialReduction.recallStage).toEqual(RECALL_STAGES.FULL);
      });
    });

    describe('chapter mode', () => {
      let initialState = {};

      beforeEach(() => {
        initialState = {
          active: {
            VERSE_MODE: 0,
            SEGMENT_MODE: 0,
            CHAPTER_MODE: 2
          },
          mode: CHAPTER_MODE,
          recallStage: RECALL_STAGES.NONE
        };
      });

      it('when last passage, just switch recall mode', () => {
        let intialReduction = passageReducer(initialState, {
          type: COMPLETE_PASSAGE
        });

        expect(intialReduction.active[CHAPTER_MODE]).toEqual(2);
        expect(intialReduction.recallStage).toEqual(RECALL_STAGES.FULL);
      });
    });
  });
});
