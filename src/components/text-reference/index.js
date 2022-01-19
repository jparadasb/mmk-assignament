import PropTypes from 'prop-types';
import WordBox from './components/word-box';

const renderParagraph = (paragraph, wordIndex, letterIndex) => {
  return paragraph.map((word, index) => {
    return (
      <WordBox
        key={word + index}
        index={index}
        currentWordIndex={wordIndex}
        currentLetterIndex={letterIndex}
      >
        {word}
      </WordBox>);
  });
};

const TextReference = (props) => {
  const {paragraph} = props;

  return (
    <>
      {
        renderParagraph(
            paragraph,
            props?.currentPositions?.word,
            props?.currentPositions?.letter)
      }
    </>
  );
};

TextReference.propTypes = {
  paragraph: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentPositions: PropTypes.shape({
    word: PropTypes.number,
    letter: PropTypes.number,
  }).isRequired,
};

TextReference.defaultProptypes = {
  currentPositions: {
    word: 0,
    letter: 0,
  },
};

export default TextReference;
