import { shallow } from 'zustand/shallow';
import { useGlobalState } from '../../../State/useGlobalState';
import FurnitureMenuStyleContainer from './FurnitureMenuStyleContainer';

interface furnitureData {
  name: string;
}

const FurnitureMenu = () => {
  const { interiorData, addFurnitures } = useGlobalState((state) => {
    return {
      interiorData: state.interiorData,
      addFurnitures: state.addFurnitures,
    };
  }, shallow);

  return (
    <FurnitureMenuStyleContainer>
      {interiorData.map((data: furnitureData) => {
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
      <p
        style={{
          fontSize: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
        }}
      >
        <span>click on a furniture to transform</span>
        <span>Middle Mouse Button to change transform mode</span>
      </p>
    </FurnitureMenuStyleContainer>
  );
};

export default FurnitureMenu;
