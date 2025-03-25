import { Fragment, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { useGlobalState } from '../../../State/useGlobalState';
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

  // Get furniture items for the selected category or all categories if none selected
  const getDisplayedFurniture = () => {
    if (!menuState.isOpen || !menuState.showItems) {
      return [];
    }

    // If no category is selected but menu is open, show featured items
    if (!menuState.selectedCategory) {
      // Return a sample from each category for the main view
      return Object.entries(furnitureCategory).flatMap(([category, items]) =>
        items.length > 0 ? [items[0]] : [],
      );
    }

    // Return items for the selected category
    return furnitureCategory[menuState.selectedCategory] || [];
  };

  const displayFurniture = getDisplayedFurniture();

  return (
    <FurnitureMenuStyleContainer>
      {menuState.isOpen ? (
        <Fragment>
          <div className="furniture-categories">
            <button
              onClick={() =>
                setMenuState((prev) => ({
                  ...prev,
                  isOpen: false,
                }))
              }
            >
              X
            </button>
            <div className="category-header">
              <h3>{'Feature Futiture'}</h3>
            </div>

            <div className="category-buttons">
              {Object.keys(FURNITURE_CATEGORIES).map((category) => (
                <button
                  key={category}
                  onClick={() =>
                    setMenuState((prev) => ({
                      ...prev,
                      selectedCategory:
                        prev.selectedCategory === category ? null : category,
                      showItems: prev.selectedCategory !== category,
                    }))
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          {menuState.showItems && (
            <div className="furniture-items">
              <h3>{menuState.selectedCategory}</h3>
              {menuState.selectedCategory && (
                <button
                  onClick={() =>
                    setMenuState((prev) => ({
                      ...prev,
                      selectedCategory: null,
                      showItems: false,
                    }))
                  }
                >
                  {'<-'}
                </button>
              )}
              <div className="item-buttons">
                {displayFurniture.map((data: furnitureData) => (
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
                ))}
                {displayFurniture.length === 0 && (
                  <p>No furniture items in this category</p>
                )}
              </div>
            </div>
          )}
        </Fragment>
      ) : (
        <div className="furniture-categories">
          <button
            onClick={() =>
              setMenuState((prev) => ({
                ...prev,
                isOpen: true,
              }))
            }
          >
            Furniture Menu
          </button>
        </div>
      )}
    </FurnitureMenuStyleContainer>
  );
};

export default FurnitureMenu;
