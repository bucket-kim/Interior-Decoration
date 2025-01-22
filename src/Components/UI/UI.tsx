import AuthPage from './Authorize/AuthPage';
import FurnitureMenu from './FurnitureMenu/FurnitureMenu';
import RoomScaleButton from './RoomScaleButton/RoomScaleButton';
import UIStyleContainer from './UIStyleContainer';

const UI = () => {
  return (
    <UIStyleContainer>
      <FurnitureMenu />

      <div style={{ position: 'absolute', top: '0', right: '0' }}>
        <AuthPage />
        <RoomScaleButton />
      </div>
    </UIStyleContainer>
  );
};

export default UI;
