import PropTypes from 'prop-types';

const LetterBox = ({isActive, children}) => {
  if (isActive) {
    return <span className="active-letter">{children}</span>;
  }

  return <span>{children}</span>;
};

LetterBox.propTypes = {
  children: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default LetterBox;
