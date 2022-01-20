import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Container, Row, Col} from 'react-bootstrap';
import {useTypingTest} from '../../context/typing-test.context';
import {SET_CONFIG, STATUSES} from '../../reducers/typing-test.reducer';

import {FontAwesomeIcon as Fa} from '@fortawesome/react-fontawesome';
import {faClock, faPlay} from '@fortawesome/free-solid-svg-icons';

import './config-form.scss';

const ErrorMessage = ({error}) => {
  if (error) {
    return <span className="error-message">{error}</span>;
  }

  return null;
};

ErrorMessage.propTypes = {
  error: PropTypes.string,
};

const ConfigForm = (props) => {
  const {state, dispatch} = useTypingTest();
  const inputRef = useRef(null);

  const [error, setError] = useState('');

  const {status} = state;

  const [duration, setDuration] = useState(0);

  useEffect(() => {
    inputRef.current.focus();
    return () => {};
  }, [inputRef]);

  const handleDuration = (event) => {
    setDuration(event.target.value);
  };

  const handleSubmit = () => {
    if (duration > 0) {
      return dispatch({type: SET_CONFIG, payload: {duration}});
    }

    return setError('The duration should be at least one minute');
  };

  if (status !== STATUSES.SETTING) {
    return null;
  }


  return (
    <Container>
      <Row>
        <Col />
        <Col md={6}>
          <div className="config">
            <h1>Check your typing skills</h1>
            <h4>Select time duration</h4>
            <form
              className="config_form"
              onSubmit={handleSubmit}>
              <ErrorMessage error={error} />
              <label className="custom-input_label">
                <Fa icon={faClock} />
                <input
                  ref={inputRef}
                  className="custom-input_number"
                  type="number"
                  list="duration"
                  min="1"
                  onChange={handleDuration}
                />
                <span> min</span>
              </label>
              <datalist id="duration">
                <option value="1" />
                <option value="2" />
                <option value="5" />
              </datalist>
              <div className="action">
                <span className="custom-button_submit" onClick={handleSubmit}>
                  <span>start</span>
                  <Fa icon={faPlay}/>
                </span>
              </div>
            </form>
          </div>
        </Col>
        <Col />

      </Row>
    </Container>
  );
};

export default ConfigForm;
