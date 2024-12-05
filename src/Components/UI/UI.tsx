import { MouseEvent } from 'react';
import { shallow } from 'zustand/shallow';
import { useGlobalState } from '../../State/useGlobalState';

const UI = () => {
  // const [arrayNumbers, setArrayNumbers] = useState<string[]>([]);

  const { addBox } = useGlobalState((state) => {
    return {
      addBox: state.addBox,
    };
  }, shallow);

  const handleClickSquare = (e: MouseEvent) => {
    e.preventDefault();
    // const newNumber = (arrayNumbers.length + 1).toString().padStart(3, '0');

    // setArrayNumbers((prev) => [...prev, newNumber]);
    addBox();
  };

  return (
    <div>
      <button onClick={handleClickSquare}>Square</button>
      <button
        onClick={() => {
          console.log('wall');
        }}
      >
        Pyramid
      </button>
      <button
        onClick={() => {
          console.log('wall');
        }}
      >
        Sphere
      </button>
    </div>
  );
};

export default UI;
