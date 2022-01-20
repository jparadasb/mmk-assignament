import React, {useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useTypingTest} from '../../context/typing-test.context';
import TextReference from '../text-reference';
import TextInput from '../text-input';
import Score from '../score';
import {
  STATUSES,
  FINISH_TEST,
  UPDATE_CLOCK,
  UPDATE_CURRENT_POSITION,
  CHECK_ACCURACY,
  UPDATE_SCORE,
} from '../../reducers/typing-test.reducer';

import './typing-test.scss';

const parseClockDigit = (digit) => {
  return `${digit}`.length > 1 ? `${digit}` : `0${digit}`;
};

const handleOnChange = ([text, textArray], baseParagraphLength, dispatch) => {
  const length = textArray.length;
  const currentWord = length - 1;
  const currentLetter = textArray[length - 1].length - 1;

  if (baseParagraphLength < length) {
    dispatch({type: FINISH_TEST});
  }

  dispatch({
    type: UPDATE_SCORE,
  });

  dispatch({
    type: CHECK_ACCURACY,
    payload: {textArray: textArray},
  });

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
    startTime,
    durationMilliseconds,
    clock,
    currentPositions,
    paragraphMap,
    accurancyByPosition,
    score,
  } = state;

  const paragraphLength = paragraphMap?.length;

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

    if (status === STATUSES.FINISHED) {
      dispatch({
        type: UPDATE_SCORE,
      });
    }

    return () => {};
  }, [status]);

  if (status !== STATUSES.STARTED && status !== STATUSES.FINISHED) {
    return null;
  }


  return (
    <Container>
      <Row>
        <Col></Col>
        <Col md={6}>
          <div className="typing-test">
            <span className="countdown">{clock}</span>
            <TextReference
              accurancyByPosition={accurancyByPosition}
              paragraph={paragraphMap}
              currentPositions={currentPositions}
            />
            <TextInput
              onChange={
                (values) => handleOnChange(values, paragraphLength, dispatch)
              }
              disabled={isFinished()}
            />
            <Score
              isFinished={isFinished()}
            >
              {score}
            </Score>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>);
};

export default TypingTest;
