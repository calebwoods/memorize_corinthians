import expect from 'expect';
import jsdomify from 'jsdomify';

import { VERSE_MODE, SEGMENT_MODE, CHAPTER_MODE, RECALL_STAGES } from '../constants/AppConstants';
import * as passage from '../passage';

import { PassagePage } from '../components/pages/PassagePage.react';

describe('PassagePage', () => {
  let React, TestUtils, getInstance;

  beforeEach(() => {
    jsdomify.create();

    React     = require('react');
    TestUtils = require('react-addons-test-utils');

    getInstance = (props = {}) => {
      return TestUtils.renderIntoDocument(
        <PassagePage data={ props } dispatch={ {} } />
      );
    };
  });

  afterEach(() => {
    jsdomify.destroy();
  });


  describe('changing modes', () => {
    let props  = {
          active: {
            VERSE_MODE  : 0,
            SEGMENT_MODE: 0,
            CHAPTER_MODE: 0
          },
          mode: VERSE_MODE,
          recallStage: RECALL_STAGES.FULL,
          verses: passage.verses(),
          segments: passage.segments(),
          chapters: passage.chapters()
        };

    afterEach(() => {
      props.mode = null
    });

    it('should render', () => {
      let element = getInstance(props);

      expect(element).toBeTruthy();
    });

    it('should render the active verse in single mode', () => {
      props.mode       = VERSE_MODE;

      let element        = getInstance(props);
      let renderedVerses = TestUtils.scryRenderedDOMComponentsWithClass(element, 'verse-wrapper');

      expect(renderedVerses[0].innerHTML).toInclude(passage.verses()[0].formattedText());
    });

    it('should render all verses for a segment in segment mode', () => {
      props.mode       = SEGMENT_MODE;

      let element        = getInstance(props);
      let renderedVerses = TestUtils.scryRenderedDOMComponentsWithClass(element, 'verse-wrapper');

      expect(renderedVerses[0].innerHTML).toInclude(passage.segments()[0].formattedText());
    });

    it('should render all verses for a chapter in chapter mode', () => {
      props.mode       = CHAPTER_MODE;

      let element        = getInstance(props);
      let renderedVerses = TestUtils.scryRenderedDOMComponentsWithClass(element, 'verse-wrapper');

      expect(renderedVerses[0].innerHTML).toInclude(passage.chapters()[0].formattedText());
    });
  });
});
