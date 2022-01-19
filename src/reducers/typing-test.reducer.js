
import {paragraph} from 'https://unpkg.com/txtgen/dist/txtgen.esm.js';

export const SET_CONFIG = 'SET_CONFIG';
export const FINISH_TEST = 'FINISH_TEST';
export const UPDATE_CLOCK = 'UPDATE_CLOCK';
export const UPDATE_CURRENT_POSITION = 'UPDATE_CURRENT_POSITION';
export const CHECK_ACCURACY = 'CHECK_ACCURACY';

export const STATUSES = {
  STARTED: 'STARTED',
  SETTING: 'SETTING',
  FINISHED: 'FINISHED',
};

const MAX_TYPED_WORD_PER_MINUTE = 216;

const initializeConfig = (durationMinutes) => {
  const paragraphText = paragraph(durationMinutes * MAX_TYPED_WORD_PER_MINUTE);
  return {
    durationMinutes,
    durationMilliseconds: durationMinutes * 60000,
    paragraph: paragraphText,
    paragraphMap: paragraphText.split(' '),
    startTime: new Date().getTime(),
    status: STATUSES.STARTED,
    accurancyByPosition: [],
    score: 0,
    currentPositions: {
      word: 0,
      letter: 0,
    },
  };
};

export default function typingTestReducer(state, action) {
  switch (action.type) {
    case CHECK_ACCURACY: {
      const {paragraphMap} = state;
      const {textArray} = action.payload;

      const accurancyByPosition = textArray.map((text, index) => {
        if (paragraphMap[index]) {
          return text === paragraphMap[index];
        }

        return false;
      });

      return {
        ...state,
        accurancyByPosition,
      };
    }
    case UPDATE_CURRENT_POSITION: {
      const {word, letter} = action.payload;
      return {
        ...state,
        currentPositions: {
          word,
          letter,
        },
      };
    }
    case UPDATE_CLOCK: {
      return {
        ...state,
        clock: action.payload,
      };
    }
    case FINISH_TEST: {
      return {
        ...state,
        status: STATUSES.FINISHED,
      };
    }
    case SET_CONFIG: {
      const {payload: {duration}} = action;
      return {
        ...state,
        ...initializeConfig(duration),
      };
    }
    default: {
      return state;
    }
  }
}
