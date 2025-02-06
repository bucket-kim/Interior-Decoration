import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import { useAuth } from '../../../context/AuthProvider';
import { useGlobalState } from '../../../State/useGlobalState';

const StoreFurnitureButton = () => {
  const { token, user } = useAuth();
  const { furnitures } = useGlobalState((state) => {
    return {
      furnitures: state.furnitures,
    };
  }, shallow);

  useEffect(() => {
    console.log(user);
    console.log(token);
  }, []);

  const handleSaveFurnitures = async () => {
    // console.log(furnitures);
    try {
      if (!user || !token) return;

      const furnitureData = furnitures.map((furniture) => ({
        modelIndex: furniture.modelIndex,
        name: furniture.name,
        // Flatten the Vector3 into separate x,y,z fields
        positionX: furniture.position.x,
        positionY: furniture.position.y,
        positionZ: furniture.position.z,
        // Add rotation fields to match Prisma schema
        rotationX: furniture.rotation?.x || 0,
        rotationY: furniture.rotation?.y || 0,
        rotationZ: furniture.rotation?.z || 0,
        userId: user.id,
      }));

      console.log('Sending data:', furnitureData);

      const response = await fetch(
        `http://localhost:8080/api/furnitures/${user.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(furnitureData),
          credentials: 'include',
        },
      );

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        throw new Error('Failed to save data');
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={handleSaveFurnitures}>Save Furnitures</button>;
};

export default StoreFurnitureButton;
