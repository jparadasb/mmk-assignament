import PropTypes from 'prop-types';
import WordBox from './components/word-box';

const renderParagraph = (
    paragraph,
    wordIndex,
    letterIndex,
    accurancyByPosition,
) => {
  return paragraph.map((word, index) => {
    return (
      <WordBox
        key={word + index}
        index={index}
        currentWordIndex={wordIndex}
        currentLetterIndex={letterIndex}
        correct={accurancyByPosition[index]}
      >
        {word}
      </WordBox>);
  });
};

const TextReference = (props) => {
  const {paragraph, accurancyByPosition} = props;

  return (
    <>
      {
        renderParagraph(
            paragraph,
            props?.currentPositions?.word,
            props?.currentPositions?.letter,
            accurancyByPosition,
        )
      }
    </>
  );
};

TextReference.propTypes = {
  paragraph: PropTypes.arrayOf(PropTypes.string).isRequired,
  accurancyByPosition: PropTypes.arrayOf(PropTypes.bool).isRequired,
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
