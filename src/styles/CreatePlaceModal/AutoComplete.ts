import styled from '@emotion/styled';

export const ListBox = styled.ul`
  width: auto;
  margin: 0;
  padding: 0;
  z-index: 1;
  position: absolute;
  background-color: #fff;
  overflow: auto;
  max-height: rem(200);
  border: 1px solid rgba(0, 0, 0, 0.25);
  & li.Mui-focused {
    background-color: #4a8df6;
    color: white;
    cursor: pointer;
  }
  & li:active {
    background-color: #2977f5;
    color: white;
  }
`;
