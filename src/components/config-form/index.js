import React, {useState} from 'react';
import {useTypingTest} from '../../context/typing-test.context';
import {SET_CONFIG, STATUSES} from '../../reducers/typing-test.reducer';

const ConfigForm = (props) => {
  const {state, dispatch} = useTypingTest();

  const {status} = state;

  const [duration, setDuration] = useState(0);
  const handleDuration = (event) => {
    setDuration(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({type: SET_CONFIG, payload: {duration}});
  };

  if (status !== STATUSES.SETTING) {
    return null;
  }


  return (
    <>
      <div className="config-form">
        <h1>Check your typing skills</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="number" list="duration" onChange={handleDuration} />
        <span> minutes</span>
        <datalist id="duration">
          <option value="1" />
          <option value="2" />
          <option value="5" />
        </datalist>
        <div className="actions">
          <input type="submit" value="start" />
        </div>
      </form>
    </>);
};

export default ConfigForm;
