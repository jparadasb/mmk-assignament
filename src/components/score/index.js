import PropTypes from 'prop-types';
import {useTypingTest} from '../../context/typing-test.context';
import {
  RESTART,
} from '../../reducers/typing-test.reducer';

import './score.scss';


const Score = ({children, isFinished}) => {
  const {dispatch, state: {score}} = useTypingTest();
  if (!isFinished) {
    return null;
  }

  const gifUrl = score > 0 ?
  'https://media.giphy.com/media/NEvPzZ8bd1V4Y/giphy.gif' :
  'https://media.giphy.com/media/DvyLQztQwmyAM/giphy.gif';

  return (
    <div className="score">
      <img src={gifUrl} alt="" />
      <h1>
        We&apos;re done your score is
      </h1>
      <div className='score_text'>
        {children}
      </div>
      <div
        className="custom-button_default"
        onClick={() => dispatch({type: RESTART})}
      >
        <span>
          Restart
        </span>
      </div>
    </div>
  );
};

Score.propTypes = {
  children: PropTypes.string,
  isFinished: PropTypes.bool,
};

export default Score;
