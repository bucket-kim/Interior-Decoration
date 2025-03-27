import styled from 'styled-components';

const ButtonStyleContainer = styled.button<{ $width: string }>`
  border: white 1px solid;
  background: #a9b4b98f;
  color: white;
  font-size: 1.1rem;
  width: ${(props) => (props.$width ? props.$width : '11rem')};
  height: 2.25rem;
  border-radius: 4rem;
  box-shadow: inset 0 0 1rem #ffffff;
  cursor: pointer;
  text-align: center;
`;

export default ButtonStyleContainer;
