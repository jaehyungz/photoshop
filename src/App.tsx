import React, { createRef, useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import styled from "styled-components";

const Canvas = styled.div`
  width: 100%;
  height: 500px;
  border: 1px solid;
  position: relative;
`;
const Box = styled.div<{ x: number; y: number; width: number; height: number }>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  position: absolute;
  top: ${({ y }) => `${y}px`};
  left: ${({ x }) => `${x}px`};
  border: 1px solid red;
`;

function App() {
  const [first, setFirst] = useState({
    x: 0,
    y: 0,
  });
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [draw, setDraw] = useState(true);

  const handleDraw = () => {
    setDraw((prev) => !prev);
  };

  const hanldeMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (draw && drawStatus) {
      setFirst({ x: offsetX, y: offsetY });
    }
  };
  const [drawStatus, setDrawStatus] = useState(true);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (drawStatus) {
      if (first.x !== 0 && first.y !== 0) {
        if (first.x < offsetX) {
          setWidth(offsetX - first.x);
        }
        if (first.y < offsetY) {
          setHeight(offsetY - first.y);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setDrawStatus(false);
  };

  return (
    <div className="App">
      <button onClick={handleDraw}>네모</button>
      <span>{draw ? "그릴수있다" : "그릴수없다"}</span>
      <Canvas
        onMouseDown={hanldeMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {first.x > 0 && first.y > 0 && (
          <Box x={first.x} y={first.y} width={width} height={height} />
        )}
      </Canvas>
    </div>
  );
}

export default App;
