const JsDiff = require('diff');

export default class Grader {
  constructor(source, comparison) {
    this._source = source;
    this._comparison = comparison;
  }

  correctScore() {
    return this._diffs().reduce((score, diff) => {
      if (!diff.added && !diff.removed) {
        const correctCount = this._filteredWords(diff.value).length;
        score += correctCount;
      }
      return score;
    }, 0);
  }

  diffObjects() {
    return this._diffs().map((diff) => {
      const type = diff.added ? 'added' : diff.removed ? 'removed' : 'common';
      return { type, text: diff.value }
    });
  }

  sourceString() {
    return this._filteredWords(this._source).join(' ');
  }

  comparisonString() {
    return this._filteredWords(this._comparison).join(' ')
  }

  wordCount() {
    return this._filteredWords(this._source).reduce((count, word) => {
      count++
      return count;
    }, 0);
  }

  _diffs() {
    return JsDiff.diffWords(this.sourceString(), this.comparisonString());
  }

  _filteredWords(text) {
    return text.split(/\b/).filter((word) => {
      return !word.match(/^\s|\.|,\s|,$/);
    }).map((word) => {
      return word.toLowerCase();
    });
  }
}
