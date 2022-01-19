import PropTypes from 'prop-types';

const TextInput = (props) => {
  const handleOnChange = (value) => {
    const valueArray = value.split(' ');
    props.onChange([value, valueArray]);
  };


  return (
    <>
      <input
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
