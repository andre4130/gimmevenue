import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  pointer-events: ${props => (props.visible ? 'auto' : 'none')};
`;

export default Wrapper;
