import { useState } from 'react';
import { shallow } from 'zustand/shallow';
import { useGlobalState } from '../../../State/useGlobalState';
import Button from '../Buttons/Button';
import FurnitureMenuStyleContainer from './FurnitureMenuStyleContainer';

interface furnitureData {
  name: string;
}

type MenuState = {
  isOpen: boolean;
  selectedCategory: string | null;
  showItems: boolean;
};

const FURNITURE_CATEGORIES = {
  Tables: ['Table', 'Desk'],
  Chairs: ['Chair', 'Stool'],
  Storage: ['Bookcase', 'Shelf', 'Drawer', 'Stand'],
  Sofas: ['Sofa'],
  Electronics: ['TV'],
  Lighting: ['Lamp'],
  WallMounted: ['Wall'], // For wall-mounted furniture like WallBookshelf
  Other: [], // Will capture anything that doesn't match other categories
};

const FurnitureMenu = () => {
  const { interiorData, addFurnitures } = useGlobalState((state) => {
    return {
      interiorData: state.interiorData,
      addFurnitures: state.addFurnitures,
    };
  }, shallow);

  const [menuState, setMenuState] = useState<MenuState>({
    isOpen: false,
    selectedCategory: null,
    showItems: false,
  });

  const categorizeFurniture = () => {
    const categorized: Record<string, furnitureData[]> = {};

    Object.keys(FURNITURE_CATEGORIES).forEach((category) => {
      categorized[category] = [];
    });

    interiorData.forEach((data: furnitureData) => {
      const name = data.name;
      let assigned = false;

      for (const [category, patterns] of Object.entries(FURNITURE_CATEGORIES)) {
        if (category === 'Other') continue;

        if (patterns.some((pattern) => name.includes(pattern))) {
          categorized[category].push(data);
          assigned = true;
          break;
        }
      }
      if (!assigned) {
        categorized['Other'].push(data);
      }
    });

    return categorized;
  };

  const furnitureCategory = categorizeFurniture();

  const getDisplayedFurniture = () => {
    if (!menuState.isOpen || !menuState.showItems) {
      return [];
    }

    if (!menuState.selectedCategory) {
      return Object.entries(furnitureCategory).flatMap(([_, items]) =>
        items.length > 0 ? [items[0]] : [],
      );
    }

    return furnitureCategory[menuState.selectedCategory] || [];
  };

  const displayFurniture = getDisplayedFurniture();

  return (
    <FurnitureMenuStyleContainer>
      {menuState.isOpen ? (
        <div className="furniture-categories">
          <div className="furniture-menu">
            <div className="category-header">
              <h3>{'Feature Futiture'}</h3>
            </div>
            <Button
              name="X"
              onClick={() =>
                setMenuState((prev) => ({
                  ...prev,
                  isOpen: false,
                }))
              }
              width="2.25rem"
            />
          </div>
          <div className="category-buttons">
            {Object.keys(FURNITURE_CATEGORIES).map((category) => (
              <Button
                key={category}
                onClick={() =>
                  setMenuState((prev) => ({
                    ...prev,
                    selectedCategory:
                      prev.selectedCategory === category ? null : category,
                    showItems: prev.selectedCategory !== category,
                  }))
                }
                name={category}
              />
            ))}
          </div>
          {menuState.showItems && (
            <div className="item-category">
              <div className="item-menu">
                <div className="item-header">
                  <h3>{menuState.selectedCategory}</h3>
                </div>
                {menuState.selectedCategory && (
                  <Button
                    name="<-"
                    onClick={() =>
                      setMenuState((prev) => ({
                        ...prev,
                        selectedCategory: null,
                        showItems: false,
                      }))
                    }
                    width="5rem"
                  />
                )}
              </div>
              <div className="item-buttons">
                {displayFurniture.map((data: furnitureData) => (
                  <Button
                    key={data.name}
                    name={data.name.replace('_geo', '')}
                    onClick={(e) => {
                      e.preventDefault();
                      const modelName = data.name as string;
                      addFurnitures(modelName);
                    }}
                  />
                ))}
                {displayFurniture.length === 0 && (
                  <p>No furniture items in this category</p>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="furniture-button">
          <Button
            onClick={() =>
              setMenuState((prev) => ({
                ...prev,
                isOpen: true,
              }))
            }
            name={'Furniture Menu'}
          />
        </div>
      )}
    </FurnitureMenuStyleContainer>
  );
};

export default FurnitureMenu;
