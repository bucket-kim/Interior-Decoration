import AuthPage from './Authorize/AuthPage';
import FurnitureMenu from './FurnitureMenu/FurnitureMenu';
import RoomScaleButton from './RoomScaleButton/RoomScaleButton';
import StoreFurnitureButton from './StoreFurnitureButton/StoreFurnitureButton';
import UIStyleContainer from './UIStyleContainer';

const UI = () => {
  return (
    <UIStyleContainer>
      <FurnitureMenu />
      <div style={{ position: 'absolute', top: '0', right: '0' }}>
        <AuthPage />
        <RoomScaleButton />
        <StoreFurnitureButton />
      </div>
    </UIStyleContainer>
  );
};

export default UI;
