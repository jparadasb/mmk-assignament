import {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

const TextInput = (props) => {
  const inputRef = useRef(null);

  const handleOnChange = (value) => {
    const valueArray = value.split(' ');
    props.onChange([value, valueArray]);
  };

  useEffect(() => {
    inputRef.current.focus();
    return () => {};
  }, [inputRef]);


  return (
    <>
      <input
        className="cy-control_input-typing-test"
        ref={inputRef}
        onChange={
          (event) => handleOnChange(event.target.value)
        }
        disabled={props.disabled}
      />
    </>
  );
};

TextInput.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default TextInput;
