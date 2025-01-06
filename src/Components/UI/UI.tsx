import { MouseEvent } from 'react';
import { shallow } from 'zustand/shallow';
import { useGlobalState } from '../../State/useGlobalState';

interface InteriorItem {
  name: string;
  // Add other properties that exist in your data
}

const UI = () => {
  const {
    interiorData,
    addBox,
    scaleRoomButtonClick,
    setScaleRoomButtonClick,
    addFurnitures,
  } = useGlobalState((state) => {
    return {
      addBox: state.addBox,
      interiorData: state.interiorData,
      scaleRoomButtonClick: state.scaleRoomButtonClick,
      setScaleRoomButtonClick: state.setScaleRoomButtonClick,
      addFurnitures: state.addFurnitures,
    };
  }, shallow);

  const handleClickSquare = (e: MouseEvent) => {
    e.preventDefault();
    addBox();
  };

  return (
    <div>
      <button onClick={handleClickSquare}>Desk</button>
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
      {/* <button
        onClick={() => {
          console.log('wall');
        }}
      >
        Chair
      </button>
      <button
        onClick={() => {
          console.log('wall');
        }}
      >
        Bed
      </button>
      <button
        onClick={() => {
          console.log('wall');
        }}
      >
        Table
      </button>
      <button
        onClick={() => {
          console.log('wall');
        }}
      >
        Sofa
      </button> */}

      <div style={{ position: 'absolute', top: '0', right: '0' }}>
        <button onClick={() => setScaleRoomButtonClick(false)}>
          {scaleRoomButtonClick ? 'Done' : 'Scale Your Room'}
        </button>
      </div>
    </div>
  );
};

export default UI;
