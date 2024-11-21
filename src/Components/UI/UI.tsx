const UI = () => {
  return (
    <div>
      <button
        onClick={() => {
          console.log('floor');
        }}
      >
        Floor
      </button>
      <button
        onClick={() => {
          console.log('wall');
        }}
      >
        Wall
      </button>
    </div>
  );
};

export default UI;
