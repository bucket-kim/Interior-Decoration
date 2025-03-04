import AuthPage from './Authorize/AuthPage';
import FurnitureMenu from './FurnitureMenu/FurnitureMenu';
import RoomScaleButton from './RoomScaleButton/RoomScaleButton';
import StoreFurnitureButton from './StoreFurnitureButton/StoreFurnitureButton';
import UIStyleContainer from './UIStyleContainer';

const UI = () => {
  // const { session } = useGlobalState((state) => {
  //   return {
  //     session: state.session,
  //   };
  // }, shallow);

  return (
    <UIStyleContainer>
      <FurnitureMenu />
      {/* {session && <FurnitureMenu />} */}
      <div style={{ position: 'absolute', top: '0', right: '0' }}>
        <AuthPage />
        <RoomScaleButton />
        <StoreFurnitureButton />
        {/* {session && (
          <Fragment>
            <RoomScaleButton />
            <StoreFurnitureButton />
          </Fragment>
        )} */}
      </div>
    </UIStyleContainer>
  );
};

export default UI;
