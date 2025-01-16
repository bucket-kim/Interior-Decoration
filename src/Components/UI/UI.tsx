import { MouseEvent } from 'react';
import { proxy } from 'valtio';
import { shallow } from 'zustand/shallow';
import { useGlobalState } from '../../State/useGlobalState';

interface InteriorItem {
  name: string;
  // Add other properties that exist in your data
}

interface State {
  current: string | null;
  mode: number;
}

const state = proxy<State>({ current: null, mode: 0 });

const UI = () => {
  const {
    interiorData,
    scaleRoomButtonClick,
    setScaleRoomButtonClick,
    addFurnitures,
  } = useGlobalState((state) => {
    return {
      interiorData: state.interiorData,
      scaleRoomButtonClick: state.scaleRoomButtonClick,
      setScaleRoomButtonClick: state.setScaleRoomButtonClick,
      addFurnitures: state.addFurnitures,
    };
  }, shallow);

  const handleScaleRoomClick = (e: MouseEvent) => {
    e.preventDefault();
    setScaleRoomButtonClick(true);
  };

  const handleDoneClick = (e: MouseEvent) => {
    e.preventDefault();
    setScaleRoomButtonClick(false);
  };

  return (
    <div>
      {interiorData.map((data: InteriorItem) => {
        return (
          <button
            key={data.name}
            onClick={(e) => {
              e.preventDefault();
              const modelName = data.name as string;
              addFurnitures(modelName);
            }}
          >
            {data.name.replace('_geo', '')}
          </button>
        );
      })}

      <div style={{ position: 'absolute', top: '0', right: '0' }}>
        {!scaleRoomButtonClick ? (
          <button onClick={handleScaleRoomClick}>Scale Your Room</button>
        ) : (
          <button onClick={handleDoneClick}>Done</button>
        )}
      </div>
    </div>
  );
};

export default UI;
