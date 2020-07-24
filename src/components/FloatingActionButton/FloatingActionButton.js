import styled from 'styled-components';
import { media } from '../../styles/utils';

const FloatingActionButton = styled.div`
    border-radius: 28px;
    box-shadow: 0 4px 11px rgba(0, 0, 0, .3);
    background-color: red;
    color: white;
    cursor: pointer;
    width: 56px;
    height: 56px;
    will-change: transform;
    transition: transform 0.3s cubic-bezier(0, 0, 0.3, 1);
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    ${media.large`
      top: 30px;
      right: 30px;
    `}

    &:hover {
      transform: scale(1.15);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
    }
`;

export default FloatingActionButton;
