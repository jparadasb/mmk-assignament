import React, {useEffect, useMemo} from 'react';
import {useTypingTest} from '../../context/typing-test.context';
import TextReference from '../text-reference';
import TextInput from '../text-input';
import {
  STATUSES,
  FINISH_TEST,
  UPDATE_CLOCK,
  UPDATE_CURRENT_POSITION,
} from '../../reducers/typing-test.reducer';

const parseParagraph = (paragraph) => {
  return paragraph.split(' ');
};

const parseClockDigit = (digit) => {
  return `${digit}`.length > 1 ? `${digit}` : `0${digit}`;
};

const handleOnChange = ([text, textArray], dispatch) => {
  const length = textArray.length;
  const currentWord = length - 1;
  const currentLetter = textArray[length - 1].length - 1;

  dispatch({
    type: UPDATE_CURRENT_POSITION,
    payload: {
      word: currentWord,
      letter: currentLetter,
    },
  });
};

const TypingTest = (props) => {
  const {state, dispatch} = useTypingTest();

  const {
    status,
    paragraph,
    startTime,
    durationMilliseconds,
    clock,
    currentPositions,
  } = state;

  const paragraphArray = useMemo(() => parseParagraph(paragraph), [paragraph]);

  const isFinished = () => {
    return status === STATUSES.FINISHED;
  };

  useEffect(() => {
    if (status === STATUSES.STARTED) {
      const interval = setInterval(() => {
        const currentUnixTime = new Date().getTime();
        const distance = currentUnixTime - startTime;
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance > durationMilliseconds) {
          dispatch({type: FINISH_TEST});
        }

        dispatch({
          type: UPDATE_CLOCK,
          payload: `${parseClockDigit(minutes)}:${parseClockDigit(seconds)}`,
        });
      }, 1000);
      return () => clearInterval(interval);
    }

    return () => {};
  }, [status]);

  if (status !== STATUSES.STARTED && status !== STATUSES.FINISHED) {
    return null;
  }


  return (
    <>
      <div className="typing-test">
        <span className="countdown">{clock}</span>
        <TextReference
          paragraph={paragraphArray}
          currentPositions={currentPositions}
        />
        <TextInput
          onChange={(values) => handleOnChange(values, dispatch)}
          disabled={isFinished()}
        />
      </div>
    </>);
};

export default TypingTest;
