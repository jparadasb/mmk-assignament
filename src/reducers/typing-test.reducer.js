
import {paragraph} from 'txtgen/dist/txtgen.esm';
export const SET_CONFIG = 'SET_CONFIG';
export const FINISH_TEST = 'FINISH_TEST';
export const UPDATE_CLOCK = 'UPDATE_CLOCK';
export const UPDATE_CURRENT_POSITION = 'UPDATE_CURRENT_POSITION';
export const CHECK_ACCURACY = 'CHECK_ACCURACY';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const RESTART = 'RESTART';
export const UPDATE_BPM = 'UPDATE_BPM';
export const UPDATE_LAST_EVENT_TIME = 'UPDATE_LAST_EVENT_TIME';
export const UPDATE_AVG_BPM = 'UPDATE_AVG_BPM';

export const STATUSES = {
  STARTED: 'STARTED',
  SETTING: 'SETTING',
  FINISHED: 'FINISHED',
};

export const defaultState = {
  status: STATUSES.SETTING,
  durationMinutes: null,
  durationMilliseconds: null,
  paragraph: '',
  bpmArray: [],
  lastEventTime: null,
  avgBpm: 0,
  startTime: null,
  clock: '00:00',
  currentPositions: {
    word: 0,
    letter: 0,
  },
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

const getAverage = (numbers) => {
  const length = numbers.length;
  const total = numbers.reduce((acc, current) => {
    return acc + current;
  }, 0);

  return total / length;
};

export default function typingTestReducer(state, action) {
  switch (action.type) {
    case UPDATE_LAST_EVENT_TIME: {
      return {
        ...state,
        lastEventTime: new Date().getTime(),
      };
    }
    case UPDATE_AVG_BPM: {
      return {
        avgBpm: getAverage(state.bpmArray),
      };
    }
    case UPDATE_BPM: {
      const {bpm, lastEventTime} = action.payload;
      if (state.bpmArray.length > 20) {
        const avgBpm = getAverage(state.bpmArray);
        return {
          ...state,
          bpmArray: [avgBpm, bpm],
          avgBpm,
          lastEventTime,
        };
      }
      return {
        ...state,
        bpmArray: [...state.bpmArray, bpm],
        lastEventTime,
      };
    }
    case RESTART: {
      return defaultState;
    }
    case UPDATE_SCORE: {
      const {accurancyByPosition} = state;
      const score = accurancyByPosition.reduce(
          (total, isValid) => {
            if (isValid) {
              return total + 1;
            }
            return total;
          },
          0,
      );

      return {...state, score};
    }
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
        avgBpm: getAverage(state.bpmArray),
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
