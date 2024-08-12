import React from 'react';

export default ({ boxData }) => {
  const [gameData, setGameData] = React.useState([]);
  const intervalRef = React.useRef();
  const totalValues = boxData.reduce((acc, row) => {
    row.forEach((cell) => {
      acc += cell;
    });
    return acc;
  }, 0);

  const handleClick = (rowIdx, colIdx, cellValue) => {
    if (!cellValue) {
      return 0;
    }
    // `0-1`
    setGameData([...gameData, `${rowIdx}-${colIdx}`]);
  };

  const initiateUnselection = async () => {
    setGameData((prevData) => {
      const oldData = JSON.parse(JSON.stringify(prevData));
      const newArray = oldData.splice(1);
      if (newArray.length === 0) {
        clearInterval(intervalRef.current);
      }
      return newArray;
    });
  };

  React.useEffect(() => {
    if (gameData.length === totalValues) {
      intervalRef.current = setInterval(initiateUnselection, 500);
    }
  }, [gameData]);

  return (
    <div className="board">
      {boxData.map((row, rowIdx) => (
        <div key={rowIdx} className="row">
          {row.map((cellValue, colIdx) => (
            <span
              key={`${rowIdx}-${colIdx}`}
              onClick={() => handleClick(rowIdx, colIdx, cellValue)}
              className={`
            ${cellValue ? 'cell' : 'empty-cell'}
            ${gameData.find((x) => x === `${rowIdx}-${colIdx}`) ? 'filled' : ''}
            `}
            ></span>
          ))}
          <br />
        </div>
      ))}
    </div>
  );
};
