import { CROSSWAY_API_KEY } from './env';
import _ from 'lodash';

const SHORT_BOOK_LENGTH = 3;
export class Passage {
  constructor(verses) {
    this._verses = verses;
  }

  metadata(bookLimit) {
    let firstVerse = this._verses[0];
    let lastVerse = this._verses[this._verses.length - 1]
    let firstBookLimit = bookLimit ? bookLimit : firstVerse.length
    let bookChapter = firstVerse.book.substr(0, firstBookLimit) + ' ' + firstVerse.chapter + ':';
    if (this._verses.length > 1) {
      if (firstVerse.chapter === lastVerse.chapter) {
        return bookChapter + firstVerse.verse + '-' + lastVerse.verse;
      } else if (firstVerse.book === lastVerse.book) {
        return bookChapter + firstVerse.verse + '-' + lastVerse.chapter + ':' + lastVerse.verse;
      } else {
        let lastBookLimit = bookLimit ? bookLimit : lastVerse.length
        return bookChapter + firstVerse.verse + ' - ' + lastVerse.book.substr(0, lastBookLimit) + ' ' + lastVerse.chapter + ':' + lastVerse.verse;
      }
    } else {
      return bookChapter + this._verses[0].verse;
    }
  }

  shortMetadata() {
    return this.metadata(SHORT_BOOK_LENGTH);
  }

  bookAndChapter() {
    let firstVerse = this._verses[0];
    return firstVerse.book.substr(0, SHORT_BOOK_LENGTH) + ' ' + firstVerse.chapter;
  }

  baseAudioUrl() {
    return "http://www.esvapi.org/v2/rest/passageQuery?key=" + CROSSWAY_API_KEY + "&passage=";
  }

  audioUrl() {
    return encodeURI(this.baseAudioUrl() + this.metadata() + '&output-format=mp3');
  }

  text() {
    return this._verses.map(verse => verse.text).join(' ');
  }

  formattedText() {
    return this._verses.map(function (rawVerse) {
      return '<sup>' + rawVerse.verse + '</sup>' + spannifyText(rawVerse.text);
    }).join('<span class="space"> </span>');
  }

  structuredText() {
    const structuredMap = this._verses.map(function (rawVerse) {
      let textObjects = [{ tag: 'sup', type: 'sup', text: rawVerse.verse.toString() }]
      rawVerse.text.split(/\b/).forEach((word) => {
        let type = 'word';
        if (word.match(/^\s|\.|,\s|,$/)) {
          type = 'space';
        }
        textObjects.push({ tag: 'span', type: type, text: word });
      });
      return textObjects;
    });

    const reducedStucture = structuredMap.reduce((memo, array) => {
      array.forEach((textObject) => memo.push(textObject));
      memo.push({ tag: 'span', type: 'space', text: ' ' });
      return memo;
    }, []);

    return reducedStucture.slice(0, reducedStucture.length - 1)
  }
}

function spannifyText(text) {
  return text.split(/\b/).map((word) => {
    let spannifiedWord = word.replace(/([A-Za-z])/g, '<span class="char">$1</span>');
    let className = 'word';
    if (spannifiedWord.match(/^\s|\.|,\s|,$/)) {
      className = 'space';
    }
    return '<span class="' + className + '">' + spannifiedWord + '</span>';
  }).join('');
}

const rawVerses = Object.freeze([
    {
        "book": "1 Corinthians",
        "chapter": 13,
        "verse": 1,
        "text": "If I speak in the tongues of men and of angels, but have not love, I am a noisy gong or a clanging cymbal."
    },
    {
        "book": "1 Corinthians",
        "chapter": 13,
        "verse": 2,
        "text": "And if I have prophetic powers, and understand all mysteries and all knowledge, and if I have all faith, so as to remove mountains, but have not love, I am nothing."
    },
    {
        "book": "1 Corinthians",
        "chapter": 13,
        "verse": 3,
        "text": "If I give away all I have, and if I deliver up my body to be burned, but have not love, I gain nothing."
    },
    {
        "book": "1 Corinthians",
        "chapter": 13,
        "verse": 4,
        "text": "Love is patient and kind; love does not envy or boast; it his not arrogant"
    },
    {
        "book": "1 Corinthians",
        "chapter": 13,
        "verse": 5,
        "text": "or rude. It does not insist on its own way; it is not irritable or resentful;"
    },
    {
        "book": "1 Corinthians",
        "chapter": 13,
        "verse": 6,
        "text": "it does not rejoice at wrongdoing, but rejoices with the truth."
    },
    {
        "book": "1 Corinthians",
        "chapter": 13,
        "verse": 7,
        "text": "Love bears all things, believes all things, hopes all things, endures all things."
    },
    {
        "book": "1 Corinthians",
        "chapter": 13,
        "verse": 8,
        "text": "Love never ends. As for prophecies, they will pass away; as for tongues, they will cease; as for knowledge, it will pass away."
    },
    {
        "book": "1 Corinthians",
        "chapter": 13,
        "verse": 9,
        "text": "For we know in part and we prophesy in part,"
    },
    {
        "book": "1 Corinthians",
        "chapter": 13,
        "verse": 10,
        "text": "but when the perfect comes, the partial will pass away."
    },
    {
        "book": "1 Corinthians",
        "chapter": 13,
        "verse": 11,
        "text": "When I was a child, I spoke like a child, I thought like a child, I reasoned like a child. When I became a man, I gave up childish ways."
    },
    {
        "book": "1 Corinthians",
        "chapter": 13,
        "verse": 12,
        "text": "For now we see in a mirror dimly, but then face to face. Now I know in part; then I shall know fully, even as I have been fully known."
    },
    {
        "book": "1 Corinthians",
        "chapter": 13,
        "verse": 13,
        "text": "So now faith, hope, and love abide, these three; but the greatest of these is love."
    }
]);

export function verses() {
  return rawVerses.map((verse) => {
    return new Passage([ verse ]);
  });
}

export function segments() {
  const segmentIndexes = [
    [0, 3], // 13:1-3
    [3, 4], // 13:4-7
    [7, 5], // 13:8-12
    [12, 1], // 13:13
  ];

  return segmentIndexes.map((touple) => {
    return new Passage(rawVerses.slice(touple[0], (touple[0] + touple[1])));
  });
}

export function chapters() {
  let _chapters = {};
  let key = '';

  rawVerses.forEach((verse) => {
    key = verse.book + verse.chapter

    if (!_chapters[key]) { _chapters[key] = []; }

    _chapters[key].push(verse);
  });
  return _.map(_chapters, (verses) => { return new Passage(verses) });
}
