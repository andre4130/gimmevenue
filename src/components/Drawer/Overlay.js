import styled from 'styled-components';

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  will-change: opacity;
  opacity: ${props => (props.visible ? '1' : '0')};
  transition: opacity 0.3s cubic-bezier(0, 0, 0.3, 1);
`;

export default Overlay;
