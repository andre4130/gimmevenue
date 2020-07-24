import styled from 'styled-components';

const Item = styled.a`
  color: #1f2228;
  display: flex;
  align-items: center;
  flex-shrink: 0
  font-size: 14px;
  font-weight: 400;
  padding: 15px 30px;
  text-decoration: none;

  &:hover {
    background-color: #f2f2f2;
  }

  > svg {
    margin-right: 20px;
  }
`;

export default Item;
