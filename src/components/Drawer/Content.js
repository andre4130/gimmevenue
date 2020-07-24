import styled from 'styled-components';

const Content = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 40%;
  min-width: 264px;
  max-width: 340px;
  background-color: #ffffff;
  box-shadow: 3px 0 16px rgba(0, 0, 0, 0.4);
  will-change: transform;
  transform: translateX(${props => (props.visible ? '0' : '110%')});
  transition: transform 0.13s cubic-bezier(0, 0, 0.3, 1);

  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  display: flex;
  flex-direction: column;
`;

export default Content;
