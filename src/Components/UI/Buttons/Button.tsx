import { FC, MouseEvent } from 'react';
import ButtonStyleContainer from './ButtonStyleContainer';

interface ButtonProps {
  onClick: (e: MouseEvent) => void;
  name: string;
  width?: string;
}

const Button: FC<ButtonProps> = ({ name, width, onClick }) => {
  return (
    <ButtonStyleContainer onClick={onClick} $width={width || ''}>
      {name}
    </ButtonStyleContainer>
  );
};

export default Button;
