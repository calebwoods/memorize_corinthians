/*
 * AppConstants
 * These are the variables that determine what our central data store (reducer.js)
 * changes in our state. When you add a new action, you have to add a new constant here
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'YOUR_ACTION_CONSTANT';
 */
export const NAVIGATE_PREVIOUS = 'NAVIGATE_PREVIOUS';
export const NAVIGATE_NEXT     = 'NAVIGATE_NEXT';
export const NAVIGATE_INDEX    = 'NAVIGATE_INDEX';
export const COMPLETE_PASSAGE  = 'COMPLETE_PASSAGE';

export const PLAY_AUDIO  = 'PLAY_AUDIO';
export const PAUSE_AUDIO = 'PAUSE_AUDIO';

export const CHANGE_MODE  = 'CHANGE_MODE';
export const VERSE_MODE   = 'VERSE_MODE';
export const SEGMENT_MODE = 'SEGMENT_MODE';
export const CHAPTER_MODE = 'CHAPTER_MODE';

export const CHANGE_RECALL = 'CHANGE_RECALL';
export const RECALL_STAGES = {
  FULL : 'readText',
  FIRST: 'recallFirstText',
  NONE : 'recallNoneText'
};

export const RESTORE_STATE = 'RESTORE_STATE';

/*
 * Other constants
 */
export const COOKIE_LAST_STATE = 'memorize_ephesians_last_state';
export const COOKIE_OMIT_FROM_STATE = ['verses', 'segments', 'chapters', 'isAudioPlaying'];
