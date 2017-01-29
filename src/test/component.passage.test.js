import React from 'react';
import { render, shallow } from 'enzyme';
import { VERSE_MODE, SEGMENT_MODE, CHAPTER_MODE, RECALL_STAGES } from '../constants/AppConstants';
import * as passage from '../passage';
import { PassagePage } from '../components/pages/PassagePage.react';

describe('PassagePage', () => {
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
      let element = shallow(<PassagePage data={props} dispatch={ {} } />)

      expect(element.text()).toBeTruthy();
    });

    it('should render the active verse in single mode', () => {
      props.mode       = VERSE_MODE;

      let element = render(<PassagePage data={props} dispatch={ {} } />)

      expect(element.find('.verse-wrapper').html()).toMatch(passage.verses()[0].formattedText());
    });

    it('should render all verses for a segment in segment mode', () => {
      props.mode       = SEGMENT_MODE;

      let element = render(<PassagePage data={props} dispatch={ {} } />)

      expect(element.find('.verse-wrapper').html()).toMatch(passage.segments()[0].formattedText());
    });

    it('should render all verses for a chapter in chapter mode', () => {
      props.mode       = CHAPTER_MODE;

      let element = render(<PassagePage data={props} dispatch={ {} } />)

      expect(element.find('.verse-wrapper').html()).toMatch(passage.chapters()[0].formattedText());
    });
  });
});
