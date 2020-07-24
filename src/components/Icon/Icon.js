import React from 'react';
import PropTypes from 'prop-types';
import icons from './icons';

const Icon = ({ name, fill }) => (
  <svg
    fill={fill}
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d={icons[name]} />
  </svg>
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  fill: PropTypes.string
};

Icon.defaultProps = {
  fill: 'currentColor'
};

export default Icon;
