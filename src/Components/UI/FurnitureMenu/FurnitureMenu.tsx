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
    </FurnitureMenuStyleContainer>
  );
};

export default FurnitureMenu;
