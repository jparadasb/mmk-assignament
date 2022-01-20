import PropTypes from 'prop-types';
import LetterBox from '../letter-box';

const getStatusClass = (correct) => {
  if (correct !== undefined) {
    return correct ? 'correct' : 'errored';
  }

  return '';
};

const getPositionClass = (currentWordIndex, index) => {
  const distance = index - currentWordIndex;

  if (distance < -1) {
    return 'typing_hide';
  }

  if (distance > -6 && distance < 0) {
    return 'typing_blury';
  }

  if (distance < 10) {
    return 'typing_show';
  }

  return 'typing_hide';
};

const WordBox = ({
  index,
  currentWordIndex,
  currentLetterIndex,
  children,
  correct,
}) => {
  const getClasses = () => {
    return [
      getStatusClass(correct),
      getPositionClass(currentWordIndex, index),
      'noselect',
    ].join(' ');
  };
  if (index === currentWordIndex) {
    const letters = children.split('');
    const letterBoxes = letters.map((letter, i) => {
      return (
        <LetterBox
          key={`${children}${i}`}
          isActive={i === currentLetterIndex}
        >
          {letter}
        </LetterBox>
      );
    });

    return <b className="word-active">{letterBoxes}&nbsp;</b>;
  };

  return (
    <span
      className={getClasses()}>
      {children}&nbsp;
    </span>
  );
};

WordBox.propTypes = {
  children: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  currentLetterIndex: PropTypes.number.isRequired,
  currentWordIndex: PropTypes.number.isRequired,
  correct: PropTypes.oneOf([PropTypes.bool, undefined]),
};

export default WordBox;
