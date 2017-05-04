import expect from 'expect';
import Grader from '../grader';

describe('Grader', () => {
  describe('scoring', () => {
    it('tallies the correct and missed words', () => {
      const source = "Text, of verse one";
      const comparison = "Text on verse";
      const grader = new Grader(source, comparison)

      expect(grader.correctScore()).toEqual(2);
      expect(grader.diffObjects()).toEqual([
        { type: 'common', text: 'text ' },
        { type: 'removed', text: 'of' },
        { type: 'added', text: 'on' },
        { type: 'common', text: ' verse' },
        { type: 'removed', text: ' one' }
      ]);
    });

    it('handles all correct', () => {
      const source = "Text, of verse one";
      const comparison = "Text, of verse one";
      const grader = new Grader(source, comparison)

      expect(grader.correctScore()).toEqual(4);
      expect(grader.diffObjects()).toEqual([
        { type: 'common', text: 'text of verse one' }
      ]);
    });

    it('ignores case and punctuation', () => {
      const source = "Text, of verse one. And; another verse.";
      const comparison = "Text of verse one and another verse with extra";
      const grader = new Grader(source, comparison)

      expect(grader.correctScore()).toEqual(7);
      expect(grader.diffObjects()).toEqual([
        { type: 'common', text: 'text of verse one and another verse' },
        { type: 'added', text: ' with extra' }
      ]);
    });

    it('handle missed before extra', () => {
      const source = "Text, of verse one";
      const comparison = "Text of verse bone and more";
      const grader = new Grader(source, comparison)

      expect(grader.correctScore()).toEqual(3);
      expect(grader.diffObjects()).toEqual([
        { type: 'common', text: 'text of verse ' },
        { type: 'removed', text: 'one' },
        { type: 'added', text: 'bone and more' }
      ]);
    });
  });

  describe('#wordCount', () => {
    it('sums total words ignoring punctuation', () => {
      const source = "Text, of verse one";
      const grader = new Grader(source)

      expect(grader.wordCount()).toEqual(4);
    });
  });
});
