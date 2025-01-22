import { Fragment, MouseEvent } from 'react';
import { shallow } from 'zustand/shallow';
import { useGlobalState } from '../../../State/useGlobalState';

const RoomScaleButton = () => {
  const { scaleRoomButtonClick, setScaleRoomButtonClick } = useGlobalState(
    (state) => {
      return {
        interiorData: state.interiorData,
        scaleRoomButtonClick: state.scaleRoomButtonClick,
        setScaleRoomButtonClick: state.setScaleRoomButtonClick,
        addFurnitures: state.addFurnitures,
      };
    },
    shallow,
  );

  const handleScaleRoomClick = (e: MouseEvent) => {
    e.preventDefault();
    setScaleRoomButtonClick(true);
  };

  const handleDoneClick = (e: MouseEvent) => {
    e.preventDefault();
    setScaleRoomButtonClick(false);
  };
  return (
    <Fragment>
      {!scaleRoomButtonClick ? (
        <button onClick={handleScaleRoomClick}>Scale Your Room</button>
      ) : (
        <button onClick={handleDoneClick}>Done</button>
      )}
    </Fragment>
  );
};

export default RoomScaleButton;
